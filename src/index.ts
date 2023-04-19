import "./index.scss";

document.body.style.padding = "20px";
let post = "Hi!";
const res = document.createElement("div");
res.innerText = "Hi";

function renderApp() {
  input.value = post;
  res.innerText = post;
}

res.classList.add("label");
const input = document.createElement("input");

input.addEventListener("click", () => {
  post = "";
  renderApp();
});

input.addEventListener("input", () => {
  post = input.value;
  renderApp();
});

renderApp();

document.body.append(res);
document.body.append(input);
