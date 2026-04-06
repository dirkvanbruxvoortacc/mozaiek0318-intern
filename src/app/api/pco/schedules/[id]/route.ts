import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const PCO_BASE = "https://api.planningcenteronline.com";

function getPcoAuthHeader(): string {
  const id = process.env.PCO_PAT_ID;
  const secret = process.env.PCO_PAT_SECRET;
  if (!id || !secret) {
    throw new Error("PCO PAT is niet geconfigureerd");
  }
  return "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const res = await fetch(
      `${PCO_BASE}/services/v2/schedules/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: getPcoAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      return NextResponse.json(
        { error: `PCO fout ${res.status}: ${text}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
