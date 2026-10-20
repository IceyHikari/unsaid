// Development-only graph verification. Run: node verify.cjs
const assert = require('node:assert/strict');
const story = require('./story.js');
const endings = new Set();
let routes = 0;
function visit(id, seen = []) {
 assert(!seen.includes(id), `Unexpected cycle: ${id}`);
 const state = story[id];
 assert(state, `Missing state: ${id}`);
 for (const key of ['line', 'direction']) assert(state[key].length === 2 && state[key].every(Boolean));
 if (state.choices) {
  assert(state.choices.length >= 2);
  for (const choice of state.choices) {
   assert(choice.text.length === 2 && choice.text.every(Boolean));
   visit(choice.next, [...seen, id]);
  }
 } else { assert(state.end.length === 2); endings.add(id); routes++; }
}
visit('start');
assert.equal(endings.size, 4);
console.log(`${routes} complete routes reach ${endings.size} endings; all bilingual fields and targets valid.`);
