import { Item, getContext, getItemAbove, getItemBelow } from "../tree";
import { getRowForItem } from "./item";
import { selectItem } from "./selection";

export function removeItem(item: Item) {
  const nextItemToSelect = getItemAbove(item) || getItemBelow(item);

  const context = getContext(item);
  context.splice(context.indexOf(item), 1);

  getRowForItem(item)?.remove();

  selectItem(nextItemToSelect);
}
