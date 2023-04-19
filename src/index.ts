import { lorem } from "./utils";
import { div } from "./html";
import { Item, getItemAbove, getItemBelow, item } from "./tree";
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

function renderApp() {
  return div({
    children: root.children!.map((item) =>
      div({
        id: item.id,
        className: `row`,
        children: [div({ className: "icon" }), item.text],
      })
    ),
  });
}

document.body.append(renderApp());

let selectedItem: Item | undefined = undefined;

function selectItem(item: Item | undefined) {
  if (!item) return;

  if (selectedItem) {
    document.getElementById(selectedItem.id)?.classList.remove("selected");
  }

  selectedItem = item;
  document.getElementById(selectedItem.id)?.classList.add("selected");
}

window.addEventListener("keydown", (e) => {
  if (!selectedItem) {
    selectItem(root.children ? root.children[0] : undefined);
    return;
  }

  if (e.code === "ArrowDown") selectItem(getItemBelow(selectedItem));
  if (e.code === "ArrowUp") selectItem(getItemAbove(selectedItem));
});

selectItem(root.children![0]);
