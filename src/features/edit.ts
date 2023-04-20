import { Item } from "../tree";
import { selectedItem } from "./selection";

export let elementEdited: HTMLElement | undefined;
export function startEdit(item: Item) {
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
