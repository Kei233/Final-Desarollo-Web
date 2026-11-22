// Sesión: el token vive en sessionStorage (se borra al cerrar la pestaña)
export const session = {
  token: () => sessionStorage.getItem('token'),
  user: () => JSON.parse(sessionStorage.getItem('user') || 'null'),
  save(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  },
  clear() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },
};

async function request(url, { method = 'GET', body } = {}) {
  const token = session.token();
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body && JSON.stringify(body),
  });

  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Token vencido: cerramos la sesión
    if (res.status === 401 && token) {
      session.clear();
      window.dispatchEvent(new Event('auth:expired'));
    }
    throw new Error(data.message || 'Ocurrió un error');
  }
  return data;
}

export const api = {
  login: (d) => request('/api/auth/login', { method: 'POST', body: d }),
  register: (d) => request('/api/auth/register', { method: 'POST', body: d }),
  list: () => request('/api/reviews'),
  create: (d) => request('/api/reviews', { method: 'POST', body: d }),
  update: (id, d) => request(`/api/reviews/${id}`, { method: 'PUT', body: d }),
  remove: (id) => request(`/api/reviews/${id}`, { method: 'DELETE' }),
};
