import { getItemChildrenContainer, getRowForItem } from "./features/item";
import { div, span } from "./html";
import { Item, getItemLevel } from "./tree";
import { appendOneItem } from "./utils";
import "./view.scss";

export function renderApp(root: Item) {
  return div({
    id: root.id,
    children: root.children.map((item) => viewItem(item, 0)),
  });
}

export function viewItem(item: Item, level: number): HTMLElement {
  return div({
    id: item.id,
    children: [
      div({
        className: rowClass(level),
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
  return createChildrenContainer(
    appendOneItem(
      item.children.map((item) => viewItem(item, level + 1)),
      childrenLine(level)
    )
  );
}

function rowClass(level: number) {
  return `row row-${level}`;
}

function childrenLine(level: number) {
  return div({ className: `children-line children-line-${level}` });
}

function createChildrenContainer(children?: HTMLElement[]) {
  return div({ children, className: "children-container" });
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////// ACTIONS /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export function appendChildElement(parent: Item, view: HTMLElement) {
  getItemChildrenContainer(parent).appendChild(view);

  const level = getItemLevel(parent);
  incrementPostfixes(view, "row", level + 1);
  incrementPostfixes(view, "children-line", level + 1);
}

export function createChildren(parent: Item, view: HTMLElement) {
  const previousItemRow = getRowForItem(parent);
  const level = getItemLevel(parent);

  const childrenContainer = createChildrenContainer();
  childrenContainer.appendChild(view);
  previousItemRow.appendChild(childrenContainer);
  childrenContainer.appendChild(childrenLine(level));

  incrementPostfixes(view, "row", level + 1);
  incrementPostfixes(view, "children-line", level + 1);
}

export function insertViewAfterItem(item: Item, view: HTMLElement) {
  const level = getItemLevel(item);

  const viewAfterWhichToInsert = getRowForItem(item);
  viewAfterWhichToInsert.insertAdjacentElement("afterend", view);

  console.log(viewAfterWhichToInsert);

  incrementPostfixes(view, "row", level);
  incrementPostfixes(view, "children-line", level);
}

// traverse and increment all row-1 to row-2, row-2 to row-3, etc
// assumes .row and .row-1 are present on an element
function incrementPostfixes(
  elem: HTMLElement,
  prefix: string,
  baseLevel: number
) {
  elem.querySelectorAll("." + prefix).forEach((el) => {
    el.classList.forEach((c) => {
      if (c.startsWith(prefix + "-")) {
        el.classList.remove(c);
        el.classList.add(prefix + "-" + baseLevel);
      }
    });
  });
}
