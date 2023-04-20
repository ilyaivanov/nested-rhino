import { generateRandomId } from "./utils";

export type Item = {
  text: string;
  id: string;
  children: Item[];
  isOpen: boolean;
  parent?: Item;
};

export function item(text: string, children: Item[] = []): Item {
  const res: Item = {
    text,
    id: generateRandomId(),
    children: children,
    isOpen: children.length > 0,
  };
  if (children) for (const child of children) child.parent = res;
  return res;
}

export function getItemLevel(item: Item) {
  let level = 0;
  let i: Item | undefined = item;
  while (i && i.parent && !isRoot(i.parent)) {
    i = i.parent;
  }
  return level;
}

export function createItemAfter(itemAfterToInsert: Item): Item {
  const newItem = item("");

  const context = getContext(itemAfterToInsert);
  context.splice(context.indexOf(itemAfterToInsert) + 1, 0, newItem);
  newItem.parent = itemAfterToInsert.parent;
  return newItem;
}
export function createItemAsFirstChild(parent: Item): Item {
  const newItem = item("");

  parent.children.unshift(newItem);
  newItem.parent = parent;
  return newItem;
}

export function getContext(item: Item) {
  if (item.parent) {
    const context = item.parent.children;

    if (!context)
      throw new Error(
        `'${item.text}' references a parent '${item.parent.text}' without children`
      );
    return context;
  }
  throw new Error(
    `Attempt to get context from '${item.text}' which doesn't have a parent`
  );
}

export function isRoot(item: Item) {
  return !item.parent;
}
