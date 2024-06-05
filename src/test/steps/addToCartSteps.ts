import {Given,When,Then,setDefaultTimeout} from "@cucumber/cucumber";
import {expect} from "@playwright/test"
import { fixture } from "../hooks/pageFixture";
setDefaultTimeout(60000);
 
 
 

         When('user search for a {string}', async function (book) {
          
          fixture.logger.info("searching for book named "+book); 
          await fixture.page.locator("input[type='search']").fill(book);
       
          await fixture.page.locator("mat-option[role='option'] span").click();

         });
 
         
         

         When('user add the book to the cart', async function () {

          await fixture.page.locator("//button[@color='primary']").last().click();
          const toast = fixture.page.locator("simple-snack-bar");
          await expect(toast).toBeVisible();
          fixture.logger.info("waiting for 2000 ms so we can see whats happening"); 
          await fixture.page.waitForTimeout(2000);
          await toast.waitFor({ state: "hidden" })


          
         });
 

         Then('the cart badge should get updated', async function () {
          
          const badgeCount = await fixture.page.locator("#mat-badge-content-0").textContent();
          expect(Number(badgeCount)).toBeGreaterThan(0); //yha jarurat nai hai
          await fixture.page.waitForTimeout(2500);
         });

