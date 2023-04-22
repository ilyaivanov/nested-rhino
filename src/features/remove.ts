import { Item, removeItemFromParent } from "../tree";
import { getRowForItem } from "./item";
import { getItemToSelectAfterRemovingSelected, selectItem } from "./selection";

export function removeItem(item: Item) {
  selectItem(getItemToSelectAfterRemovingSelected());

  removeItemFromParent(item);

  const row = getRowForItem(item);

  if (!row) throw new Error(`Can't find row for ${item.text}`);

  row.style.overflow = "hidden";
  row
    .animate(
      [
        {
          height: row.clientHeight + "px",
          opacity: "1",
          transform: "translateX(0)",
          color: "white",
        },
        {
          height: "0px",
          opacity: "0",
          transform: "translateX(-15px)",
          color: "#BD6666",
        },
      ],
      { duration: window.collapseSpeed, easing: "ease-in-out" }
    )
    .addEventListener("finish", () => row.remove());
}
