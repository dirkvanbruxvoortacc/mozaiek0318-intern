"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/Button";

export function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signIn("planningcenter", { callbackUrl: "/home" });
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-brand-blue">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-teal/10" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-1 px-8 py-12">
        {/* Logo area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Mozaiek logo mark */}
          <div className="w-24 h-24 rounded-3xl bg-white shadow-lg flex items-center justify-center">
            <svg
              viewBox="0 0 80 80"
              fill="none"
              className="w-16 h-16"
              aria-hidden="true"
            >
              {/* Mosaic / tile pattern representing Mozaiek */}
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

          <p className="text-white/60 text-center text-base leading-relaxed max-w-xs">
            Jouw vrijwilligers rooster, diensten en team — altijd bij de hand.
          </p>
        </div>

        {/* Login button */}
        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            loading={loading}
            fullWidth
            size="lg"
            className="bg-white !text-brand-blue hover:bg-white/90 shadow-lg"
          >
            {!loading && (
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            )}
            Inloggen met Planning Center
          </Button>

          <p className="text-white/40 text-xs text-center">
            Je wordt doorgestuurd naar Planning Center om in te loggen
          </p>
        </div>
      </div>
    </div>
  );
}
