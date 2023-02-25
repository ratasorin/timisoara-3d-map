import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { MdFormatItalic } from "react-icons/md";

const Italic = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      onClick={() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      }}
      type="button"
      className="mr-4 rounded-lg bg-zinc-100 p-1 hover:bg-zinc-200"
    >
      <MdFormatItalic className="h-7 w-7" />
    </button>
  );
};

export default Italic;
