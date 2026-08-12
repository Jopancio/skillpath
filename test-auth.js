const fs = require('fs');

// Mock localStorage
const store = {};
global.window = {
  localStorage: {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = val; }
  }
};

// Simulate loadStore and saveStore
const AUTH_KEY = "skillpath-auth";
function loadStore() {
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return { users: [], session: null };
    const parsed = JSON.parse(raw);
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      session: parsed.session ?? null,
    };
  } catch {
    return { users: [], session: null };
  }
}

function saveStore(s) {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(s));
}

function normalizeEmail(email) { return email.trim().toLowerCase(); }

function signUp(c) {
    const email = normalizeEmail(c.email);
    if (!c.name.trim()) return { ok: false, error: "Nama tidak boleh kosong." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { ok: false, error: "Email tidak valid." };
    if (c.password.length < 6)
      return { ok: false, error: "Password minimal 6 karakter." };

    const st = loadStore();
    if (st.users.some((u) => u.email === email))
      return { ok: false, error: "Email sudah terdaftar. Silakan login." };

    const created = {
      id: `email-${Date.now()}`,
      name: c.name.trim(),
      email,
      provider: "email",
      createdAt: new Date().toISOString(),
    };
    st.users.push({
      name: created.name,
      email,
      password: c.password,
      createdAt: created.createdAt,
    });
    st.session = created;
    saveStore(st);
    return { ok: true, user: created };
}

function signOut() {
    const st = loadStore();
    st.session = null;
    saveStore(st);
}

function signIn(email, password) {
    const normalized = normalizeEmail(email);
    if (!normalized || !password)
      return { ok: false, error: "Isi email dan password." };

    const st = loadStore();
    const found = st.users.find(
      (u) => u.email === normalized && u.password === password
    );
    if (!found)
      return { ok: false, error: "Email atau password salah." };

    const session = {
      id: `email-${Date.now()}`,
      name: found.name,
      email: found.email,
      provider: "email",
      createdAt: found.createdAt,
    };
    st.session = session;
    saveStore(st);
    return { ok: true, user: session };
}

console.log("Signup:", signUp({name: "test", email: "test@test.com", password: "password"}));
console.log("Store after signup:", store);
signOut();
console.log("Store after signout:", store);
console.log("Signin:", signIn("test@test.com", "password"));
console.log("Store after signin:", store);
