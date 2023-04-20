import { div, span } from "./html";
import { Item } from "./tree";
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
      item.children.length > 0
        ? div({
            className: "children-container",
            children: appendOneItem(
              item.children.map((item) => viewItem(item, level + 1)),
              div({ className: `children-line children-line-${level}` })
            ),
          })
        : undefined,
    ],
  });
}

export function renderApp(root: Item) {
  return div({
    id: root.id,
    children: root.children.map((item) => viewItem(item, 0)),
  });
}

function appendOneItem<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}
