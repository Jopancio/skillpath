"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const AUTH_KEY = "skillpath-auth";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  provider: "google" | "email";
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthCredentials {
  name: string;
  email: string;
  password: string;
}

interface StoredAuth {
  users: StoredUser[];
  session: AuthUser | null;
}

interface StoredUser {
  name: string;
  email: string;
  password: string; // plain localStorage demo — not secure, replace with real backend in prod
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  signUp: (c: AuthCredentials) => { ok: boolean; error?: string };
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signInWithGoogle: () => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
  hasGoogle: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStore(): StoredAuth {
  if (typeof window === "undefined")
    return { users: [], session: null };
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return { users: [], session: null };
    const parsed = JSON.parse(raw) as StoredAuth;
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      session: parsed.session ?? null,
    };
  } catch {
    return { users: [], session: null };
  }
}

function saveStore(store: StoredAuth) {
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(store));
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** Minimal typing for Google Identity Services (loaded from CDN at runtime) */
interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleAccountsId {
  initialize: (opts: {
    client_id: string;
    callback: (resp: GoogleCredentialResponse) => void;
  }) => void;
  renderButton: (el: HTMLElement, opts: unknown) => void;
  prompt: () => void;
}

interface GoogleWindow {
  google?: {
    accounts?: {
      id: GoogleAccountsId;
    };
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize synchronously from localStorage. On the server this is null,
  // on the client the lazy initializer reads the persisted session directly.
  const [user, setUser] = useState<AuthUser | null>(() =>
    typeof window !== "undefined" ? loadStore().session : null
  );
  const hasGoogle = Boolean(GOOGLE_CLIENT_ID);

  // Keep the session in sync if localStorage changes in another tab.
  useEffect(() => {
    const onStorage = () => setUser(loadStore().session);
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const signUp = useCallback((c: AuthCredentials) => {
    const email = normalizeEmail(c.email);
    if (!c.name.trim()) return { ok: false, error: "Nama tidak boleh kosong." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { ok: false, error: "Email tidak valid." };
    if (c.password.length < 6)
      return { ok: false, error: "Password minimal 6 karakter." };

    const store = loadStore();
    const existing = store.users.find((u) => u.email === email);
    
    if (existing) {
      if (existing.password === c.password) {
        // Already registered with correct password -> auto login
        const session: AuthUser = {
          id: `email-${Date.now()}`,
          name: existing.name,
          email: existing.email,
          provider: "email",
          createdAt: existing.createdAt,
        };
        store.session = session;
        saveStore(store);
        setUser(session);
        return { ok: true };
      }
      return { ok: false, error: "Email sudah terdaftar. Silakan login." };
    }

    const created: AuthUser = {
      id: `email-${Date.now()}`,
      name: c.name.trim(),
      email,
      provider: "email",
      createdAt: new Date().toISOString(),
    };
    store.users.push({
      name: created.name,
      email,
      password: c.password,
      createdAt: created.createdAt,
    });
    store.session = created;
    saveStore(store);
    setUser(created);
    return { ok: true };
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const normalized = normalizeEmail(email);
    if (!normalized || !password)
      return { ok: false, error: "Isi email dan password." };

    const store = loadStore();
    const found = store.users.find(
      (u) => u.email === normalized && u.password === password
    );
    if (!found)
      return { ok: false, error: "Email atau password salah." };

    const session: AuthUser = {
      id: `email-${Date.now()}`,
      name: found.name,
      email: found.email,
      provider: "email",
      createdAt: found.createdAt,
    };
    store.session = session;
    saveStore(store);
    setUser(session);
    return { ok: true };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    // Load Google Identity Services dynamically
    const clientId = GOOGLE_CLIENT_ID;
    if (!clientId) return { ok: false, error: "Google login belum dikonfigurasi." };

    await new Promise<void>((resolve) => {
      const gwin = window as GoogleWindow;
      if (gwin.google?.accounts) return resolve();
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => resolve();
      document.head.appendChild(s);
    });

    return new Promise<{ ok: boolean; error?: string }>((resolve) => {
      const gwin = window as GoogleWindow;
      const google = gwin.google;
      if (!google?.accounts?.id) {
        resolve({ ok: false, error: "Google login gagal dimuat." });
        return;
      }

      google.accounts.id.initialize({
        client_id: clientId,
        callback: (resp: GoogleCredentialResponse) => {
          if (!resp.credential) {
            resolve({ ok: false, error: "Login Google dibatalkan." });
            return;
          }
          try {
            // Decode JWT payload
            const payload = JSON.parse(
              atob(resp.credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
            ) as { sub?: string; name?: string; email?: string; picture?: string };
            const email = normalizeEmail(payload.email ?? "");
            if (!email) {
              resolve({ ok: false, error: "Google tidak memberikan email." });
              return;
            }
            const store = loadStore();
            const session: AuthUser = {
              id: `google-${payload.sub ?? Date.now()}`,
              name: payload.name ?? email.split("@")[0],
              email,
              provider: "google",
              avatarUrl: payload.picture,
              createdAt: new Date().toISOString(),
            };
            // Store google users so email login can match name later
            if (!store.users.some((u) => u.email === email)) {
              store.users.push({
                name: session.name,
                email,
                password: "",
                createdAt: session.createdAt,
              });
            }
            store.session = session;
            saveStore(store);
            setUser(session);
            resolve({ ok: true });
          } catch {
            resolve({ ok: false, error: "Gagal memproses login Google." });
          }
        },
      });

      google.accounts.id.renderButton(
        document.createElement("div"),
        { theme: "outline", size: "large" }
      );
      google.accounts.id.prompt();
    });
  }, []);

  const signOut = useCallback(() => {
    const store = loadStore();
    store.session = null;
    saveStore(store);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      hasGoogle,
    }),
    [user, signUp, signIn, signInWithGoogle, signOut, hasGoogle]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
