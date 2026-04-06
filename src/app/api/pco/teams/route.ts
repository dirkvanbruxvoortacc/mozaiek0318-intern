import { NextResponse } from "next/server";
import { pcoFetch } from "@/lib/pco";
import type { PCOListResponse, PCOTeam } from "@/types/pco";

export async function GET() {
  try {
    const data = await pcoFetch<PCOListResponse<PCOTeam>>(
      "/services/v2/teams?order=sequence&per_page=50"
    );
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
