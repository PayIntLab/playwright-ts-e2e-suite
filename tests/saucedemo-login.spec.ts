import { test } from "../fixtures/test-fixtures";

test.describe("SauceDemo login @ui", () => {
  test("logs in with valid credentials @smoke", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.expectLoggedIn();
  });

  test("shows an error for a locked-out user @regression", async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.expectLoginError("Sorry, this user has been locked out");
  });

  test("shows an error for invalid credentials @regression", async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("wrong_user", "wrong_password");
    await loginPage.expectLoginError("Username and password do not match");
  });
});
