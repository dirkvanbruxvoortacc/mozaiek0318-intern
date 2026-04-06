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

export async function pcoFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Niet ingelogd");
  }

  const url = path.startsWith("http") ? path : `${PCO_BASE}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: getPcoAuthHeader(),
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`PCO API fout ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "C":
      return "Bevestigd";
    case "D":
      return "Afgemeld";
    case "U":
      return "Wacht op reactie";
    default:
      return status;
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "C":
      return "text-brand-teal bg-brand-teal/10";
    case "D":
      return "text-red-600 bg-red-50";
    case "U":
      return "text-brand-orange bg-brand-orange/10";
    default:
      return "text-gray-600 bg-gray-100";
  }
}
