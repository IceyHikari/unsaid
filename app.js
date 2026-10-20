let language=0, path=[], node="start", locked=false;
const $=id=>document.getElementById(id);
const pair=(en,zh)=>language?zh:en;
function render(focus=false){
 document.documentElement.lang=language?"zh-CN":"en";
 $("language").textContent=language?"English":"中文";
 $("chapter").textContent=pair("01 / THE NIGHT BEFORE","01 / 展览前夜");
 $("title").textContent=pair("Some things need room to be said.","有些话，需要一点余地。");
 $("intro").textContent=pair("An exhibition opens tomorrow. Your friend Alex is still here, standing beside a painting of an empty room.","明天展览就要开幕。朋友阿岚还站在这里，面前是一幅画着空房间的画。");
 $("note").textContent=pair("A fictional conversation · No score, no perfect reply.","一段虚构对话 · 没有评分，也没有完美的回应。");
 $("place").textContent=pair("STUDIO / 23:47","工作室 / 23:47");
 $("progress").textContent=pair(`${path.length} replies`,`${path.length} 次回应`);
 $("back").textContent=pair("← Go back","← 回到上一步");$("back").disabled=!path.length;
 $("restart").textContent=pair("Start again ↺","重新开始 ↺");
 $("history").replaceChildren();
 if(path.length){const last=path.at(-1), p=document.createElement("p");p.className="past";p.textContent=pair("YOU · ","你 · ")+STORY[last.node].choices[last.choice].text[language];$("history").append(p);}
 const state=STORY[node];$("current").replaceChildren();
 const name=document.createElement("h2");name.textContent=pair("ALEX","阿岚");
 const line=document.createElement("p");line.textContent=state.line[language];
 const direction=document.createElement("p");direction.className="direction";direction.textContent=state.direction[language];$("current").append(name,line,direction);
 $("choices").replaceChildren();$("feedback").textContent="";
 if(state.choices)state.choices.forEach((choice,index)=>{const b=document.createElement("button");b.textContent=choice.text[language];b.addEventListener("click",()=>choose(node,index));$("choices").append(b);});
 else{const heading=document.createElement("h3");heading.textContent=state.end[language];$("choices").append(heading);const d=document.createElement("details"),s=document.createElement("summary"),list=document.createElement("ol");s.textContent=pair("Look back at your conversation","回看这段对话");path.forEach(step=>{const li=document.createElement("li");li.textContent=STORY[step.node].choices[step.choice].text[language];list.append(li);});d.append(s,list);$("choices").append(d);$("feedback").textContent=pair("An ending, not a verdict. Go back to explore a different response, or begin again.","这是一个结尾，不是评判。你可以回退，尝试另一种回应，或重新开始。");}
 if(focus)$("current").focus();
}
function choose(expected,index){if(locked||expected!==node)return;const choice=STORY[node].choices?.[index];if(!choice)return;locked=true;path.push({node,choice:index});node=choice.next;render(true);setTimeout(()=>{locked=false;},350);}
$("language").onclick=()=>{language=1-language;render();};
$("back").onclick=()=>{if(locked||!path.length)return;node=path.pop().node;render(true);};
$("restart").onclick=()=>{if(!path.length)return;path=[];node="start";locked=false;render(true);$("feedback").textContent=pair("Conversation restarted.","对话已重新开始。");};
render();
