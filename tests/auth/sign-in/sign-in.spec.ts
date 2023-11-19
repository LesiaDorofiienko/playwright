import { Page, expect, test } from "@playwright/test";

// Avoiding using shared storage state
// test.use({storageState: {cookies: [], origins: []}})

test.describe("Auth @smoke @regression @Sc464999d", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.beforeEach(async () => {
    await page.goto("/");
  });

  test("should show error message when user enters wrong password @Te61e6d76", async () => {
    const email = "stastaransa@gmail.com";

    const password = email.split("").reverse().join("");

    const signInButton = page.locator("button.header_signin");
    await expect(
      signInButton,
      "Sign in button should be visible"
    ).toBeVisible();
    await expect(
      signInButton,
      "Sign in button should be enabled"
    ).toBeEnabled();

    await signInButton.click();

    const popup = page.locator("div.modal-dialog");
    await expect(popup, "Sign in popup should be visible").toBeVisible();

    const emailInput = popup.locator("input#signinEmail");
    const passwordInput = popup.locator("input#signinPassword");
    const loginButton = popup.locator(".btn-primary");

    await emailInput.fill(email);
    await passwordInput.fill(password);
    await loginButton.click();

    const alertMessage = popup.locator("p.alert-danger");
    await expect(
      alertMessage,
      "Alert message should be shown when user has entered invalid email"
    ).toHaveText("Wrong email or password");
  });

  test("Login @T56334a2e", async () => {
    const email = "staran.test";
    const password = "password";

    const signInButton = page.locator("button.header_signin");
    await expect(
      signInButton,
      "Sign in button should be visible"
    ).toBeVisible();
    await expect(
      signInButton,
      "Sign in button should be enabled"
    ).toBeEnabled();

    await signInButton.click();

    const popup = page.locator("div.modal-dialog");
    await expect(popup, "Sign in popup should be visible").toBeVisible();

    const emailInput = popup.locator("input#signinEmail");
    const passwordInput = popup.locator("input#signinPassword");
    const loginButton = popup.locator(".btn-primary");

    await emailInput.fill(email);
    await passwordInput.fill(password);

    const emailErrorMessage = popup.locator("div.invalid-feedback");
    await expect(
      emailErrorMessage,
      "Error message should be shown when user has entered invalid email"
    ).toHaveText("Email is incorrect");
    await expect(
      emailInput,
      "Email input should have red border when user has entered invalid email"
    ).toHaveCSS("border-color", "rgb(220, 53, 69)");
    // await expect(emailInput).toHaveScreenshot("invalid-email-input.png", {
    //   maxDiffPixelRatio: 0.2,
    // });

    await expect(
      loginButton,
      "Login button should be disabled when user has entered invalid email"
    ).toBeDisabled();
  });
});
