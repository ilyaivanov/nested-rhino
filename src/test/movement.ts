import { act, expect } from "./utils";

export async function movingItems() {
  await act.createItem("One");
  await act.createItem("Two");
  await act.createItem("Three");
  await act.arrowUp();
  await act.arrowUp();

  expect.children(["One", "Two", "Three"]);
  expect.selectedItem("One");

  await act.moveItemDown();
  expect.children(["Two", "One", "Three"]);
  expect.selectedItem("One");

  await act.moveItemDown();
  expect.children(["Two", "Three", "One"]);
  expect.selectedItem("One");

  await act.moveItemDown();
  expect.children(["Two", "Three", "One"]);
  expect.selectedItem("One");

  await act.arrowUp();
  expect.selectedItem("Three");

  await act.moveItemUp();
  expect.children(["Three", "Two", "One"]);
  expect.selectedItem("Three");

  await act.moveItemUp();
  expect.children(["Three", "Two", "One"]);
  expect.selectedItem("Three");

  await act.deleteItem();
  await act.deleteItem();
  await act.deleteItem();
}
