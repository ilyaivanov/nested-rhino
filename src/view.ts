import { div, span } from "./html";
import { Item } from "./tree";
import "./view.scss";

export function viewItem(item: Item) {
  return div({
    id: item.id,
    className: `row`,
    children: [
      div({ className: "icon" }),
      span({ className: "row-text", children: item.text }),
    ],
  });
}

export function renderApp(root: Item) {
  return div({
    id: root.id,
    children: root.children.map(viewItem),
  });
}
