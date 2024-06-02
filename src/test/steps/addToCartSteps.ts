import {Given,When,Then,setDefaultTimeout} from "@cucumber/cucumber";
import {expect} from "@playwright/test"
import { pageFixture } from "../hooks/pageFixture";
setDefaultTimeout(60000);
 
 
 

         When('user search for a {string}', async function (book) {
          
          
          await pageFixture.page.locator("input[type='search']").fill(book);
       
          await pageFixture.page.locator("mat-option[role='option'] span").click();

         });
 
         
         

         When('user add the book to the cart', async function () {

          await pageFixture.page.locator("//button[@color='primary']").last().click();
          const toast = pageFixture.page.locator("simple-snack-bar");
          await expect(toast).toBeVisible();
          await toast.waitFor({ state: "hidden" })


          
         });
 

         Then('the cart badge should get updated', async function () {
          
          const badgeCount = await pageFixture.page.locator("#mat-badge-content-0").textContent();
          expect(Number(badgeCount)).toBeGreaterThan(0); //yha jarurat nai hai
          await pageFixture.page.waitForTimeout(2500);
         });

