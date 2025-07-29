"use client";

import Image from "next/image";
import { site_details } from "@/utils/constants";
import { cn } from "@/utils/cn";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  delay?: number;
}

export function ProfileAvatar({
  size = "md",
  className = "",
  delay = 100,
}: ProfileAvatarProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20 md:w-24 md:h-24",
    lg: "w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32",
  };

  const innerSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md",
        "border border-black/10 dark:border-white/10",
        "shadow-lg dark:shadow-none",
        "p-3 md:p-4 flex items-center justify-center",
        "animate-zoomIn",
        {
          "animation-delay-300": delay === 300,
          "animation-delay-400": delay === 400,
          "animation-delay-500": delay === 500,
        },
        className,
      )}
    >
      <div
        className={cn(
          "w-full h-full rounded-full overflow-hidden",
          "bg-white/80 dark:bg-white/5 backdrop-blur-md",
          "border border-black/10 dark:border-white/10",
          "flex items-center justify-center",
        )}
      >
        {/* Try to load image first, fallback to initials */}
        <Image
          src="/paradoxe-ngwasi-2.jpg"
          alt={site_details.full_name}
          width={300}
          height={300}
          priority
          quality={85}
          className={cn(
            "w-full h-full object-cover object-top",
            "scale-130 hover:scale-135",
            "transition-transform duration-500",
          )}
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="text-white font-bold ${innerSizeClasses[size]}">${site_details.firstname[0]}</span>`;
            }
          }}
        />
      </div>
    </div>
  );
}
