import { Item, createItemAfter } from "../tree";
import { viewItem } from "../view";
import { startEdit } from "./edit";
import { getRowForItem } from "./item";
import { selectItem } from "./selection";

export function addNewItemAfter(itemAfterToInsert: Item) {
  const newItem = createItemAfter(itemAfterToInsert);

  getRowForItem(itemAfterToInsert)?.insertAdjacentElement(
    "afterend",
    viewItem(newItem)
  );

  selectItem(newItem);
  startEdit(newItem);
}
