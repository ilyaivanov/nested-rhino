import { getRowForItem } from "../features/item";
import { selectItem } from "../features/selection";
import { item } from "../tree";

export const expect = {
  selectedItem: function (itemName: string) {
    const item = window.root.children.find((i) => i.text === itemName);
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
  children: function (names: string[]) {
    const model = window.root.children.map((c) => c.text);
    arrayEqual(names, model, "Failed to verify Model elements");

    const texts = Array.from(document.querySelectorAll(".row")).map(
      (el) => el.getElementsByClassName("row-text")[0]
    );
    expectElementsHaveContent(texts, names, "Failed to verify UI elements");
  },

  emptyBoard: function () {
    const root = document.getElementById(window.root.id);
    if (!root)
      throw new Error(`Can't find root element with id:${window.root.id}`);
    if (root.children.length > 0) {
      console.error(
        "Expected the root element to be empty, but found:",
        root.children
      );
      throw new Error(`^^^^^^^^^^^^^`);
    }
  },

  noSelectedItem: () =>
    isUndefined(selectItem, "Expected the selected item to be undefined"),
};

export const act = {
  arrowDown: () => dispatchKeyDown("ArrowDown"),

  arrowUp: () => dispatchKeyDown("ArrowUp"),

  startEdit: () => dispatchKeyDown("KeyE"),

  finishEdit: () => dispatchKeyDown("Enter"),

  createNewItem: () => dispatchKeyDown("Enter"),

  deleteItem: () => dispatchKeyDown("KeyX"),

  moveItemDown: () =>
    dispatchKeyDown("ArrowDown", { metaKey: true, shiftKey: true }),

  moveItemUp: () =>
    dispatchKeyDown("ArrowUp", { metaKey: true, shiftKey: true }),

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

type KeyName = "ArrowDown" | "ArrowUp" | "KeyE" | "KeyX" | "Enter";
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
