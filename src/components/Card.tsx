import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl shadow-card p-4 w-full text-left",
        onClick && "hover:shadow-card-hover transition-shadow cursor-pointer",
        className
      )}
    >
      {children}
    </Tag>
  );
}
