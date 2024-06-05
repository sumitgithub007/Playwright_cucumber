import {Given,When,Then,setDefaultTimeout} from "@cucumber/cucumber";
import {chromium,Page,Browser,expect} from "@playwright/test"
import { fixture } from "../hooks/pageFixture";
setDefaultTimeout(60000);
 

Given('User navigates to the application', async function () {
  
  
   
    //above line force goto method to wait for 60 seconds ,30 sec is default time 
    //In framework I guess playwright.config.ts will not work as everything is 
    //controlled by cucumber runner  .Note : setDefaultTimeout(60000); this will
    //have no effect on page fixture,its more related to cucumber
    await  fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to book website"); 
  });
 
  
 
 
 Given('User click on the login link', async function () {
    
  fixture.logger.info("clicking logiin button"); 
  await  fixture.page.locator("(//*[contains(text(),'Login')])[1]").click();      

});


    

      Given('User enter the username as {string}', async function (username) {
    
        fixture.logger.info("Entered username as ="+username); 
        await  fixture.page.locator("input[formcontrolname='username']").fill(username);

      });
 
   
     
      When('user should get logout from page', async function () {

        await fixture.page.locator("(//span[@class='mdc-button__label'])[2]").click();
        await expect(fixture.page.locator("//*[text()='Logout']")).toBeVisible({timeout:6000});
        await fixture.page.locator("//*[text()='Logout']").click();
        await fixture.page.waitForLoadState("networkidle");
        await fixture.page.waitForTimeout(3000);
      });

      Given('User enter the password as {string}', async function (password) {
    
        fixture.logger.info("Entered password as ="+password); 
        await  fixture.page.locator("input[formcontrolname='password']").fill(password);
        await  fixture.page.waitForTimeout(2000);
      });
 
 
 
    

      Then('Login should be success', async function () {
    
        await  fixture.page.waitForLoadState("networkidle");
        const user =  fixture.page.locator("(//span[@class='mdc-button__label'])[2]");
        await expect(user).toBeVisible();
        await expect(user).toBeEmpty();
        const userName = await user.textContent();
        console.log("Username: " + userName);
        fixture.logger.info("Login successfull username is ="+userName); 

        
      });

 
   
 
    
 

      When('User click on the login button', async function () {
    
        await  fixture.page.locator("button[color='primary']").last().click();
        await  fixture.page.waitForTimeout(2500);
      });

    

      When('Login should fail', async function () {
    
      const failureMesssage =  fixture.page.locator("//*[text()='Username or Password is incorrect.']");
    //  await expect(page).toHaveTitle('Example Domain', { timeout: 10000 });

      await expect(failureMesssage).toBeVisible({ timeout: 10000 });
      await  fixture.page.waitForTimeout(2000);
       });
