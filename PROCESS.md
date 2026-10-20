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

Not conducted yet. After a runnable prototype exists, ask at least one other person to try it before explaining the controls. Record what they attempt, hesitation, whether feedback is understood, and one resulting improvement or a reason to retain the design. Do not publish identifying details or recordings of the participant.

尚未进行。原型可运行后，在解释操作之前请至少一人尝试；记录实际操作、犹豫点、反馈是否易懂，以及据此作出的修改或保留理由。不公开参与者身份信息或录音录像。

## 20 October 2026 — First playable conversation / 首个可玩对话

Following the author's instruction to begin implementation, Codex wrote the HTML/CSS/JavaScript prototype and bilingual fictional dialogue. The scene is the night before an exhibition: a friend considers removing a painting connected to their mother's room. The player's replies change what the friend says and the available next actions. Twelve routes lead to four endings. This is AI-assisted draft writing, not a personal event reported by the author.

作者要求开始实现后，Codex 编写了浏览器原型与中英文虚构对白。展览前夜，朋友考虑撤下与母亲房间有关的作品；玩家的回应改变后续对话。12 条路线通向四个结尾。这是 AI 协助创作的虚构初稿，不是作者声称亲历的事件。

Kept: explicit dialogue states, immediate character feedback and reversible choices, because these make the causal link between input and response inspectable. Changed: an evaluative “empathy score” approach was avoided in favor of unranked endings; a private decision to take the work home is a valid ending too. This was an implementation decision by the assistant, still awaiting the author's review, not evidence from a participant.

保留明确对话状态、即时反馈与可回退选择，便于解释输入如何改变响应。采用不排名的结尾，而不以“同理心分数”评判玩家；把作品带回家也是成立的选择。以上是助手的实现决定，仍待作者审阅，不是真人试用发现。

Verification: Node graph traversal checked all 12 routes, bilingual fields and four endings. Headless Microsoft Edge checked choice response, back, rapid double-click protection, ending recap, language switching, reset and 390 px mobile overflow; no page errors occurred. Desktop and mobile screenshots were captured. These are developer checks, not the required human trial. USER-TRIAL.md provides the observation protocol. The official course automatic checker was not run.
