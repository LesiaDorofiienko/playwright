import { test } from "@playwright/test";
import { USERS } from "../../src/data/dict/users.js";
import { STORAGE_STATE_USER_PATH } from "../../src/data/storage-state";
import { WelcomePage } from "../../src/page-objects";

test("Login as user and save storage state", async ({ page, context }) => {
  const welcomePage = new WelcomePage(page);
  await welcomePage.navigate();
  const modal = await welcomePage.openSignInModal();
  await modal.signIn({
    email: USERS.lesia.email,
    password: USERS.lesia.password,
  });
  await context.storageState({
    path: STORAGE_STATE_USER_PATH,
  });
});

test.skip("Login as admin and save storage state", async ({
  page,
  context,
}) => {
  const welcomePage = new WelcomePage(page);
  await welcomePage.navigate();
  const modal = await welcomePage.openSignInModal();
  await modal.signIn({
    email: USERS.lesia.email,
    password: USERS.lesia.password,
  });
  await context.storageState({
    path: STORAGE_STATE_USER_PATH,
  });
});
