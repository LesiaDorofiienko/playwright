import {
  APIRequestContext,
  Page,
  test as base,
  request,
} from "@playwright/test";
import { CookieJar } from "tough-cookie";
import { config } from "../../config";
import { APIClient } from "../client";
import { USERS, User } from "../data/dict";
import { STORAGE_STATE_USER_PATH } from "../data/storage-state";
import { GaragePage, ProfilePage } from "../page-objects";
import { SignInData, SignUpData } from "../types";

export type Fixtures = {
  headerLinks: string[];
  user: User;
  userProfilePage: ProfilePage;
  managerProfilePage: ProfilePage;
  userGaragePage: GaragePage;
  pageWithAuth: Page;
  userAPIClient: APIRequestContext;
  client: APIClient;
  clientWithUser: (userData: SignInData) => Promise<APIClient>;
  clientWithNewUser: APIClient;
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

  client: async ({}, use) => {
    const apiClient = new APIClient();

    await apiClient.auth.signIn({
      email: USERS.lesia.email,
      password: USERS.lesia.password,
    });

    await use(apiClient);
  },

  clientWithUser: async ({}, use) => {
    async function getClient(userData: SignInData) {
      const apiClient = new APIClient();

      await apiClient.auth.signIn(userData);

      return apiClient;
    }

    await use(getClient);
  },

  clientWithNewUser: async ({}, use) => {
    const data: SignUpData = {
      name: "John",
      lastName: "Dou",
      email: `test${Date.now()}@test.com`,
      password: "Qwerty12345",
    };

    await new APIClient().auth.signUp(data);
    const apiClient = await APIClient.authenticate({
      email: data.email,
      password: data.password,
    });

    await use(apiClient);

    await apiClient.users.deleteCurrentUser();
  },
});
