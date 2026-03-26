/* ════════════════════════════════
   Table API 유틸리티
════════════════════════════════ */

const API = {
  /* ── 기본 요청 ── */
  async req(method, path, body) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'   // 배포 환경 세션 쿠키 포함
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(path, opts);
    if (res.status === 204) return null;
    // 401/403 응답 처리: 로그인 페이지로 리다이렉트하지 않고 에러 throw
    if (res.status === 401 || res.status === 403) {
      const text = await res.text();
      throw new Error(`API 인증 오류 (${res.status}): ${text}`);
    }
    return res.json();
  },

  /* ── users ── */
  async getUsers(search) {
    const url = search ? `tables/users?search=${encodeURIComponent(search)}&limit=200` : 'tables/users?limit=200';
    return this.req('GET', url);
  },
  async getUserById(id) {
    return this.req('GET', `tables/users/${id}`);
  },
  async createUser(data) {
    return this.req('POST', 'tables/users', data);
  },
  async updateUser(id, data) {
    return this.req('PATCH', `tables/users/${id}`, data);
  },

  /* ── quizzes ── */
  async getQuizzes(category, limit = 10) {
    const url = category
      ? `tables/quizzes?search=${encodeURIComponent(category)}&limit=200`
      : 'tables/quizzes?limit=200';
    return this.req('GET', url);
  },

  /* ── rooms ── */
  async getRooms() {
    return this.req('GET', 'tables/rooms?limit=100&sort=created_at');
  },
  async getRoomById(id) {
    return this.req('GET', `tables/rooms/${id}`);
  },
  async createRoom(data) {
    return this.req('POST', 'tables/rooms', data);
  },
  async updateRoom(id, data) {
    return this.req('PATCH', `tables/rooms/${id}`, data);
  },
  async deleteRoom(id) {
    return this.req('DELETE', `tables/rooms/${id}`);
  },

  /* ── game_records ── */
  async createRecord(data) {
    return this.req('POST', 'tables/game_records', data);
  },
  async getRanking() {
    return this.req('GET', 'tables/users?limit=100&sort=xp');
  }
};
