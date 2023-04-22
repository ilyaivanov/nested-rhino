import { Item, getContext, insertAsLastChild, insertItemAfter } from "../tree";
import {
  appendChildElement,
  createChildren,
  insertViewAfterItem,
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

    // UI
    if (previousSibling.isOpen) {
      appendChildElement(previousSibling, getRowForItem(item));
    } else {
      previousSibling.isOpen = true;
      createChildren(previousSibling, getRowForItem(item));
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
