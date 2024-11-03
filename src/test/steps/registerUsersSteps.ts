import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import * as data from "../../helper/utils/test-data/registerUser.json";

import { expect } from "@playwright/test";
import { fixture } from "../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import RegisterPage from "../../pages/registerPage";

setDefaultTimeout(60 * 1000 * 2)

 
let registerPage: RegisterPage;
let assert: Assert;

Given('I navigate to the register page', async function () {
    registerPage = new RegisterPage(fixture.page);
    assert = new Assert(fixture.page);
     await registerPage.navigateToRegisterPage();
});

When('I created a new user', async function () {
    const username = data.userName + Date.now().toString();
    await registerPage.registerUser(data.firstName, data.lastName,
        username, data.password, data.confirmPassword, "m");
        
        
        
});

Then('I confirm user registration is success', async function () {
    await assert.assertURL("https://bookcart.azurewebsites.net/login");
});
