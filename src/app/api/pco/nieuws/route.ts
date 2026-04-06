import { NextResponse } from "next/server";
import { pcoFetch } from "@/lib/pco";
import type { PCOListResponse, PCOEpisode } from "@/types/pco";

export async function GET() {
  try {
    const data = await pcoFetch<PCOListResponse<PCOEpisode>>(
      "/publishing/v2/episodes?order=-published_at&per_page=20"
    );
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
