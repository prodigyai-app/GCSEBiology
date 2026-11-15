/* Multiple-choice answers must not be guessable from position, length or option count. */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const course=JSON.parse(fs.readFileSync(path.join(__dirname,'..','course.json'),'utf8'));
const plain=s=>String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const items=course.lessons.flatMap(l=>(l.checks||[]).filter(q=>q.opts).map(q=>({id:l.id,q}))).map(x=>({id:x.id,o:x.q.opts,a:x.q.a,why:x.q.why,prompt:x.q.q}));

test('there are enough multiple-choice questions to check',()=>assert.ok(items.length>300));
test('every multiple-choice question has four options and a real explanation',()=>{
  for(const q of items){assert.ok(q.o.length>=4,`${q.id}: ${q.prompt}`);assert.ok(plain(q.why).length>=25||/=/.test(q.why),`${q.id}: short explanation for ${q.prompt}`);assert.notEqual(plain(q.why),plain(q.o[q.a]),`${q.id}: explanation repeats the answer`);}
});
test('no answer position is used for more than 32 % of questions',()=>{
  const pos=[0,0,0,0,0];items.forEach(q=>pos[q.a]++);
  pos.forEach((n,i)=>assert.ok(n/items.length<=0.32,`position ${'ABCDE'[i]}: ${n} of ${items.length}`));
});
test('the correct answer is the unique longest option in at most 32 % of questions',()=>{
  let u=0,hit=0;for(const q of items){const L=q.o.map(s=>plain(s).length),mx=Math.max(...L);if(L.filter(x=>x===mx).length===1){u++;if(L[q.a]===mx)hit++}}
  assert.ok(hit/u<=0.32,`${hit} of ${u}`);
});
