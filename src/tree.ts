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

export function getItemAbove(item: Item) {
  const context = getContext(item);
  return context[context.indexOf(item) - 1];
}

export function getItemBelow(item: Item) {
  const context = getContext(item);
  return context[context.indexOf(item) + 1];
}
export function removeItem(item: Item) {
  const context = getContext(item);
  context.splice(context.indexOf(item), 1);
}

export function moveItemDown(item: Item) {
  const context = getContext(item);
  const index = context.indexOf(item);
  if (index < context.length - 1) {
    context.splice(index, 1);
    context.splice(index + 1, 0, item);
    return true;
  }
  return false;
}

export function moveItemUp(item: Item) {
  const context = getContext(item);
  const index = context.indexOf(item);
  if (index > 0) {
    context.splice(index, 1);
    context.splice(index - 1, 0, item);
    return true;
  }
  return false;
}

export function insertAfter(item: Item, newItem: Item) {
  const context = getContext(item);
  context.splice(context.indexOf(item) + 1, 0, newItem);
  newItem.parent = item.parent;
}

function getContext(item: Item) {
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
