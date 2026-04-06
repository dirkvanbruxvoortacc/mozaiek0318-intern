"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/Button";

export function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      username,
      password,
      callbackUrl: "/home",
      redirect: false,
    });
    if (result?.error) {
      setError("Onjuiste gebruikersnaam of wachtwoord");
      setLoading(false);
    } else if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-teal/10" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
      </div>

      {/* Content — full screen on mobile, centered card on desktop */}
      <div className="relative w-full max-w-sm mx-auto flex flex-col min-h-screen md:min-h-0 md:rounded-3xl md:shadow-2xl md:bg-white/5 md:backdrop-blur-sm px-8 py-12">
        {/* Logo area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 md:flex-none md:mb-10">
          <div className="w-24 h-24 rounded-3xl bg-white shadow-lg flex items-center justify-center">
            <svg
              viewBox="0 0 80 80"
              fill="none"
              className="w-16 h-16"
              aria-hidden="true"
            >
              <rect x="4" y="4" width="33" height="33" rx="4" fill="#1E3A5F" />
              <rect x="43" y="4" width="33" height="33" rx="4" fill="#00A896" />
              <rect x="4" y="43" width="33" height="33" rx="4" fill="#F4A261" />
              <rect
                x="43"
                y="43"
                width="33"
                height="33"
                rx="4"
                fill="#1E3A5F"
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Deelkracht
            </h1>
            <p className="text-white/70 text-lg mt-2">Mozaiek 0318</p>
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="username" className="block text-white/70 text-sm mb-1">
                Gebruikersnaam
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-brand-teal focus:bg-white/15 transition"
                placeholder="Gebruikersnaam"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white/70 text-sm mb-1">
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-brand-teal focus:bg-white/15 transition"
                placeholder="Wachtwoord"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-300 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            loading={loading}
            fullWidth
            size="lg"
            className="bg-white !text-brand-blue hover:bg-white/90 shadow-lg"
          >
            Inloggen
          </Button>
        </form>
      </div>
    </div>
  );
}
