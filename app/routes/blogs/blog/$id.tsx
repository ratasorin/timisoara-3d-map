import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { prisma } from "~/db.server";
import { redirectToAuthWithContext } from "~/src/server/redirect.server";
import { getSessionFromCookie } from "~/src/server/session-cookies.server";
import { getUser } from "~/src/server/user.server";
import ClientEditor from "~/src/features/blog/editor";
import Avatar from "~/src/components/avatar";
import { IoMdHeart } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import throttle from "lodash.throttle";

export const loader = async ({ request, params }: LoaderArgs) => {
  const blogId = params["id"];
  if (!blogId) throw redirect("/blogs");

  const viewMode = new URL(request.url).searchParams.get("view-mode");

  const blog = await prisma.blog.findFirst({
    where: {
      id: blogId,
    },
    include: {
      author: {
        include: { picture: true },
      },
    },
  });

  if (!blog) throw redirect("/blogs");

  if (viewMode === "EDIT") {
    const sessionId = await getSessionFromCookie(request);
    if (!sessionId) throw redirectToAuthWithContext(request);
    const user = await getUser(sessionId);
    if (!user) throw redirectToAuthWithContext(request);
    if (user.id !== blog.author.id) throw redirect("/blogs");

    return { blog, readonly: false, user: user };
  }

  return { blog, readonly: true, user: null };
};

const Blog = () => {
  let { blog, readonly, user } = useLoaderData<typeof loader>();
  const [likes, setLikes] = useState(blog.likes);
  const [addedLikes, setAddedLikes] = useState(0);

  const mutation = useMutation((likes: number) => {
    const form = new FormData();
    form.append("likes", `${likes}`);
    return fetch(`/api/blogs/update/${blog.id}/likes`, {
      method: "POST",
      body: form,
    });
  });
  const throttleUpdateLikes = useRef(
    throttle((likes: number) => {
      mutation.mutate(likes);
      setAddedLikes(0);
    }, 1000)
  );

  useEffect(() => {}, [addedLikes]);
  if (readonly)
    return (
      <div className="flex h-full flex-col p-4 font-mono">
        <div className="flex w-full flex-row items-center">
          <Avatar
            profilePictureKey={blog.author.picture?.imageKey}
            username={blog.author.name}
          />
          <div className="mx-3 flex flex-col">
            <h3 className="font-semibold">{blog.author.name}</h3>
            <p className="text-sm italic">
              Postat in {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span className="my-2"></span>
        <div className="flex flex-row items-center">
          <button
            onClick={() => {
              setAddedLikes(addedLikes + 1);
              setLikes(likes + 1);
              throttleUpdateLikes.current(addedLikes + 1);
            }}
            className="mr-2 inline rounded-lg bg-red-500 px-2 py-1 text-white hover:bg-red-400"
          >
            Like
          </button>
          <span className="text-2xl">{likes}</span>
          <IoMdHeart className="ml-1 inline text-2xl text-red-500" />
        </div>
        <span className="my-1"></span>
        <h1 className="overflow-hidden text-ellipsis text-2xl font-bold">
          {blog.title}
        </h1>
        <span className="my-1"></span>
        <ClientEditor
          editorState={JSON.parse(blog.richContent)}
          readonly={readonly}
        />
      </div>
    );
};

export default Blog;
