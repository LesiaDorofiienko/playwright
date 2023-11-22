import { Page, expect } from "@playwright/test";
import { test } from "../../src/fixtures";
import { GaragePage, WelcomePage } from "../../src/page-objects";
import { HEADER_LINKS } from "./fixtures";

test.describe("Guest mode @S09791ac6", () => {
  let page: Page;
  let welcomePage: WelcomePage;
  let garagePage: GaragePage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080,
      },
    });

    page = await context.newPage();
    welcomePage = new WelcomePage(page);

    await welcomePage.navigate();
  });

  test.beforeEach(async () => {
    garagePage = await welcomePage.loginAsGuest();
  });

  test.afterEach(async () => {
    await garagePage.logout();
  });

  test("should contain all required links in header @Td447a475", async ({
    headerLinks,
  }) => {
    console.log(headerLinks);
    const linksText = await garagePage.header.getLinksText();

    expect(linksText, "All required links should be present").toEqual(
      headerLinks
    );
  });
});
