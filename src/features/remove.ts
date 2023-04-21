import { Item, getContext } from "../tree";
import { getRowForItem } from "./item";
import { getItemToSelectAfterRemovingSelected, selectItem } from "./selection";

export function removeItem(item: Item) {
  selectItem(getItemToSelectAfterRemovingSelected());

  const context = getContext(item);
  context.splice(context.indexOf(item), 1);

  getRowForItem(item)?.remove();
}
