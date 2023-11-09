import { Locator, Page } from "@playwright/test";

export class BaseComponent {
  constructor(readonly page: Page, readonly container: Locator) {}

  protected async waitLoaded() {
    await this.container.waitFor();
  }
}
