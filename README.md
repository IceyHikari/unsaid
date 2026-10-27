# Unsaid / 未说出口

SD5913 Assignment 3 · Individual interactive experience · Minyi Jin

[Play in your browser / 在线试玩](https://iceyhikari.github.io/unsaid/)

English opens by default, including the introductory guide. Select 中文 in the guide or header for Chinese; switching language preserves your arrangement.

默认以英文打开，包含首次引导。在引导或页头选择中文即可切换，当前布置会保留。

![Interactive studio with a movable painting and lamp](screenshot.png)

## Why I made this / 我想做什么

I wanted to make a small experience about empathy and artistic expression. In my own game-design work, I care about what a work is trying to express and how someone encounters it. For this project, I focused on a quieter decision: how much of a personal memory someone wants to share through an exhibition.

The story takes place the night before an exhibition. Alex asks you to help arrange a studio. A painting of their mother's room, an old photograph, a study sheet and a personal statement are still waiting to be placed. I wanted players to discover the room through its objects, then decide what visitors will see in the morning. The experience is for people who enjoy exploring illustrated spaces and finding a story in small details.

我想做一个关于同理心和艺术表达的小作品。做游戏时，我很在意作品想表达什么，以及玩家怎样接触到这些表达。这次我把范围缩小到一个具体的选择：一个人愿意在展览里分享多少私人记忆。

故事发生在展览前夜。阿岚请玩家帮忙整理工作室，画、旧照片、草稿和私人自述都还没有安排好。我希望玩家先通过物件理解这个房间，再决定明天的观众会看到什么。它面向喜欢探索画面、留意小细节的玩家。

I began with a branching conversation. After trying it and hearing a classmate's feedback, I felt that choosing lines left too little for the player to do. I changed the direction to arranging the room itself. The early prototype is preserved in Git history (commit `8f5634f`); my decisions and revisions are in [PROCESS.md](PROCESS.md).

初版是分支对话。我自己体验后，加上同学的反馈，都觉得玩家主要是在选台词，能参与的事情太少。因此我改成了可以直接操作的工作室。早期版本仍保留在 Git 历史中，具体取舍写在过程记录里。

## Playing / 怎么玩

- Move the hanging lamp, or use the light-position slider. Light reveals the curtain detail whether the painting is on the wall, rack or in the packing area. A warm highlight shows when the lamp reaches it.
- Pick up the photograph, study sheet and exhibition label. Turn them over to read the reverse.
- Drag the painting to the wall, holding rack or packing area. Its position and Alex's response change together. The position buttons below the scene offer the same actions; clicking the painting cycles through the three positions.
- Open the label to keep the personal statement on display or put it aside. Visitors will see a different amount of Alex's story depending on this choice.
- In the packing area, the painting lies diagonally inside the box under translucent protective paper. Moving it back to the wall or rack removes the paper. Light can still reach the painted detail.
- Inspect two different objects before opening the doors. The counter shows your progress. Your arrangement leads to one of four morning scenes: sharing the statement, exhibiting the painting alone, leaving it on the rack, or taking it home. You can return to change the arrangement or begin a new evening.

The guide opens when the page loads and can be reopened with “How to play”. Undo restores the previous action; Start over asks for confirmation.

进入页面会先弹出引导，右上角可以再次打开。移动灯光、翻看物件，试着把画放到不同位置，再决定是否公开展签上的私人自述。包装区里的画会斜放在保护纸下，移回墙面或暂存架即可拆开。查看两件不同物品后就能开门，看看自己的布置对应怎样的清晨。可以回到夜里重新调整，也能撤回或从头再玩。

## Run locally / 本地运行

Install Python 3. In a fresh terminal:

```powershell
git clone https://github.com/IceyHikari/unsaid.git
cd unsaid
py -m http.server 8033 --bind 127.0.0.1
```

Open **http://127.0.0.1:8033** in a current Edge, Chrome, Firefox or Safari browser. On macOS/Linux, replace `py` with `python3`. Stop with Ctrl+C. If the port is occupied, use `8034` in both the command and URL.

The experience uses HTML, CSS, SVG and JavaScript. After cloning, it needs no third-party runtime packages, build, API key, account or network service. The live version needs an internet connection to load.

运行上述命令后打开对应地址。无需第三方运行依赖、构建或在线 AI 服务。Ctrl+C 停止服务器；如果端口被占用，同时修改命令与网址中的端口号。

Use Tab to focus controls and Enter/Space to activate them. Use arrow keys on the native light slider. Position buttons offer an alternative to dragging. Escape closes a dialog. Touch users can use scene objects, the slider and position buttons.

## How the interaction works / 交互怎样实现

The `state` object in `app.js` holds the lamp position, painting location, label visibility, inspected objects and whether the curtain detail has been discovered. Pointer events update the lamp or painting; `setPlace()` changes the painting's location; `render()` applies that state to the picture, notes and character feedback. Buttons and the slider offer alternative inputs to the same state. Undo uses snapshots of previous states.

I wanted players to feel free to try an arrangement and change their minds. An invalid drop returns the painting to its previous location and explains where it can go. Cancelled movements also restore the previous state. Choosing the current location again leaves it unchanged. Before opening, the counter states exactly how many different objects are still needed.

我希望玩家敢于尝试，也能改变主意。画拖到无效位置会回到原处，并提示可以放在哪里；撤回会恢复上一步。开门前的进度直接显示还差几件物品，避免玩家把条件未满足误认为按钮失灵。

## Limits / 目前的范围

The story is fictional and involves bereavement. It is not a counselling tool. The room and artwork are geometric SVG illustrations; light reveals a prepared layer rather than simulating optics. The painting snaps to three destinations, while the smaller objects are inspected in place. Refreshing starts a new session. There is no persistent save, audio or AI service running inside the experience.

I used two classmates' feedback to revise the interaction, as recorded in [USER-TRIAL.md](USER-TRIAL.md). At least one tried it independently before I explained the controls. I have not recorded a classmate retest of the latest revision or a physical-phone trial; mobile verification used a touch-enabled browser viewport.

故事是涉及丧亲记忆的虚构创作。灯光是预设图层，画作吸附到三个固定位置，刷新会重新开始；目前没有存档、声音或在线生成。我根据两位同学的反馈做了修改，其中至少一位先自行尝试，再听我讲解。最新版尚未记录同学复测或实体手机测试，手机操作验证使用的是支持触控的浏览器视口。

## Tools and verification / 工具与验证

I used Codex for concept proposals, draft dialogue, code, SVG/CSS artwork, documentation and browser-check scripts. I directed the revisions through feedback on the interaction, wording, packing and endings. [PROCESS.md](PROCESS.md) describes what I kept and changed; [CREDITS.md](CREDITS.md) lists the assistance and materials.

The run instructions and interaction were verified locally in Edge. To reproduce the optional developer checks, install Node.js and Microsoft Edge, keep the server above running, then:

```powershell
npm install --no-save --package-lock=false playwright
node browser-check.cjs
```

Playwright is only a development tool. Checks cover the opening guide, language switching, two-object condition, lamp dragging and slider, all painting locations, packing, object flipping, four endings, undo, invalid drops, keyboard alternatives, reset confirmation and mobile touch controls. Desktop and mobile screenshots are included. The browser checks do not replace the classmate feedback.

我用 Codex 辅助提出方案、起草对白、编写程序和场景素材，也让它协助整理文档与运行检查。我负责判断体验是否合适、提出具体修改并决定保留哪些设计。自动检查验证程序行为，同学的反馈则帮助我判断操作和反馈是否容易理解。

## Submission / 提交

Due **1 November 2026, 23:59 Hong Kong time**. My repository URL is **https://github.com/IceyHikari/unsaid**.

I submitted this repository URL on Canvas on 22 October at 09:30. The submission details have been checked against my screenshot. I plan to resubmit the same URL before the deadline so the submission snapshot reflects the finished version.

我已于 10 月 22 日 9:30 在 Canvas 提交此仓库地址，提交详情截图中的链接正确。最终版本完成后，需要在截止前再提交一次相同地址，更新提交时的页面快照。

Source, screenshots, run instructions, process notes and credits are included. A fresh public clone was run on 25 October; anonymous repository access was checked. The English-default revision was checked on 26 October.
