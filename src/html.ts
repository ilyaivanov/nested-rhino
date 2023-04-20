export function div(props: Props) {
  return assignCommonProperties(document.createElement("div"), props);
}

export function span(props: Props) {
  return assignCommonProperties(document.createElement("span"), props);
}

type InputProps = Props & {
  onInput: (e: Event) => void;
};
export function input(props: InputProps) {
  const res = document.createElement("input");
  res.addEventListener("input", props.onInput);
  return assignCommonProperties(res, props);
}

type Props = {
  children?: (Node | string)[] | string;
  style?: {};
  className?: string;
  id?: string;
};
function assignCommonProperties<T extends HTMLElement>(
  elem: T,
  props: Props
): T {
  if (props.className) elem.className = props.className;
  if (props.id) elem.id = props.id;

  const { children } = props;
  if (children) {
    if (typeof children === "string") elem.textContent = children;
    else for (const child of children) elem.append(child);
  }

  if (props.style) Object.assign(elem.style, props.style);

  return elem;
}
