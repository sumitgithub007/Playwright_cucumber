import { BeforeAll,AfterAll, After,Before, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium ,Page} from "@playwright/test";
import { pageFixture} from "./pageFixture";
 

import { time } from "console";
let browser:Browser;
let context:BrowserContext;
let timestamp:string

BeforeAll(async function () {
     
    timestamp = new Date().toISOString().replace(/[-:]/g, ''); // Generate timestamp

    browser = await chromium.launch({headless:false,channel:"chrome"});

})
Before(async function () { 

 
    context = await browser.newContext();
    const page=await context.newPage();
    page.setDefaultTimeout(30000);
    pageFixture.page=page;


})

After(async function ({pickle,result}) { 

   // const timestamp = new Date().toISOString().replace(/[-:]/g, ''); // Generate timestamp
    //const filename = `./test-result/screenshots/${pickle.id}_${timestamp}.png`; // Concatenate timestamp with filename

    //const img = await pageFixture.page.screenshot({ path: filename, type: "png" });
 
   //const img = await pageFixture.page.screenshot({path:`./test-result_${timestamp}/screenshots/${pickle.id}.png`,type:"png"})
  console.log(result?.status);
  if(result?.status==Status.FAILED)
    {
        const img = await pageFixture.page.screenshot({path:`./test-result/screenshots/${pickle.id}.png`,type:"png"})
        await this.attach(img,"image/png"); 
    } 

   await pageFixture.page.close();
    await context.close();
   

})

AfterAll(async function () { 

 
    await browser.close();

})


 
