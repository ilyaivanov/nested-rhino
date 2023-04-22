import { lorem } from "./utils";
import { Item, isRoot, item } from "./tree";
import {
  moveItemDown,
  moveItemLeft,
  moveItemRight,
  moveItemUp,
} from "./features/movement";
import { goDown, goUp, selectItem, selectedItem } from "./features/selection";
import { addNewItemAfter, createItemAndAddAsFirstChild } from "./features/add";
import { removeItem } from "./features/remove";
import { elementEdited, startEdit, stopEdit } from "./features/edit";
import { renderApp } from "./view";
import { getSampleData, truRunTests as tryRunTests } from "./test/index";
import { closeItem, openItem } from "./features/openClose";

const initialState = item("Root", [
  item("Carbon Based Lifeforms", [
    item("1998 - The Path"),
    item("2003 - Hydroponic Garden"),
    item("2006 - World Of Sleepers"),
    item("2010 - Interloper", [
      item("Track 1"),
      item("Track 2"),
      item("Track 3"),
    ]),
  ]),
  item("Circular"),
  item("I Awake"),
  item("James Murray"),
  item("Miktek"),
  item("Koan", [
    item("Koan - The Way Of One [ Full Album ] 2014"),
    item("Koan - Argonautica [Full Album]"),
    item("Koan - Condemned (Full Album) 2016"),
  ]),
  item("Zero Cult"),
  item(lorem),
  item("Androcell"),
  item("Scann-Tec"),
  item("Hol Baumann"),
  item("Asura"),
  item("Cell"),
  item("Biosphere"),
  item("Aes Dana"),
  item("Side Liner"),
  item("Fahrenheit Project"),
]);
declare global {
  interface Window {
    root: Item;
    collapseSpeed: number;
  }
}

window.addEventListener("keydown", (e) => {
  if (elementEdited) {
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.code === "Escape") {
      stopEdit();
    }
    return;
  }

  if (e.code === "Enter" || e.code === "NumpadEnter") {
    e.preventDefault();
    if (selectedItem) addNewItemAfter(selectedItem);
    else createItemAndAddAsFirstChild(root);
  }

  // events below assume existing selected item
  if (!selectedItem) return;

  if (e.code === "ArrowDown") {
    e.preventDefault();
    if (e.metaKey && e.shiftKey) moveItemDown(selectedItem);
    else goDown();
  }
  if (e.code === "ArrowLeft") {
    e.preventDefault();
    if (e.metaKey && e.shiftKey) moveItemLeft(selectedItem);
    else if (selectedItem.isOpen) closeItem(selectedItem);
    else if (selectedItem.parent && !isRoot(selectedItem.parent))
      selectItem(selectedItem.parent);
  }
  if (e.code === "ArrowRight") {
    e.preventDefault();
    if (e.metaKey && e.shiftKey) moveItemRight(selectedItem);
    else if (!selectedItem.isOpen) openItem(selectedItem);
    else if (selectedItem.children.length > 0)
      selectItem(selectedItem.children[0]);
  }
  if (e.code === "ArrowUp") {
    e.preventDefault();
    if (e.metaKey && e.shiftKey) moveItemUp(selectedItem);
    else goUp();
  }
  if (e.code === "KeyX") removeItem(selectedItem);

  if (e.code === "KeyE") {
    e.preventDefault();
    startEdit(selectedItem);
  }
});

let root =
  process.env.NODE_ENV == "development"
    ? getSampleData() || initialState
    : initialState;
window.root = root;

document.body.append(renderApp(root));
selectItem(root.children[0]);

if (process.env.NODE_ENV == "development") requestAnimationFrame(tryRunTests);
