import { expect, isTesting, wait } from "./utils";
import { movingItems } from "./movement";
import { smokeTesting } from "./smokeTesting";
import { item } from "../tree";
import { editTests } from "./renaming";
import { deleteTests } from "./delete";

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

  const tests = [
    smokeTesting,
    movingItems,
    editTests,
    // horizontalMovement,
    deleteTests,
  ];

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
