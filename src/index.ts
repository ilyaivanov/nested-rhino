import { div } from "./html";
import { lorem } from "./utils";
import "./index.scss";

const items = [
  "Carbon Based Lifeforms",
  "Circular",
  "I Awake",
  "James Murray",
  "Miktek",
  "Koan",
  "Zero Cult",
  lorem,
  "Androcell",
  "Scann-Tec",
  "Hol Baumann",
  "Asura",
  "Cell",
  "Biosphere",
  "Aes Dana",
  "Side Liner",
  "Fahrenheit Project",
];

function renderApp() {
  return div({
    children: items.map((itemTitle, index) =>
      div({
        class: `row ${index == 5 ? "selected" : ""}`,
        children: [div({ class: "icon" }), itemTitle],
      })
    ),
  });
}

document.body.append(renderApp());
