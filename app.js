/* ============================================================
   DSA Interview 150 — Application Logic
   ============================================================ */

'use strict';

// ============================================================
// STATE
// ============================================================
const state = {
  questions: [],
  topics: [],
  completed: new Set(),
  bookmarks: new Set(),
  revision: new Set(),
  lastQuestion: null,
  sortField: 'id',
  sortDir: 'asc',
  filterTopic: '',
  filterDifficulty: '',
  filterStatus: '',
  searchQuery: '',
  currentQuestion: null,
  currentView: 'dashboard',
};

// ============================================================
// LOCAL STORAGE
// ============================================================
const LS = {
  COMPLETED: 'dsa150_completed',
  BOOKMARKS: 'dsa150_bookmarks',
  REVISION: 'dsa150_revision',
  LAST_Q: 'dsa150_last_q',
  THEME: 'dsa150_theme',
};

function loadProgress() {
  try {
    const c = JSON.parse(localStorage.getItem(LS.COMPLETED) || '[]');
    const b = JSON.parse(localStorage.getItem(LS.BOOKMARKS) || '[]');
    const r = JSON.parse(localStorage.getItem(LS.REVISION) || '[]');
    state.completed = new Set(c);
    state.bookmarks = new Set(b);
    state.revision = new Set(r);
    state.lastQuestion = localStorage.getItem(LS.LAST_Q) || null;
  } catch (e) {
    console.warn('Could not load progress:', e);
  }
}

function saveProgress() {
  localStorage.setItem(LS.COMPLETED, JSON.stringify([...state.completed]));
  localStorage.setItem(LS.BOOKMARKS, JSON.stringify([...state.bookmarks]));
  localStorage.setItem(LS.REVISION, JSON.stringify([...state.revision]));
  if (state.lastQuestion) localStorage.setItem(LS.LAST_Q, state.lastQuestion);
}

function resetProgress() {
  state.completed.clear();
  state.bookmarks.clear();
  state.revision.clear();
  state.lastQuestion = null;
  localStorage.removeItem(LS.COMPLETED);
  localStorage.removeItem(LS.BOOKMARKS);
  localStorage.removeItem(LS.REVISION);
  localStorage.removeItem(LS.LAST_Q);
}

// ============================================================
// THEME
// ============================================================
function loadTheme() {
  const saved = localStorage.getItem(LS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(LS.THEME, next);
  showToast(next === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

// ============================================================
// TOAST
// ============================================================
let toastTimer = null;
function showToast(msg, duration = 2200) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

// ============================================================
// SYNTAX HIGHLIGHTING (Minimal Java)
// ============================================================
function highlightJava(code) {
  // Tokenize comments and strings first so inner keywords/numbers/spans are never touched
  const tokens = [];
  function saveToken(content, cls) {
    const placeholder = `___TOKEN_${tokens.length}___`;
    // Escape HTML inside saved tokens
    const escaped = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    tokens.push(`<span class="${cls}">${escaped}</span>`);
    return placeholder;
  }

  // 1. Extract block comments
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, m => saveToken(m, 'cmt'));

  // 2. Extract line comments
  code = code.replace(/(\/\/[^\n]*)/g, m => saveToken(m, 'cmt'));

  // 3. Extract strings and character literals
  code = code.replace(/("(?:[^"\\]|\\.)*")/g, m => saveToken(m, 'str'));
  code = code.replace(/('(?:[^'\\]|\\.)*')/g, m => saveToken(m, 'str'));

  // 4. Escape general HTML
  code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // 5. Annotations
  code = code.replace(/(@\w+)/g, '<span class="ann">$1</span>');

  // 6. Keywords
  const keywords = ['class','interface','extends','implements','new','return','if','else',
    'for','while','do','switch','case','break','continue','null','true','false',
    'static','final','public','private','protected','void','int','long','double',
    'float','boolean','char','byte','short','String','throw','throws','try','catch',
    'finally','import','package','this','super','instanceof','abstract','default'];
  keywords.forEach(kw => {
    const re = new RegExp(`\\b(${kw})\\b`, 'g');
    code = code.replace(re, '<span class="kw">$1</span>');
  });

  // 7. Types
  const types = ['ArrayList','HashMap','HashSet','LinkedList','Queue','Deque',
    'Stack','TreeMap','TreeSet','PriorityQueue','List','Map','Set','Iterator',
    'Collections','Arrays','Math','Integer','Long','Double','Boolean','Character',
    'StringBuilder','Optional','Node','ListNode','TreeNode','Random'];
  types.forEach(t => {
    const re = new RegExp(`\\b(${t})\\b`, 'g');
    code = code.replace(re, '<span class="typ">$1</span>');
  });

  // 8. Numbers (avoid matching inside placeholders)
  code = code.replace(/\b(\d+(?:\.\d+)?[Lfd]?)\b(?![^<]*>)/g, (m, num, offset) => {
    // Ensure we are not inside a token placeholder like ___TOKEN_0___
    const prefix = code.slice(Math.max(0, offset - 10), offset);
    if (prefix.includes('TOKEN_')) return m;
    return `<span class="num">${num}</span>`;
  });

  // 9. Restore tokens
  tokens.forEach((html, i) => {
    code = code.replace(`___TOKEN_${i}___`, html);
  });

  return code;
}

// ============================================================
// NAVIGATION / VIEWS
// ============================================================
function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.add('active');
    target.setAttribute('aria-current', 'page');
  }
  state.currentView = viewId;

  // Update nav active state
  document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
    btn.setAttribute('aria-current', btn.dataset.view === viewId ? 'page' : 'false');
  });

  // Scroll top
  window.scrollTo({ top: 0 });

  // Close mobile sidebar
  closeMobileSidebar();
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

// ============================================================
// DATA INIT
// ============================================================
function initData() {
  // Merge all question parts from the global arrays
  const parts = [
    ...(typeof QUESTIONS_PART1 !== 'undefined' ? QUESTIONS_PART1 : []),
    ...(typeof QUESTIONS_PART2 !== 'undefined' ? QUESTIONS_PART2 : []),
    ...(typeof QUESTIONS_PART3 !== 'undefined' ? QUESTIONS_PART3 : []),
    ...(typeof QUESTIONS_PART4 !== 'undefined' ? QUESTIONS_PART4 : []),
  ];

  // Deduplicate by id
  const seen = new Set();
  state.questions = parts.filter(q => {
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });

  // Sort by id default
  state.questions.sort((a, b) => a.id - b.id);

  // Extract unique topics preserving order
  const topicOrder = [
    'Two Pointers','Sorting','Dynamic Programming','Greedy',
    'Math and Number Theory','Prefix Sum','Stack','Other / String and Intervals',
    'Trie','Sliding Window','Matrix and Grid','Hash Map','Union-Find',
    'Linked List','Tree Traversal','Bit Manipulation','Breadth-First Search',
    'Topological Sort','Backtracking','Binary Search','Heap / Priority Queue'
  ];
  state.topics = topicOrder.filter(t => state.questions.some(q => q.topic === t));
}

// ============================================================
// SIDEBAR TOPIC LIST
// ============================================================
function renderTopicNav() {
  const container = document.getElementById('topic-nav-list');
  container.innerHTML = state.topics.map(topic => {
    const count = state.questions.filter(q => q.topic === topic).length;
    return `<button class="topic-nav-btn" data-topic="${escHtml(topic)}" title="${escHtml(topic)}">
      <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${escHtml(topic)}</span>
      <span class="topic-nav-count">${count}</span>
    </button>`;
  }).join('');

  container.addEventListener('click', e => {
    const btn = e.target.closest('.topic-nav-btn');
    if (!btn) return;
    const topic = btn.dataset.topic;
    state.filterTopic = topic;
    state.filterDifficulty = '';
    state.filterStatus = '';
    state.searchQuery = '';
    document.getElementById('global-search').value = '';
    document.getElementById('filter-topic').value = topic;
    document.getElementById('filter-difficulty').value = '';
    document.getElementById('filter-status').value = '';
    showView('all-questions');
    renderQuestionsTable();
    document.querySelectorAll('.topic-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
}

// ============================================================
// FILTERS
// ============================================================
function populateTopicFilter() {
  const sel = document.getElementById('filter-topic');
  sel.innerHTML = '<option value="">All Topics</option>' +
    state.topics.map(t => `<option value="${escHtml(t)}">${escHtml(t)}</option>`).join('');
}

function getFilteredQuestions() {
  let qs = state.questions;
  const q = state.searchQuery.trim().toLowerCase();

  if (q) {
    qs = qs.filter(x =>
      x.title.toLowerCase().includes(q) ||
      String(x.id).includes(q) ||
      x.topic.toLowerCase().includes(q) ||
      (x.description && x.description.toLowerCase().includes(q))
    );
  }
  if (state.filterTopic) qs = qs.filter(x => x.topic === state.filterTopic);
  if (state.filterDifficulty) qs = qs.filter(x => x.difficulty === state.filterDifficulty);
  if (state.filterStatus === 'completed') qs = qs.filter(x => state.completed.has(x.id));
  else if (state.filterStatus === 'not-completed') qs = qs.filter(x => !state.completed.has(x.id));
  else if (state.filterStatus === 'bookmarked') qs = qs.filter(x => state.bookmarks.has(x.id));
  else if (state.filterStatus === 'revision') qs = qs.filter(x => state.revision.has(x.id));

  // Sort
  qs = [...qs].sort((a, b) => {
    let av = a[state.sortField], bv = b[state.sortField];
    if (state.sortField === 'difficulty') {
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      av = order[av] ?? 0; bv = order[bv] ?? 0;
    }
    if (av < bv) return state.sortDir === 'asc' ? -1 : 1;
    if (av > bv) return state.sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return qs;
}

// ============================================================
// QUESTIONS TABLE
// ============================================================
function renderQuestionsTable() {
  const qs = getFilteredQuestions();
  const tbody = document.getElementById('questions-tbody');

  tbody.innerHTML = qs.map(q => {
    const done = state.completed.has(q.id);
    const bookmarked = state.bookmarks.has(q.id);
    const inRevision = state.revision.has(q.id);
    const diffClass = q.difficulty.toLowerCase();

    return `<tr data-id="${q.id}" class="${done ? 'row-completed' : ''}">
      <td><span class="q-num">#${q.id}</span></td>
      <td><span class="q-title">${escHtml(q.title)}</span></td>
      <td><span class="q-topic-pill">${escHtml(q.topic)}</span></td>
      <td><span class="diff-badge diff-badge--${diffClass}">${q.difficulty}</span></td>
      <td>
        ${done
          ? `<div class="status-icon status-icon--done" title="Completed"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>`
          : `<div class="status-icon status-icon--pending" title="Not completed"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div>`}
      </td>
      <td>
        <div class="row-actions" onclick="event.stopPropagation()">
          <button class="action-btn ${bookmarked ? 'active-bookmark' : ''}" title="${bookmarked ? 'Remove bookmark' : 'Bookmark'}" data-action="bookmark" data-id="${q.id}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="${bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button class="action-btn ${inRevision ? 'active-revision' : ''}" title="${inRevision ? 'Remove from revision' : 'Add to revision'}" data-action="revision" data-id="${q.id}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
          </button>
        </div>
      </td>
    </tr>`;
  }).join('');

  document.getElementById('questions-count').textContent =
    `Showing ${qs.length} of ${state.questions.length} questions`;

  // Update sort headers
  document.querySelectorAll('.questions-table th.sortable').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (th.dataset.sort === state.sortField) {
      th.classList.add(state.sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
    }
  });
}

// ============================================================
// FILTERED LIST VIEWS (Bookmarks, Revision, Completed)
// ============================================================
function renderFilteredList(containerId, filterFn, emptyHtml) {
  const container = document.getElementById(containerId);
  const qs = state.questions.filter(filterFn);

  if (qs.length === 0) {
    container.innerHTML = emptyHtml;
    return;
  }

  container.innerHTML = qs.map(q => {
    const diffClass = q.difficulty.toLowerCase();
    return `<div class="filtered-list-item" data-id="${q.id}" role="button" tabindex="0">
      <span class="filtered-item-num">#${q.id}</span>
      <span class="filtered-item-title">${escHtml(q.title)}</span>
      <span class="diff-badge diff-badge--${diffClass}">${q.difficulty}</span>
      <span class="q-topic-pill">${escHtml(q.topic)}</span>
    </div>`;
  }).join('');
}

function renderBookmarks() {
  renderFilteredList('bookmarks-list',
    q => state.bookmarks.has(q.id),
    `<div class="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      <p>No bookmarks yet. Click the bookmark icon on any question.</p>
    </div>`);
}

function renderRevision() {
  renderFilteredList('revision-list',
    q => state.revision.has(q.id),
    `<div class="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
      <p>No questions in revision list yet.</p>
    </div>`);
}

function renderCompleted() {
  renderFilteredList('completed-list',
    q => state.completed.has(q.id),
    `<div class="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg>
      <p>No completed questions yet. Start solving!</p>
    </div>`);
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  const total = state.questions.length;
  const completed = state.completed.size;
  const remaining = total - completed;
  const bookmarks = state.bookmarks.size;
  const revision = state.revision.size;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-remaining').textContent = remaining;
  document.getElementById('stat-bookmarks').textContent = bookmarks;
  document.getElementById('stat-revision').textContent = revision;
  document.getElementById('dash-pct').textContent = `${pct}%`;

  // Progress circle (circumference = 2πr = 2 * π * 34 ≈ 213.6)
  const circ = 213.6;
  const offset = circ - (pct / 100) * circ;
  const circle = document.getElementById('dash-progress-circle');
  if (circle) circle.setAttribute('stroke-dashoffset', offset.toFixed(1));

  // Nav badges
  document.getElementById('nav-total-count').textContent = total;
  document.getElementById('nav-bookmark-count').textContent = bookmarks;
  document.getElementById('nav-revision-count').textContent = revision;
  document.getElementById('nav-completed-count').textContent = completed;

  // Topic progress
  renderTopicProgress();

  // Recent completed
  renderRecentCompleted();
  renderNeedsRevision();

  // Continue banner
  if (state.lastQuestion) {
    const q = state.questions.find(x => x.id === parseInt(state.lastQuestion));
    if (q) {
      document.getElementById('continue-banner').style.display = 'flex';
      document.getElementById('continue-title').textContent = `#${q.id} — ${q.title}`;
      document.getElementById('continue-btn').onclick = () => openQuestion(q.id);
    }
  }
}

function renderTopicProgress() {
  const container = document.getElementById('topic-progress-list');
  container.innerHTML = state.topics.map(topic => {
    const qs = state.questions.filter(q => q.topic === topic);
    const done = qs.filter(q => state.completed.has(q.id)).length;
    const pct = qs.length > 0 ? Math.round((done / qs.length) * 100) : 0;
    return `<div class="topic-progress-row">
      <span class="topic-progress-name" title="${escHtml(topic)}">${escHtml(topic)}</span>
      <div class="topic-progress-bar-wrap">
        <div class="topic-progress-bar" style="width:${pct}%"></div>
      </div>
      <span class="topic-progress-label">${done}/${qs.length}</span>
    </div>`;
  }).join('');
}

function renderRecentCompleted() {
  const container = document.getElementById('recent-completed-list');
  const recentIds = [...state.completed].reverse().slice(0, 5);
  if (recentIds.length === 0) {
    container.innerHTML = '<p class="empty-state-text">No completed questions yet. Start solving!</p>';
    return;
  }
  container.innerHTML = recentIds.map(id => {
    const q = state.questions.find(x => x.id === id);
    if (!q) return '';
    return `<div class="recent-item" data-id="${q.id}" role="button" tabindex="0">
      <span class="diff-badge diff-badge--${q.difficulty.toLowerCase()}">${q.difficulty}</span>
      <span class="recent-item-title">#${q.id} ${escHtml(q.title)}</span>
    </div>`;
  }).join('');
}

function renderNeedsRevision() {
  const container = document.getElementById('needs-revision-list');
  const revIds = [...state.revision].slice(0, 5);
  if (revIds.length === 0) {
    container.innerHTML = '<p class="empty-state-text">No questions marked for revision yet.</p>';
    return;
  }
  container.innerHTML = revIds.map(id => {
    const q = state.questions.find(x => x.id === id);
    if (!q) return '';
    return `<div class="recent-item" data-id="${q.id}" role="button" tabindex="0">
      <span class="diff-badge diff-badge--${q.difficulty.toLowerCase()}">${q.difficulty}</span>
      <span class="recent-item-title">#${q.id} ${escHtml(q.title)}</span>
    </div>`;
  }).join('');
}

// ============================================================
// QUESTION DETAIL
// ============================================================
function openQuestion(id) {
  const q = state.questions.find(x => x.id === parseInt(id));
  if (!q) return;

  state.currentQuestion = q;
  state.lastQuestion = String(q.id);
  localStorage.setItem(LS.LAST_Q, String(q.id));

  renderQuestionDetail(q);
  showView('question-detail');
}

function getAdjacentQuestion(direction) {
  const qs = getFilteredQuestions();
  const idx = qs.findIndex(x => x.id === state.currentQuestion?.id);
  if (idx === -1) {
    // Not in filtered — use full list
    const all = state.questions;
    const i = all.findIndex(x => x.id === state.currentQuestion?.id);
    if (direction === 'next' && i < all.length - 1) return all[i + 1];
    if (direction === 'prev' && i > 0) return all[i - 1];
    return null;
  }
  if (direction === 'next' && idx < qs.length - 1) return qs[idx + 1];
  if (direction === 'prev' && idx > 0) return qs[idx - 1];
  return null;
}

function renderQuestionDetail(q) {
  const container = document.getElementById('question-detail-content');
  const done = state.completed.has(q.id);
  const bookmarked = state.bookmarks.has(q.id);
  const inRevision = state.revision.has(q.id);
  const diffClass = q.difficulty.toLowerCase();

  const prevQ = getAdjacentQuestion('prev');
  const nextQ = getAdjacentQuestion('next');

  const complexityRows = buildComplexityRows(q);

  container.innerHTML = `
    <div class="question-detail">
      <!-- Nav bar -->
      <div class="question-nav-bar">
        <button class="btn btn--ghost btn--sm" id="back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        <button class="btn btn--ghost btn--sm" id="prev-btn" ${!prevQ ? 'disabled' : ''} title="${prevQ ? '#' + prevQ.id + ' ' + prevQ.title : ''}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          Prev
        </button>
        <button class="btn btn--ghost btn--sm" id="next-btn" ${!nextQ ? 'disabled' : ''} title="${nextQ ? '#' + nextQ.id + ' ' + nextQ.title : ''}">
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <!-- Header -->
      <div class="question-header">
        <div class="question-header-top">
          <span class="question-number">#${q.id}</span>
          <span class="diff-badge diff-badge--${diffClass}">${q.difficulty}</span>
          <span class="q-topic-pill">${escHtml(q.topic)}</span>
        </div>
        <h1 class="question-title">${escHtml(q.title)}</h1>
        <div class="question-actions">
          <a href="${q.leetcodeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            LeetCode
          </a>
          <button class="btn btn--sm btn--ghost ${done ? 'btn--active-success' : ''}" id="btn-complete" data-id="${q.id}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            ${done ? 'Completed' : 'Mark Complete'}
          </button>
          <button class="btn btn--sm btn--ghost ${bookmarked ? 'btn--active-accent' : ''}" id="btn-bookmark" data-id="${q.id}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="${bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            ${bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button class="btn btn--sm btn--ghost ${inRevision ? 'btn--active-warning' : ''}" id="btn-revision" data-id="${q.id}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
            ${inRevision ? 'In Revision' : 'Revision'}
          </button>
        </div>
      </div>

      <!-- Problem Description -->
      ${makeSection('problem', '📋 Problem Description', 'label--problem', formatText(q.description), true)}

      <!-- Intuition -->
      ${makeSection('intuition', '💡 Intuition', 'label--approach', formatText(q.intuition), true)}

      <!-- Approach -->
      ${makeSection('approach', '🗺️ Step-by-Step Approach', 'label--approach', formatApproach(q.approach), true)}

      <!-- Java Solution -->
      ${makeSolutionSection(q)}

      <!-- Simple Explanation -->
      ${makeSection('simple', '🗣️ Simple Language Explanation', 'label--approach', formatApproach(q.simpleExplanation), false)}

      <!-- Complexity -->
      ${makeSection('complexity', '⏱️ Time & Space Complexity', 'label--complexity',
        `<table class="complexity-table"><thead><tr><th>Dimension</th><th>Complexity</th></tr></thead>
        <tbody>${complexityRows}</tbody></table>
        <p style="margin-top:8px">${q.complexity?.note || ''}</p>`, false)}

      <!-- Interview Notes -->
      ${makeSection('interview', '🎯 Interview Prep — Remember This', 'label--interview', buildInterviewSection(q), true)}

      <!-- Edge Cases -->
      ${makeSection('edges', '⚠️ Edge Cases', 'label--complexity', buildEdgeCases(q.edgeCases), false)}

      <!-- Similar Questions -->
      ${q.similar && q.similar.length > 0 ? makeSection('similar', '🔗 Similar Questions', 'label--complexity', buildSimilarList(q.similar), false) : ''}
    </div>
  `;

  // Bind nav buttons
  document.getElementById('back-btn').addEventListener('click', goBack);
  document.getElementById('prev-btn').addEventListener('click', () => prevQ && openQuestion(prevQ.id));
  document.getElementById('next-btn').addEventListener('click', () => nextQ && openQuestion(nextQ.id));

  // Bind action buttons
  document.getElementById('btn-complete').addEventListener('click', e => { e.stopPropagation(); toggleCompleted(q.id); });
  document.getElementById('btn-bookmark').addEventListener('click', e => { e.stopPropagation(); toggleBookmark(q.id); });
  document.getElementById('btn-revision').addEventListener('click', e => { e.stopPropagation(); toggleRevision(q.id); });

  // Expand/collapse sections
  document.querySelectorAll('.detail-section-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.detail-section').classList.toggle('open');
    });
  });

  // Copy code button
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const code = btn.dataset.code;
      navigator.clipboard.writeText(code).then(() => {
        btn.classList.add('copied');
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
        }, 2000);
      }).catch(() => showToast('Copy failed — try manually'));
    });
  });

  // Similar question click
  document.querySelectorAll('.similar-item[data-id]').forEach(item => {
    item.addEventListener('click', () => {
      const tid = parseInt(item.dataset.id);
      const tq = state.questions.find(x => x.id === tid);
      if (tq) openQuestion(tq.id);
      else window.open(`https://leetcode.com/problems/`, '_blank');
    });
  });
}

function goBack() {
  const prevView = state.currentView === 'question-detail' ? 'all-questions' : 'dashboard';
  showView(prevView);
  if (prevView === 'all-questions') renderQuestionsTable();
}

function buildComplexityRows(q) {
  if (!q.complexity) return '<tr><td colspan="2">—</td></tr>';
  const { time, space, note, ...rest } = q.complexity;
  let rows = '';
  if (time) rows += `<tr><td>Time</td><td>${escHtml(time)}</td></tr>`;
  if (space) rows += `<tr><td>Space</td><td>${escHtml(space)}</td></tr>`;
  Object.entries(rest).forEach(([k, v]) => {
    rows += `<tr><td>${escHtml(k)}</td><td>${escHtml(v)}</td></tr>`;
  });
  return rows;
}

function makeSection(id, title, labelClass, content, defaultOpen) {
  return `
    <div class="detail-section ${defaultOpen ? 'open' : ''}" id="sec-${id}">
      <div class="detail-section-header" role="button" tabindex="0" aria-expanded="${defaultOpen}">
        <div class="detail-section-title">${escHtml(title)}</div>
        <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="detail-section-body">${content}</div>
    </div>`;
}

function makeSolutionSection(q) {
  const code = q.javaSolution || '// Solution not available';
  const highlighted = highlightJava(code);
  // Store raw code in a data attribute via encoding
  const encoded = encodeURIComponent(code);
  return `
    <div class="detail-section open" id="sec-code">
      <div class="detail-section-header" role="button" tabindex="0" aria-expanded="true">
        <div class="detail-section-title">☕ Java Solution</div>
        <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="detail-section-body">
        <div class="code-wrapper">
          <div class="code-header">
            <span class="code-lang">Java</span>
            <button class="copy-btn" data-encoded="${escHtml(encoded)}" id="copy-code-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy
            </button>
          </div>
          <pre class="code-block" aria-label="Java solution code"><code>${highlighted}</code></pre>
        </div>
      </div>
    </div>`;
}

function buildInterviewSection(q) {
  const notes = q.interviewNotes || [];
  const oneliner = q.oneLineAnswer || '';
  let html = '';
  if (notes.length > 0) {
    html += '<ol>' + notes.map(n => `<li>${escHtml(n)}</li>`).join('') + '</ol>';
  }
  if (oneliner) {
    html += `<div class="interview-box">
      <div class="interview-box-title">One-Line Interview Answer</div>
      <div class="one-line-answer">"${escHtml(oneliner)}"</div>
    </div>`;
  }
  return html || '<p>See approach and hints above.</p>';
}

function buildEdgeCases(edges) {
  if (!edges || edges.length === 0) return '<p>No specific edge cases noted.</p>';
  return '<ul>' + edges.map(e => `<li>${escHtml(e)}</li>`).join('') + '</ul>';
}

function buildSimilarList(similar) {
  return `<div class="similar-list">` +
    similar.map(s => {
      const sq = state.questions.find(x => x.id === s.id);
      const diff = sq ? `<span class="diff-badge diff-badge--${sq.difficulty.toLowerCase()}">${sq.difficulty}</span>` : '';
      return `<div class="similar-item" data-id="${s.id}" role="button" tabindex="0">
        <span>#${s.id} ${escHtml(s.title)}</span>
        ${diff}
      </div>`;
    }).join('') + `</div>`;
}

// ============================================================
// TOGGLE ACTIONS
// ============================================================
function toggleCompleted(id) {
  if (state.completed.has(id)) {
    state.completed.delete(id);
    showToast('Marked as incomplete');
  } else {
    state.completed.add(id);
    showToast('✅ Marked as completed!');
  }
  saveProgress();
  refreshCurrentUI();
}

function toggleBookmark(id) {
  if (state.bookmarks.has(id)) {
    state.bookmarks.delete(id);
    showToast('Bookmark removed');
  } else {
    state.bookmarks.add(id);
    showToast('🔖 Bookmarked!');
  }
  saveProgress();
  refreshCurrentUI();
}

function toggleRevision(id) {
  if (state.revision.has(id)) {
    state.revision.delete(id);
    showToast('Removed from revision list');
  } else {
    state.revision.add(id);
    showToast('📌 Added to revision list!');
  }
  saveProgress();
  refreshCurrentUI();
}

function refreshCurrentUI() {
  renderDashboard();
  if (state.currentView === 'all-questions') renderQuestionsTable();
  if (state.currentView === 'bookmarks') renderBookmarks();
  if (state.currentView === 'revision') renderRevision();
  if (state.currentView === 'completed') renderCompleted();
  if (state.currentView === 'question-detail' && state.currentQuestion) {
    renderQuestionDetail(state.currentQuestion);
  }
}

// ============================================================
// TEXT FORMATTING HELPERS
// ============================================================
function escHtml(str) {
  if (typeof str !== 'string') return String(str ?? '');
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatText(text) {
  if (!text) return '<p>—</p>';
  // Split on double newlines for paragraphs
  const paras = text.split(/\n\n+/);
  return paras.map(p => {
    p = p.trim();
    if (!p) return '';
    // Check if it looks like an example block
    if (p.startsWith('Input:') || p.startsWith('Example')) {
      return `<div class="example-block">${escHtml(p)}</div>`;
    }
    return `<p>${escHtml(p)}</p>`;
  }).join('');
}

function formatApproach(text) {
  if (!text) return '<p>—</p>';
  const lines = text.split('\n');
  let html = '';
  let inOl = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { if (inOl) { html += '</ol>'; inOl = false; } continue; }
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (!inOl) { html += '<ol>'; inOl = true; }
      html += `<li>${escHtml(numMatch[2])}</li>`;
    } else {
      if (inOl) { html += '</ol>'; inOl = false; }
      html += `<p>${escHtml(trimmed)}</p>`;
    }
  }
  if (inOl) html += '</ol>';
  return html;
}

// ============================================================
// COPY CODE — handle encoded data attribute
// ============================================================
document.addEventListener('click', e => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  const encoded = btn.dataset.encoded;
  if (!encoded) return;
  const code = decodeURIComponent(encoded);
  navigator.clipboard.writeText(code).then(() => {
    btn.classList.add('copied');
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
    }, 2000);
  }).catch(() => showToast('Copy failed — please select and copy manually'));
});

// ============================================================
// EVENT LISTENERS
// ============================================================
function bindEvents() {
  // Nav items
  document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.view;
      showView(v);
      if (v === 'all-questions') renderQuestionsTable();
      if (v === 'bookmarks') renderBookmarks();
      if (v === 'revision') renderRevision();
      if (v === 'completed') renderCompleted();
      if (v === 'dashboard') renderDashboard();
    });
  });

  // Mobile menu
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebar-overlay').classList.add('active');
  });
  document.getElementById('sidebar-close').addEventListener('click', closeMobileSidebar);
  document.getElementById('sidebar-overlay').addEventListener('click', closeMobileSidebar);

  // Theme toggles
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('settings-theme-toggle').addEventListener('click', toggleTheme);

  // Search
  const searchInput = document.getElementById('global-search');
  searchInput.addEventListener('input', debounce(() => {
    state.searchQuery = searchInput.value;
    if (state.currentView === 'all-questions') renderQuestionsTable();
    else {
      showView('all-questions');
      renderQuestionsTable();
    }
  }, 200));

  // Filters
  document.getElementById('filter-topic').addEventListener('change', e => {
    state.filterTopic = e.target.value;
    renderQuestionsTable();
    document.querySelectorAll('.topic-nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.topic === state.filterTopic);
    });
  });

  document.getElementById('filter-difficulty').addEventListener('change', e => {
    state.filterDifficulty = e.target.value;
    renderQuestionsTable();
  });

  document.getElementById('filter-status').addEventListener('change', e => {
    state.filterStatus = e.target.value;
    renderQuestionsTable();
  });

  document.getElementById('clear-filters').addEventListener('click', () => {
    state.filterTopic = ''; state.filterDifficulty = ''; state.filterStatus = '';
    state.searchQuery = '';
    document.getElementById('filter-topic').value = '';
    document.getElementById('filter-difficulty').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('global-search').value = '';
    document.querySelectorAll('.topic-nav-btn').forEach(b => b.classList.remove('active'));
    renderQuestionsTable();
  });

  // Sort headers
  document.querySelectorAll('.questions-table th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      if (state.sortField === th.dataset.sort) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = th.dataset.sort;
        state.sortDir = 'asc';
      }
      renderQuestionsTable();
    });
  });

  // Question table clicks (event delegation)
  document.getElementById('questions-tbody').addEventListener('click', e => {
    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      e.stopPropagation();
      const id = parseInt(actionBtn.dataset.id);
      if (actionBtn.dataset.action === 'bookmark') toggleBookmark(id);
      else if (actionBtn.dataset.action === 'revision') toggleRevision(id);
      return;
    }
    const row = e.target.closest('tr[data-id]');
    if (row) openQuestion(parseInt(row.dataset.id));
  });

  // Filtered list clicks
  ['bookmarks-list','revision-list','completed-list'].forEach(listId => {
    document.getElementById(listId).addEventListener('click', e => {
      const item = e.target.closest('[data-id]');
      if (item) openQuestion(parseInt(item.dataset.id));
    });
  });

  // Dashboard recent items
  document.getElementById('recent-completed-list').addEventListener('click', e => {
    const item = e.target.closest('[data-id]');
    if (item) openQuestion(parseInt(item.dataset.id));
  });
  document.getElementById('needs-revision-list').addEventListener('click', e => {
    const item = e.target.closest('[data-id]');
    if (item) openQuestion(parseInt(item.dataset.id));
  });

  // Keyboard accessibility for filtered lists
  document.querySelectorAll('.filtered-list').forEach(list => {
    list.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const item = e.target.closest('[data-id]');
        if (item) openQuestion(parseInt(item.dataset.id));
      }
    });
  });

  // Reset progress
  document.getElementById('reset-progress-btn').addEventListener('click', () => {
    document.getElementById('confirm-dialog').style.display = 'flex';
  });
  document.getElementById('dialog-cancel').addEventListener('click', () => {
    document.getElementById('confirm-dialog').style.display = 'none';
  });
  document.getElementById('dialog-confirm').addEventListener('click', () => {
    resetProgress();
    document.getElementById('confirm-dialog').style.display = 'none';
    renderDashboard();
    if (state.currentView === 'all-questions') renderQuestionsTable();
    showToast('Progress reset successfully');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

    if (e.key === '/' && !isTyping) {
      e.preventDefault();
      document.getElementById('global-search').focus();
    }

    if (e.key === 'Escape') {
      if (state.currentView === 'question-detail') goBack();
      else document.getElementById('global-search').blur();
    }

    if (!isTyping && state.currentView === 'question-detail') {
      if (e.key === 'n' || e.key === 'N') {
        const nq = getAdjacentQuestion('next');
        if (nq) openQuestion(nq.id);
      }
      if (e.key === 'p' || e.key === 'P') {
        const pq = getAdjacentQuestion('prev');
        if (pq) openQuestion(pq.id);
      }
      if (e.key === 'b' || e.key === 'B') {
        if (state.currentQuestion) toggleBookmark(state.currentQuestion.id);
      }
      if (e.key === 'c' || e.key === 'C') {
        if (state.currentQuestion) toggleCompleted(state.currentQuestion.id);
      }
    }
  });
}

// ============================================================
// UTILITY
// ============================================================
function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ============================================================
// BOOT
// ============================================================
function boot() {
  loadTheme();
  loadProgress();
  initData();
  populateTopicFilter();
  renderTopicNav();
  renderDashboard();
  renderQuestionsTable();
  bindEvents();

  // Show continue banner
  if (state.lastQuestion) {
    const q = state.questions.find(x => x.id === parseInt(state.lastQuestion));
    if (q) {
      document.getElementById('continue-banner').style.display = 'flex';
      document.getElementById('continue-title').textContent = `#${q.id} — ${q.title}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', boot);

