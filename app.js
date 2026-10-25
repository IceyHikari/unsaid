// Deliberate action -> scene state -> visual change and character feedback.
const $=id=>document.getElementById(id), T=(en,zh)=>lang?zh:en;
const initial=()=>({light:30,place:'wall',label:true,seen:[],revealed:false});
let lang=1,state=initial(),history=[],currentObject=null,flipped=false,drag=null,voice='welcome',status='';
const names={wall:['Wall','墙面'],rack:['Holding rack','暂存架'],pack:['Packing area','包装区'],photo:['Old photograph','旧照片'],sketch:['Study sheet','草稿'],label:['Exhibition label','展签']};
const text={welcome:["Could you help me get this room ready? I'm still not sure how much I want to share tomorrow.","陪我整理一下吧。我还没想好，明天到底想让别人看见多少。"],light:["There. That strip by the curtain. She always left it open a little. That's the part I kept repainting.","就是那里，窗帘旁边的那条光。她总会留一道缝。那是我一直重画的部分。"],wall:["From here you can see the whole room. Could we leave a little space around it?","放在这里，能看见整个房间。周围留一点空白吧。"],rack:["Let's leave it here while I think. It feels easier when it doesn't have to be a final decision.","先放在这里，让我想想。不用马上决定的话，好像就没那么难了。"],pack:["Maybe I'll take it home tonight. Could you leave the wrapping open until we're done?","也许今晚我想把它带回家。先别封好包装，等我们整理完。"],labelOff:["Thank you. I can show the painting without giving everyone the whole story.","谢谢。把画留下，也不一定要把所有事情都讲出来。"],labelOn:["That is a lot to put beside a painting. Let me look at it once more before morning.","放在一幅画旁边，这些话好像有点多。天亮前，再让我看一次吧。"]};
function snapshot(){return {state:structuredClone(state),voice};}
function save(){history.push(snapshot());if(history.length>60)history.shift();}
// A shared light model follows the painting rather than requiring wall placement.
function lightTarget(){return {wall:48,rack:78,pack:88}[state.place];}
function aligned(){return Math.abs(state.light-lightTarget())<=7;}
function detectLight(){if(aligned()&&!state.revealed){state.revealed=true;voice='light';status=T('The curtain catches the light.','窗帘旁的细节显现了。');}}
function setPlace(place){if(state.place===place){status=T('The painting is already here.','画已经放在这里了。');render();return;}save();state.place=place;voice=place;status=T('Painting moved. You can undo this.','画的位置已改变，可以撤回。');detectLight();render();}
function renderBase(){
 document.documentElement.lang=lang?'zh-CN':'en';$('language').textContent=T('中文','English');$('help').textContent=T('How to play','怎么玩');$('studio').setAttribute('aria-label',T('Interactive studio','互动工作室'));
 $('chapter').textContent=T('THE NIGHT BEFORE / 23:47','展览前夜 / 23:47');$('title').textContent=T('Leave a little light for tomorrow.','替明天，留一点光。');$('intro').textContent=T('“Stay and help me get this ready?” Alex hands you the painting, then glances at the old photograph on the table.','“开门之前，陪我把这里收拾一下吧。” 阿岚把画交给你，又看了一眼桌上的旧照片。');
 $('voice-label').textContent=T('ALEX / THE STUDIO','阿岚 / 工作室');$('voice').textContent=text[voice][lang];$('notes-title').textContent=T('Details to take into tomorrow','今晚留下的细节');$('notes').replaceChildren();
 let notes=state.seen.map(x=>({photo:T('The photo: a room with the curtain half open.','照片里，窗帘没有完全拉上。'),sketch:T('The same strip of light, painted six times.','同一条光，画了六次。'),label:T('The statement tells more than the painting does.','自述写下了画以外的私人记忆。')}[x]));if(state.revealed)notes.push(T('In the light, the curtain detail becomes visible.','灯光下，窗帘细节显现了。'));if(!notes.length)notes=[T('There are a few things on the table. Take a closer look.','桌上还有几样东西，可以拿起来看看。')];notes.forEach(n=>{const li=document.createElement('li');li.textContent=n;$('notes').append(li);});
 $('status').textContent=status;$('finish').textContent=T('Leave the room ready','就这样，准备开门');$('undo').textContent=T('↶ Undo','↶ 撤回一步');$('undo').disabled=!history.length;$('restart').textContent=T('Start over','重新开始');$('light-label').textContent=T('Light position','灯光位置');$('placement-label').textContent=T('Place painting','画作放在');$('light').value=state.light;$('light-value').textContent=Math.round(state.light)+'%';
 document.querySelectorAll('[data-place]').forEach(b=>{const p=b.dataset.place;b.setAttribute('aria-pressed',String(state.place===p));b.classList.toggle('active',state.place===p);if(b.classList.contains('zone'))b.querySelector('span').textContent=names[p][lang];else b.textContent=names[p][lang];});
 document.querySelectorAll('[data-object]').forEach(b=>{b.querySelector('.tag').textContent=names[b.dataset.object][lang];b.setAttribute('aria-label',T('Inspect ','查看')+names[b.dataset.object][lang]);b.classList.toggle('seen',state.seen.includes(b.dataset.object));});document.querySelector('.label').classList.toggle('removed',!state.label);
 const positions={wall:[38,18,20],rack:[72,58,12],pack:[82,77,13]};const [x,y,w]=positions[state.place];$('painting').dataset.location=state.place;if(!drag||drag.kind!=='painting')Object.assign($('painting').style,{left:x+'%',top:y+'%',width:w+'%'});
 $('painting').setAttribute('aria-label',T('Painting: drag to an area, or click to cycle positions.','画作：拖动至标记区域，或点击切换位置。'));$('lamp').style.left=state.light+'%';$('beam').style.left=state.light+'%';$('lamp').querySelector('span').textContent=T('Move light','移动灯光');$('lamp').setAttribute('aria-label',T('Move light; also available using the slider below.','移动灯光，也可使用下方滑块。'));$('hidden-light').style.opacity=aligned()?'1':'0';
 $('painting').classList.toggle('illuminated',aligned());
 $('beam').style.height=({wall:85,rack:120,pack:150}[state.place])+'%';
 $('stage-caption').textContent=aligned()?T('The light found the painting. What will you let visitors see?','灯光落在画上。你想让明天的观众看见什么？'):T('Move the lamp towards the painting, wherever you have placed it.','把灯移到画的上方，放在哪里都能照亮。');$('footer-note').textContent=T('THE NIGHT BEFORE · AN INTERACTIVE STUDIO','展览前夜 · 一间可以慢慢整理的工作室');
 $('help-title').textContent=T('A room before morning','天亮之前');$('help-copy').textContent=T('Move the lamp left or right, or use its slider. When the painting is on the wall, light near its curtain reveals a detail.\n\nPick up the photograph, study sheet and label. Turn them over. The label can stay on the wall or be taken down.\n\nDrag the painting to a marked area, or use the three position buttons below the room. Clicking the painting also cycles positions. Buttons work with Tab and Enter; use arrow keys on the light slider.\n\nWhen ready, leave the room. Undo and Start over let you try again. Nothing is uploaded or saved when you refresh.','左右拖动灯光，或使用下方滑块。画挂在墙上时，靠近窗帘的灯光会显露细节。\n\n拿起照片、草稿和展签，可以翻面。展签可以留下，也可以取下来。\n\n把画拖到标记区域，也可以使用下方三个位置按钮。点击画作会依次切换位置。按钮可用 Tab 和 Enter 操作，滑块可用方向键。\n\n整理好后，点击“准备开门”。随时可以撤回或重新开始。刷新会从头开始，操作不会上传。');$('help-ok').textContent=T('Back to the studio','回到工作室');$('reset-title').textContent=T('Begin the evening again?','重新回到今晚？');$('reset-copy').textContent=T('The light, painting and label will return to their starting positions.','灯光、画作和展签会恢复初始位置。');$('cancel-reset').textContent=T('Keep arranging','继续整理');$('confirm-reset').textContent=T('Start over','重新开始');$('continue').textContent=T('Return to the room','再看看这个房间');$('ending-eyebrow').textContent=T('BEFORE MORNING / 05:12','天快亮了 / 05:12');
 if(currentObject)renderObject();if($('ending').open)renderEnding();
}
const objectCopy={photo:[['A room, before it became a painting. The curtain is half open. An empty chair sits just outside the light.','成为画作之前，那个房间的样子。窗帘半掩，一把空椅子停在光线之外。'],['“She never closed the curtain all the way.” — Alex\nYou turn the photo over carefully. The paper is worn along one edge.','“她从来不会把窗帘完全拉上。”——阿岚\n你小心翻过照片，纸的一边已经磨毛了。']],sketch:[['Six studies of the same window. Most of the room is drawn only once; the narrow light is painted again and again.','同一扇窗画了六次。房间的其他部分只勾了一遍，窄窄的光却被反复涂改。'],['“Not brighter. Just a little further to the side.”\nThe note points to the gap in the curtain. Try moving the studio light while the painting is on the wall.','“不是更亮，再往旁边一点。”\n批注指向窗帘的缝隙。把画放在墙上时，可以试着移动工作室的灯。']],label:[['ROOM, 2026\n“The room I painted belonged to my mother. I have kept it almost unchanged since she died.”\nThe statement continues beyond the edge of the small card.','《房间》，2026\n“我画的是母亲的房间。她去世以后，我几乎没有改变过它。”\n小小的展签上，自述还在继续。'],['“I want people to see the painting. I am not sure I want to explain all of this tomorrow.”\nYou can leave the statement in place, or put it on the table.','“我想让人看见这幅画，但还没想好明天要不要解释这些。”\n你可以留下展签，也可以把它暂时放到桌上。']]};
function openObject(id){if(!state.seen.includes(id)){save();state.seen.push(id);}currentObject=id;flipped=false;render();$('inspect').showModal();}
function renderObject(){
 const id=currentObject;
 $('object-number').textContent=T('FOUND IN THE STUDIO','工作室里的物件');
 $('object-title').textContent=names[id][lang];
 $('object-copy').textContent=objectCopy[id][Number(flipped)][lang];
 $('flip').textContent=flipped?T('Turn to front','翻到正面'):T('Turn over','翻到背面');
 $('put-back').textContent=T('Put it back','放回去');
 $('label-toggle').hidden=id!=='label';
 $('label-toggle').textContent=state.label?T('Take the label down','暂时取下展签'):T('Put the label back','把展签放回墙上');
 const art=$('object-art');art.replaceChildren();
 if(flipped||id==='label'){
  const p=document.createElement('div');p.className='back-art';
  p.textContent=id==='photo'?T('a little light, every morning','每天清晨的一点光'):id==='sketch'?T('not brighter. to the side.','不是更亮，再往旁边一点。'):T('ROOM / 2026','房间 / 2026');art.append(p);
 }else if(id==='sketch'){
  const sheet=document.createElement('div');sheet.className='study-sheet';
  for(let i=0;i<6;i++){
   const study=document.createElementNS('http://www.w3.org/2000/svg','svg');study.setAttribute('viewBox','0 0 80 80');
   const window=document.createElementNS(study.namespaceURI,'path');window.setAttribute('d','M10 8h40v52H10zM33 8v52M10 60l40 14');window.setAttribute('fill','none');window.setAttribute('stroke','#59604d');window.setAttribute('stroke-width','2');
   const light=document.createElementNS(study.namespaceURI,'path');light.setAttribute('d',`M${26+i*2} 10v50l26 13`);light.setAttribute('stroke','#b19b5f');light.setAttribute('stroke-width',String(2+i%3));light.setAttribute('fill','none');study.append(window,light);sheet.append(study);
  }art.append(sheet);
 }else{
  const svg=$('painting').querySelector('svg').cloneNode(true);svg.querySelector('#hidden-light')?.remove();
  svg.style.filter='sepia(.65) saturate(.6)';svg.style.transform='rotate(-4deg)';art.append(svg);
 }
}
function closeObject(){$('inspect').close();currentObject=null;}
function renderEnding(){let title,copy;if(state.place==='pack'){title=T('Something to take home','今晚，先带回家');copy=T('“Could you help me with the corners?” Alex brings another sheet of paper. There will be an empty space on the wall tomorrow. For tonight, the painting has somewhere to go.','“你能帮我包一下边角吗？”阿岚又拿来一张纸。明天墙上会有一处空白。至少今晚，这幅画有了去处。');}else if(state.place==='rack'){title=T('A place to wait','留一个可以等待的位置');copy=T('“Leave it there until morning.” Alex sits down. You have cleared enough space to think, without packing the painting away.','“先放在那里，等天亮再说。”阿岚坐了下来。你们腾出了足够思考的空间，也没有把画收走。');}else if(!state.label){title=T('The painting can speak first','先让画留在这里');copy=T('“I can leave it like this.” Alex puts the statement in a drawer. Tomorrow, someone may stop in front of the painting. The rest of the story can wait.','“这样，我可以把它留下。”阿岚把自述放进抽屉。明天，也许有人会在画前停下来。其他的事情，可以慢慢再说。');}else{title=T('Before the doors open','开门之前');copy=T('Alex reads the label once more. “Will you stay for the first visitor?” The painting and the statement are still together. Morning is nearly here.','阿岚又读了一遍展签。“第一个人来的时候，你能在这里吗？”画和自述还放在一起。天就快亮了。');}$('ending-title').textContent=title;$('ending-copy').textContent=copy;$('ending-summary').textContent=T('Painting: ','画作：')+names[state.place][lang]+' · '+(state.label?T('Statement displayed','展签保留'):T('Statement set aside','展签暂时收起'))+'\n'+(state.revealed?T('The curtain detail was found.','你发现了窗帘旁的细节。'):T('The narrow light is still waiting to be found.','窗帘旁的细节，还留在画里。'));}
document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>setPlace(b.dataset.place));document.querySelectorAll('[data-object]').forEach(b=>b.onclick=()=>openObject(b.dataset.object));$('flip').onclick=()=>{flipped=!flipped;renderObject();};$('close-inspect').onclick=$('put-back').onclick=closeObject;$('inspect').addEventListener('close',()=>{currentObject=null;});$('label-toggle').onclick=()=>{save();state.label=!state.label;voice=state.label?'labelOn':'labelOff';status=T('The label has moved.','展签的位置已改变。');render();};
$('language').onclick=()=>{lang=1-lang;status='';render();};$('help').onclick=()=>$('help-dialog').showModal();$('close-help').onclick=$('help-ok').onclick=()=>$('help-dialog').close();$('undo').onclick=()=>{if(!history.length)return;const old=history.pop();state=old.state;voice=old.voice;status=T('Previous arrangement restored.','已恢复上一步的布置。');render();};
$('restart').onclick=()=>$('reset-dialog').showModal();$('cancel-reset').onclick=()=>$('reset-dialog').close();$('confirm-reset').onclick=()=>{state=initial();history=[];voice='welcome';status=T('The evening begins again.','又回到了展览前夜。');$('reset-dialog').close();render();};
let sliderStart=null;$('light').addEventListener('input',()=>{if(!sliderStart)sliderStart=snapshot();state.light=Number($('light').value);detectLight();render();});$('light').addEventListener('change',()=>{if(sliderStart){history.push(sliderStart);sliderStart=null;}render();});
$('finish').onclick=()=>{if($('ending').open)return;if(state.seen.length<2){const remaining=2-state.seen.length;status=T(`Inspect ${remaining} more different object${remaining===1?'':'s'}: photograph, studies or label. Then you can open the doors.`,`再查看 ${remaining} 件不同物品（旧照片、草稿或展签），就可以开门了。`);render();return;}renderEnding();$('ending').showModal();};$('continue').onclick=()=>$('ending').close();
function beginDrag(e,kind){if(e.button!==0)return;drag={kind,id:e.pointerId,startX:e.clientX,startY:e.clientY,moved:false,before:snapshot(),rect:$('studio').getBoundingClientRect()};e.currentTarget.setPointerCapture(e.pointerId);if(kind==='painting')$('studio').classList.add('dragging-room');}
function moveDrag(e){if(!drag||e.pointerId!==drag.id)return;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>5)drag.moved=true;if(!drag.moved)return;const x=(e.clientX-drag.rect.left)/drag.rect.width*100,y=(e.clientY-drag.rect.top)/drag.rect.height*100;if(drag.kind==='lamp'){state.light=Math.max(12,Math.min(88,x));detectLight();render();}else{$('painting').classList.add('dragging');Object.assign($('painting').style,{left:Math.max(0,Math.min(80,x-10))+'%',top:Math.max(0,Math.min(70,y-12))+'%',width:'20%'});}}
function endDrag(e,cancel=false){if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;$('studio').classList.remove('dragging-room');$('painting').classList.remove('dragging');if(cancel){state=d.before.state;voice=d.before.voice;status=T('Movement cancelled; the previous position was restored.','移动已取消，恢复原来的位置。');render();return;}if(d.kind==='lamp'){if(d.moved)history.push(d.before);render();return;}if(!d.moved){const places=['wall','rack','pack'];setPlace(places[(places.indexOf(state.place)+1)%3]);return;}const x=(e.clientX-d.rect.left)/d.rect.width*100,y=(e.clientY-d.rect.top)/d.rect.height*100;const target=x>=32&&x<=64&&y>=12&&y<=60?'wall':x>=69&&x<=86&&y>=53&&y<=80?'rack':x>=79&&x<=100&&y>=79&&y<=100?'pack':null;if(target){history.push(d.before);state.place=target;voice=target;status=T('Painting placed.','画已放好。');detectLight();}else status=T('Place it inside a marked area. The painting returned safely.','请放到标记区域内，画已回到原处。');render();}
for(const [id,kind] of [['painting','painting'],['lamp','lamp']]){const b=$(id);b.addEventListener('pointerdown',e=>beginDrag(e,kind));b.addEventListener('pointermove',moveDrag);b.addEventListener('pointerup',e=>endDrag(e));b.addEventListener('pointercancel',e=>endDrag(e,true));}
$('painting').addEventListener('click',e=>{if(e.detail===0){const places=['wall','rack','pack'];setPlace(places[(places.indexOf(state.place)+1)%3]);}});
// Additional scene feedback and the final visitor view use the same live arrangement.
function render(){
 renderBase();
 $('help-copy').textContent=T('Help Alex arrange the studio before the exhibition opens.\n\n1. Look closely: click at least TWO different objects — photograph, studies or label. You can turn each over.\n\n2. Find the light: drag the lamp or use its slider to illuminate the painting in any of its three positions.\n\n3. Arrange the exhibition: drag the painting to the wall, rack or packing area, or use the position buttons. Open the label to keep the private statement on display or set it aside.\n\n4. Open the doors: after inspecting two objects, see the morning scene your arrangement creates. Return to rearrange it or start again.\n\nUndo is available. Buttons support Tab and Enter; the slider supports arrow keys. You can reopen this guide with “How to play”.','展览就要开幕，陪阿岚一起把工作室整理好。\n\n1. 先看看：点击旧照片、草稿、展签中的至少两件不同物品。拿起后还可以翻面。\n\n2. 找到光：拖动灯，或使用灯光滑块。画放在三个位置都可以被照亮。\n\n3. 布置房间：拖动画作到墙面、暂存架或包装区，也可以用位置按钮。打开展签，选择保留还是收起私人自述。\n\n4. 开门看明天：查看两件物品后，开门进入与你的布置对应的结局。可以回来调整，也可以从头再玩。\n\n随时可以撤回。按钮支持 Tab / Enter，滑块支持方向键；右上角“怎么玩”可以再次打开这份引导。');
 $('finish').textContent=T('Open the doors →','开门，看看明天 →');
 const inspected=Math.min(state.seen.length,2);
 $('readiness').textContent=inspected<2?T(`Before opening: inspect two different objects (${inspected}/2).`,`开门前，先查看两件不同物品（${inspected}/2）。`):T('Two objects inspected. Your exhibition is ready to open.','已查看两件物品，可以开门看看明天了。');
 $('finish').setAttribute('aria-disabled',String(inspected<2));
 $('help-language').textContent=T('中文','English');
 $('help-ok').textContent=T('Start exploring','开始整理');
 document.querySelector('.mini-label').textContent=T('ROOM\n2026','房间\n2026');
 document.querySelector('.label').setAttribute('title',state.label?T('Visitors will read Alex’s personal statement.','观众会读到阿岚的私人自述。'):T('The statement is set aside; visitors will see the artwork alone.','私人自述已收起，观众只看作品。'));
 if(currentObject==='label')$('object-copy').textContent+=(state.label?T('\n\nDISPLAYED: visitors can read this personal history beside the painting.','\n\n当前：公开。观众会在画旁读到这段私人经历。'):T('\n\nSET ASIDE: visitors will see the painting without the personal statement.','\n\n当前：收起。观众只会看见画，不会读到这段私人经历。'));
 $('continue').textContent=T('Revise this exhibition','回到夜里，重新布置');
 $('play-again').textContent=T('Begin a new evening','开始新的一晚');
};
const oldEnding=renderEnding;
renderEnding=function(){
 oldEnding();
 const endingKey=state.place==='wall'?(state.label?'shared':'quiet'):state.place;
 $('ending').dataset.ending=endingKey;
 $('ending-eyebrow').textContent=T('EPILOGUE / THE NEXT MORNING','尾声 / 第二天清晨');
 const visitor={shared:T('The first visitor reads the statement, then steps back to look at the room. Alex stands beside you. “I can tell this part today.”','第一位观众读完展签，退后一步看那间房间。阿岚站在你身边：“今天，我可以讲这一部分。”'),quiet:T('A visitor stops at the painting. Without a statement to read, they spend a little longer looking at the curtain. Alex lets the silence stay.','观众在画前停下。没有自述可读，目光在窗帘上多停留了一会儿。阿岚没有急着解释。'),rack:T('The doors open onto a space still being arranged. Alex sits beside the rack with a pencil. “Not everything has to be ready at the same time.”','门开了，房间仍在整理。阿岚拿着铅笔坐在暂存架旁：“也许，不用所有事情都一起准备好。”'),pack:T('By morning the painting is wrapped, ready to travel. Alex lifts it gently. An empty place remains on the wall, waiting for another day.','天亮时，画已经包好，准备带走。阿岚轻轻抱起它。墙上的位置暂时空着，留给另一天。')};
 $('visitor-response').textContent=visitor[endingKey];
 const scene=$('final-scene');scene.replaceChildren();
 const room=document.querySelector('.room').cloneNode(true);
 room.querySelectorAll('[id]').forEach(el=>{const old=el.id;el.id='final-'+old;room.querySelectorAll('[fill]').forEach(shape=>{if(shape.getAttribute('fill')===`url(#${old})`)shape.setAttribute('fill',`url(#final-${old})`);});});scene.append(room);
 const painting=$('painting').cloneNode(true);painting.removeAttribute('id');painting.className='final-painting';painting.disabled=true;painting.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));scene.append(painting);
 if(state.place==='pack'){const wrap=document.createElement('div');wrap.className='final-wrap';painting.append(wrap);}
 if(state.place==='wall'&&state.label){const label=document.createElement('div');label.className='final-label';label.textContent=T('ROOM / 2026\nA personal history','房间 / 2026\n一段私人记忆');scene.append(label);}
 const dawn=document.createElement('div');dawn.className='dawn';scene.append(dawn);
 const caption=document.createElement('p');caption.className='final-caption';caption.textContent={shared:T('The story is shared.','故事被讲给了别人。'),quiet:T('The work speaks first.','先让作品开口。'),rack:T('There is still time.','还有一些时间。'),pack:T('A memory goes home.','一段记忆，被带回家。')}[endingKey];scene.append(caption);
};
$('play-again').onclick=()=>{$('ending').close();state=initial();history=[];voice='welcome';status='';render();};
render();
$('help-language').onclick=()=>{lang=1-lang;status='';render();};
$('help-dialog').showModal();
