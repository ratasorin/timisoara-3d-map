export const getFileExtension = (filename?: string) => {
  if (!filename) throw new Error("There was an error! The file has no name");

  const hasExtension = filename.includes(".");
  if (!hasExtension)
    throw new Error(
      "There was an error! One of the files didn't have any extension!"
    );

  const extension = filename.split(".").reverse()[0];
  if (extension === "")
    throw new Error(
      "The extension is undefined! Please add an extension after `.`"
    );

  return extension;
};
