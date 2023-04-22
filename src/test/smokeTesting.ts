import { act, expect } from "./utils";

export async function smokeTesting() {
  await act.createItem("One");
  expect.selectedItem("One");

  await act.createItem("Two");
  expect.selectedItem("Two");

  await act.createItem("Three");
  expect.selectedItem("Three");

  await act.arrowDown();
  expect.selectedItem("Three");

  await act.arrowUp();
  expect.selectedItem("Two");

  await act.arrowDown();
  expect.selectedItem("Three");

  await act.arrowUp();
  await act.arrowUp();
  expect.selectedItem("One");

  await act.arrowUp();
  expect.selectedItem("One");

  await act.deleteItem();
  await act.deleteItem();
  await act.deleteItem();
}
