import { Item, getContext } from "../tree";
import { getRowForItem } from "./item";
import { COLLAPSE_DURATION } from "./openClose";
import { getItemToSelectAfterRemovingSelected, selectItem } from "./selection";

export function removeItem(item: Item) {
  selectItem(getItemToSelectAfterRemovingSelected());

  const context = getContext(item);
  context.splice(context.indexOf(item), 1);

  const row = getRowForItem(item);

  if (!row) throw new Error(`Can't find row for ${item.text}`);

  row.style.overflow = "hidden";
  row
    .animate(
      //prettier-ignore
      [
      { height: row.clientHeight + "px", opacity: "1", transform:'translateX(0)', color:'white'  },
      { height: "0px",                   opacity: "0", transform:'translateX(-15px)', color:'#BD6666' },
    ],
      { duration: COLLAPSE_DURATION, easing: "ease-in-out" }
    )
    .addEventListener("finish", () => row.remove());
}
