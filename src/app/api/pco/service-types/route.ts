import { NextResponse } from "next/server";
import { pcoFetch } from "@/lib/pco";
import type { PCOListResponse, PCOServiceType } from "@/types/pco";

export async function GET() {
  try {
    const data = await pcoFetch<PCOListResponse<PCOServiceType>>(
      "/services/v2/service_types?order=name&per_page=25"
    );
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
