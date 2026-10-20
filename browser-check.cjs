// Optional developer QA: npm install --no-save --package-lock=false playwright
// Start the documented HTTP server first, then: node browser-check.cjs
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8033');
 await page.screenshot({path:'screenshot.png',fullPage:true});
 await page.locator('#choices button').nth(1).click();
 assert((await page.locator('#current').innerText()).includes("mother"));
 await page.waitForTimeout(400);
 await page.locator('#back').click();
 assert((await page.locator('#current').innerText()).includes('take it down'));
 await page.locator('#choices button').nth(0).dblclick();
 assert((await page.locator('#current').innerText()).includes('light is fine'));
 assert.equal(await page.locator('#progress').innerText(),'1 replies');
 await page.waitForTimeout(400);await page.locator('#choices button').nth(0).click();
 await page.waitForTimeout(400);await page.locator('#choices button').nth(0).click();
 assert.equal(await page.locator('#choices h3').innerText(),'A sentence, chosen together');
 await page.locator('summary').click();assert.equal(await page.locator('details li').count(),3);
 await page.locator('#language').click();assert.equal(await page.locator('#choices h3').innerText(),'一起选择的一句话');
 await page.locator('#restart').click();assert.equal(await page.locator('#choices button').count(),3);
 assert(await page.locator('#back').isDisabled());
 await page.setViewportSize({width:390,height:844});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'screenshot-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);await browser.close();
 console.log('Browser checks passed: branches, back, double-click guard, ending, recap, language, reset, mobile overflow, console.');
})().catch(e=>{console.error(e);process.exit(1);});
