import { NextResponse } from "next/server";
import { pcoFetch } from "@/lib/pco";
import type { PCOListResponse, PCOSchedule } from "@/types/pco";

export async function GET() {
  try {
    const data = await pcoFetch<PCOListResponse<PCOSchedule>>(
      "/services/v2/me/schedules?filter=future&order=sort_date&per_page=25"
    );
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
