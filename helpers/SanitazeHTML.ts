import { DomUtils, parseDocument } from "htmlparser2";

export const removeTagsAndClasses = (
  html: string,
  tagsToRemove: string[],
  classesToRemove: string[],
  idsToRemove: string[]
): string => {
  const document = parseDocument(html, {
    lowerCaseTags: true,
    lowerCaseAttributeNames: true,
  });

  const traverse = (node: any): void => {
    if (node.children) {
      node.children = node.children.filter((child: any) => {
        if (child.type === "tag") {
          const shouldRemoveTag = tagsToRemove.includes(child.name);

          const shouldRemoveClass =
            child.attribs &&
            child.attribs.class &&
            classesToRemove.some((cls) =>
              child.attribs.class.split(" ").includes(cls)
            );

          const shouldRemoveId =
            child.attribs &&
            child.attribs.id &&
            idsToRemove.includes(child.attribs.id);

          if (shouldRemoveTag || shouldRemoveClass || shouldRemoveId) {
            return false;
          }
        }
        traverse(child);
        return true;
      });
    }
  };

  traverse(document);

  return DomUtils.getOuterHTML(document);
};
