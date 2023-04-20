import { getRowForItem } from "../features/item";
import { Item, item } from "../tree";

// Tests

async function runTests() {
  if (isSlowTesting()) console.info("Running slow tests...");
  else console.info("Running tests...");
  await traversal();
  await movingItems();
  await editTests();
  console.info("Finished running tests.");
}

function getInitialData(): Item {
  return item("Root", [
    item("One"),
    item("Two"),
    item("Three"),
    //
  ]);
}

async function traversal() {
  expectItemIsSelected("One");

  await arrowDown();
  expectItemIsSelected("Two");

  await arrowDown();
  expectItemIsSelected("Three");

  await arrowDown();
  expectItemIsSelected("Three");

  await arrowUp();
  expectItemIsSelected("Two");

  await arrowUp();
  expectItemIsSelected("One");

  await arrowUp();
  expectItemIsSelected("One");
}

async function movingItems() {
  expectItems(["One", "Two", "Three"]);
  expectItemIsSelected("One");

  await moveItemDown();
  expectItems(["Two", "One", "Three"]);
  expectItemIsSelected("One");

  await moveItemDown();
  expectItems(["Two", "Three", "One"]);
  expectItemIsSelected("One");

  await moveItemDown();
  expectItems(["Two", "Three", "One"]);
  expectItemIsSelected("One");

  await arrowUp();
  expectItemIsSelected("Three");

  await moveItemUp();
  expectItems(["Three", "Two", "One"]);
  expectItemIsSelected("Three");

  await moveItemUp();
  expectItems(["Three", "Two", "One"]);
  expectItemIsSelected("Three");
}

async function editTests() {}

function expectItems(names: string[]) {
  const model = window.root.children.map((c) => c.text);
  arrayEqual(names, model, "Failed to verify Model elements");

  const texts = Array.from(document.querySelectorAll(".row")).map(
    (el) => el.getElementsByClassName("row-text")[0]
  );
  expectElementsHaveContent(texts, names, "Failed to verify UI elements");
}

////////////////////////////////////
/////////// Test utils /////////////
////////////////////////////////////

// assertions
function expectItemIsSelected(itemName: string) {
  const item = window.root.children.find((i) => i.text === itemName);
  if (!item) console.error(`Can't find item with the name '${itemName}'`);
  else {
    const row = getRowForItem(item);
    if (!row) {
      console.error(`Can't find element for the item '${itemName}'`);
    } else {
      hasClass(
        row,
        "selected",
        `Expected ${itemName} to be selected, but it wasn't`
      );
    }
  }
}

// actions
async function arrowDown() {
  return dispatchKeyDown("ArrowDown");
}

function arrowUp() {
  return dispatchKeyDown("ArrowUp");
}

function moveItemDown() {
  return dispatchKeyDown("ArrowDown", { metaKey: true, shiftKey: true });
}
function moveItemUp() {
  return dispatchKeyDown("ArrowUp", { metaKey: true, shiftKey: true });
}

type KeyName = "ArrowDown" | "ArrowUp";
async function dispatchKeyDown(code: KeyName, props?: KeyboardEventInit) {
  if (isSlowTesting()) await sleep(100);
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
export function getSampleData() {
  if (isTesting()) return getInitialData();
}

export function truRunTests() {
  if (isTesting()) runTests();
}

function isTesting() {
  return (
    new URLSearchParams(window.location.search).has("test") || isSlowTesting()
  );
}

function isSlowTesting() {
  return new URLSearchParams(window.location.search).has("test-slow");
}

function hasClass(elem: HTMLElement, className: string, message: string) {
  if (!elem.classList.contains(className)) {
    console.error(
      message,
      "Element",
      elem,
      ` doesn't contain class '${className}'`
    );
  }
}

function arrayEqual<T>(given: T[], expected: T[], message: string) {
  for (let i = 0; i < given.length; i++) {
    if (given[i] !== expected[i]) {
      console.error(
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
      console.error(
        message + ".",
        "Expected",
        given[i],
        `to have content '${expected[i]}'`
      );
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
