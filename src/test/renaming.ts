import { act, expect } from "./utils";

export async function editTests() {
  await act.createNewItem();
  await act.inputValue("One");
  await act.finishEdit();

  expect.selectedItem("One");

  await act.startEdit();

  await act.inputValue("Two");
  await act.finishEdit();
  expect.selectedItem("Two");

  await act.createNewItem();
  expect.selectedItem("");

  await act.inputValue("Three");
  await act.finishEdit();
  expect.selectedItem("Three");

  expect.children(["Two", "Three"]);

  await act.deleteItem();
  await act.deleteItem();
}
