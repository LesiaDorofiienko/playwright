import { Locator, Page, expect } from "@playwright/test";
import { BaseComponent } from "../../../components";

interface RegistrationData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export class RegistrationModal extends BaseComponent {
  private readonly redColor = "rgb(220, 53, 69)";
  private readonly errorMessageSelector = "div.invalid-feedback > p";
  private readonly nameInputSelector = "input#signupName";
  private readonly lastNameInputSelector = "input#signupLastName";
  private readonly emailInputSelector = "input#signupEmail";
  private readonly passwordInputSelector = "input#signupPassword";
  private readonly repeatPasswordInputSelector = "input#signupRepeatPassword";

  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;

  readonly registerButton: Locator;

  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, page.locator("app-signup-modal"));

    this.nameInput = this.container.locator(this.nameInputSelector);
    this.lastNameInput = this.container.locator(this.lastNameInputSelector);
    this.emailInput = this.container.locator(this.emailInputSelector);
    this.passwordInput = this.container.locator(this.passwordInputSelector);
    this.repeatPasswordInput = this.container.locator(
      this.repeatPasswordInputSelector
    );
    this.registerButton = this.container.locator("button.btn-primary", {
      hasText: "Register",
    });
    this.errorMessage = this.container.locator(this.errorMessageSelector);
  }

  public async fillAndBlurInput({
    input,
    text,
  }: {
    input: Locator;
    text: string;
  }) {
    await input.fill(text);
    await input.blur();
  }

  public async validateInput({
    errorText,
    input,
  }: {
    input: Locator;
    errorText: string;
  }) {
    await expect(input).toHaveCSS("border-color", this.redColor);
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(errorText);
  }

  public async fillForm({ email, lastName, name, password }: RegistrationData) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
  }

  public async registerNewUser(signUpData: RegistrationData) {
    await this.fillForm(signUpData);
    await this.registerButton.click();
    await expect(this.page).toHaveURL(/panel\/garage/);
  }
}
