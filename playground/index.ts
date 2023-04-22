import { div } from "../src/html";
import "./index.scss";

const square = div({ className: "square" });

const container1 = div({ children: [square] });
const container2 = div({});

window.addEventListener("keydown", (e) => {
  if (container1.children.length == 0) {
    container1.appendChild(div({ children: [square] }));
  } else {
    container2.appendChild(div({ children: [square] }));
  }

  requestAnimationFrame(() => {
    square.style.left = Math.round(Math.random() * 300) + "px";
    square.style.top = Math.round(Math.random() * 300) + "px";
  });
});

document.body.appendChild(container1);
document.body.appendChild(container2);
