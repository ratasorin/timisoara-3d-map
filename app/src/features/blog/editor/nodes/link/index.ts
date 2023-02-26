import type { SerializedAutoLinkNode } from "@lexical/link";
import { AutoLinkNode } from "@lexical/link";
import type { EditorConfig, LexicalNode } from "lexical";

export class StyledLink extends AutoLinkNode {
  static getType() {
    return "styled-link";
  }

  createDOM(config: EditorConfig): HTMLAnchorElement {
    const a = super.createDOM(config);
    const className = "text-blue-500 underline";
    a.classList.add(...className.split(" "));
    return a;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "styled-link",
    } as unknown as SerializedAutoLinkNode;
  }
}

export const $isStyledLink = (node: LexicalNode) => node instanceof StyledLink;
export const $createStyledLink = (node: AutoLinkNode) =>
  new StyledLink(node.getURL(), {
    rel: node.getRel(),
    target: node.getTarget(),
  });
