# Process / 开发记录

## 16 October 2026 — Establish the repository / 建立仓库

The author supplied the full Canvas Assignment 3 brief and requested a repository first. The initial scope is a planning scaffold. No gameplay, participant trial or user feedback has been completed for this project.

作者提供了 Canvas 上 Assignment 3 的完整要求，并要求先建立仓库。本次范围是规划框架；本项目尚未完成游戏实现、真人试用或试用反馈。

### AI assistance / AI 协作

Codex helped interpret the brief, proposed a short branching conversation concept and prepared the repository documents. The concept draws on the author's previously stated interest in empathy, artistic intention and AIGC game design. The specific scene and dialogue still need the author's review.

Codex 协助梳理要求，提出短篇分支对话构想，并准备仓库文档。构想参考作者此前关于同理心、艺术表达和 AIGC 游戏设计的兴趣；具体场景与台词仍待作者审阅。

### Kept / 暂时保留

Keep one visible input–response–feedback loop as the planning focus because it can be explained and tested within a small project. This is a provisional planning decision, not a reported user-test finding.

暂以一个可见的“输入—响应—反馈”循环为重点，便于在小项目中实现、解释和测试。这是暂定规划，不是真人试用结论。

### Changed or deferred / 调整与延后

The assistant proposed a narrative game, but the author requested repository setup first. Accordingly, this commit records the concept as provisional and defers implementation rather than presenting the suggestion as an approved finished design.

助手提出叙事游戏后，作者要求先建立仓库。因此本次仅记录暂定构想，延后实现，不将建议写成已确认的完成设计。

## User trial / 真人试用

At the initial scaffold stage, no trial had been reported. For the later peer feedback reported by the author on 25 October, see the dated entry below and USER-TRIAL.md. Participant identities are not published.

尚未进行。原型可运行后，在解释操作之前请至少一人尝试；记录实际操作、犹豫点、反馈是否易懂，以及据此作出的修改或保留理由。不公开参与者身份信息或录音录像。

（以上为初始阶段状态；10 月 25 日作者转述的两位同学反馈，见文末及 USER-TRIAL.md。）

## 20 October 2026 — First playable conversation / 首个可玩对话

Following the author's instruction to begin implementation, Codex wrote the HTML/CSS/JavaScript prototype and bilingual fictional dialogue. The scene is the night before an exhibition: a friend considers removing a painting connected to their mother's room. The player's replies change what the friend says and the available next actions. Twelve routes lead to four endings. This is AI-assisted draft writing, not a personal event reported by the author.

作者要求开始实现后，Codex 编写了浏览器原型与中英文虚构对白。展览前夜，朋友考虑撤下与母亲房间有关的作品；玩家的回应改变后续对话。12 条路线通向四个结尾。这是 AI 协助创作的虚构初稿，不是作者声称亲历的事件。

Kept: explicit dialogue states, immediate character feedback and reversible choices, because these make the causal link between input and response inspectable. Changed: an evaluative “empathy score” approach was avoided in favor of unranked endings; a private decision to take the work home is a valid ending too. This was an implementation decision by the assistant, still awaiting the author's review, not evidence from a participant.

保留明确对话状态、即时反馈与可回退选择，便于解释输入如何改变响应。采用不排名的结尾，而不以“同理心分数”评判玩家；把作品带回家也是成立的选择。以上是助手的实现决定，仍待作者审阅，不是真人试用发现。

Verification: Node graph traversal checked all 12 routes, bilingual fields and four endings. Headless Microsoft Edge checked choice response, back, rapid double-click protection, ending recap, language switching, reset and 390 px mobile overflow; no page errors occurred. Desktop and mobile screenshots were captured. These are developer checks, not the required human trial. USER-TRIAL.md provides the observation protocol. The official course automatic checker was not run.

## 21 October 2026 — From dialogue choices to arranging a room / 从选择台词到整理房间

The author tried/reviewed the direction and said the interaction felt too simple: it consisted mainly of clicking prewritten responses. They also rejected the explicit “no score, no perfect reply” copy as unnatural. This is direct author feedback, not an independent participant trial.

作者认为第一版主要在点击预设台词，交互太简单；并明确要求删掉“没有评分，也没有完美回应”等生硬文案。这是作者反馈，不是课程要求的独立参与者试用。

Changed: replace the dialogue choice list with a studio scene. A movable lamp reveals a curtain detail, three inspectable objects carry story information on front and back, painting placement changes the room, and the exhibition statement can be displayed or set aside. Closing text reflects the final arrangement. Remove the old story graph and its graph-only checker from the current tree; retain the original version in Git history. No dialogue scoring copy appears in the scene.

调整：用工作室场景替代对话选项。移动灯光发现窗帘细节，查看和翻转物件，安排画作位置，决定展签是否公开。收尾取决于最终布置。旧对话与图结构检查从当前文件中移除，早期版本仍保留在历史里。

Kept: bilingual presentation, reversible actions and local execution. Changed the assistant's earlier idea of adding more dialogue branches: additional choices would not address the author's concern about passivity. A single shared state now connects each input to visible arrangement and character feedback. Buttons and a native range input provide alternatives to precision dragging.

保留中英文、本地运行和可撤回操作。不继续堆叠对话分支，而是让输入改变房间本身。为拖动提供按钮和滑块替代，避免精确拖动成为操作门槛。

Code and SVG/CSS scene artwork were produced with Codex. The fictional bereavement scene is an assistant-authored draft, not an autobiographical account. The author authorized the spatial interaction direction; review of exact wording remains open. No external image generator or online model is required at runtime.

Verification: headless Edge exercised actual mouse dragging, native slider input, undo, object inspection/flipping, label removal/replacement, all four closing scenes, invalid drop return, keyboard placement, language preservation and reset cancellation/confirmation. A 390 px layout and touch-enabled browser context were also checked. No JavaScript page errors were observed. Desktop/mobile screenshots were visually inspected. This is developer verification, not a claim that a person used the design without guidance. No official course checker was run.

Remaining: ask another person to use the revised studio before explaining controls; record their real attempts, hesitation and feedback using USER-TRIAL.md, then document the resulting change or retention decision. Do not claim that the author's critique or browser automation fulfils this requirement.

## 25 October 2026 — Peer feedback reported by the author / 作者转述同学反馈

The author clarified that the earlier dialogue critique and the later studio critique came from two different classmates and were relayed in conversation. They are recorded separately as P1 and P2 in USER-TRIAL.md. This supersedes our earlier attribution of those comments solely to author review. The developer did not directly observe either session. Actual session dates, devices, exact quotations and whether controls were explained beforehand were not supplied; no details are invented. The report date below is not a claimed session date.

作者澄清，早期的对话版意见与后来的场景版意见分别来自两位同学，由作者口头转述。因此在 USER-TRIAL.md 中分别记录为 P1 与 P2，修正此前仅归为作者评审的来源判断。开发助手没有直接观察试用；实际日期、设备、逐字原话，以及是否在试用前解释玩法，均未提供，不作补写。

P1 found the original experience too passive and similar to a branching visual novel. Decision: retain the move from selecting dialogue to manipulating the studio, documented in the 21 October implementation.

P2 liked the light interaction and the texture of the photograph/studies, but was disappointed that light stopped affecting the painting on the rack or in the packing area. They did not understand the label's purpose and found its appearance weak. They also found the old ending unclear: the main visible next action was returning to the same room. They wanted more distinct conclusions. These are paraphrases of the author's report, not direct participant quotations.

Implemented response: alignment now follows painting position in all three destinations, with a visible warm highlight. The label has a typeset face and explicit displayed/set-aside consequences. Opening the doors creates an epilogue with a morning scene based on the actual arrangement, four distinct closing outcomes, visitor/character text, and separate revise/restart actions. Preserve the photograph, studies and language switching in response to positive feedback. The inline SVG morning scene is code-authored with Codex; no new external assets or services were introduced.

Developer verification: browser checks exercised illumination on the wall, rack and packing area, object inspection, undo, all four closing outcomes, wrapping visible in the packing ending, invalid-drop recovery, keyboard alternatives, reset confirmation and touch-enabled controls. Screenshots were captured. A peer retest of these new changes has not yet been reported. Before final submission, clarify whether the original trial began without an explanation of the controls, as the brief requests.
