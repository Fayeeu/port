import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r from-ink/60 via-ink to-ink/60",
        !disabled && "animate-shine bg-[length:200%_100%]",
        className
      )}
      style={{
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}
