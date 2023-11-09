import { Page, expect, test } from "@playwright/test";

// ==========================================================================
test.describe.skip("Sign up modal", () => {
  // -------------------------------------------------------------------------
  test("Sign up modal visible", async ({ page }) => {
    await page.goto("/");

    const signUpButton = page.locator("button", {
      hasText: "Sign up",
    });

    await expect(
      signUpButton,
      "Sign up button should be visible"
    ).toBeVisible();
    await expect(
      signUpButton,
      "Sign up button should be enabled"
    ).toBeEnabled();

    signUpButton.click();

    const signUpModal = page.locator("app-signup-modal");

    await expect(signUpModal, "Sign up modal should be visible").toBeVisible();
  });

  // ==========================================================================
  test.describe("Registration form", () => {
    // -------------------------------------------------------------------------
    const redColor = "rgb(220, 53, 69)";
    const errorMessagePath = "div.invalid-feedback > p";
    const nameInputPath = "input#signupName";
    const lastNameInputPath = "input#signupLastName";
    const emailInputPath = "input#signupEmail";
    const passwordInputPath = "input#signupPassword";
    const repeatPasswordInputPath = "input#signupRepeatPassword";
    // -------------------------------------------------------------------------
    const testInput = async ({
      page,
      inputPath,
      inputText,
      errorText,
    }: {
      page: Page;
      inputPath: string;
      inputText: string;
      errorText: string;
    }) => {
      const input = page.locator(inputPath);

      await input.fill(inputText);
      await input.blur();

      const errorMessage = page.locator(errorMessagePath);

      await expect(input).toHaveCSS("border-color", redColor);
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(errorText);
    };
    // -------------------------------------------------------------------------
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      const signUpButton = page.locator("button", {
        hasText: "Sign up",
      });
      await signUpButton.click();
    });
    // -------------------------------------------------------------------------
    test("Registration header visible", async ({ page }) => {
      const registrationModalHeader = page.locator("h4.modal-title", {
        hasText: "Registration",
      });

      await expect(
        registrationModalHeader,
        "Registration modal should be visible"
      ).toBeVisible();
    });

    // ==========================================================================
    test.describe("Name input", () => {
      // -------------------------------------------------------------------------
      const requiredErrorText = "Name required";
      const invalidErrorText = "Name is invalid";
      const lengthErrorText = "Name has to be from 2 to 20 characters long";

      // -------------------------------------------------------------------------
      test("Should be visible & editable", async ({ page }) => {
        const nameInput = page.locator(nameInputPath);

        await expect(nameInput).toBeVisible();
        await expect(nameInput).toBeEditable();
      });

      // -------------------------------------------------------------------------
      test("Should show error when input is empty", async ({ page }) => {
        await testInput({
          page,
          inputPath: nameInputPath,
          errorText: requiredErrorText,
          inputText: "",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when name is invalid", async ({ page }) => {
        await testInput({
          page,
          inputPath: nameInputPath,
          errorText: invalidErrorText,
          inputText: "tyty6",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when name is too short", async ({ page }) => {
        await testInput({
          page,
          inputPath: nameInputPath,
          errorText: lengthErrorText,
          inputText: "t",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when name is too long", async ({ page }) => {
        await testInput({
          page,
          inputPath: nameInputPath,
          errorText: lengthErrorText,
          inputText: "t".repeat(21),
        });
      });

      // -------------------------------------------------------------------------
      test("Should show 2 error messages", async ({ page }) => {
        const nameInput = page.locator(nameInputPath);

        await nameInput.fill("2");
        await nameInput.blur();

        const errorMessage = page.locator(
          "div.invalid-feedback > p:nth-child(1)"
        );
        const errorMessage2 = page.locator(
          "div.invalid-feedback > p:nth-child(2)"
        );

        await expect(nameInput).toHaveCSS("border-color", redColor);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText("Name is invalid");
        await expect(errorMessage2).toBeVisible();
        await expect(errorMessage2).toHaveText(
          "Name has to be from 2 to 20 characters long"
        );
      });
    });

    // ==========================================================================
    test.describe("Last name input", () => {
      // -------------------------------------------------------------------------
      const requiredErrorText = "Last name required";
      const invalidErrorText = "Last name is invalid";
      const lengthErrorText =
        "Last name has to be from 2 to 20 characters long";

      // -------------------------------------------------------------------------
      test("Should be visible & editable", async ({ page }) => {
        const nameInput = page.locator(lastNameInputPath);

        await expect(nameInput).toBeVisible();
        await expect(nameInput).toBeEditable();
      });

      // -------------------------------------------------------------------------
      test("Should show error when input Last Name is empty", async ({
        page,
      }) => {
        await testInput({
          page,
          inputPath: lastNameInputPath,
          errorText: requiredErrorText,
          inputText: "",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Last Name is invalid", async ({ page }) => {
        await testInput({
          page,
          inputPath: lastNameInputPath,
          errorText: invalidErrorText,
          inputText: "tyty6",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Last Name is too short", async ({
        page,
      }) => {
        await testInput({
          page,
          inputPath: lastNameInputPath,
          errorText: lengthErrorText,
          inputText: "t",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Last name is too long", async ({ page }) => {
        await testInput({
          page,
          inputPath: lastNameInputPath,
          errorText: lengthErrorText,
          inputText: "t".repeat(22),
        });
      });

      // -------------------------------------------------------------------------
      test("Should show 2 error messages for Last Name", async ({ page }) => {
        const nameInput = page.locator(lastNameInputPath);

        await nameInput.fill("2");
        await nameInput.blur();

        const errorMessage = page.locator(
          "div.invalid-feedback > p:nth-child(1)"
        );
        const errorMessage2 = page.locator(
          "div.invalid-feedback > p:nth-child(2)"
        );

        await expect(nameInput).toHaveCSS("border-color", redColor);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText("Last name is invalid");
        await expect(errorMessage2).toBeVisible();
        await expect(errorMessage2).toHaveText(
          "Last name has to be from 2 to 20 characters long"
        );
      });
    });

    // ==========================================================================
    test.describe("Email input", () => {
      const requiredErrorText = "Email required";
      const invalidErrorText = "Email is incorrect";
      // -------------------------------------------------------------------------
      test("Should be visible & editable", async ({ page }) => {
        const nameInput = page.locator(emailInputPath);

        await expect(nameInput).toBeVisible();
        await expect(nameInput).toBeEditable();
      });

      // -------------------------------------------------------------------------
      test("Should show error when input Email is empty", async ({ page }) => {
        await testInput({
          page,
          inputPath: emailInputPath,
          errorText: requiredErrorText,
          inputText: "",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Email is incorrect", async ({ page }) => {
        await testInput({
          page,
          inputPath: emailInputPath,
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

      // -------------------------------------------------------------------------
      test("Should be visible & editable", async ({ page }) => {
        const passwordInput = page.locator(passwordInputPath);

        await expect(passwordInput).toBeVisible();
        await expect(passwordInput).toBeEditable();
      });

      // -------------------------------------------------------------------------
      test("Should show error when input Password is empty", async ({
        page,
      }) => {
        await testInput({
          page,
          inputPath: passwordInputPath,
          errorText: requiredError,
          inputText: "",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Password is incorect", async ({ page }) => {
        await testInput({
          page,
          inputPath: passwordInputPath,
          errorText: incorrectError,
          inputText: "rr",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Password is too short", async ({ page }) => {
        await testInput({
          page,
          inputPath: passwordInputPath,
          errorText: incorrectError,
          inputText: "n",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Password is too long", async ({ page }) => {
        await testInput({
          page,
          inputPath: passwordInputPath,
          errorText: incorrectError,
          inputText: "n".repeat(16),
        });
      });
    });

    // ==========================================================================
    test.describe("Re-enter password input", () => {
      // -------------------------------------------------------------------------
      const incorrectError =
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";
      const notMatchErrorText = "Passwords do not match";
      const requiredReEnterPasswordError = "Re-enter password required";

      // -------------------------------------------------------------------------
      test("Should be visible & editable", async ({ page }) => {
        const reEnterPasswordInput = page.locator(repeatPasswordInputPath);

        await expect(reEnterPasswordInput).toBeVisible();
        await expect(reEnterPasswordInput).toBeEditable();
      });

      // -------------------------------------------------------------------------
      test("Should show error when Re-enter password is empty", async ({
        page,
      }) => {
        await testInput({
          page,
          inputPath: repeatPasswordInputPath,
          errorText: requiredReEnterPasswordError,
          inputText: "",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Re-enter password is incorrect", async ({
        page,
      }) => {
        await testInput({
          page,
          inputPath: repeatPasswordInputPath,
          errorText: incorrectError,
          inputText: "rr",
        });
      });

      // -------------------------------------------------------------------------
      test("Should show error when Re-enter passwords don't match", async ({
        page,
      }) => {
        await testInput({
          page,
          inputPath: repeatPasswordInputPath,
          errorText: notMatchErrorText,
          inputText: "nQWErtyw#4",
        });
      });
    });

    // ==========================================================================
    test("Successfully registration ", async ({ page }) => {
      const name = "Lesia";
      const lastName = "Doroffienko";
      const email = "aqa-lesiad656@test.com";
      const password = "YourName123";

      const nameInput = page.locator(nameInputPath);
      const lastNameInput = page.locator(lastNameInputPath);
      const emailInput = page.locator(emailInputPath);
      const passwordInput = page.locator(passwordInputPath);
      const repeatPasswordInput = page.locator(repeatPasswordInputPath);

      const registrationButton = page.locator("button.btn-primary", {
        hasText: "Register",
      });

      await nameInput.fill(name);
      await lastNameInput.fill(lastName);
      await emailInput.fill(email);
      await passwordInput.fill(password);
      await repeatPasswordInput.fill(password);

      await expect(registrationButton).toBeEnabled();
    });
  });
});
