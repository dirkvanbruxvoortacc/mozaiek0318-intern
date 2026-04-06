"use client";

import { useSession, signOut } from "next-auth/react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Avatar } from "@/components/Avatar";
import { useState } from "react";

export function ProfielScreen() {
  const { data: session } = useSession();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/" });
  };

  const name = session?.user?.name ?? "Onbekend";
  const email = session?.user?.email ?? "";
  const avatar = session?.user?.image ?? null;

  return (
    <div>
      <PageHeader title="Profiel" />

      <div className="px-4 py-6 space-y-4 max-w-3xl md:mx-auto">
        {/* Profile card */}
        <Card className="flex items-center gap-4 py-5">
          <Avatar src={avatar} name={name} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-brand-blue truncate">{name}</p>
            {email && (
              <p className="text-sm text-brand-blue/60 truncate">{email}</p>
            )}
          </div>
        </Card>

        {/* Info section */}
        <Card>
          <h2 className="text-sm font-semibold text-brand-blue/50 uppercase tracking-wide mb-3">
            Account
          </h2>
          <div className="space-y-3">
            <InfoRow
              label="Naam"
              value={name}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              }
            />
            {email && (
              <InfoRow
                label="E-mail"
                value={email}
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                }
              />
            )}
            <InfoRow
              label="Team"
              value="Mozaiek0318 Staff"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              }
            />
          </div>
        </Card>

        {/* About */}
        <Card>
          <h2 className="text-sm font-semibold text-brand-blue/50 uppercase tracking-wide mb-3">
            Over de app
          </h2>
          <div className="space-y-3">
            <InfoRow
              label="App"
              value="Deelkracht"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              }
            />
            <InfoRow
              label="Kerk"
              value="Mozaiek 0318"
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
              }
            />
          </div>
        </Card>

        {/* Sign out */}
        <Button
          variant="danger"
          fullWidth
          onClick={handleSignOut}
          loading={signingOut}
        >
          Uitloggen
        </Button>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-surface-muted flex items-center justify-center text-brand-blue/60 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-brand-blue/50">{label}</p>
        <p className="text-sm font-medium text-brand-blue truncate">{value}</p>
      </div>
    </div>
  );
}
