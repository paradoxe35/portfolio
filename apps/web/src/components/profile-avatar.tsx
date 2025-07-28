"use client";

import { site_details } from "@/utils/constants";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  delay?: number;
}

export function ProfileAvatar({ 
  size = "md", 
  className = "",
  delay = 100 
}: ProfileAvatarProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  const innerSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div
      data-aos="zoom-in"
      data-aos-delay={delay}
      className={`${sizeClasses[size]} rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-4 flex items-center justify-center ${className}`}
    >
      <div className="w-full h-full rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center overflow-hidden">
        {/* Try to load image first, fallback to initials */}
        <img
          src="/paradoxe-ngwasi.png"
          alt={site_details.full_name}
          className="w-full h-full object-cover object-top scale-125 hover:scale-150 transition-transform duration-500"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
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