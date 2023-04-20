import { Item, getItemAbove, getItemBelow } from "../tree";
import { getRowForItem } from "./item";

export let selectedItem: Item | undefined = undefined;

export function selectItem(item: Item | undefined) {
  if (selectedItem) {
    getRowForItem(selectedItem)?.classList.remove("selected");
  }

  selectedItem = item;
  if (selectedItem) getRowForItem(selectedItem)?.classList.add("selected");
}

export function goDown() {
  if (selectedItem) {
    const itemBelow = getItemBelow(selectedItem);
    itemBelow && selectItem(itemBelow);
  }
}

export function goUp() {
  if (selectedItem) {
    const itemAbove = getItemAbove(selectedItem);
    itemAbove && selectItem(itemAbove);
  }
}
