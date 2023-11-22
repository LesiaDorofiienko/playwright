import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class ProfilePage extends BasePage {
  readonly userName: Locator;

  constructor(page: Page) {
    super(
      page,
      "/panel/profile",
      page.locator("button", { hasText: "Edit profile" })
    );

    this.userName = page.locator(".profile_name");
  }
}
