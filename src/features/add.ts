import { Item, getContext, item } from "../tree";
import { viewItem } from "../view";
import { startEdit } from "./edit";
import { selectItem } from "./selection";

export function addNewItemAfter(itemAfterToInsert: Item) {
  const newItem = item("");

  const context = getContext(itemAfterToInsert);
  context.splice(context.indexOf(itemAfterToInsert) + 1, 0, newItem);
  newItem.parent = itemAfterToInsert.parent;

  document
    .getElementById(itemAfterToInsert.id)
    ?.insertAdjacentElement("afterend", viewItem(newItem));

  selectItem(newItem);
  startEdit(newItem);
}
