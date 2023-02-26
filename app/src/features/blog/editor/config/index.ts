import type { CreateEditorArgs } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HashtagNode } from "@lexical/hashtag";
import { ImageNode } from "library/lexical/nodes/image";
import { StyledLink } from "../nodes/link";

export const editorConfig: CreateEditorArgs = {
  theme: {
    root: "p-4 border-zinc-400 border-2 rounded-lg focus:outline-none h-full focus-visible:border-black root overflow-y-auto",
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
};
