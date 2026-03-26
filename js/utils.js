/* ════════════════════════════════
   공통 유틸리티
════════════════════════════════ */

/* ── 토스트 ── */
function showToast(msg, type = 'normal') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = msg;
  if (type === 'error') el.style.background = '#ff6584';
  if (type === 'success') el.style.background = '#43e97b';
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 280);
  }, 2400);
}

/* ── 로딩 오버레이 ── */
function showLoading() {
  let el = document.getElementById('loading-overlay');
  if (!el) {
    el = document.createElement('div');
    el.id = 'loading-overlay';
    el.className = 'loading-overlay';
    el.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(el);
  }
  el.style.display = 'flex';
}
function hideLoading() {
  const el = document.getElementById('loading-overlay');
  if (el) el.style.display = 'none';
}

/* ── 배열 셔플 ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── 랜덤 문제 선택 ── */
function pickQuestions(allQuizzes, category, count) {
  let pool = allQuizzes;
  if (category && category !== '전체') {
    pool = allQuizzes.filter(q => q.category === category);
  }
  return shuffle(pool).slice(0, count);
}

/* ── 날짜 포맷 ── */
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}

/* ── XP 계산 ── */
function calcXP(score, total, isWin, isFirst) {
  let xp = score * 3;
  if (isFirst) xp += 30;
  else if (isWin) xp += 20;
  xp += 5; // 완주 보너스
  if (score === total) xp += 15; // 퍼펙트
  return xp;
}

/* ── topbar 렌더 ── */
function renderTopbar(user) {
  const tb = document.getElementById('topbar');
  if (!tb || !user) return;
  const initial = (user.nickname || '?')[0].toUpperCase();
  const level = Auth.calcLevel(user.xp || 0);
  tb.innerHTML = `
    <a class="topbar-logo" href="lobby.html">🎯 퀴즈퀴즈</a>
    <div class="topbar-user">
      <div class="topbar-avatar">${initial}</div>
      <div>
        <div class="topbar-nick">${user.nickname}</div>
        <div class="topbar-level">Lv.${level} ${Auth.title(level)}</div>
      </div>
      <a href="ranking.html" class="btn btn-ghost btn-sm hide-mobile">🏆 랭킹</a>
      <a href="admin.html" class="btn btn-ghost btn-sm hide-mobile">📝 관리</a>
      <button class="btn btn-ghost btn-sm" id="logoutBtn">로그아웃</button>
    </div>`;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    Auth.clear();
    window.location.href = 'index.html';
  });
}
