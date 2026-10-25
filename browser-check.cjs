// Developer-only QA: start the README server, then node browser-check.cjs.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8033');
 await page.screenshot({path:'screenshot.png',fullPage:true});
 // Opening must work from a fresh session with no inspected objects.
 await page.locator('#finish').click();assert(await page.locator('#ending').isVisible());await page.locator('#continue').click();
 for(const id of ['photo','sketch']){await page.locator(`[data-object=${id}]`).click();await page.locator('#flip').click();assert(await page.locator('#object-copy').innerText());await page.locator('#put-back').click();}
 assert.equal(await page.locator('#notes li').count(),2);
 await page.locator('#light').fill('48');await page.locator('#light').dispatchEvent('change');assert.equal(await page.locator('#hidden-light').evaluate(e=>e.style.opacity),'1');assert((await page.locator('#voice').innerText()).includes('窗帘'));
 await page.locator('#undo').click();assert.equal(await page.locator('#light').inputValue(),'30');
 const room=await page.locator('#studio').boundingBox(), lamp=await page.locator('#lamp').boundingBox();
 await page.mouse.move(lamp.x+lamp.width/2,lamp.y+lamp.height/2);await page.mouse.down();await page.mouse.move(room.x+room.width*.48,lamp.y+lamp.height/2,{steps:12});await page.mouse.up();assert.equal(await page.locator('#hidden-light').evaluate(e=>e.style.opacity),'1');
 await page.locator('[data-object=label]').click();await page.locator('#label-toggle').click();await page.locator('#put-back').click();assert(await page.locator('.label').evaluate(e=>e.classList.contains('removed')));
 await page.locator('#finish').click();assert.equal(await page.locator('#ending-title').innerText(),'先让画留在这里');await page.locator('#continue').click();
 await page.locator('.place-option[data-place=rack]').click();
 await page.locator('#light').fill('78');await page.locator('#light').dispatchEvent('change');assert.equal(await page.locator('#hidden-light').evaluate(e=>e.style.opacity),'1');
 await page.locator('#finish').click();assert.equal(await page.locator('#ending-title').innerText(),'留一个可以等待的位置');assert.equal(await page.locator('#ending').getAttribute('data-ending'),'rack');assert(await page.locator('#final-scene svg').count());await page.locator('#continue').click();
 // Drag from rack into packing area.
 let painting=await page.locator('#painting').boundingBox();await page.mouse.move(painting.x+painting.width/2,painting.y+painting.height/2);await page.mouse.down();await page.mouse.move(room.x+room.width*.9,room.y+room.height*.86,{steps:12});await page.mouse.up();assert.equal(await page.locator('.place-option[data-place=pack]').getAttribute('aria-pressed'),'true');
 await page.locator('#light').fill('88');await page.locator('#light').dispatchEvent('change');assert.equal(await page.locator('#hidden-light').evaluate(e=>e.style.opacity),'1');
 assert.equal(await page.locator('#painting').getAttribute('data-location'),'pack');assert.notEqual(await page.locator('#painting').evaluate(e=>getComputedStyle(e).transform),'none');assert.equal(await page.locator('#painting').evaluate(e=>getComputedStyle(e,'::after').pointerEvents),'none');
 await page.screenshot({path:'screenshot-packing.png',fullPage:true});
 await page.locator('#finish').click();assert.equal(await page.locator('#ending-title').innerText(),'今晚，先带回家');assert(await page.locator('.final-wrap').isVisible());await page.screenshot({path:'screenshot-ending.png',fullPage:true});await page.locator('#continue').click();
 // Invalid drop restores placement with feedback.
 painting=await page.locator('#painting').boundingBox();await page.mouse.move(painting.x+painting.width/2,painting.y+painting.height/2);await page.mouse.down();await page.mouse.move(room.x+room.width*.1,room.y+room.height*.3,{steps:10});await page.mouse.up();assert.equal(await page.locator('.place-option[data-place=pack]').getAttribute('aria-pressed'),'true');assert((await page.locator('#status').innerText()).includes('回到原处'));
 await page.locator('#painting').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.place-option[data-place=wall]').getAttribute('aria-pressed'),'true');
 await page.locator('[data-object=label]').click();await page.locator('#label-toggle').click();await page.locator('#put-back').click();await page.locator('#finish').click();assert.equal(await page.locator('#ending-title').innerText(),'开门之前');await page.locator('#continue').click();
 await page.locator('#language').click();assert.equal(await page.locator('.place-option[data-place=wall]').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('#title').innerText(),'Leave a little light for tomorrow.');
 await page.locator('#help').click();await page.keyboard.press('Escape');assert(!(await page.locator('#help-dialog').isVisible()));
 await page.locator('#restart').click();await page.locator('#cancel-reset').click();assert.equal(await page.locator('#notes li').count(),4);await page.locator('#restart').click();await page.locator('#confirm-reset').click();assert(await page.locator('#undo').isDisabled());assert.equal(await page.locator('#light').inputValue(),'30');
 await page.locator('#language').click();await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'screenshot-mobile.png',fullPage:true});
 for(const id of ['photo','sketch']){await page.locator(`[data-object=${id}]`).click();await page.locator('#put-back').click();}
 await page.locator('#finish').click();assert(await page.locator('#play-again').isVisible());assert(await page.locator('#ending').evaluate(e=>e.scrollWidth<=e.clientWidth));await page.locator('#play-again').click();assert(!(await page.locator('#ending').isVisible()));assert(await page.locator('#undo').isDisabled());
 // Touch-enabled context: inspect a card and move the painting with alternatives.
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const phone=await mobile.newPage();await phone.goto('http://127.0.0.1:8033');await phone.locator('[data-object=photo]').tap();await phone.locator('#flip').tap();await phone.locator('#put-back').tap();await phone.locator('.place-option[data-place=rack]').tap();assert.equal(await phone.locator('.place-option[data-place=rack]').getAttribute('aria-pressed'),'true');
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: lamp slider + drag, reveal + undo, inspect + flip, label toggle, four endings, painting drag, invalid drop, keyboard, language, reset confirmation, mobile layout + touch controls.');
})().catch(e=>{console.error(e);process.exit(1);});
