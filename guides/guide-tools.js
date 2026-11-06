/* Guide interactions teach concepts; they do not contain target challenge functions. */
'use strict';
document.querySelectorAll('[data-print]').forEach(b => b.addEventListener('click', () => window.print()));
document.querySelectorAll('[data-answer]').forEach(b => b.addEventListener('click', () => {
  document.getElementById(b.dataset.reply).textContent = b.dataset.answer === b.dataset.correct
    ? 'That matches. At the limit is different from over it. Now predict your three voucher cases.'
    : 'Compare the two amounts: are they equal, or is one larger? Try again.';
}));
const trace = document.getElementById('trace-next');
if (trace) {
  let step = 0, total = 0;
  const weights = [2, 3, 1], input = document.getElementById('trace-answer'), text = document.getElementById('trace-text');
  trace.addEventListener('click', () => {
    if (input.value.trim() === '') { text.textContent = 'Enter your prediction first. Current total: ' + total + ' kg.'; input.focus(); return; }
    const next = total + weights[step];
    if (Number(input.value) !== next) { text.textContent = 'Try again: start with ' + total + ' kg and add ' + weights[step] + ' kg.'; return; }
    const previous = total; total = next; step++;
    document.getElementById('trace-code').textContent = 'var runningWeight = ' + previous + ';\nrunningWeight += ' + weights[step - 1] + '; // now ' + total;
    text.textContent = previous + ' + ' + weights[step - 1] + ' = ' + total + ' kg. ' + (step === weights.length ? 'All parcels counted. Explain what changed and what repeated.' : 'Predict after parcel ' + (step + 1) + '.');
    input.value = ''; trace.disabled = step === weights.length;
  });
  document.getElementById('trace-reset').addEventListener('click', () => { step = 0; total = 0; input.value = ''; trace.disabled = false; document.getElementById('trace-code').textContent='var runningWeight = 0;'; text.textContent = 'Start: total = 0 kg. Predict the total after parcel 1.'; });
}
const editor = document.getElementById('css-editor');
if (editor) {
  const tasks = {
    colour: {goal: 'Make a colour pair that is easy to read and suits a calm café. Predict which part each property changes.', css: '.sample {\n  background-color: lightgray;\n  color: gray;\n}'},
    spacing: {goal: 'The words feel cramped. Change the space inside the card. Find a useful amount without making the card huge.', css: '.sample {\n  padding: 4px;\n}'},
    background: {goal: 'Compare two backgrounds and keep the words readable. Try fruit-salad.jpg or orange-water.jpg in the same folder. Explain your choice.', css: '.sample {\n  background-image: url("../template/images/chicken-burger.jpg");\n  background-size: cover;\n  color: white;\n}'},
    font: {goal: 'Choose a font that suits your café and is easy to read. Compare Georgia, Arial and Courier New. Keep a fallback.', css: '.sample {\n  font-family: "Courier New", monospace;\n}'},
    size: {goal: 'Make the text comfortable to read. Try two sizes and check the card still fits.', css: '.sample {\n  font-size: 12px;\n}'}
  };
  const select = document.getElementById('css-task'), preview = document.getElementById('css-preview'), feedback = document.getElementById('css-feedback');
  const allowed = new Set(['background-color','color','padding','background-image','background-size','background-position','font-family','font-size']);
  let timer;
  function show(message) { clearTimeout(timer); timer = setTimeout(() => { feedback.textContent = message; }, 180); }
  function apply() {
    const match = editor.value.trim().match(/^\.sample\s*\{([^{}]*)\}$/s);
    if (!match) { show('Keep .sample and both braces. Preview shows the last valid edit.'); return; }
    const declarations = match[1].split(';').map(s => s.trim()).filter(Boolean), rules = [];
    if (!declarations.length) { show('Add a property and value inside the braces.'); return; }
    for (const declaration of declarations) {
      const colon = declaration.indexOf(':');
      if (colon < 1) { show('Each line needs property: value; Preview has not changed.'); return; }
      const property = declaration.slice(0, colon).trim(), value = declaration.slice(colon + 1).trim();
      if (!allowed.has(property) || !CSS.supports(property, value)) { show('Check ' + property + ': spelling, value and units. Preview has not changed.'); return; }
      if (/url\s*\(/i.test(value) && !(property === 'background-image' && /^url\(["']?\.\.\/template\/images\/[a-z0-9-]+\.(jpg|png|svg|webp)["']?\)$/i.test(value))) {
        show('Use one local image from ../template/images/ in this practice.'); return;
      }
      rules.push([property, value]);
    }
    preview.removeAttribute('style');
    rules.forEach(([property, value]) => preview.style.setProperty(property, value));
    const headerRules=rules.filter(([p])=>!p.startsWith('font-'));
    const titleRules=rules.filter(([p])=>p.startsWith('font-'));
    const block=(selector,items)=>selector+' {\n'+items.map(([p,v])=>'  '+p+': '+v.replace('../template/images/','images/')+';').join('\n')+'\n}';
    document.getElementById('css-transfer-code').textContent=[headerRules.length?block('body.personal-design .app-header',headerRules):'',titleRules.length?block('body.personal-design .app-header h1',titleRules):''].filter(Boolean).join('\n\n');
    show('Preview updated. Can you read it? Does it meet your goal?');
  }
  function reset() { editor.value = tasks[select.value].css; document.getElementById('css-goal').textContent = tasks[select.value].goal; apply(); }
  select.addEventListener('change', reset); document.getElementById('css-reset').addEventListener('click', reset); editor.addEventListener('input', apply); reset();
}

// Small editing labs: generated code is displayed as text, never executed.
const headingInput=document.getElementById('html-heading');
if(headingInput){
 const update=()=>{document.getElementById('html-code').textContent='<h1 id="app-title">'+headingInput.value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')+'</h1>';document.getElementById('html-effect').textContent=headingInput.value;};
 headingInput.addEventListener('input',update);update();
}
const messageInput=document.getElementById('message-input');
if(messageInput){
 const update=()=>{document.getElementById('message-code').textContent='var orderMessage = '+JSON.stringify(messageInput.value)+';';document.getElementById('message-effect').textContent='Message changed. Select Try confirmation to see it.';};
 messageInput.addEventListener('input',update);update();
 document.getElementById('message-run').addEventListener('click',()=>{document.getElementById('message-effect').textContent=messageInput.value+' No real order has been sent.';});
}
const compareOp=document.getElementById('compare-op');
if(compareOp){
 const left=document.getElementById('compare-left'),right=document.getElementById('compare-right');
 const update=()=>{
  if(left.value===''||right.value===''){document.getElementById('compare-code').textContent='Enter both numbers.';document.getElementById('compare-effect').textContent='';return;}
  const a=Number(left.value),b=Number(right.value),op=compareOp.value;
  const result=op==='<'?a<b:op==='=='?a===b:op==='>='?a>=b:a>b;
  document.getElementById('compare-code').textContent=a+' '+op+' '+b;
  document.getElementById('compare-effect').textContent='Result: '+result+' ('+(result?'yes':'no')+').';
 };
 [left,right,compareOp].forEach(el=>el.addEventListener('input',update));update();
}
