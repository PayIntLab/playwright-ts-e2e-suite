import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly sortSelect: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".title");
    this.items = page.locator(".inventory_item");
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText("Products");
    await expect(this.items).toHaveCount(6);
  }

  async addItemToCart(name: string): Promise<void> {
    const item = this.items.filter({ hasText: name });
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeItemFromCart(name: string): Promise<void> {
    const item = this.items.filter({ hasText: name });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async productNames(): Promise<string[]> {
    return this.page.locator(".inventory_item_name").allTextContents();
  }
}
