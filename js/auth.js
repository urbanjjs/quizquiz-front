/* ════════════════════════════════
   인증 유틸리티 (localStorage 기반)
════════════════════════════════ */

const Auth = {
  KEY: 'qq_user',

  /* 현재 로그인 유저 */
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)); } catch { return null; }
  },

  /* 저장 */
  set(user) {
    localStorage.setItem(this.KEY, JSON.stringify(user));
  },

  /* 로그아웃 */
  clear() {
    localStorage.removeItem(this.KEY);
  },

  /* 로그인 여부 */
  isLoggedIn() {
    return !!this.get();
  },

  /* 비밀번호 해시 (단순 FNV-1a) */
  hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h.toString(16).padStart(8, '0');
  },

  /* UUID 생성 */
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  },

  /* 레벨 계산 */
  calcLevel(xp) {
    if (xp < 100)   return 1;
    if (xp < 300)   return 2;
    if (xp < 600)   return 3;
    if (xp < 1000)  return 4;
    if (xp < 1500)  return 5;
    if (xp < 2200)  return 6;
    if (xp < 3000)  return 7;
    if (xp < 4000)  return 8;
    if (xp < 5500)  return 9;
    if (xp < 7500)  return 10;
    return Math.floor(10 + (xp - 7500) / 1000);
  },

  /* 칭호 */
  title(level) {
    if (level <= 3)  return '🌱 새싹';
    if (level <= 6)  return '📖 학생';
    if (level <= 10) return '🧠 고수';
    if (level <= 15) return '🏆 마스터';
    return '👑 전설';
  },

  /* 로그인 체크 → 없으면 리다이렉트 */
  require() {
    if (!this.isLoggedIn()) {
      window.location.href = 'index.html';
      return null;
    }
    return this.get();
  }
};
