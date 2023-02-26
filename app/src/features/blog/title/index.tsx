import type { FunctionComponent } from "react";

const Title: FunctionComponent<{
  readonly: boolean;
  title: string | undefined;
}> = ({ readonly, title }) => {
  return (
    <input
      disabled={readonly}
      type="text"
      placeholder="Alege un titlu"
      required
      name="title"
      defaultValue={title}
      className="flex-1 rounded-xl p-2 text-xl"
    />
  );
};

export default Title;
