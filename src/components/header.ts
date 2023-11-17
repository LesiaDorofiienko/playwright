import { BaseComponent } from "./base-component";
import { Locator, Page, expect } from "@playwright/test";

export class Header extends BaseComponent {
  private readonly headerLinkSelector = ".header-link";
  readonly guestLoginButton: Locator;

  constructor(page: Page) {
    super(page, page.locator("app-header"));

    this.guestLoginButton = this.container.locator(this.headerLinkSelector, {
      hasText: "Guest log in",
    });
  }

  async getLinksText() {
    const links = this.container.locator(this.headerLinkSelector);
    const result: string[] = [];

    for (const linkItem of await links.all()) {
      const text = await linkItem.innerText();
      result.push(text);
    }

    return result;
  }

  async verifyLinksText(links: string[]) {
    const actualText = await this.getLinksText();
    expect(actualText, "All required links should be present").toEqual(links);
  }
}
