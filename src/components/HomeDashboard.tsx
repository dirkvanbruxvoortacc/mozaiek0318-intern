"use client";

import { useEffect, useState } from "react";
import type { Session } from "next-auth";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatShortDate } from "@/lib/pco";
import type { PCOSchedule, PCOListResponse } from "@/types/pco";
import Link from "next/link";

interface Props {
  session: Session | null;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";
  return "Goedenavond";
}

export function HomeDashboard({ session }: Props) {
  const [schedules, setSchedules] = useState<PCOSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  const firstName = session?.user?.name?.split(" ")[0] ?? "Hallo";

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    fetch("/api/pco/schedules")
      .then((r) => r.json())
      .then((data: PCOListResponse<PCOSchedule>) => {
        setSchedules(data.data?.slice(0, 3) ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="bg-brand-blue px-4 pt-8 pb-8 md:pt-10">
        <div className="max-w-3xl md:mx-auto">
          <p className="text-white/60 text-sm mb-1">{greeting},</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {firstName}
          </h1>
          <p className="text-white/60 text-sm mt-2">
            Welkom terug bij Mozaiek 0318
          </p>
        </div>
      </div>

      {/* Wave separator */}
      <div className="bg-brand-blue">
        <svg
          viewBox="0 0 375 20"
          fill="none"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0C125 20 250 20 375 0V20H0V0Z" fill="#F5F7FA" />
        </svg>
      </div>

      <div className="px-4 space-y-6 py-4 max-w-3xl md:mx-auto">
        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:max-w-sm">
          <Link href="/rooster">
            <Card className="flex flex-col items-center gap-3 py-5">
              <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-brand-teal"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-brand-blue text-center">
                Mijn Rooster
              </span>
            </Card>
          </Link>

          <Link href="/team">
            <Card className="flex flex-col items-center gap-3 py-5">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-brand-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-brand-blue text-center">
                Mijn Team
              </span>
            </Card>
          </Link>
        </div>

        {/* Upcoming schedules */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-brand-blue">
              Aankomende diensten
            </h2>
            <Link
              href="/rooster"
              className="text-brand-teal text-sm font-medium"
            >
              Alle bekijken →
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner label="Rooster laden..." />
          ) : schedules.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-brand-blue/50 text-sm">
                Geen aankomende diensten gevonden
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <Card key={schedule.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-brand-blue truncate">
                        {schedule.attributes.service_type_name}
                      </p>
                      <p className="text-sm text-brand-blue/60 mt-0.5">
                        {schedule.attributes.team_position_name}
                      </p>
                      <p className="text-xs text-brand-blue/40 mt-1">
                        {formatShortDate(schedule.attributes.plan_sort_date)}
                      </p>
                    </div>
                    <StatusBadge status={schedule.attributes.status} />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
