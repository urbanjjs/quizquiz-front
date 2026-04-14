/* ════════════════════════════════
   Table API 유틸리티
════════════════════════════════ */

const API_BASE = 'https://quizquiz-worker.urbanjjs.workers.dev';

const API = {
  /* ── 기본 요청 ── */
  async req(method, path, body) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${API_BASE}${path}`, opts);
    if (res.status === 204) return null;
    if (res.status === 401 || res.status === 403) {
      const text = await res.text();
      throw new Error(`API 인증 오류 (${res.status}): ${text}`);
    }
    return res.json();
  },

  /* ── users ── */
  async getUsers(search) {
    const url = search ? `/api/users?search=${encodeURIComponent(search)}&limit=200` : '/api/users?limit=200';
    return this.req('GET', url);
  },
  async getUserById(id) {
    return this.req('GET', `/api/users/${id}`);
  },
  async createUser(data) {
    return this.req('POST', '/api/users', data);
  },
  async updateUser(id, data) {
    return this.req('PATCH', `/api/users/${id}`, data);
  },

  /* ── quizzes ── */
  async getQuizzes(category, limit = 20000) {
    const url = category
      ? `/api/quizzes?search=${encodeURIComponent(category)}&limit=${limit}`
      : `/api/quizzes?limit=${limit}`;
    return this.req('GET', url);
  },

  /* ── rooms ── */
  async getRooms() {
    return this.req('GET', '/api/rooms?limit=100');
  },
  async getRoomById(id) {
    return this.req('GET', `/api/rooms/${id}`);
  },
  async createRoom(data) {
    return this.req('POST', '/api/rooms', data);
  },
  async updateRoom(id, data) {
    return this.req('PATCH', `/api/rooms/${id}`, data);
  },
  async deleteRoom(id) {
    return this.req('DELETE', `/api/rooms/${id}`);
  },

  /* ── game_records ── */
  async createRecord(data) {
    return this.req('POST', '/api/game_records', data);
  },
  async getRanking() {
    return this.req('GET', '/api/ranking');
  }
};
