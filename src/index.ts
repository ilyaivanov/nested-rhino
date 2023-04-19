import { lorem } from "./utils";
import { div, span } from "./html";
import {
  Item,
  getItemAbove,
  getItemBelow,
  insertAfter,
  item,
  removeItem,
} from "./tree";
import "./index.scss";

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
function viewItem(item: Item) {
  return div({
    id: item.id,
    className: `row`,
    children: [
      div({ className: "icon" }),
      span({ className: "row-text", children: item.text }),
    ],
  });
}

function renderApp() {
  return div({
    children: root.children!.map(viewItem),
  });
}

document.body.append(renderApp());

window.addEventListener("keydown", (e) => {
  if (!selectedItem) {
    selectItem(root.children ? root.children[0] : undefined);
    return;
  }

  if (elementEdited) {
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.code === "Escape") {
      stopEdit();
    }
    return;
  }

  if (e.code === "ArrowDown") selectItem(getItemBelow(selectedItem));
  if (e.code === "ArrowUp") selectItem(getItemAbove(selectedItem));
  if (e.code === "KeyX") removeItemElem(selectedItem);
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    e.preventDefault();
    createNewItemAfter(selectedItem);
  }
  if (e.code === "KeyE") {
    e.preventDefault();
    startEdit(selectedItem);
  }
});

// Editing
let elementEdited: HTMLElement | undefined;
function startEdit(item: Item) {
  const row = document.getElementById(item.id);
  if (row) {
    const textElem = row.getElementsByClassName("row-text");
    elementEdited = textElem[0] as HTMLElement;
    if (elementEdited) {
      elementEdited.contentEditable = "true";
      elementEdited.focus();
      var range = document.createRange();
      range.setStart(elementEdited, 0);
      range.collapse(true);

      var selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      elementEdited.addEventListener("input", () => {
        selectedItem!.text = elementEdited!.innerText;
        if (selectedItem!.text.length == 0) elementEdited!.innerHTML = "&nbsp;";
      });
      if (selectedItem!.text.length == 0) elementEdited!.innerHTML = "&nbsp;";
      elementEdited.addEventListener("blur", onBlur);
    }
  }
}

export function stopEdit() {
  if (elementEdited) {
    elementEdited.removeEventListener("blur", onBlur);
    elementEdited.removeAttribute("contenteditable");
    elementEdited.blur();
    elementEdited = undefined;
  }
}

function onBlur() {
  stopEdit();
}

// Selection
let selectedItem: Item | undefined = undefined;

function selectItem(item: Item | undefined) {
  if (!item) return;

  if (selectedItem) {
    document.getElementById(selectedItem.id)?.classList.remove("selected");
  }

  selectedItem = item;
  document.getElementById(selectedItem.id)?.classList.add("selected");
}
selectItem(root.children![0]);

//Remove
function removeItemElem(item: Item) {
  const nextItemToSelect = getItemAbove(item) || getItemBelow(item);
  const row = document.getElementById(item.id);
  if (row) row.remove();
  removeItem(item);

  selectItem(nextItemToSelect);
}

//Create
function createNewItemAfter(insertAfterItem: Item) {
  const newItem = item("");
  const row = document.getElementById(insertAfterItem.id);
  if (row) {
    insertAfter(insertAfterItem, newItem);
    row.insertAdjacentElement("afterend", viewItem(newItem));
    selectItem(newItem);
    startEdit(newItem);
  }
}
