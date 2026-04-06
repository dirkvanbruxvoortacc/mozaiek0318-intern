import { NextResponse } from "next/server";
import { pcoFetch } from "@/lib/pco";
import type { PCOListResponse, PCOPlan } from "@/types/pco";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceTypeId = searchParams.get("serviceTypeId");

    if (!serviceTypeId) {
      return NextResponse.json(
        { error: "serviceTypeId vereist" },
        { status: 400 }
      );
    }

    const data = await pcoFetch<PCOListResponse<PCOPlan>>(
      `/services/v2/service_types/${serviceTypeId}/plans?filter=future&order=sort_date&per_page=10`
    );
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
