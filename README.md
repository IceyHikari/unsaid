# Unsaid / 未说出口

SD5913 Assignment 3 · Individual interactive experience · Minyi Jin

[Play in your browser / 在线试玩](https://iceyhikari.github.io/unsaid/)

![Interactive studio with a movable painting and lamp](screenshot.png)

## The idea / 作品构想

The night before an exhibition, Alex asks you to help arrange a studio. A painting of their mother's room, an old photograph, a study sheet and a personal exhibition statement are still waiting to be placed. This short fictional experience is for people who enjoy exploring illustrated spaces and noticing the stories carried by objects. Arranging the exhibition becomes a way to consider how much of a private memory to share.

展览前夜，阿岚请你帮忙整理工作室。关于母亲房间的画、旧照片、草稿和一段私人自述，都还没有安排好。作品面向喜欢探索画面与物件故事的玩家：通过亲手布展，体会私人记忆与公开表达之间的取舍。

The first version used branching dialogue. Following the author's feedback that selecting lines felt too passive, the current version moves interaction into the illustrated room. The earlier prototype is preserved in Git history (commit `8f5634f`).

第一版是分支对话。作者认为点击台词过于被动，因此当前版本改为画面中的物件操作。早期版本保留在 Git 历史中。

## What you can do / 操作

- Move the hanging lamp, or use the light-position slider. Light reveals the curtain detail on the wall, holding rack and packing area. Move the lamp towards the painting's current position; a warm highlight confirms alignment.
- Pick up the photograph, study sheet and exhibition label. Turn each over to read the reverse.
- Drag the painting to the wall, holding rack or packing area. The visible placement, selected control and character response change together. Position buttons below the scene offer the same action; clicking the painting cycles through positions.
- Take the statement off the wall or put it back. Its location in the room changes.
- After inspecting two objects, open the doors. An illustrated morning epilogue reflects your actual arrangement: sharing the statement, exhibiting the painting alone, leaving it on the rack, or taking it home. Each has distinct closing text. Revise the exhibition or begin a new evening using separate buttons.
- Undo restores the previous action. Start over asks for confirmation. English/Chinese switching preserves the arrangement.

拖灯或使用滑块照亮画中细节；拿起三件物品并翻面；将画放到墙面、暂存架或包装区；决定展签是否公开。查看至少两件物品后，可以结束布展，看到与当前布置对应的收尾。可以回到房间继续调整，也可撤回或确认重启。语言切换保留状态。

## Run locally / 本地运行

Install Python 3. In a fresh terminal:

```powershell
git clone https://github.com/IceyHikari/unsaid.git
cd unsaid
py -m http.server 8033 --bind 127.0.0.1
```

Open **http://127.0.0.1:8033** in a current Edge, Chrome, Firefox or Safari browser. On macOS/Linux, replace `py` with `python3`. Stop with Ctrl+C. If the port is occupied, use `8034` in both command and URL. No third-party runtime packages, build, API, key, account or network service are needed after cloning. The application is plain HTML, CSS, SVG and JavaScript. The live version needs an internet connection to load.

运行上述命令后打开对应地址。无需第三方依赖、构建或在线 AI 服务。Ctrl+C 停止服务器。如果端口被占用，同时修改命令与网址中的端口号。

Keyboard: use Tab to focus controls and Enter/Space to activate them. Use arrow keys on the native light slider. Position buttons provide a drag-free alternative. Escape closes an open dialog. “How to play” explains the controls in the selected language. Touch users can use the scene objects, slider and position buttons.

## Implementation / 实现

`state` in `app.js` holds light position, painting location, label visibility, inspected objects and whether the curtain detail has been discovered. Pointer events update the light or painting; `setPlace()` changes placement; `render()` applies state to SVG highlights, object positions, notes and character feedback. The same state changes are available through ordinary buttons and a native slider. Undo uses state snapshots.

A relevant mistake is an invalid painting drop: the picture returns to its previous location and a status message explains where to place it. A cancelled pointer movement also restores state. Repeated selection of the current position leaves it unchanged. Reset requires confirmation. The ending dialog can be closed to continue arranging.

## Limitations / 局限

This is stylised fiction involving bereavement, not a counselling tool. Light reveals an authored visual layer rather than simulating optics. The artwork and room are geometric SVG illustrations. Painting movement snaps to three destinations; other objects are inspected in place. Refreshing restarts the session; there is no persistent save, audio or network AI. Feedback from two classmates has been reported by the author and informed revisions; the developer did not directly observe those sessions. Whether controls were explained before those sessions still needs clarification. A participant retest of the latest changes has not been reported.

这是涉及丧亲记忆的风格化虚构作品。光照通过预设图层表达，画作吸附到三个固定位置，不是物理模拟。刷新会重启，没有存档、声音或在线生成。两位同学的反馈已由作者转述并用于修改，助手未直接观察试用。试用前是否讲解玩法仍待确认，新版尚未收到参与者复测。

## Development verification / 开发验证

Run instructions and the interaction were checked locally in Edge. To reproduce optional developer browser checks, install Node.js and Microsoft Edge, keep the server above running, then:

```powershell
npm install --no-save --package-lock=false playwright
node browser-check.cjs
```

Playwright is used only for development. Checks cover lamp dragging and slider input, discovery and undo, inspecting and flipping, label placement, all four closing scenes, painting drag, invalid drop recovery, keyboard alternatives, language switching, reset confirmation and a touch-enabled mobile viewport. Desktop and mobile screenshots are included. A physical phone trial remains to be done.

## Submission status / 提交状态

Due **1 November 2026, 23:59 Hong Kong time**, according to the supplied Canvas brief. Submit the public repository URL **https://github.com/IceyHikari/unsaid**, not just the live website.

- [x] Working browser prototype, screenshot and run instructions.
- [x] Scene interactions and mistake recovery checked in a browser.
- [x] Development decisions, AI assistance and credits documented.
- [ ] Author review of the revised scene and interaction.
- [x] Two classmates' feedback recorded as reported by the author, with resulting design decisions.
- [ ] Confirm whether the trial started before explaining controls; report any final participant retest.
- [ ] Final fresh-terminal run and signed-out repository check.
- [ ] Final repository URL submitted on Canvas by the author.

See [PROCESS.md](PROCESS.md), [USER-TRIAL.md](USER-TRIAL.md) and [CREDITS.md](CREDITS.md).
