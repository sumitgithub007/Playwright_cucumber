import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";
import { channel } from "process";

//const headless = process.env.npm_config_HEADMODE?.toLowerCase() === 'true';
const chromeOptions: LaunchOptions = {
    headless: true,
    channel: "chrome",
    // slowMo: 1000 // Optional, uncomment if needed
};
const options: LaunchOptions = {
    headless: false,
    
 }
export const invokeBrowser = () => {
 
    
    const browserType = process.env.BROWSER ;
    switch (browserType) {
        case "chrome":
            return chromium.launch(chromeOptions);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }

}