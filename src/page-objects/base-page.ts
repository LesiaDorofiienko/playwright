import { BaseComponent, Header } from "../components";
import { Locator, Page, expect } from "@playwright/test";

export default class BasePage extends BaseComponent {
  private readonly header: Header;

  constructor(page: Page, private readonly url: string, container: Locator) {
    const wrapper = container ?? page.locator("html");
    super(page, wrapper);
    this.header = new Header(page);
  }

  async navigate() {
    await this.open();
    await this.waitLoaded();
  }

  async open() {
    await this.page.goto(this.url);
  }

  async logout() {
    await this.page.locator("#userNavDropdown").click();
    await this.page
      .locator("nav.user-nav_menu.dropdown-menu button", { hasText: "Logout" })
      .click();
    await expect(this.page).toHaveURL("/");
  }
}
