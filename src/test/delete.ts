import { act, expect, wait } from "./utils";

export async function deleteTests() {
  await act.createItem("One");
  await act.createItem("Two");
  await act.createItem("Three");

  await act.arrowUp();
  expect.selectedItem("Two");

  await act.deleteItem();
  expect.selectedItem("One");

  await act.deleteItem();
  expect.selectedItem("Three");

  await act.deleteItem();

  await wait();
  expect.emptyBoard();

  await act.createNewItem();
  expect.selectedItem("");

  await act.inputValue("One");
  await act.finishEdit();
  expect.selectedItem("One");
  expect.children(["One"]);

  await act.createNewItem();
  expect.selectedItem("");

  await act.inputValue("Two");
  await act.finishEdit();
  expect.selectedItem("Two");
  expect.children(["One", "Two"]);

  await act.deleteItem();
  await act.deleteItem();
}
