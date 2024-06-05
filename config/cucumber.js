module.exports= {



    "default": {
      
       "tags":process.env.npm_config_TAGS || "@sanity",
        "formatOptions":{
            "snippetInterface": "async-await",
            "monochrome":"true"

        },
        

 "paths":[
    "src/test/features/"
    
 ],
 
 "publishQuiet":true,
 "dryRun":false,
 "require":[
    "src/test/steps/*.ts",
    "src/test/hooks/hooks.ts"
 ],
 "requireModule":[
    "ts-node/register"
 ],
 
 "format": [
   "progress-bar",
   "html:test-results/cucumber-report.html",
   "json:test-results/cucumber-report.json",
   "rerun:@rerun.txt"
],
"parallel":6


},

"rerun": {

   "formatOptions":{
       "snippetInterface": "async-await",
       "monochrome":"true"

   },
   
 

"publishQuiet":true,
"dryRun":false,
"require":[
"src/test/steps/*.ts",
"src/test/hooks/hooks.ts"
],
"requireModule":[
"ts-node/register"
],

"format": [
"progress-bar",
"html:test-results/cucumber-report.html",
"json:test-results/cucumber-report.json",
"rerun:@rerun.txt"
],
"parallel":1



}





    
}