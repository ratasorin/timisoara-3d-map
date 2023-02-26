import { useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { IoMdHeart } from "react-icons/io";
import { prisma } from "~/db.server";
import Avatar from "~/src/components/avatar";

export const loader = async ({ request }: LoaderArgs) => {
  const blogs = await prisma.blog.findMany({
    include: {
      author: { include: { picture: true } },
    },
    orderBy: { likes: "desc" },
  });

  return blogs;
};

const Blogs = () => {
  const blogs = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <div className="overflow-y-auto p-4 font-mono">
      {blogs.map((blog) => (
        <button
          onClick={() => {
            navigate(`/blogs/blog/${blog.id}`);
          }}
          key={blog.id}
          className="mx-auto mb-4 flex w-full max-w-sm flex-col rounded-lg border-4 border-zinc-200 bg-zinc-100 p-3"
        >
          <h1 className="overflow-hidden text-ellipsis text-2xl font-black hover:text-blue-500">
            {blog.title}
          </h1>
          <p className="mt-1 w-full overflow-hidden text-ellipsis text-left text-sm">
            {blog.textContent.slice(0, 150)}...
          </p>
          <div className="mt-2 flex flex-row items-center">
            <Avatar
              profilePictureKey={blog.author.picture?.imageKey}
              username={blog.author.name}
            />
            <div className="flex flex-col text-zinc-700">
              <span className="text-sm">{blog.author.name}</span>
              <span className="text-sm italic">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-row">
            {blog.likes}
            <IoMdHeart className="ml-1 inline text-2xl text-red-500" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default Blogs;
