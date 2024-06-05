import { BeforeAll,AfterAll, After,Before, Status, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext} from "@playwright/test";
import { fixture} from "./pageFixture";
import { invokeBrowser } from "../../helper/browsers/browserManager";
import { getEnv } from "../../helper/env/env";
import { createLogger } from "winston";
import { options } from "../../helper/utils/logger";
const fs= require("fs-extra");

let browser:Browser;
let context:BrowserContext;
let timestamp:string

BeforeAll(async function () {
     
   
    getEnv();
    browser = await invokeBrowser();

})
Before(async function ({pickle}) { 

 
    context = await browser.
    newContext({viewport: { width: 1280,height: 674},recordVideo:{dir:"test-results/video"}
    
    });

    const scenarioName = pickle.name+pickle.id;
    const page=await context.newPage();
    page.setDefaultTimeout(30000);
    fixture.page=page;
   fixture.logger=createLogger(options(scenarioName));

})
 
After(async function ({pickle,result}) { 

    let videoPath: string;
    videoPath = await fixture.page.video().path();
      
    const img = await fixture.page.screenshot();
    await fixture.page.close();
    await context.close();
    if (result?.status == Status.PASSED) {
        //await this.attach("hi there");
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        )};
 
      
    //   await this.attach(img,"image/png"); 
})

//Below is working and correct
 AfterStep(async function ({pickle,result}) {
    
    // timestamp = String(Date.now())//;
    await this.attach("info");
      const img = await fixture.page.screenshot();
      await this.attach(img,"image/png"); 
 })

AfterAll(async function () { 

     await browser.close();
    await fixture.logger.close();

})


