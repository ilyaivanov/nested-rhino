import { Item, getContext, getItemAbove, getItemBelow } from "../tree";
import { selectItem } from "./selection";

export function removeItem(item: Item) {
  const nextItemToSelect = getItemAbove(item) || getItemBelow(item);

  const context = getContext(item);
  context.splice(context.indexOf(item), 1);

  document.getElementById(item.id)?.remove();

  selectItem(nextItemToSelect);
}
