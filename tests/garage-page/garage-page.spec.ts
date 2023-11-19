import { test } from "../../src/fixtures";
import { expect } from "@playwright/test";

test.describe("Garage page", () => {
  test("page should contain add car button", async ({ garagePage }) => {
    await expect(garagePage.addCarButton).toBeVisible();
    await expect(garagePage.addCarButton).toBeEnabled();
  });
});
