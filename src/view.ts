import { div, span } from "./html";
import { Item } from "./tree";
import { appendOneItem } from "./utils";
import "./view.scss";

export function viewItem(item: Item, level: number): Element {
  return div({
    id: item.id,
    children: [
      div({
        className: `row row-${level}`,
        children: [
          div({
            className: `icon ${item.children.length == 0 ? "empty" : ""}`,
          }),
          span({ className: "row-text", children: item.text }),
        ],
      }),
      item.isOpen ? viewChildren(item, level) : undefined,
    ],
  });
}

export function viewChildren(item: Item, level: number) {
  return div({
    className: "children-container",
    children: appendOneItem(
      item.children.map((item) => viewItem(item, level + 1)),
      div({ className: `children-line children-line-${level}` })
    ),
  });
}

export function renderApp(root: Item) {
  return div({
    id: root.id,
    children: root.children.map((item) => viewItem(item, 0)),
  });
}
