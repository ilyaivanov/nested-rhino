export const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

// utils

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = Array.from(new Array(10)).map((_, i) => i.toString());
const idAlphabet = alphabet
  .map((l) => l.toLocaleLowerCase())
  .concat(alphabet)
  .concat(numbers);

const length = 8;
export function generateRandomId() {
  let results = "";

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * idAlphabet.length);
    results += idAlphabet[randomIndex];
  }

  return results;
}
