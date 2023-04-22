import { Item, getContext, isRoot } from "../tree";
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

export function getItemToSelectAfterRemovingSelected() {
  if (selectedItem)
    return getItemAbove(selectedItem) || getFollowingSibling(selectedItem);
}

export const getItemAbove = (item: Item): Item | undefined => {
  const parent = item.parent;
  if (parent) {
    const index = parent.children.indexOf(item);
    if (index > 0) {
      const previousItem = parent.children[index - 1];
      if (previousItem.isOpen)
        return getLastNestedItem(
          previousItem.children[previousItem.children.length - 1]
        );
      return getLastNestedItem(previousItem);
    } else if (!isRoot(parent)) return parent;
  }
};

function getItemBelow(item: Item) {
  return item.isOpen && item.children.length > 0
    ? item.children[0]
    : getFollowingItem(item);
}

const getFollowingItem = (item: Item): Item | undefined => {
  const followingItem = getFollowingSibling(item);
  if (followingItem) return followingItem;
  else {
    let parent = item.parent;
    while (parent && isLast(parent)) {
      parent = parent.parent;
    }
    if (parent) return getFollowingSibling(parent);
  }
};

const getFollowingSibling = (item: Item): Item | undefined =>
  getRelativeSibling(item, (currentIndex) => currentIndex + 1);

export const getPreviousSibling = (item: Item): Item | undefined =>
  getRelativeSibling(item, (currentIndex) => currentIndex - 1);

const getRelativeSibling = (
  item: Item,
  getNextItemIndex: (itemIndex: number) => number
): Item | undefined => {
  const context = item.parent?.children;
  if (context) {
    const index = context.indexOf(item);
    return context[getNextItemIndex(index)];
  }
};

const isLast = (item: Item): boolean => !getFollowingSibling(item);

const getLastNestedItem = (item: Item): Item => {
  if (item.isOpen && item.children) {
    const { children } = item;
    return getLastNestedItem(children[children.length - 1]);
  }
  return item;
};
