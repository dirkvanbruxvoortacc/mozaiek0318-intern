import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  C: { label: "Bevestigd", classes: "text-brand-teal bg-brand-teal/10" },
  D: { label: "Afgemeld", classes: "text-red-600 bg-red-50" },
  U: {
    label: "Wacht op reactie",
    classes: "text-brand-orange bg-brand-orange/10",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    classes: "text-gray-600 bg-gray-100",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
}
