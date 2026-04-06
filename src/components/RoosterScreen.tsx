"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatDate } from "@/lib/pco";
import type { PCOSchedule, PCOListResponse } from "@/types/pco";

type Filter = "all" | "U" | "C" | "D";

export function RoosterScreen() {
  const [schedules, setSchedules] = useState<PCOSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = () => {
    setLoading(true);
    setError(null);
    fetch("/api/pco/schedules")
      .then((r) => r.json())
      .then((data: PCOListResponse<PCOSchedule> & { error?: string }) => {
        if (data.error) throw new Error(data.error);
        setSchedules(data.data ?? []);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  const updateStatus = async (id: string, status: "C" | "D") => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/pco/schedules/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            type: "ScheduledPerson",
            id,
            attributes: { status },
          },
        }),
      });
      if (!res.ok) throw new Error("Bijwerken mislukt");
      setSchedules((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, attributes: { ...s.attributes, status } }
            : s
        )
      );
    } catch (e) {
      alert(e instanceof Error ? e.message : "Fout bij bijwerken");
    } finally {
      setUpdating(null);
    }
  };

  const filters: { label: string; value: Filter }[] = [
    { label: "Alle", value: "all" },
    { label: "In afwachting", value: "U" },
    { label: "Bevestigd", value: "C" },
    { label: "Afgemeld", value: "D" },
  ];

  const filtered =
    filter === "all"
      ? schedules
      : schedules.filter((s) => s.attributes.status === filter);

  return (
    <div>
      <PageHeader
        title="Mijn Rooster"
        subtitle={`${schedules.length} dienst${schedules.length !== 1 ? "en" : ""} gevonden`}
      />

      {/* Filter tabs */}
      <div className="bg-brand-blue px-4 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === f.value
                ? "bg-white text-brand-blue"
                : "bg-white/20 text-white/80 hover:bg-white/30"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 max-w-3xl md:mx-auto">
        {loading ? (
          <LoadingSpinner label="Rooster laden..." />
        ) : error ? (
          <Card className="text-center py-8">
            <p className="text-red-600 text-sm mb-3">{error}</p>
            <Button variant="ghost" size="sm" onClick={loadSchedules}>
              Opnieuw proberen
            </Button>
          </Card>
        ) : filtered.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-brand-blue/50 text-sm">
              {filter === "all"
                ? "Geen aankomende diensten gevonden"
                : "Geen diensten in deze categorie"}
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                onAccept={() => updateStatus(schedule.id, "C")}
                onDecline={() => updateStatus(schedule.id, "D")}
                isUpdating={updating === schedule.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ScheduleCard({
  schedule,
  onAccept,
  onDecline,
  isUpdating,
}: {
  schedule: PCOSchedule;
  onAccept: () => void;
  onDecline: () => void;
  isUpdating: boolean;
}) {
  const { status, service_type_name, team_position_name, plan_sort_date } =
    schedule.attributes;

  return (
    <Card>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-brand-blue leading-snug">
              {service_type_name}
            </p>
            <p className="text-sm text-brand-blue/60 mt-0.5">
              {team_position_name}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-brand-blue/50">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25"
            />
          </svg>
          {formatDate(plan_sort_date)}
        </div>

        {status === "U" && (
          <div className="flex gap-2 pt-1">
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={onAccept}
              loading={isUpdating}
              disabled={isUpdating}
            >
              Bevestigen
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={onDecline}
              disabled={isUpdating}
            >
              Afmelden
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
