import { BaseComponent } from "../../../components";
import { Locator, Page, expect } from "@playwright/test";

export type SignInData = {
  email: string;
  password: string;
};

export class SignInModal extends BaseComponent {
  private readonly emailInputSelector = "#signinEmail";
  private readonly passwordInputSelector = "#signinPassword";

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page, page.locator("app-signin-modal"));
    this.emailInput = this.container.locator(this.emailInputSelector);
    this.passwordInput = this.container.locator(this.passwordInputSelector);
    this.signInButton = this.container.locator(".btn-primary");
  }

  async fill({ email, password }: SignInData) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async signIn(signInData: SignInData) {
    await this.fill(signInData);
    await this.signInButton.click();
    await expect(this.page).toHaveURL(/panel\/garage/);
  }
}
