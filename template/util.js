/* SUPPLIED APP SUPPORT — students edit app.js, not this file.
   The working model keeps the design usable while students practise one skill.
   Challenge checks give feedback, not assessment decisions. */
var supportScriptURL = document.currentScript.src;
var fallbackImage = new URL('images/image-unavailable.svg', supportScriptURL).href;
var currentTray = [];
var menuProblems = [];
var logicProblems = [];

function node(tag, className, text) {
  var el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function formatPrice(amount) { return '£' + Number(amount).toFixed(2); }
function modeOn(name) { return typeof challengeModes !== 'undefined' && challengeModes[name] === true; }
function promotionOn() { return typeof useHealthyPromotion !== 'undefined' && useHealthyPromotion === true; }
function suppliedSubtotal(tray) {
  return tray.reduce(function(sum, item) { return sum + Math.round(item.price * 100); }, 0) / 100;
}
function suppliedDiscount(tray, subtotal) {
  var count = tray.filter(function(item) { return item.healthpromo === true; }).length;
  return count >= 2 ? Math.round(subtotal * 10) / 100 : 0;
}
function tryLogic(name, fn, args, fallback, valid) {
  if (!modeOn(name)) return fallback;
  try {
    if (typeof fn !== 'function') throw new Error('function not found');
    var answer = fn.apply(null, args);
    if (!valid(answer)) throw new Error('unexpected result type');
    return answer;
  } catch (error) {
    logicProblems.push('Your ' + name + ' code needs a check. Supplied logic is being used. Check your last edit or turn its switch to false.');
    return fallback;
  }
}
function validMoney(n) { return typeof n === 'number' && Number.isFinite(n) && n >= 0; }
function validBoolean(value) { return typeof value === 'boolean'; }
function validateMenu(items) {
  var problems = [];
  if (!Array.isArray(items) || items.length === 0) return ['No menu list found. Check the MENU section in app.js.'];
  items.forEach(function(item, i) {
    var label = 'Item ' + (i + 1) + ': ';
    if (!item || typeof item !== 'object') { problems.push(label + 'use the same record structure as the sample.'); return; }
    if (typeof item.name !== 'string' || !item.name.trim()) problems.push(label + 'give the item a name in quotes.');
    if (!validMoney(item.price)) problems.push(label + 'price must be a number such as 3.50, without quotes or £.');
    if (!['main', 'snack', 'drink'].includes(item.type)) problems.push(label + 'type must be "main", "snack" or "drink" in lower case.');
    if (typeof item.description !== 'string') problems.push(label + 'add a description in quotes.');
    if (typeof item.image !== 'string' || !item.image.trim()) problems.push(label + 'add an image filename in quotes.');
    if (typeof item.healthpromo !== 'boolean') problems.push(label + 'healthpromo must be true or false, without quotes.');
    if (!Array.isArray(item.alergy_warning) || !item.alergy_warning.every(function(x) { return typeof x === 'string'; })) problems.push(label + 'alergy_warning must be a list such as ["nuts"] or [].');
  });
  return problems;
}
function reportProblems() {
  var panel = document.getElementById('setup-help');
  panel.replaceChildren();
  var all = menuProblems.concat(logicProblems);
  panel.hidden = all.length === 0;
  if (!all.length) return;
  panel.appendChild(node('h2', '', 'Check your last edit'));
  var list = node('ul');
  all.forEach(function(p) { list.appendChild(node('li', '', p)); });
  panel.appendChild(list);
  panel.appendChild(node('p', '', 'Save app.js, refresh this page and check again. Undo your last edit if needed. Your teacher can help.'));
}
function renderMenu(items) {
  var container = document.getElementById('menu-container');
  container.replaceChildren();
  if (!items.length) { container.appendChild(node('p', 'empty-tray-message', 'No items in this category.')); return; }
  items.forEach(function(item) {
    var card = node('article', 'menu-card');
    var wrap = node('div', 'menu-card-img-wrapper');
    wrap.appendChild(node('span', 'badge-type', item.type));
    if (item.healthpromo) wrap.appendChild(node('span', 'badge-health', 'Healthy choice'));
    var img = node('img'); img.src = item.image; img.alt = item.name;
    img.addEventListener('error', function() {
      img.onerror = null;
      img.src = fallbackImage;
      img.alt = 'Image missing for ' + item.name + '. Check ' + item.image;
    }, { once: true });
    wrap.appendChild(img); card.appendChild(wrap);
    var content = node('div', 'menu-card-content');
    content.appendChild(node('h3', 'menu-card-title', item.name));
    content.appendChild(node('p', 'menu-card-desc', item.description));
    content.appendChild(node('p', 'menu-card-allergies', item.alergy_warning.length ? 'Recorded allergens: ' + item.alergy_warning.join(', ') : 'No allergens recorded — check the source.'));
    var footer = node('div', 'menu-card-footer');
    footer.appendChild(node('span', 'menu-card-price', formatPrice(item.price)));
    var add = node('button', 'btn btn-primary btn-sm btn-add-item', '+ Add to Tray');
    add.type = 'button'; add.setAttribute('aria-label', 'Add ' + item.name + ' to tray');
    add.addEventListener('click', function() { currentTray.push(item); refreshTrayUI(); });
    footer.appendChild(add); content.appendChild(footer); card.appendChild(content); container.appendChild(card);
  });
}
function calculateOrder() {
  logicProblems = [];
  var subtotal = tryLogic('subtotal', typeof studentSubtotal === 'function' ? studentSubtotal : null, [currentTray], suppliedSubtotal(currentTray), validMoney);
  var discount = promotionOn() ? tryLogic('promotion', typeof studentDiscount === 'function' ? studentDiscount : null, [currentTray, subtotal], suppliedDiscount(currentTray, subtotal), validMoney) : 0;
  if (discount > subtotal) { logicProblems.push('The discount is bigger than the subtotal. Check activity E2. Supplied discount is being used.'); discount = suppliedDiscount(currentTray, subtotal); }
  discount = Math.round(discount * 100) / 100;
  var total = Math.round(Math.max(0, subtotal - discount) * 100) / 100;
  var voucher = document.getElementById('voucher-toggle').checked;
  var over = tryLogic('budget', typeof studentOverBudget === 'function' ? studentOverBudget : null, [total], total > 5.50, validBoolean);
  var allergens = Array.from(new Set(currentTray.flatMap(function(item) { return item.alergy_warning; })));
  var nuts = tryLogic('allergy', typeof studentHasNuts === 'function' ? studentHasNuts : null, [allergens], allergens.includes('nuts'), validBoolean);
  var warnings = [];
  if (voucher && over) warnings.push('Voucher warning: £' + total.toFixed(2) + ' is over £5.50.');
  // Other recorded allergens remain visible even while students practise the nuts check.
  var visibleAllergens = allergens.filter(function(x) { return x !== 'nuts'; });
  if (nuts) visibleAllergens.push('nuts');
  if (visibleAllergens.length) warnings.push('Allergen warning: ' + visibleAllergens.join(', ') + '. Check the ingredient source.');
  return { subtotal: subtotal, discount: discount, total: total, warnings: warnings };
}
function refreshTrayUI(confirmation) {
  var list = document.getElementById('order-items-list'); list.replaceChildren();
  currentTray.forEach(function(item, i) {
    var row = node('div', 'tray-item'); var info = node('div', 'tray-item-info');
    info.appendChild(node('span', 'tray-item-name', item.name)); info.appendChild(node('span', 'tray-item-price', formatPrice(item.price)));
    var remove = node('button', 'tray-item-remove-btn', '×'); remove.type = 'button'; remove.setAttribute('aria-label', 'Remove ' + item.name);
    remove.addEventListener('click', function() { currentTray.splice(i, 1); refreshTrayUI(); });
    row.append(info, remove); list.appendChild(row);
  });
  if (!currentTray.length) list.appendChild(node('p', 'empty-tray-message', 'Your tray is empty. Add an item to begin.'));
  var result = calculateOrder();
  document.getElementById('summary-count').textContent = currentTray.length;
  document.getElementById('summary-subtotal').textContent = formatPrice(result.subtotal);
  document.getElementById('summary-total').textContent = formatPrice(result.total);
  document.getElementById('summary-discount').textContent = '-' + formatPrice(result.discount);
  document.getElementById('discount-row').style.display = result.discount > 0 ? 'flex' : 'none';
  var status = document.getElementById('status-feedback'); var text = document.getElementById('status-message');
  var message = confirmation || (currentTray.length ? 'Practice order ready.' : 'Select items to begin.');
  text.textContent = [message].concat(result.warnings).join('\n');
  status.className = 'status-feedback ' + (result.warnings.length ? 'warning' : confirmation ? 'success' : 'info');
  reportProblems();
}
function clearTray() { currentTray = []; refreshTrayUI(); }
function updatePracticeLabel() {
  var active = ['subtotal','budget','allergy','promotion'].filter(modeOn);
  var label = document.getElementById('logic-mode');
  label.textContent = active.length ? 'Trying your code: ' + active.join(', ') + '. Turn its switch to false for supplied logic.' : 'Supplied working logic is on. Your design is ready to personalise.';
  if (modeOn('promotion') && !promotionOn()) label.textContent += ' The promotion is off in the app; its check button still tests your function.';
}
function runChallengeCheck(skill) {
  var cases = {
    subtotal: [
      ['No items', [[]], 0], ['One item: £1.20', [[{price:1.20}]], 1.20],
      ['£2.40 + £1.10 + £0.50', [[{price:2.40},{price:1.10},{price:0.50}]], 4]
    ],
    budget: [['£5.00', [5], false], ['£5.50', [5.5], false], ['£6.00', [6], true]],
    allergy: [['Empty list', [[]], false], ['Milk only', [['dairy']], false], ['Nuts and gluten', [['nuts','gluten']], true]],
    promotion: [
      ['£10, no healthy items', [[{healthpromo:false},{healthpromo:false}],10],0],
      ['£10, one healthy item', [[{healthpromo:true},{healthpromo:false}],10],0],
      ['£10, two healthy items', [[{healthpromo:true},{healthpromo:true}],10],1],
      ['£4.70, two healthy items', [[{healthpromo:true},{healthpromo:true}],4.7],0.47]
    ]
  };
  var functions = {
    subtotal: typeof studentSubtotal === 'function' ? studentSubtotal : null,
    budget: typeof studentOverBudget === 'function' ? studentOverBudget : null,
    allergy: typeof studentHasNuts === 'function' ? studentHasNuts : null,
    promotion: typeof studentDiscount === 'function' ? studentDiscount : null
  };
  var panel = document.getElementById('check-results'); panel.replaceChildren();
  panel.appendChild(node('h3', '', 'Your ' + skill + ' function: check results'));
  panel.appendChild(node('p', '', 'These checks test your function even when its switch is false. They do not change your tray.'));
  var table = node('table', 'check-table'); var head = node('tr');
  ['Input','Expected','Your result','Check'].forEach(function(x) { var th=node('th','',x); th.scope='col';head.appendChild(th); });
  var thead=node('thead');thead.appendChild(head);table.appendChild(thead);var body=node('tbody');
  cases[skill].forEach(function(test) {
    var actual, ok=false;
    try { actual=functions[skill].apply(null,test[1]);ok=typeof test[2]==='number' ? typeof actual==='number' && Math.abs(actual-test[2])<0.000001 : actual===test[2]; }
    catch(error) { actual='Check your code'; }
    var row=node('tr');[test[0],String(test[2]),String(actual),ok?'Matches':'Try again'].forEach(function(x){row.appendChild(node('td','',x));});body.appendChild(row);
  });
  table.appendChild(body);panel.appendChild(table);
  panel.appendChild(node('p','','For true/false checks: true means yes; false means no. For money checks, the result is pounds. Use the guide hints, change one thing, save and refresh.'));
}
window.addEventListener('DOMContentLoaded', function() {
  // Add the same clear recovery panel and practice controls to templates and visual examples.
  var main=document.querySelector('main');
  var help=node('section','setup-help');help.id='setup-help';help.setAttribute('role','alert');help.hidden=true;main.prepend(help);
  var mode=node('p','logic-mode');mode.id='logic-mode';main.prepend(mode);
  if(typeof challengeModes==='undefined') { mode.hidden=true; main.classList.add('visual-example'); }
  var items=typeof orderItems==='undefined'?null:orderItems;
  menuProblems=validateMenu(items);
  if(menuProblems.length) {
    if(!items)menuProblems=['app.js did not load. Check the last quote, comma or bracket you changed. Undo that edit, save and refresh.'];
    reportProblems();document.getElementById('btn-checkout').disabled=true;return;
  }
  renderMenu(items);updatePracticeLabel();refreshTrayUI();
  var filter=document.getElementById('filter-type');filter.addEventListener('change',function(){renderMenu(this.value==='all'?items:items.filter(function(x){return x.type===filter.value;}));});
  document.getElementById('voucher-toggle').addEventListener('change',function(){refreshTrayUI();});
  document.getElementById('btn-clear').addEventListener('click',clearTray);
  document.getElementById('btn-checkout').addEventListener('click',function(){
    if(!currentTray.length){document.getElementById('status-message').textContent='Add at least one item first.';return;}
    var message=typeof orderMessage==='string'?orderMessage:'Thank you for exploring this design.';
    refreshTrayUI(message+' Items: '+currentTray.length+'. No real order has been sent.');
  });
  if(typeof challengeModes!=='undefined') {
    var details=node('details','practice-controls');var summary=node('summary','','Check my code — Guide 3');details.appendChild(summary);
    details.appendChild(node('p','','Choose the activity you are practising. These fixed examples help you check your code before using your own menu.'));
    ['subtotal','budget','allergy','promotion'].forEach(function(skill){var button=node('button','btn btn-secondary','Check '+skill);button.type='button';button.addEventListener('click',function(){runChallengeCheck(skill);});details.appendChild(button);});
    var results=node('div','check-results');results.id='check-results';results.setAttribute('aria-live','polite');details.appendChild(results);main.appendChild(details);
  }
});
