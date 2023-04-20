import { Item, createItemAfter } from "../tree";
import { viewItem } from "../view";
import { startEdit } from "./edit";
import { selectItem } from "./selection";

export function addNewItemAfter(itemAfterToInsert: Item) {
  const newItem = createItemAfter(itemAfterToInsert);

  document
    .getElementById(itemAfterToInsert.id)
    ?.insertAdjacentElement("afterend", viewItem(newItem));

  selectItem(newItem);
  startEdit(newItem);
}
