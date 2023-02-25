import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useMutation } from "@tanstack/react-query";
import {
  $getRoot,
  COMMAND_PRIORITY_HIGH,
  DELETE_CHARACTER_COMMAND,
} from "lexical";
import { ImageNode } from "library/lexical/nodes/image";
import { useEffect, useRef } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {
  INSERT_IMAGE_COMMAND,
  REPLACE_URL_COMMAND,
} from "../../../plugins/production-image";

const Bold = () => {
  const [editor] = useLexicalComposerContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation((file: File) => {
    const form = new FormData();
    form.set("blog-image", file);
    return fetch("/api/blogs/upload", {
      body: form,
      method: "POST",
    });
  });

  useEffect(() => {
    const unsubscribe = editor.registerCommand(
      DELETE_CHARACTER_COMMAND,
      () => {
        const deleted = $getRoot().getLastDescendant();
        if (deleted instanceof ImageNode) {
          // delete in-memory files
          const input = inputRef.current;
          if (!input) return false;
          try {
            //@ts-ignore
            input.value = null;
          } catch (err) {
            input.value = "";
          } finally {
            return false;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );

    return () => unsubscribe();
  }, [editor]);

  return (
    <>
      <button
        onClick={() => {
          inputRef.current?.click();
        }}
        type="button"
        className="ml-4 rounded-lg bg-zinc-100 p-1 hover:bg-zinc-200"
      >
        <MdOutlineAddPhotoAlternate className="h-7 w-7" />
      </button>
      <input
        ref={inputRef}
        onChange={(event) => {
          const files = event.currentTarget.files;
          if (!files) return;

          const file = files[0];
          if (!file) return;

          const url = URL.createObjectURL(file);
          editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
          mutation.mutate(file, {
            onSuccess: async (data, file, context) => {
              const key = await data.json();
              editor.dispatchCommand(REPLACE_URL_COMMAND, {
                newUrl: `/resources/${key}`,
                oldUrl: url,
              });
            },
          });
        }}
        accept=".jpg, .jpeg .png, .svg, .webp"
        type="file"
        className="hidden"
      />
    </>
  );
};

export default Bold;
