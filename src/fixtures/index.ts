import {
  APIRequestContext,
  Page,
  test as base,
  request,
} from "@playwright/test";
import { USERS, User } from "../data/dict";
import { STORAGE_STATE_USER_PATH } from "../data/storage-state";
import { GaragePage, ProfilePage } from "../page-objects";

export type Fixtures = {
  headerLinks: string[];
  user: User;
  userProfilePage: ProfilePage;
  managerProfilePage: ProfilePage;
  userGaragePage: GaragePage;
  pageWithAuth: Page;
  userAPIClient: APIRequestContext;
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

  userAPIClient: async ({}, use) => {
    const ctx = await request.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    await use(ctx);

    await ctx.dispose();
  },
});
