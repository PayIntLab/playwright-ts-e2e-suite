import { expect, test } from "../fixtures/test-fixtures";

test.use({ storageState: "playwright/.auth/standard_user.json" });

test.describe("SauceDemo inventory @ui", () => {
  test("shows six products @smoke", async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.expectLoaded();
  });

  test("sorts products by price low to high @regression", async ({
    inventoryPage,
  }) => {
    await inventoryPage.goto();
    await inventoryPage.sortBy("lohi");

    const prices = await inventoryPage.page
      .locator(".inventory_item_price")
      .allTextContents();
    const numericPrices = prices.map((price) => Number(price.replace("$", "")));
    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
  });

  test("adds and removes an item @regression", async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.removeItemFromCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
