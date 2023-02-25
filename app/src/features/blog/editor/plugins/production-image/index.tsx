import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import type { LexicalCommand } from "lexical";
import { ElementNode } from "lexical";
import { $getRoot } from "lexical";
import { $insertNodes, createCommand } from "lexical";
import { $createImageNode, ImageNode } from "library/lexical/nodes/image";
import { useEffect } from "react";

export const INSERT_IMAGE_COMMAND: LexicalCommand<string> = createCommand(
  "INSERT_IMAGE_COMMAND"
);

export const REPLACE_URL_COMMAND: LexicalCommand<{
  oldUrl: string;
  newUrl: string;
}> = createCommand("REPLACE_URL_COMMAND");

const findOldImageNode = (
  root: ElementNode,
  oldUrl: string
): null | ImageNode => {
  const children = root.getChildren<ElementNode>();

  let image = children.find(
    (child) => child instanceof ImageNode && child.getSrc() === oldUrl
  ) as unknown as ImageNode | null;

  if (image) return image;

  image =
    children
      .filter((child) => child instanceof ElementNode)
      .map((root) => findOldImageNode(root, oldUrl))
      .find((node) => node !== null) || null;

  return image;
};

const ProductionImagesPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeInsertImageListener = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        editor.update(() => {
          $insertNodes([$createImageNode({ altText: "", src: payload })]);
        });

        return true;
      },
      0
    );
    const removeReplaceImageListener = editor.registerCommand(
      REPLACE_URL_COMMAND,
      ({ newUrl, oldUrl }) => {
        editor.update(() => {
          const root = $getRoot();
          const oldImageNode = findOldImageNode(root, oldUrl);

          if (!oldImageNode) return;

          oldImageNode.setSrc(newUrl);
        });

        return true;
      },
      0
    );

    return () => {
      removeReplaceImageListener();
      removeInsertImageListener();
    };
  }, [editor]);

  return null;
};

export default ProductionImagesPlugin;
