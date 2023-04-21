import { Item, getItemLevel } from "../tree";
import { viewChildren } from "../view";
import {
  getItemChildrenContainer,
  getItemChildrenContainerMaybe,
  getRowForItem,
} from "./item";

const COLLAPSE_DURATION = 300;

export function closeItem(item: Item) {
  item.isOpen = false;

  const childrenView = getItemChildrenContainer(item);

  if (revertAnimations(childrenView)) {
    return;
  }

  childrenView
    .animate(
      //prettier-ignore
      [
        { height: childrenView.clientHeight + "px", opacity: "1" },
        { height: "0px",                            opacity: "0" },
      ],
      { duration: COLLAPSE_DURATION, easing: "ease-in-out" }
    )
    .addEventListener("finish", () => onFinish(childrenView, item));
}

export function openItem(item: Item) {
  item.isOpen = true;

  const existingChildrenView = getItemChildrenContainerMaybe(item);

  if (existingChildrenView && revertAnimations(existingChildrenView)) {
    return;
  }

  const childrenView = viewChildren(item, getItemLevel(item));

  const itemElem = getRowForItem(item);
  itemElem.insertAdjacentElement("beforeend", childrenView);

  childrenView
    .animate(
      //prettier-ignore
      [
      { height: "0px",                            opacity: "0" },
      { height: childrenView.clientHeight + "px", opacity: "1" },
    ],
      { duration: COLLAPSE_DURATION, easing: "ease-in-out" }
    )
    .addEventListener("finish", () => onFinish(childrenView, item));
}

function onFinish(childrenContainer: HTMLElement, item: Item) {
  if (!item.isOpen) childrenContainer.remove();
}

//TODO:
// 1. Need to check if item is animating at the moment.
//    User might open the item and then close it immediatelly before animation is finished

function revertAnimations(elem: HTMLElement | undefined) {
  if (!elem) return false;

  const animations = elem.getAnimations();
  if (animations.length > 0) {
    animations.forEach((animation) => animation.reverse());
    return true;
  }
  return false;
}
