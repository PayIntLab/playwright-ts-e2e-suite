import { test } from '../fixtures/test-fixtures';

test.describe('SauceDemo login', () => {
  test('logs in with valid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectLoggedIn();
  });

  test('shows an error for a locked-out user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectLoginError('Sorry, this user has been locked out');
  });

  test('shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_password');
    await loginPage.expectLoginError('Username and password do not match');
  });
});
