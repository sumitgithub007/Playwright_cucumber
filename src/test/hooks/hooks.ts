import { BeforeAll,AfterAll, After,Before } from "@cucumber/cucumber";
import { Browser, chromium ,Page} from "@playwright/test";
import { pageFixture} from "./pageFixture";
let page:Page;
let browser:Browser;
BeforeAll(async function () { 

 
    const browser = await chromium.launch({headless:false,channel:"chrome"});
    page=await browser.newPage();
    page.setDefaultTimeout(30000);
    pageFixture.page=page;


})

AfterAll(async function () { 

 
    await pageFixture.page.close();
    //await browser.close();
    

})
 
