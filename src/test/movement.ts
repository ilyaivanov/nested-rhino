import { act, expect, wait } from "./utils";

export async function movingItems() {
  await act.createItem("One");
  await act.createItem("Two");
  await act.createItem("Three");
  await act.arrowUp();
  await act.arrowUp();

  expect.rootChildren(["One", "Two", "Three"]);
  expect.selectedItem("One");

  await act.moveItemDown();
  expect.rootChildren(["Two", "One", "Three"]);
  expect.selectedItem("One");

  await act.moveItemDown();
  expect.rootChildren(["Two", "Three", "One"]);
  expect.selectedItem("One");

  await act.moveItemDown();
  expect.rootChildren(["Two", "Three", "One"]);
  expect.selectedItem("One");

  await act.arrowUp();
  expect.selectedItem("Three");

  await act.moveItemUp();
  expect.rootChildren(["Three", "Two", "One"]);
  expect.selectedItem("Three");

  await act.moveItemUp();
  expect.rootChildren(["Three", "Two", "One"]);
  expect.selectedItem("Three");

  await act.deleteItem();
  await act.deleteItem();
  await act.deleteItem();
}

// One
//   One 1
//   One 2
//     One 2.1
//     One 2.2
//     One 2.3
//       One 2.3.1
//       One 2.3.2
// Two

// Cases missing
// 1. movement insode a closed item with children
export async function horizontalMovingItems() {
  await act.createItem("One");
  await act.createItem("One 1");
  expect.directChildren("Root", ["One", "One 1"]);

  expect.iconToBeEmpty("One");
  await act.moveItemRight();
  expect.directChildren("Root", ["One"]);
  expect.iconToBeFull("One");

  await act.moveItemLeft();
  expect.directChildren("Root", ["One", "One 1"]);
  expect.iconToBeEmpty("One");

  await act.moveItemRight();

  expect.directChildren("One", ["One 1"]);

  await act.createItem("One 2");
  expect.directChildren("One", ["One 1", "One 2"]);

  await act.createItem("One 2.1");
  await act.moveItemRight();
  await act.createItem("One 2.2");
  await act.createItem("One 2.3");

  await act.createItem("One 2.3.1");
  await act.moveItemRight();
  await act.createItem("One 2.3.2");

  expect.directChildren("One 2.3", ["One 2.3.1", "One 2.3.2"]);

  await act.createItem("Two");

  await act.moveItemLeft();
  expect.directChildren("One 2", ["One 2.1", "One 2.2", "One 2.3", "Two"]);

  await act.moveItemLeft();
  expect.directChildren("One", ["One 1", "One 2", "Two"]);

  await act.moveItemLeft();
  expect.directChildren("Root", ["One", "Two"]);

  await act.arrowUp();
  expect.selectedItem("One 2.3.2");

  await act.arrowLeft();
  expect.selectedItem("One 2.3");

  await act.arrowLeft();
  await wait();
  expect.hasNoChildrenVisible("One 2.3");

  await act.arrowUp();
  await act.arrowLeft();
  expect.selectedItem("One 2");

  await act.arrowUp();
  await act.arrowLeft();
  expect.selectedItem("One");

  await act.arrowUp();
  await act.arrowLeft();
  await wait();
  expect.hasNoChildrenVisible("One");

  await act.arrowRight();
  expect.directChildren("One", ["One 1", "One 2"]);

  await wait();
  await wait();
  await wait();
  await wait();
  await wait();
  await wait();
  await wait();
  await wait();
  await wait();
  await wait();
  await act.deleteItem();
  await act.deleteItem();
}
