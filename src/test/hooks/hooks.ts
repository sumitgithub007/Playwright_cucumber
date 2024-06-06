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
    fixture.logger=createLogger(options(null));
     
    


})
Before(async function ({pickle}) { 

 
    context = await browser.
    newContext({viewport: { width: 1280,height: 674},recordVideo:{dir:"test-results/video"}
    
    });
    const scenarioName = pickle.name + pickle.id;
   
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
   
   
   
   
     const page=await context.newPage();
    page.setDefaultTimeout(30000);
    fixture.page=page;
   fixture.logger=createLogger(options(scenarioName));

})
 
After(async function ({pickle,result}) { 

    let videoPath: string;
    videoPath = await fixture.page.video().path();
      
    const img = await fixture.page.screenshot();
    const path = `./test-results/trace/${pickle.id}.zip`
    await context.tracing.stop({ path: path });
    await fixture.page.close();
    await context.close();
    
        await this.attach("hi there");
        await this.attach(fs.readFileSync(videoPath),"video/webm");
    
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
        await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
 
            
    //   await this.attach(img,"image/png"); 
})

//Below is working and correct
 AfterStep(async function ({pickle,result}) {
     
      const img = await fixture.page.screenshot();
      await this.attach(img,"image/png"); 
 })

AfterAll(async function () { 

      await browser.close();
    fixture.logger.close();

})


