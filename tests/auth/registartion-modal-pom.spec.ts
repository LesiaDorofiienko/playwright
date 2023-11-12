import { test } from "@playwright/test";

import { WelcomePage } from "../../src/page-objects/welcome-page/welcome-page";
import { RegistrationModal } from "../../src/page-objects/welcome-page/components";

test.describe("Registration modal POM", () => {
  let welcomePage: WelcomePage;
  let registrationModal: RegistrationModal;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    welcomePage = new WelcomePage(page);
  });

  test.beforeEach(async () => {
    await welcomePage.navigate();
    registrationModal = await welcomePage.openRegistrationModal();
  });

  test.describe("Name input", () => {
    const requiredErrorText = "Name required";
    const invalidErrorText = "Name is invalid";
    const lengthErrorText = "Name has to be from 2 to 20 characters long";

    test("Should show error when input is empty", async () => {
      const input = registrationModal.nameInput;

      await registrationModal.fillAndBlurInput({ input, text: "" });
      await registrationModal.validateInput({
        input,
        errorText: requiredErrorText,
      });
    });

    test("Should show error when name is invalid", async () => {
      const input = registrationModal.nameInput;

      await registrationModal.fillAndBlurInput({ input, text: "tyty6" });
      await registrationModal.validateInput({
        input,
        errorText: invalidErrorText,
      });
    });

    test("Should show error when name is too short", async () => {
      const input = registrationModal.nameInput;

      await registrationModal.fillAndBlurInput({ input, text: "t" });
      await registrationModal.validateInput({
        input,
        errorText: lengthErrorText,
      });
    });

    test("Should show error when name is too long", async () => {
      const input = registrationModal.nameInput;

      await registrationModal.fillAndBlurInput({ input, text: "t".repeat(21) });
      await registrationModal.validateInput({
        input,
        errorText: lengthErrorText,
      });
    });
  });

  // ==========================================================================
  test.describe("Last name input", () => {
    const requiredErrorText = "Last name required";
    const invalidErrorText = "Last name is invalid";
    const lengthErrorText = "Last name has to be from 2 to 20 characters long";

    test("Should show error when input Last Name is empty", async () => {
      const input = registrationModal.lastNameInput;

      await registrationModal.fillAndBlurInput({ input, text: "" });
      await registrationModal.validateInput({
        input,
        errorText: requiredErrorText,
      });
    });

    test("Should show error when Last Name is invalid", async () => {
      const input = registrationModal.lastNameInput;

      await registrationModal.fillAndBlurInput({ input, text: "tyty6" });
      await registrationModal.validateInput({
        input,
        errorText: invalidErrorText,
      });
    });

    test("Should show error when Last Name is too short", async () => {
      const input = registrationModal.lastNameInput;

      await registrationModal.fillAndBlurInput({ input, text: "t" });
      await registrationModal.validateInput({
        input,
        errorText: lengthErrorText,
      });
    });

    test("Should show error when Last name is too long", async () => {
      const input = registrationModal.lastNameInput;

      await registrationModal.fillAndBlurInput({ input, text: "t".repeat(21) });
      await registrationModal.validateInput({
        input,
        errorText: lengthErrorText,
      });
    });
  });

  // ==========================================================================
  test.describe("Email input", () => {
    const requiredErrorText = "Email required";
    const invalidErrorText = "Email is incorrect";

    test("Should show error when input Email is empty", async () => {
      const input = registrationModal.emailInput;

      await registrationModal.fillAndBlurInput({ input, text: "" });
      await registrationModal.validateInput({
        input,
        errorText: requiredErrorText,
      });
    });

    test("Should show error when Email is incorrect", async () => {
      const input = registrationModal.emailInput;

      await registrationModal.fillAndBlurInput({ input, text: "tyty6" });
      await registrationModal.validateInput({
        input,
        errorText: invalidErrorText,
      });
    });
  });

  // ==========================================================================
  test.describe("Password input", () => {
    const requiredError = "Password required";
    const incorrectError =
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

    test("Should show error when input Password is empty", async () => {
      const input = registrationModal.passwordInput;

      await registrationModal.fillAndBlurInput({ input, text: "" });
      await registrationModal.validateInput({
        input,
        errorText: requiredError,
      });
    });

    test("Should show error when Password is incorect", async () => {
      const input = registrationModal.passwordInput;

      await registrationModal.fillAndBlurInput({ input, text: "tyty6" });
      await registrationModal.validateInput({
        input,
        errorText: incorrectError,
      });
    });

    test("Should show error when Password is too short", async () => {
      const input = registrationModal.passwordInput;

      await registrationModal.fillAndBlurInput({ input, text: "t" });
      await registrationModal.validateInput({
        input,
        errorText: incorrectError,
      });
    });

    test("Should show error when Password is too long", async () => {
      const input = registrationModal.passwordInput;

      await registrationModal.fillAndBlurInput({ input, text: "t".repeat(22) });
      await registrationModal.validateInput({
        input,
        errorText: incorrectError,
      });
    });
  });

  // ==========================================================================
  test.describe("Re-enter password input", () => {
    const incorrectError =
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";
    const notMatchErrorText = "Passwords do not match";
    const requiredReEnterPasswordError = "Re-enter password required";

    test("Should show error when Re-enter password is empty", async () => {
      const input = registrationModal.repeatPasswordInput;

      await registrationModal.fillAndBlurInput({ input, text: "" });
      await registrationModal.validateInput({
        input,
        errorText: requiredReEnterPasswordError,
      });
    });

    test("Should show error when Re-enter password is incorrect", async () => {
      const input = registrationModal.repeatPasswordInput;

      await registrationModal.fillAndBlurInput({ input, text: "tyty6" });
      await registrationModal.validateInput({
        input,
        errorText: incorrectError,
      });
    });

    test("Should show error when Re-enter passwords don't match", async () => {
      const input = registrationModal.repeatPasswordInput;

      await registrationModal.fillAndBlurInput({ input, text: "nQWErtyw#4" });
      await registrationModal.validateInput({
        input,
        errorText: notMatchErrorText,
      });
    });
  });

  test.describe("Successfull registration", () => {
    test("Should register new user", async () => {
      const name = "Lesia";
      const lastName = "Doroffienko";
      const email = "aqa-lesiad65694@test.com";
      const password = "YourName123";

      await registrationModal.registerNewUser({
        name,
        lastName,
        email,
        password,
      });
    });
  });
});
