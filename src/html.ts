type Props = {
  children?: (Node | string)[] | string;
  class?: string;
};
export function div(props: Props) {
  const res = document.createElement("div");

  if (props.class) res.className = props.class;

  const { children } = props;
  if (children) {
    if (typeof children === "string") res.textContent = children;
    else for (const child of children) res.append(child);
  }

  return res;
}
