import { Item } from "../tree";
import { getRowForItem } from "./item";

export let selectedItem: Item | undefined = undefined;

export function selectItem(item: Item | undefined) {
  if (!item) return;

  if (selectedItem) {
    getRowForItem(selectedItem)?.classList.remove("selected");
  }

  selectedItem = item;
  getRowForItem(selectedItem)?.classList.add("selected");
}
