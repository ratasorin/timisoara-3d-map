import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { MATCHERS } from "./utils/matchers";
import ProductionImagesPlugin from "./plugins/production-image";
import DragImagesPlugin from "library/lexical/plugins/image";
import { Toolbar } from "./components/toolbar";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useSetAtom } from "jotai";
import { editorStateAtom } from "./context";
import type { EditorState } from "lexical";
import { $getRoot } from "lexical";
import { ClientOnly } from "~/src/utils/client-only";
import type { FunctionComponent } from "react";
import { editorConfig } from "./config";

interface EditorProps {
  readonly: boolean;
  editorState: EditorState | undefined;
}

function Editor({ editorState, readonly }: EditorProps) {
  const setEditorState = useSetAtom(editorStateAtom);
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editorState: editorState,
        editable: !readonly,
        namespace: "editor",
        onError: (error) => {
          console.error(error);
        },
      }}
    >
      <div className="flex h-full flex-col font-mono">
        {!readonly && <Toolbar />}
        <RichTextPlugin
          contentEditable={<ContentEditable className="h-full" />}
          placeholder={<div />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <LinkPlugin />
        <HistoryPlugin />
        <AutoLinkPlugin matchers={MATCHERS} />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <ProductionImagesPlugin />
        <DragImagesPlugin />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            editorState.read(() => {
              const root = $getRoot();
              const text = root.getTextContent();
              console.log({ text });
              setEditorState({
                richContent: editorState.toJSON(),
                textContent: text,
              });
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}

export const ClientEditor: FunctionComponent<EditorProps> = ({
  editorState,
  readonly,
}) => {
  return (
    <ClientOnly>
      <Editor editorState={editorState} readonly={readonly} />
    </ClientOnly>
  );
};

export default ClientEditor;
