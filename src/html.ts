type Props = {
  children?: (Node | string)[] | string;
  className?: string;
  id?: string;
};
export function div(props: Props) {
  const res = document.createElement("div");

  if (props.className) res.className = props.className;
  if (props.id) res.id = props.id;

  const { children } = props;
  if (children) {
    if (typeof children === "string") res.textContent = children;
    else for (const child of children) res.append(child);
  }

  return res;
}
