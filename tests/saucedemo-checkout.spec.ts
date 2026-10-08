import { test } from "../fixtures/test-fixtures";

test.use({ storageState: "playwright/.auth/standard_user.json" });

test.describe("SauceDemo checkout @ui", () => {
  test("completes a checkout with one item @smoke", async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.goto();
    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await inventoryPage.cartLink.click();

    await cartPage.expectItem("Sauce Labs Backpack");
    await cartPage.checkout();

    await checkoutPage.fillCustomerInfo("Yajun", "Chen", "200000");
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test("requires a postal code @regression", async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.goto();
    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await inventoryPage.cartLink.click();

    await cartPage.checkout();
    await checkoutPage.fillCustomerInfo("Yajun", "Chen", "");
    await checkoutPage.expectError("Postal Code is required");
  });
});
