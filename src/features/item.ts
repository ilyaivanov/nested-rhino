import { Item } from "../tree";

// Move this to view
export function getRowForItem(item: Item): HTMLElement {
  const res = document.getElementById(item.id);
  if (!res) throw new Error(`Can't find Item ${item.text} in the DOM`);
  return res;
}

export function getItemChildrenContainer(item: Item) {
  const itemContainer = getRowForItem(item);
  if (itemContainer) {
    const container =
      itemContainer.getElementsByClassName("children-container")[0];
    if (container) return container as HTMLElement;

    console.error(
      `Can't find children with class 'children-container' on`,
      itemContainer
    );
    throw new Error(`^^^^^^^^^^`);
  }
  throw new Error(`Can't find Item ${item.text} in the DOM`);
}

export function getItemChildrenContainerMaybe(item: Item) {
  const itemContainer = getRowForItem(item);
  if (itemContainer) {
    const container =
      itemContainer.getElementsByClassName("children-container")[0];
    if (container) return container as HTMLElement;
  }
}
