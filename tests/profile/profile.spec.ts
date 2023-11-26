import { test } from "../../src/fixtures";
import { expect } from "@playwright/test";
import { GaragePage, ProfilePage } from "../../src/page-objects";

test.describe("User profile", () => {
  test.only("page should contain valid user info", async ({
    userProfilePage,
    user,
    pageWithAuth,
  }) => {
    await expect(
      userProfilePage.userName,
      "valid user name should be displayed"
    ).toHaveText(`${user.name} ${user.lastName}`);

    const gp = new GaragePage(pageWithAuth);
    await gp.navigate();
  });

  test("should use storage state", async ({ page, user }) => {
    const profilePage = new ProfilePage(page);
    await expect(
      profilePage.userName,
      "valid user name should be displayed"
    ).toHaveText(`${user.name} ${user.lastName}`);
  });
});
