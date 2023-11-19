import { Page, expect, test } from "@playwright/test";
import { WelcomePage } from "../../src/page-objects";
import { HEADER_LINKS_WELCOME_PAGE } from "./fixtures";

test.describe("Welcome page @Sb91d1395", () => {
  let page: Page;
  let welcomePage: WelcomePage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080,
      },
    });

    page = await context.newPage();
    welcomePage = new WelcomePage(page);
  });

  test.beforeEach(async () => {
    await welcomePage.navigate();
  });

  test("should contain all required links in header @T869ab183", async () => {
    const linksText = await welcomePage.header.getLinksText();
    expect(linksText, "All required links should be present").toEqual(
      HEADER_LINKS_WELCOME_PAGE
    );
  });

  test("should contain all required links in header 2 @T4093675a", async () => {
    await welcomePage.header.verifyLinksText(HEADER_LINKS_WELCOME_PAGE);
  });
});
