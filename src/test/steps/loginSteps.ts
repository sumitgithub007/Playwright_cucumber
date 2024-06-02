import {Given,When,Then,setDefaultTimeout} from "@cucumber/cucumber";
import {chromium,Page,Browser,expect} from "@playwright/test"
import { pageFixture } from "../hooks/pageFixture";
setDefaultTimeout(60000);
 

Given('User navigates to the application', async function () {
  
  
   
    //above line force goto method to wait for 60 seconds ,30 sec is default time 
    //In framework I guess playwright.config.ts will not work as everything is 
    //controlled by cucumber runner  .Note : setDefaultTimeout(60000); this will
    //have no effect on page fixture,its more related to cucumber
    await  pageFixture.page.goto("https://bookcart.azurewebsites.net/");

  });
 
  
 
 
 Given('User click on the login link', async function () {
    
  await  pageFixture.page.locator("(//*[contains(text(),'Login')])[1]").click();      

});


    

      Given('User enter the username as {string}', async function (username) {
    
        await  pageFixture.page.locator("input[formcontrolname='username']").fill(username);

      });
 
   
     
      When('user should get logout from page', async function () {

        await pageFixture.page.locator("(//span[@class='mdc-button__label'])[2]").click();
        await expect(pageFixture.page.locator("//*[text()='Logout']")).toBeVisible({timeout:6000});
        await pageFixture.page.locator("//*[text()='Logout']").click();
        await pageFixture.page.waitForLoadState("networkidle");
        await pageFixture.page.waitForTimeout(3000);
      });

      Given('User enter the password as {string}', async function (password) {
    
        await  pageFixture.page.locator("input[formcontrolname='password']").fill(password);
        await  pageFixture.page.waitForTimeout(2000);
      });
 
 
 
    

      Then('Login should be success', async function () {
    
        await  pageFixture.page.waitForLoadState("networkidle");
        const user =  pageFixture.page.locator("(//span[@class='mdc-button__label'])[2]");
        await expect(user).toBeVisible();
        const userName = await user.textContent();
        console.log("Username: " + userName);
        
      });

 
   
 
    
 

      When('User click on the login button', async function () {
    
        await  pageFixture.page.locator("button[color='primary']").last().click();
        await  pageFixture.page.waitForTimeout(2500);
      });

    

      When('Login should fail', async function () {
    
      const failureMesssage =  pageFixture.page.locator("//*[text()='Username or Password is incorrect.']");
    //  await expect(page).toHaveTitle('Example Domain', { timeout: 10000 });

      await expect(failureMesssage).toBeVisible({ timeout: 22000 });
      await  pageFixture.page.waitForTimeout(2000);
       });
