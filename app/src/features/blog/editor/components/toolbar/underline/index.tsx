import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { MdFormatUnderlined } from "react-icons/md";

const Underline = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
      }}
      className="rounded-lg bg-zinc-100 p-1 hover:bg-zinc-200"
      type="button"
    >
      <MdFormatUnderlined className="h-7 w-7" />
    </button>
  );
};

export default Underline;
