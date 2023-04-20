import { generateRandomId } from "./utils";

export type Item = {
  text: string;
  id: string;
  children: Item[];
  parent?: Item;
};

export function item(text: string, children?: Item[]): Item {
  const res: Item = {
    text,
    id: generateRandomId(),
    children: children || [],
    //
  };
  if (children) for (const child of children) child.parent = res;
  return res;
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

export function getItemAbove(item: Item) {
  const context = getContext(item);
  return context[context.indexOf(item) - 1];
}

export function getItemBelow(item: Item) {
  const context = getContext(item);
  return context[context.indexOf(item) + 1];
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
