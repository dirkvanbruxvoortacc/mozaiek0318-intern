"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Avatar } from "@/components/Avatar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { PCOTeam, PCOTeamMember, PCOListResponse } from "@/types/pco";

export function TeamScreen() {
  const [teams, setTeams] = useState<PCOTeam[]>([]);
  const [members, setMembers] = useState<Record<string, PCOTeamMember[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pco/teams")
      .then((r) => r.json())
      .then((data: PCOListResponse<PCOTeam> & { error?: string }) => {
        if (data.error) throw new Error(data.error);
        setTeams(data.data ?? []);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleTeam = async (teamId: string, serviceTypeId: string) => {
    if (expanded === teamId) {
      setExpanded(null);
      return;
    }
    setExpanded(teamId);
    if (members[teamId]) return;

    setLoadingMembers(teamId);
    try {
      const res = await fetch(
        `/api/pco/teams/members?teamId=${teamId}&serviceTypeId=${serviceTypeId}`
      );
      const data: PCOListResponse<PCOTeamMember> & { error?: string } =
        await res.json();
      if (data.error) throw new Error(data.error);
      setMembers((prev) => ({ ...prev, [teamId]: data.data ?? [] }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMembers(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Team"
        subtitle={`${teams.length} team${teams.length !== 1 ? "s" : ""}`}
      />

      <div className="px-4 py-4 max-w-3xl md:mx-auto">
        {loading ? (
          <LoadingSpinner label="Teams laden..." />
        ) : error ? (
          <Card className="text-center py-8">
            <p className="text-red-600 text-sm">{error}</p>
          </Card>
        ) : teams.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-brand-blue/50 text-sm">Geen teams gevonden</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                isExpanded={expanded === team.id}
                members={members[team.id] ?? null}
                isLoadingMembers={loadingMembers === team.id}
                onToggle={() => toggleTeam(team.id, team.service_type_id ?? "")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TeamCard({
  team,
  isExpanded,
  members,
  isLoadingMembers,
  onToggle,
}: {
  team: PCOTeam;
  isExpanded: boolean;
  members: PCOTeamMember[] | null;
  isLoadingMembers: boolean;
  onToggle: () => void;
}) {
  return (
    <Card>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-brand-blue"
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
          <div className="text-left">
            <p className="font-semibold text-brand-blue">{team.attributes.name}</p>
            {members && (
              <p className="text-xs text-brand-blue/50 mt-0.5">
                {members.length} leden
              </p>
            )}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-brand-blue/40 transition-transform flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-surface-border">
          {isLoadingMembers ? (
            <div className="py-4">
              <LoadingSpinner label="Leden laden..." />
            </div>
          ) : members && members.length > 0 ? (
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar
                    src={member.attributes.photo_thumbnail}
                    name={member.attributes.name}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-blue truncate">
                      {member.attributes.name}
                    </p>
                    {member.attributes.team_position_name && (
                      <p className="text-xs text-brand-blue/50 truncate">
                        {member.attributes.team_position_name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-blue/50 text-center py-2">
              Geen leden gevonden
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
