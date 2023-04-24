import { getRowForItem } from "../features/item";
import { selectItem } from "../features/selection";
import { Item } from "../tree";
import {
  getChildrenElem,
  getDirectChildrenTextsForItem,
  getIcon,
} from "../view";

export const expect = {
  selectedItem: function (itemName: string) {
    const item = findByName(itemName);
    if (!item) error(`Can't find item with the name '${itemName}'`);
    else {
      const row = getRowForItem(item);
      if (!row) {
        error(`Can't find element for the item '${itemName}'`);
      } else {
        hasClass(
          row,
          "selected",
          `Expected ${itemName} to be selected, but it wasn't`
        );
      }
    }
  },

  //To remove this
  rootChildren: function (names: string[]) {
    const model = window.root.children.map((c) => c.text);
    arrayEqual(names, model, "Failed to verify Model elements");

    const texts = getDirectChildrenTextsForItem(window.root);
    expectElementsHaveContent(
      texts,
      names,
      "Failed to verify Root children element"
    );
  },

  directChildren: function (parentItemName: string, names: string[]) {
    const row = findByName(parentItemName);
    const texts = getDirectChildrenTextsForItem(row);
    expectElementsHaveContent(
      texts,
      names,
      `Failed to verify ${parentItemName} children element`
    );
  },

  emptyBoard: function () {
    const childsElem = getChildrenElem(window.root);
    if (childsElem.children.length > 0) {
      console.error(
        "Expected the root element to be empty, but found:",
        childsElem.children
      );
      throw new Error(`^^^^^^^^^^^^^`);
    }
  },

  iconToBeFull: (itemName: string) => {
    const icon = getIcon(findByName(itemName));
    if (icon.classList.contains("empty")) {
      console.error("Expected icon to be full", icon);
      throw new Error("^");
    }
  },
  iconToBeEmpty: (itemName: string) => {
    const icon = getIcon(findByName(itemName));
    if (!icon.classList.contains("empty")) {
      console.error("Expected icon to be empty", icon);
      throw new Error("^");
    }
  },

  hasNoChildrenVisible: (itemName: string) => {
    const child = document.getElementById(
      findByName(itemName).id + "-children"
    );
    if (child) {
      console.error(
        `Expected ${itemName} not to have children, but got`,
        child
      );
      throw new Error("^");
    }
  },
  noSelectedItem: () =>
    isUndefined(selectItem, "Expected the selected item to be undefined"),
};

export const act = {
  arrowDown: () => dispatchKeyDown("ArrowDown"),

  arrowUp: () => dispatchKeyDown("ArrowUp"),

  arrowLeft: () => dispatchKeyDown("ArrowLeft"),

  arrowRight: () => dispatchKeyDown("ArrowRight"),

  startEdit: () => dispatchKeyDown("KeyE"),

  finishEdit: () => dispatchKeyDown("Enter"),

  createNewItem: () => dispatchKeyDown("Enter"),

  deleteItem: () => dispatchKeyDown("KeyX"),

  moveItemDown: () =>
    dispatchKeyDown("ArrowDown", { metaKey: true, shiftKey: true }),

  moveItemUp: () =>
    dispatchKeyDown("ArrowUp", { metaKey: true, shiftKey: true }),
  moveItemRight: () =>
    dispatchKeyDown("ArrowRight", { metaKey: true, shiftKey: true }),
  moveItemLeft: () =>
    dispatchKeyDown("ArrowLeft", { metaKey: true, shiftKey: true }),

  createItem: async (name: string) => {
    await act.createNewItem();
    expect.selectedItem("");

    await act.inputValue(name);
    await act.finishEdit();
    expect.selectedItem(name);
  },

  inputValue: async (val: string) => {
    await wait();
    if (document.activeElement) {
      document.activeElement.innerHTML = val;
      document.activeElement.dispatchEvent(
        new Event("input", { bubbles: true, cancelable: true })
      );
    } else {
      throw new Error("No element is active");
    }
  },
};

type KeyName =
  | "ArrowDown"
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowLeft"
  | "KeyE"
  | "KeyX"
  | "Enter";
async function dispatchKeyDown(code: KeyName, props?: KeyboardEventInit) {
  await wait();
  document.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: code,
      code: code,
      bubbles: true,
      cancelable: true,
      ...props,
    })
  );
}

////////////////////////////////////
////////// Infrastructure //////////
////////////////////////////////////

export function isTesting() {
  return new URLSearchParams(window.location.search).has("test");
}

function hasClass(elem: HTMLElement, className: string, message: string) {
  if (!elem.classList.contains(className)) {
    error(message, "Element", elem, ` doesn't contain class '${className}'`);
  }
}

function arrayEqual<T>(given: T[], expected: T[], message: string) {
  for (let i = 0; i < given.length; i++) {
    if (given[i] !== expected[i]) {
      error(
        message + ".",
        `Mismatch at index ${i}: given "${given[i]}", expected "${expected[i]}".`
      );
    }
  }
}

function expectElementsHaveContent<T>(
  given: Element[],
  expected: T[],
  message: string
) {
  for (let i = 0; i < given.length; i++) {
    if (given[i].textContent !== expected[i]) {
      error(
        message + ".",
        "Expected",
        given[i],
        `to have content '${expected[i]}'`
      );
    }
  }
}

export function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, window.testWaitTime);
  });
}

function error(...params: any[]) {
  console.error(...params);
  throw new Error("^^^^^^^^^");
}

function isUndefined(val: any, message: string) {
  if (val !== undefined) error(message);
}

function findByName(targetText: string): Item {
  const queue: Item[] = [window.root];

  while (queue.length > 0) {
    const currentItem = queue.shift();

    if (currentItem) {
      if (currentItem.text === targetText) {
        return currentItem;
      }

      for (const child of currentItem.children) {
        queue.push(child);
      }
    }
  }

  throw new Error(`Can't find item with the name ${targetText}`);
}
