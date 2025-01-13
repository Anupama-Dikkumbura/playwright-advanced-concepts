import { test } from '@playwright/test';
import { TD_ValidUser, TD_InvalidUser } from '../../../testdata/user.json'
import LoginPage from '../pages/login-page';
import pages from '../../../utils/pages';
import messages from '../../../utils/messages';

const username: string = TD_ValidUser.username;
const password: string = TD_ValidUser.password;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/index.html');
    loginPage = new LoginPage(page);
});

test.describe('Store - Login', () => {
    test(`successfull login`, async () => {
      await loginPage.doLogin(username, password);
      await loginPage.checkLoggedIn();
    });
  
    test(`failing login - invalid username`, async () => {
      await loginPage.doLogin(TD_InvalidUser.username, TD_ValidUser.password);
      await loginPage.checkErrorMessage(messages.login.invalid);
    });
  
    test(`failing login - invalid password`, async () => {
      await loginPage.doLogin(TD_ValidUser.username, TD_InvalidUser.password);
      await loginPage.checkErrorMessage(messages.login.invalid);
    });
  });

  test.afterAll(async ({ page }) => {
    await page.close();
  });