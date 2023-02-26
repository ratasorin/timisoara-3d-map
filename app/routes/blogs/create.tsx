import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getSessionFromCookie } from "~/src/server/session-cookies.server";
import { useNavigate, useSubmit } from "@remix-run/react";
import { redirectToAuthWithContext } from "~/src/server/redirect.server";
import { getUser } from "~/src/server/user.server";
import { prisma } from "~/db.server";
import { Form, useActionData } from "@remix-run/react";
import { useUser } from "~/src/hooks/user";
import { useAtomValue } from "jotai";
import { editorStateAtom } from "~/src/features/blog/editor/context";
import ClientEditor from "~/src/features/blog/editor";
import Title from "~/src/features/blog/title";

export const action = async ({ request }: ActionArgs) => {
  const sessionId = await getSessionFromCookie(request);
  console.log({ sessionId });
  if (!sessionId) throw redirectToAuthWithContext(request);
  const user = await getUser(sessionId);
  console.log({ user });
  if (!user) throw redirectToAuthWithContext(request);

  const form = await request.formData();
  const richContent = JSON.stringify(form.get("rich-content"));
  const textContent = String(form.get("text-content"));
  const title = String(form.get("title"));

  if (!richContent || !title || !textContent)
    return json({ error: "Empty fields! Please add content to a blog!" });

  let blogId: string;
  try {
    const { id } = await prisma.blog.create({
      data: {
        richContent,
        textContent,
        likes: 0,
        title,
        author: { connect: { id: user.id } },
      },
      select: {
        id: true,
      },
    });

    blogId = id;
  } catch (err) {
    console.error(err);
    return json({
      error:
        "Could not create the blog! If the problem persists, please inform the administrator!",
    });
  }

  console.log({ blogId });

  throw redirect(`/blogs/blog/${blogId}`);
};

const BlogRoute = () => {
  const error = useActionData<typeof action>();
  if (error) console.error(`error`);

  const { user } = useUser();
  const navigate = useNavigate();
  const { richContent, textContent } = useAtomValue(editorStateAtom);
  const submit = useSubmit();
  return (
    <Form
      className="flex h-full flex-col p-4 font-mono"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        form.append("rich-content", JSON.stringify(richContent));
        form.append("text-content", textContent);

        submit(form, { method: "post", action: "" });
      }}
    >
      <Title readonly={false} title={undefined}></Title>
      <ClientEditor editorState={undefined} readonly={false} />
      <div className="mt-2 flex flex-row items-center justify-end">
        <button
          type="submit"
          className="mr-2 rounded-lg px-4 py-3 font-mono text-sm hover:bg-zinc-200 disabled:bg-zinc-300 disabled:text-zinc-700 disabled:hover:cursor-pointer"
          disabled={!user}
        >
          Postează
        </button>
        {!user && (
          <button
            onClick={() => {
              const redirectBackTo = new URLSearchParams();
              redirectBackTo.set(
                "redirect-back-to",
                location.pathname + location.search
              );
              navigate({
                pathname: "/auth",
                search: redirectBackTo.toString(),
              });
            }}
            className="rounded-lg px-4 py-3 font-mono text-sm hover:bg-zinc-200"
            type="button"
          >
            Loghează-te
          </button>
        )}
      </div>
    </Form>
  );
};

export default BlogRoute;
