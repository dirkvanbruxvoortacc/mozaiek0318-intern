import { NextResponse } from "next/server";
import { pcoFetch } from "@/lib/pco";
import type { PCOListResponse, PCOServiceType, PCOTeam } from "@/types/pco";

export async function GET() {
  try {
    const serviceTypes = await pcoFetch<PCOListResponse<PCOServiceType>>(
      "/services/v2/service_types?order=name&per_page=50"
    );

    const allTeams: PCOTeam[] = [];
    for (const st of serviceTypes.data ?? []) {
      const teamsData = await pcoFetch<PCOListResponse<PCOTeam>>(
        `/services/v2/service_types/${st.id}/teams?order=sequence&per_page=50`
      );
      for (const team of teamsData.data ?? []) {
        allTeams.push({ ...team, service_type_id: st.id });
      }
    }

    return NextResponse.json({
      data: allTeams,
      meta: { total_count: allTeams.length, count: allTeams.length },
      links: { self: "" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
