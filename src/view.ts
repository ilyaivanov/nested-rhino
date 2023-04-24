import { getItemChildrenContainer, getRowForItem } from "./features/item";
import { appendAll, div, span } from "./html";
import { Item, getItemLevel } from "./tree";
import { appendOneItem } from "./utils";
import "./view.scss";

export function renderApp(root: Item) {
  return viewChildren(root, 0);
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
          span({
            id: item.id + "-text",
            className: "row-text",
            children: item.text,
          }),
        ],
      }),
      item.isOpen ? viewChildren(item, level + 1) : undefined,
    ],
  });
}

export function getChildrenElem(item: Item) {
  const res = document.getElementById(item.id + "-children");
  return assertNotUndefined(res, `${item.text} children container`);
}

export function viewChildren(item: Item, level: number) {
  const children = item.children.map((item) => viewItem(item, level));
  const container = createChildrenContainer(item);
  return appendAll(
    container,
    level > 0 ? appendOneItem(children, childrenLine(level - 1)) : children
  );
}

function rowClass(level: number) {
  return `row row-${level}`;
}

function childrenLine(level: number) {
  return div({ className: `children-line children-line-${level}` });
}

function createChildrenContainer(item: Item) {
  return div({ id: item.id + "-children", className: "children-container" });
}

export function getDirectChildrenTextsForItem(item: Item) {
  return item.children.map((child) => {
    const res = document.getElementById(child.id + "-text");
    if (!res)
      throw new Error(`Can't find ${item.id}-text element for ${item.text} `);
    return res;
  });
}

export function getIcon(item: Item) {
  return getRowForItem(item).children[0].children[0];
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

export function createChildren(parent: Item, view: Element) {
  const previousItemRow = getRowForItem(parent);
  const level = getItemLevel(parent);

  const childrenContainer = createChildrenContainer(parent);
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
function incrementPostfixes(elem: Element, prefix: string, baseLevel: number) {
  elem.querySelectorAll("." + prefix).forEach((el) => {
    el.classList.forEach((c) => {
      if (c.startsWith(prefix + "-")) {
        el.classList.remove(c);
        el.classList.add(prefix + "-" + baseLevel);
      }
    });
  });
}

function assertNotUndefined<T>(
  value: T | undefined | null,
  def: string = ""
): T {
  if (value === undefined || value === null)
    throw new Error(
      `Expected to ${
        def || "value"
      } not to be undefined or undefined, got ${value}.`
    );

  return value;
}
