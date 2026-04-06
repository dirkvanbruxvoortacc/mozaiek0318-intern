import { NextResponse } from "next/server";
import { pcoFetch } from "@/lib/pco";
import type { PCOSingleResponse, PCOPerson } from "@/types/pco";

export async function GET() {
  try {
    const data = await pcoFetch<PCOSingleResponse<PCOPerson>>(
      "/people/v2/me"
    );
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
