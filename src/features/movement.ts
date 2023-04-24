import {
  Item,
  getContext,
  getItemLevel,
  insertAsLastChild,
  insertItemAfter,
} from "../tree";
import {
  appendChildElement,
  createChildren,
  getIcon,
  insertViewAfterItem,
  viewChildren,
} from "../view";
import { getRowForItem } from "./item";
import { getPreviousSibling } from "./selection";

export function moveItemDown(item: Item) {
  const context = getContext(item);
  const index = context.indexOf(item);
  if (index < context.length - 1) {
    context.splice(index, 1);
    context.splice(index + 1, 0, item);
    moveItemDownEffect(item);
  }
}

export function moveItemUp(item: Item) {
  const context = getContext(item);
  const index = context.indexOf(item);
  if (index > 0) {
    context.splice(index, 1);
    context.splice(index - 1, 0, item);
    moveItemUpEffect(item);
  }
}

export function moveItemRight(item: Item) {
  const previousSibling = getPreviousSibling(item);
  if (previousSibling) {
    // Tree
    insertAsLastChild(previousSibling, item);

    const row = getRowForItem(item);
    // UI
    if (previousSibling.isOpen) {
      appendChildElement(previousSibling, row);
    } else {
      previousSibling.isOpen = true;
      // we already added the item
      if (previousSibling.children.length == 1) {
        createChildren(previousSibling, row);
      } else {
        createChildren(
          previousSibling,
          viewChildren(previousSibling, getItemLevel(previousSibling))
        );
      }
      getIcon(previousSibling).classList.remove("empty");
    }
  }
}

export function moveItemLeft(item: Item) {
  const parent = item.parent;
  if (parent) {
    // Tree
    insertItemAfter(parent, item);

    // UI
    insertViewAfterItem(parent, getRowForItem(item));

    if (parent.children.length == 0) getIcon(parent).classList.add("empty");
  }
}

function moveItemDownEffect(item: Item) {
  const row = getRowForItem(item);
  if (row)
    (row.nextSibling as HTMLElement).insertAdjacentElement("afterend", row);
}

function moveItemUpEffect(item: Item) {
  const row = getRowForItem(item);
  if (row)
    (row.previousSibling as HTMLElement).insertAdjacentElement(
      "beforebegin",
      row
    );
}
