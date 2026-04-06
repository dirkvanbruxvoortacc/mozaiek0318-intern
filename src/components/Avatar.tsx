import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { container: "w-8 h-8 text-xs", img: 32 },
  md: { container: "w-10 h-10 text-sm", img: 40 },
  lg: { container: "w-14 h-14 text-lg", img: 56 },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const { container, img } = sizeMap[size];
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-semibold",
        container,
        !src && "bg-brand-blue text-white",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={img}
          height={img}
          className="object-cover w-full h-full"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
