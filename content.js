
(function () {
  const CB = 'gemsweep-checkbox';
  const STYLE_ID = 'gemsweep-hide-css';
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  function getSel() { return document.querySelectorAll('.' + CB + ':checked').length; }
  function syncCount() { chrome.runtime.sendMessage({ type: 'COUNT_UPDATE', count: getSel() }); }
  function addBoxes() {
    document.querySelectorAll('[data-test-id="conversation"]').forEach(item => {
      if (item.querySelector('.' + CB)) return;
      const c = document.createElement('input');
      c.type = 'checkbox'; c.className = CB; c.style.marginRight = '6px';
      c.addEventListener('change', syncCount);
      const t = item.querySelector('.conversation-title'); (t || item).prepend(c);
    });
    syncCount();
  }
  function removeBoxes() { document.querySelectorAll('.' + CB).forEach(c => c.remove()); syncCount(); }
  function observer() {
    const list = document.querySelector('[data-test-id="all-conversations"]');
    if (list) { new MutationObserver(addBoxes).observe(list, { childList: true, subtree: true }); }
  }
  function ensureHideStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement('style'); s.id = STYLE_ID;
    s.textContent = `
     /* Hide confirm dialog */
     .mat-mdc-dialog-container {opacity:0!important;pointer-events:none!important;}
     /* Hide actions kebab menu panel */
     .conversation-actions-menu, .cdk-overlay-pane {opacity:0!important;pointer-events:none!important;}
   `;
    document.head.appendChild(s);
  }
  async function openAndLocateDelete(item) {
    const menu = item.parentElement?.querySelector('.conversation-actions-menu-button');
    if (!menu) return null;
    menu.click(); await sleep(150);
    // ensure style after menu appears to hide quickly
    ensureHideStyle();
    return [...document.querySelectorAll('button, mat-menu-item')]
      .find(b => b.textContent.trim().toLowerCase() === 'delete');
  }
  async function deleteItem(item) {
    item.scrollIntoView({ block: 'center' });
    const delBtn = await openAndLocateDelete(item);
    if (!delBtn) return;
    delBtn.click(); await sleep(150);
    // confirm
    const confirm = [...document.querySelectorAll('button')]
      .find(b => b.textContent.trim().toLowerCase() === 'delete');
    if (confirm) confirm.click();
    await sleep(350);
  }
  async function bulkDelete(notify) {
    const targets = [...document.querySelectorAll('.' + CB + ':checked')].map(cb => cb.closest('[data-test-id="conversation"]')).filter(Boolean);
    const total = targets.length; let done = 0;
    for (const t of targets) { await deleteItem(t); done++; notify(done, total); }
    await sleep(250); addBoxes();
  }
  chrome.runtime.onMessage.addListener((m, s, r) => {
    if (m.type === 'ADD_CHECKBOXES') addBoxes();
    else if (m.type === 'REMOVE_CHECKBOXES') removeBoxes();
    else if (m.type === 'GET_SELECTED_COUNT') r({ count: getSel() });
    else if (m.type === 'DELETE_SELECTED') bulkDelete((d, t) => chrome.runtime.sendMessage({ type: 'PROGRESS_UPDATE', done: d, total: t }));
    return true;
  });
  addBoxes(); observer(); ensureHideStyle();
})();
