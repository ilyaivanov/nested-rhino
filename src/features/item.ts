import { Item } from "../tree";

export function getRowForItem(item: Item): HTMLElement | undefined {
  return document.getElementById(item.id) || undefined;
}
