import { Page, test as base } from "@playwright/test";
import { GaragePage, ProfilePage, WelcomePage } from "../page-objects";
import { USERS, User } from "../data/dict";
import { STORAGE_STATE_USER_PATH } from "../data/storage-state";

export type Fixtures = {
  headerLinks: string[];
  user: User;
  userProfilePage: ProfilePage;
  managerProfilePage: ProfilePage;
  userGaragePage: GaragePage;
  pageWithAuth: Page;
};

export const test = base.extend<Fixtures>({
  headerLinks: ["Garage", "Fuel expenses", "Instructions"],
  user: USERS.lesia,
  pageWithAuth: async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    const page = await ctx.newPage();

    await use(page);
  },

  userProfilePage: async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    const page = await ctx.newPage();
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    console.log("test");
    // before test

    await use(profilePage);

    //after test
  },

  userGaragePage: async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    const page = await ctx.newPage();

    const garagePage = new GaragePage(page);
    await garagePage.navigate();

    await use(garagePage);
  },
});
