import {
  Item,
  createItemAfter,
  createItemAsFirstChild,
  getItemLevel,
} from "../tree";
import { viewItem } from "../view";
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
  document
    .getElementById(parent.id)
    ?.insertAdjacentElement(
      "afterbegin",
      viewItem(newItem, getItemLevel(newItem))
    );

  selectItem(newItem);
  startEdit(newItem);
}
