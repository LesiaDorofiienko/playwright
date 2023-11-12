import { BasePage } from "../base-page";
import { Locator, Page, expect } from "@playwright/test";
import { GaragePage } from "../panel";
import { RegistrationModal } from "./components";

export class WelcomePage extends BasePage {
  signUpButton: Locator;

  constructor(page: Page) {
    super(page, "/", page.locator("button", { hasText: "Guest log in" }));
    this.signUpButton = page.locator("button", {
      hasText: "Sign up",
    });
  }

  async openRegistrationModal() {
    await this.signUpButton.click();
    return new RegistrationModal(this.page);
  }

  async loginAsGuest() {
    await this.header.guestLoginButton.click();
    await expect(this.page).toHaveURL("/panel/garage");
    return new GaragePage(this.page);
  }
}
