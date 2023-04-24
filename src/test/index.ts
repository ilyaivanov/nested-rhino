import { expect, isTesting, wait } from "./utils";
import { horizontalMovingItems, movingItems } from "./movement";
import { smokeTesting } from "./smokeTesting";
import { item } from "../tree";
import { editTests } from "./renaming";
import { deleteTests } from "./delete";

const tests = [
  horizontalMovingItems,
  // smokeTesting,
  // movingItems,
  // editTests,
  // horizontalMovement,
  // deleteTests,
];

declare global {
  interface Window {
    testWaitTime: number;
  }
}

// Tests
export function truRunTests() {
  if (isTesting()) runTests();
}

export function getSampleData() {
  if (isTesting()) return item("Root", []);
}

async function runTests() {
  document.title = "Nested Rhino (Testing)";
  const initialSpeed = window.collapseSpeed;
  window.collapseSpeed = 30;
  window.testWaitTime = 60;

  console.info("Running tests...");

  for (const test of tests) {
    // need to wait until animations are finished
    await test();
    await wait();
    expect.emptyBoard();
  }

  console.info("Finished running tests.");
  window.collapseSpeed = initialSpeed;
  document.title = "Nested Rhino";
}
