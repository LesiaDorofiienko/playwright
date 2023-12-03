import {
  APIRequestContext,
  Page,
  test as base,
  request,
} from "@playwright/test";
import { USERS, User } from "../data/dict";
import { STORAGE_STATE_USER_PATH } from "../data/storage-state";
import { GaragePage, ProfilePage } from "../page-objects";
import { APIClient } from "../client";
import { CookieJar } from "tough-cookie";
import { config } from "../../config";
import { AuthController, CarController, UserController } from "../controllers";

export type Fixtures = {
  headerLinks: string[];
  user: User;
  userProfilePage: ProfilePage;
  managerProfilePage: ProfilePage;
  userGaragePage: GaragePage;
  pageWithAuth: Page;
  userAPIClient: APIRequestContext;
  client: APIClient;
  clientWithUser: (userData: any) => Promise<APIClient>;
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
    const jar = new CookieJar();
    const authController = new AuthController(config.apiURL, jar);

    await authController.signIn({
      email: USERS.lesia.email,
      password: USERS.lesia.password,
    });

    await use({
      cars: new CarController(config.apiURL, jar),
      auth: authController,
    });
  },

  clientWithUser: async ({}, use) => {
    async function getClient(userData) {
      const jar = new CookieJar();
      const authController = new AuthController(config.apiURL, jar);

      await authController.signIn(userData);

      return {
        cars: new CarController(config.apiURL, jar),
        auth: authController,
      };
    }

    await use(getClient);
  },

  clientWithNewUser: async ({}, use) => {
    const userData = {
      name: "John",
      lastName: "Dou",
      email: `test${Date.now()}@test.com`,
      password: "Qwerty12345",
      repeatPassword: "Qwerty12345",
    };
    console.log(userData.email);
    const jar = new CookieJar();

    const authController = new AuthController(config.apiURL, jar);
    const userController = new UserController(config.apiURL, jar);

    await authController.signUp(userData);
    await authController.signIn({
      email: userData.email,
      password: userData.password,
    });

    await use({
      cars: new CarController(config.apiURL, jar),
      auth: authController,
      users: userController,
    });

    await userController.deleteCurrentUser();
  },
});
