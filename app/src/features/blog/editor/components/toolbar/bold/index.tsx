import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { MdFormatBold } from "react-icons/md";

const Bold = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      }}
      className="mr-4 rounded-lg bg-zinc-100 p-1 hover:bg-zinc-200"
      type="button"
    >
      <MdFormatBold className="h-7 w-7" />
    </button>
  );
};

export default Bold;
