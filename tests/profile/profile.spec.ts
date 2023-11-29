import { test } from "../../src/fixtures";
import { expect } from "@playwright/test";
import { GaragePage, ProfilePage } from "../../src/page-objects";
import { PROFILE_RESPONSE_BODY } from "./fixtures/profile-data";

test.describe("User profile", () => {
  test("page should contain valid user info", async ({
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

  test.only("frontend should use data returned in API res", async ({
    userProfilePage,
  }) => {
    const { page } = userProfilePage;

    await page.route("/api/users/profile", (route) => {
      route.fulfill({ body: JSON.stringify(PROFILE_RESPONSE_BODY) });
    });

    await userProfilePage.navigate();

    await expect(userProfilePage.userName).toHaveText(
      `${PROFILE_RESPONSE_BODY.data.name} ${PROFILE_RESPONSE_BODY.data.lastName}`
    );
  });
});
