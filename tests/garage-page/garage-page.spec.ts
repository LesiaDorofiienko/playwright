import { test } from "../../src/fixtures";
import { expect } from "@playwright/test";

test.describe("Garage page", () => {
  test("page should contain add car button", async ({ userGaragePage }) => {
    await expect(userGaragePage.addCarButton).toBeVisible();
    await expect(userGaragePage.addCarButton).toBeEnabled();
  });
});
