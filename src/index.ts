import { lorem } from "./utils";
import { getItemAbove, getItemBelow, item } from "./tree";
import { moveItemDown, moveItemUp } from "./features/movement";
import { selectItem, selectedItem } from "./features/selection";
import { addNewItemAfter } from "./features/add";
import { removeItem } from "./features/remove";
import { elementEdited, startEdit, stopEdit } from "./features/edit";
import { renderApp } from "./view";

const root = item("Root", [
  item("Carbon Based Lifeforms"),
  item("Circular"),
  item("I Awake"),
  item("James Murray"),
  item("Miktek"),
  item("Koan"),
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

document.body.append(renderApp(root));

window.addEventListener("keydown", (e) => {
  if (!selectedItem) {
    selectItem(root.children[0]);
    return;
  }

  if (elementEdited) {
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.code === "Escape") {
      stopEdit();
    }
    return;
  }

  if (e.code === "ArrowDown") {
    e.preventDefault();
    if (e.metaKey && e.shiftKey) moveItemDown(selectedItem);
    else selectItem(getItemBelow(selectedItem));
  }
  if (e.code === "ArrowUp") {
    e.preventDefault();
    if (e.metaKey && e.shiftKey) moveItemUp(selectedItem);
    else selectItem(getItemAbove(selectedItem));
  }
  if (e.code === "KeyX") removeItem(selectedItem);
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    e.preventDefault();
    addNewItemAfter(selectedItem);
  }
  if (e.code === "KeyE") {
    e.preventDefault();
    startEdit(selectedItem);
  }
});

selectItem(root.children[0]);
