/* Temporary visual exploration only. Original HTML classes remain in the file. */
'use strict';
window.addEventListener('DOMContentLoaded', () => {
  const original = document.body.className;
  const panel = document.createElement('details'); panel.className = 'demo-play';
  const summary = document.createElement('summary'); summary.textContent = 'Play with this design — open the controls'; panel.appendChild(summary);
  const intro = document.createElement('p'); intro.textContent = 'Try one change. What became easier or harder to use? These choices are temporary.'; panel.appendChild(intro);
  const controls = document.createElement('div'); controls.className = 'demo-controls'; panel.appendChild(controls);
  const groups = {layout:['grid','flex','sidebar-left','single-column'],colour:['light','dark','contrast'],theme:['modern','retro','americana','punk','emo'],spacing:['compact','standard','spacious']};
  const codeLabel=document.createElement('p');codeLabel.textContent='HTML body classes for this look:';panel.appendChild(codeLabel);
  const codeBlock=document.createElement('pre'), codeView=document.createElement('code');codeBlock.appendChild(codeView);panel.appendChild(codeBlock);
  const updateCode=()=>{codeView.textContent='<body class=\"'+document.body.className+'\">';};updateCode();
  const selects = [];
  Object.entries(groups).forEach(([group,values]) => {
    const wrap=document.createElement('div'), label=document.createElement('label'), select=document.createElement('select');
    label.textContent=group[0].toUpperCase()+group.slice(1);select.id='demo-'+group;label.htmlFor=select.id;
    values.forEach(value=>{const opt=document.createElement('option');opt.value=group+'-'+value;opt.textContent=value.replaceAll('-',' ');select.appendChild(opt);});
    select.value=original.split(/\s+/).find(c=>c.startsWith(group+'-'));
    select.addEventListener('change',()=>{[...document.body.classList].filter(c=>c.startsWith(group+'-')).forEach(c=>document.body.classList.remove(c));document.body.classList.add(select.value);updateCode();status.textContent='Changed '+group+'. Compare the design, then try adding an item.';});
    selects.push([select,select.value]);wrap.append(label,select);controls.appendChild(wrap);
  });
  const reset=document.createElement('button');reset.type='button';reset.textContent='Reset original design';
  reset.addEventListener('click',()=>{document.body.className=original;updateCode();selects.forEach(([s,v])=>s.value=v);status.textContent='Original design restored. Your tray is unchanged.';});controls.appendChild(reset);
  const status=document.createElement('p');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.textContent='Original design. Try the menu and tray, or choose a look above.';panel.appendChild(status);
  const transfer=document.createElement('p');transfer.textContent='Use this look: in project/index.html, find <body class=. Transfer one chosen class at a time; keep your other classes, including personal-design if used. Save and refresh your app.';panel.appendChild(transfer);
  const back=document.createElement('a');back.href='../../index.html';back.textContent='Back to both examples and guides';panel.appendChild(back);
  document.querySelector('.student-note').after(panel);
});
