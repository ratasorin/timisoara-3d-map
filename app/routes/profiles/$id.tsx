import React from "react";
import DragAndDrop from "~/src/components/file-upload/drag-and-drop";
import Preview from "~/src/components/file-upload/preview";
import { useMemo, useState } from "react";
import type { UploadFile } from "~/src/components/file-upload/types";

const Profile = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const profilePicture = useMemo(() => files.reverse().at(0), [files]);

  return (
    <div>
      <DragAndDrop files={files} setFiles={setFiles} />
      <Preview
        files={profilePicture ? [profilePicture] : []}
        setFiles={setFiles}
      />
      <button
        type="submit"
        className="flex w-full justify-center rounded-lg border-2 border-zinc-300 py-2 px-4 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-100"
      >
        Încarcă poza
      </button>
    </div>
  );
};

export default Profile;
