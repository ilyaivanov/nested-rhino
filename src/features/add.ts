import {
  Item,
  createItemAfter,
  createItemAsFirstChild,
  getItemLevel,
} from "../tree";
import { getChildrenElem, viewItem } from "../view";
import { startEdit } from "./edit";
import { getRowForItem } from "./item";
import { selectItem } from "./selection";

export function addNewItemAfter(itemAfterToInsert: Item) {
  const newItem = createItemAfter(itemAfterToInsert);

  getRowForItem(itemAfterToInsert)?.insertAdjacentElement(
    "afterend",
    viewItem(newItem, getItemLevel(newItem))
  );

  selectItem(newItem);
  startEdit(newItem);
}

export function createItemAndAddAsFirstChild(parent: Item) {
  const newItem = createItemAsFirstChild(parent);

  const children = getChildrenElem(parent);
  children.appendChild(viewItem(newItem, getItemLevel(newItem)));

  selectItem(newItem);
  startEdit(newItem);
}
