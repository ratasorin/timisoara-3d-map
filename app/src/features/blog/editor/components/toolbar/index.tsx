import Bold from "./bold";
import Italic from "./italic";
import InsertImage from "./insert-image";
import Underline from "./underline";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { MdRedo, MdUndo } from "react-icons/md";

export const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <div className="mb-4 mt-2 w-full flex-1 space-y-2">
      <Bold />
      <Italic />
      <Underline />
      <InsertImage />
      <span className="ml-4 inline-block">
        <button
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          type="button"
          className="mr-2 rounded-lg bg-zinc-100 p-1 hover:bg-zinc-200"
        >
          <MdUndo className="h-7 w-7" />
        </button>
        <button
          type="button"
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className="rounded-lg bg-zinc-100 p-1 hover:bg-zinc-200"
        >
          <MdRedo className="h-7 w-7" />
        </button>
      </span>
    </div>
  );
};
