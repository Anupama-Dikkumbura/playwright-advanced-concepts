import { expect, type Locator, type Page } from '@playwright/test';
import messages from '../../../utils/messages';

class LoginPage{
    readonly page: Page;
    readonly loginButton: string;
    readonly errorMessageText: string;
    readonly username: string;
    readonly password: string;

    constructor(page: Page){
        this.page = page;
        this.username = '//input[@data-test="username"]'
        this.password = '//input[@data-test="password"]'
        this.loginButton = '//input[@id="login-button"]';
        this.errorMessageText = '//h3[@data-test="error"]';
    }

    async fillUsername(username: string){
        await this.page.fill(this.username, username);
    }

    async fillPassword(password: string){
        await this.page.fill(this.password, password);
    }

    async clickLogin(){
        await this.page.click(this.loginButton);
    }

    async doLogin(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
      }

      async checkLoggedIn() {
        await expect(this.page).toHaveURL(/.*inventory/);
        await expect(this.page).toHaveTitle(/Swag Labs/);
      }
    
      async checkErrorMessage(errormsg: string): Promise<void> {
        let error = await this.page.textContent(this.errorMessageText);
        expect(error?.trim()).toEqual(errormsg);
    }


}

export default LoginPage;