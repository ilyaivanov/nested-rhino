import { Item } from "../tree";

export let selectedItem: Item | undefined = undefined;

export function selectItem(item: Item | undefined) {
  if (!item) return;

  if (selectedItem) {
    document.getElementById(selectedItem.id)?.classList.remove("selected");
  }

  selectedItem = item;
  document.getElementById(selectedItem.id)?.classList.add("selected");
}
