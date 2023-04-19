export type Item = {
  text: string;
  id: string;
  children?: Item[];
  parent?: Item;
};

export function item(text: string, children?: Item[]): Item {
  const res = { text, id: Math.random() + "", children };
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
