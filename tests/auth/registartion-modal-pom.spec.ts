import { test } from "@playwright/test";

import { RegistrationModal } from "../../src/page-objects";

test.describe("Registration modal POM", () => {
  let registrationModal: RegistrationModal;

  test.beforeEach(async ({ page }) => {
    registrationModal = new RegistrationModal(page);
    await registrationModal.navigate();
  });

  test.describe("Name input", () => {
    const requiredErrorText = "Name required";
    const invalidErrorText = "Name is invalid";
    const lengthErrorText = "Name has to be from 2 to 20 characters long";

    test("Should show error when input is empty", async () => {
      await registrationModal.nameInputValidation({
        errorText: requiredErrorText,
        inputText: "",
      });
    });

    test("Should show error when name is invalid", async () => {
      await registrationModal.nameInputValidation({
        errorText: invalidErrorText,
        inputText: "tyty6",
      });
    });

    test("Should show error when name is too short", async () => {
      await registrationModal.nameInputValidation({
        errorText: lengthErrorText,
        inputText: "t",
      });
    });

    test("Should show error when name is too long", async () => {
      await registrationModal.nameInputValidation({
        errorText: lengthErrorText,
        inputText: "t".repeat(21),
      });
    });
  });

  // ==========================================================================
  test.describe("Last name input", () => {
    const requiredErrorText = "Last name required";
    const invalidErrorText = "Last name is invalid";
    const lengthErrorText = "Last name has to be from 2 to 20 characters long";

    test("Should show error when input Last Name is empty", async () => {
      await registrationModal.lastNameInputValidation({
        errorText: requiredErrorText,
        inputText: "",
      });
    });

    test("Should show error when Last Name is invalid", async () => {
      await registrationModal.lastNameInputValidation({
        errorText: invalidErrorText,
        inputText: "tyty6",
      });
    });

    test("Should show error when Last Name is too short", async () => {
      await registrationModal.lastNameInputValidation({
        errorText: lengthErrorText,
        inputText: "t",
      });
    });

    test("Should show error when Last name is too long", async () => {
      await registrationModal.lastNameInputValidation({
        errorText: lengthErrorText,
        inputText: "t".repeat(22),
      });
    });
  });

  // ==========================================================================
  test.describe("Email input", () => {
    const requiredErrorText = "Email required";
    const invalidErrorText = "Email is incorrect";

    test("Should show error when input Email is empty", async () => {
      await registrationModal.emailInputValidation({
        errorText: requiredErrorText,
        inputText: "",
      });
    });

    test("Should show error when Email is incorrect", async () => {
      await registrationModal.emailInputValidation({
        errorText: invalidErrorText,
        inputText: "rr",
      });
    });
  });

  // ==========================================================================
  test.describe("Password input", () => {
    const requiredError = "Password required";
    const incorrectError =
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

    test("Should show error when input Password is empty", async () => {
      await registrationModal.passwordInputValidation({
        errorText: requiredError,
        inputText: "",
      });
    });

    test("Should show error when Password is incorect", async () => {
      await registrationModal.passwordInputValidation({
        errorText: incorrectError,
        inputText: "rr",
      });
    });

    test("Should show error when Password is too short", async () => {
      await registrationModal.passwordInputValidation({
        errorText: incorrectError,
        inputText: "n",
      });
    });

    test("Should show error when Password is too long", async () => {
      await registrationModal.passwordInputValidation({
        errorText: incorrectError,
        inputText: "n".repeat(16),
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
      await registrationModal.repeatPasswordInputValidation({
        errorText: requiredReEnterPasswordError,
        inputText: "",
      });
    });

    test("Should show error when Re-enter password is incorrect", async () => {
      await registrationModal.repeatPasswordInputValidation({
        errorText: incorrectError,
        inputText: "rr",
      });
    });

    test("Should show error when Re-enter passwords don't match", async () => {
      await registrationModal.repeatPasswordInputValidation({
        errorText: notMatchErrorText,
        inputText: "nQWErtyw#4",
      });
    });
  });

  test("Successfully registration ", async () => {
    const name = "Lesia";
    const lastName = "Doroffienko";
    const email = "aqa-lesiad656@test.com";
    const password = "YourName123";

    await registrationModal.registrate({ name, lastName, email, password });
  });
});
