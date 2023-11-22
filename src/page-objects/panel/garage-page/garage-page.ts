import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../base-page";

export class GaragePage extends BasePage {
  readonly addCarButton: Locator;

  constructor(page: Page) {
    const addCarButton = page.locator("button", { hasText: "Add car" });

    super(
      page,
      "/panel/garage",
      page.locator("app-panel-layout", {
        has: addCarButton,
      })
    );

    this.addCarButton = addCarButton;
  }
}
