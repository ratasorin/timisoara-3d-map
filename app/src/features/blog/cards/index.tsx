// import React from 'react'

import type { Blog, User, UserPicture } from "@prisma/client";
import type { FunctionComponent } from "react";

type QueriedBlog = Blog & {
  author: User & {
    picture: UserPicture | null;
  };
};

const Card: FunctionComponent<{ blog: QueriedBlog }> = ({ blog }) => {
  return (
    <div
      key={blog.id}
      className="m-auto w-full max-w-sm rounded-lg bg-slate-200 p-3"
    >
      <h1 className="overflow-hidden text-ellipsis text-xl font-black">
        {blog.title}
      </h1>
      <p>{}</p>
    </div>
  );
};

export default Card;
