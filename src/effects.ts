import { Item } from "./tree";

export function itemRemoved(item: Item) {
  const row = document.getElementById(item.id);
  if (row) row.remove();
}

export function addItemAfter(item: Item, elem: HTMLElement) {
  const row = document.getElementById(item.id);
  if (row) row.insertAdjacentElement("afterend", elem);
}

export function moveItemDownEffect(item: Item) {
  const row = document.getElementById(item.id);
  if (row)
    (row.nextSibling as HTMLElement).insertAdjacentElement("afterend", row);
}

export function moveItemUpEffect(item: Item) {
  const row = document.getElementById(item.id);
  if (row)
    (row.previousSibling as HTMLElement).insertAdjacentElement(
      "beforebegin",
      row
    );
}
