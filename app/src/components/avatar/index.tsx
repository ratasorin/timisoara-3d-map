import * as RadixAvatar from "@radix-ui/react-avatar";
import type { FunctionComponent } from "react";

const Avatar: FunctionComponent<{
  username: string;
  profilePictureKey: string | undefined;
}> = ({ profilePictureKey, username }) => {
  return (
    <RadixAvatar.Root
      className={
        "mr-3 inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full bg-zinc-200 align-middle"
      }
    >
      <RadixAvatar.Image
        className="h-full w-full rounded-full object-cover"
        src={`http://localhost:3000/resources/${profilePictureKey || ""}`}
        alt={username}
      />
      <RadixAvatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-zinc-100 text-lg font-medium">
        {username.slice(0, 2).toLocaleUpperCase()}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

export default Avatar;
