import { Locator, Page, expect } from "@playwright/test";
import { BaseComponent } from "../components";

interface InputValidationData {
  inputText: string;
  errorText: string;
}

interface TestInputValidation extends InputValidationData {
  input: Locator;
}

export class RegistrationModal extends BaseComponent {
  private readonly url = "/";

  private readonly redColor = "rgb(220, 53, 69)";
  private readonly errorMessageSelector = "div.invalid-feedback > p";
  private readonly nameInputSelector = "input#signupName";
  private readonly lastNameInputSelector = "input#signupLastName";
  private readonly emailInputSelector = "input#signupEmail";
  private readonly passwordInputSelector = "input#signupPassword";
  private readonly repeatPasswordInputSelector = "input#signupRepeatPassword";

  private nameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private repeatPasswordInput: Locator;
  private registerButton: Locator;

  constructor(page: Page) {
    const wrapper = page.locator("html");
    super(page, wrapper);
  }

  private async open() {
    await this.page.goto(this.url);
  }

  private async openModal() {
    const signUpButton = this.page.locator("button", {
      hasText: "Sign up",
    });

    signUpButton.click();

    this.nameInput = this.page.locator(this.nameInputSelector);
    this.lastNameInput = this.page.locator(this.lastNameInputSelector);
    this.emailInput = this.page.locator(this.emailInputSelector);
    this.passwordInput = this.page.locator(this.passwordInputSelector);
    this.repeatPasswordInput = this.page.locator(
      this.repeatPasswordInputSelector
    );
    this.registerButton = this.page.locator("button.btn-primary", {
      hasText: "Register",
    });
  }

  private async testInput({
    errorText,
    input,
    inputText,
  }: TestInputValidation) {
    await input.fill(inputText);
    await input.blur();

    const errorMessage = this.page.locator(this.errorMessageSelector);

    await expect(input).toHaveCSS("border-color", this.redColor);
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(errorText);
  }
  // ==========================================================================
  // Public
  // ==========================================================================
  public async navigate() {
    await this.open();
    await this.waitLoaded();
    await this.openModal();
  }

  public async registrate({
    email,
    lastName,
    name,
    password,
  }: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);

    await expect(this.registerButton).toBeEnabled();
  }

  // Inputs
  // ==========================================================================
  public async nameInputValidation({
    errorText,
    inputText,
  }: InputValidationData) {
    await this.testInput({
      errorText,
      input: this.nameInput,
      inputText,
    });
  }

  public async lastNameInputValidation({
    errorText,
    inputText,
  }: InputValidationData) {
    await this.testInput({
      errorText,
      input: this.lastNameInput,
      inputText,
    });
  }

  public async passwordInputValidation({
    errorText,
    inputText,
  }: InputValidationData) {
    await this.testInput({
      errorText,
      input: this.passwordInput,
      inputText,
    });
  }

  public async repeatPasswordInputValidation({
    errorText,
    inputText,
  }: InputValidationData) {
    await this.testInput({
      errorText,
      input: this.repeatPasswordInput,
      inputText,
    });
  }

  public async emailInputValidation({
    errorText,
    inputText,
  }: InputValidationData) {
    await this.testInput({
      errorText,
      input: this.emailInput,
      inputText,
    });
  }
}
