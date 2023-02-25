import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { StyledLink } from "./nodes/link";
import { MATCHERS } from "./utils/matchers";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ImageNode } from "library/lexical/nodes/image";
import ProductionImagesPlugin from "./plugins/production-image";
import DragImagesPlugin from "library/lexical/plugins/image";
import { HashtagNode } from "@lexical/hashtag";
import { Toolbar } from "./components/toolbar";

export default function Editor() {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "editor",
        onError(error: any) {
          throw error;
        },
        theme: {
          root: "p-4 border-zinc-400 border-2 rounded focus:outline-none h-full focus-visible:border-black root overflow-y-scroll",
          link: "cursor-pointer",
          text: {
            bold: "font-semibold",
            underline: "underline",
            italic: "italic",
            strikethrough: "line-through",
            underlineStrikethrough: "underlined-line-through",
          },
        },
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          CodeNode,
          CodeHighlightNode,
          TableNode,
          TableCellNode,
          TableRowNode,
          StyledLink,
          HashtagNode,
          LinkNode,
          ImageNode,
          {
            replace: AutoLinkNode,
            with: (node: AutoLinkNode) =>
              new StyledLink(node.__url, {
                rel: node.__rel,
                target: node.__target,
              }),
          },
        ],
      }}
    >
      <div className="flex h-full flex-col font-mono">
        <Toolbar />
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
      </div>
    </LexicalComposer>
  );
}
