import { Form } from "@remix-run/react";
import { lazy } from "react";
import { ClientOnly } from "~/src/utils/client-only";
const Editor = lazy(() => import("~/src/features/blog/editor"));
const Blog = () => {
  return (
    <ClientOnly>
      <Form
        action=""
        method="post"
        className="flex h-full flex-col p-4 font-mono"
      >
        <input
          type="text"
          placeholder="Alege un titlu"
          required
          name="title"
          className="flex-1 p-2 text-xl"
        />
        <div className="h-full overflow-hidden ">
          <Editor />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </ClientOnly>
  );
};

export default Blog;
