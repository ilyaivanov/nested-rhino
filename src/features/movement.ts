import { Item, getContext } from "../tree";

export function moveItemDown(item: Item) {
  const context = getContext(item);
  const index = context.indexOf(item);
  if (index > 0) {
    context.splice(index, 1);
    context.splice(index + 1, 0, item);
    moveItemDownEffect(item);
  }
}

export function moveItemUp(item: Item) {
  const context = getContext(item);
  const index = context.indexOf(item);
  if (index > 0) {
    context.splice(index, 1);
    context.splice(index - 1, 0, item);
    moveItemUpEffect(item);
  }
}

function moveItemDownEffect(item: Item) {
  const row = document.getElementById(item.id);
  if (row)
    (row.nextSibling as HTMLElement).insertAdjacentElement("afterend", row);
}

function moveItemUpEffect(item: Item) {
  const row = document.getElementById(item.id);
  if (row)
    (row.previousSibling as HTMLElement).insertAdjacentElement(
      "beforebegin",
      row
    );
}
