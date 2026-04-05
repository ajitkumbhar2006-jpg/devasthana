import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import { API_URL, getAuthToken } from "../lib/api";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (getAuthToken()) {
    return <Navigate to="/admin" replace />;
  }

  async function handleLogin(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.token) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/admin", { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Admin Login | Shree Krishna Devasthana"
        description="Secure temple admin login for event management."
      />
      <PageHero
        title="Admin Login"
        description="Sign in to manage temple events and media uploads securely."
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <form onSubmit={handleLogin} className="card-surface mx-auto grid max-w-xl gap-5 p-6 sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Restricted Access</p>
            <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">Sign in as temple admin</h2>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/87">Email</span>
            <input
              className="input-surface"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@temple.com"
              autoComplete="username"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/87">Password</span>
            <input
              className="input-surface"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </label>

          {error ? (
            <p className="rounded-2xl border border-rose-400/10 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex justify-center rounded-full bg-gradient-to-r from-saffron to-gold px-6 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
