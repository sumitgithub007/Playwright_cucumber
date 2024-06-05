import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";
import { channel } from "process";

const chromeoptions: LaunchOptions = {
    headless: false,
    channel:"chrome"
   // slowMo:1000
}
const options: LaunchOptions = {
    headless: false,
    
 }
export const invokeBrowser = () => {
    const browserType = process.env.BROWSER ;
    switch (browserType) {
        case "chrome":
            return chromium.launch(chromeoptions);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }

}