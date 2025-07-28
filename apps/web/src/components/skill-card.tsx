import { StorageImg } from "./storage-img";
import { Skill } from "@repo/contracts";
import { cn } from "@/utils/cn";

export function SkillCard({ skills }: { skills: Skill[] }) {
  // Filter out empty skills
  const validSkills = skills.filter((skill) => skill.name.length > 0);

  // Determine grid columns based on number of skills with responsive breakpoints
  const getGridClass = () => {
    const count = validSkills.length;
    if (count <= 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"; // 4 or more items
  };

  return (
    <div className={cn("grid gap-4 md:gap-6", getGridClass())}>
      {validSkills.map((skill, i) => {
        return (
          <div
            className={cn(
              "group p-4 sm:p-6 md:p-8 rounded-2xl",
              "bg-white/10 dark:bg-white/5 backdrop-blur-md",
              "border border-white/20 dark:border-white/10",
              "hover:border-primary/50 dark:hover:border-primary-light/50",
              "transition-all duration-300 hover:scale-105",
              "hover:bg-white/20 dark:hover:bg-white/10",
              "animate-fadeUp",
              {
                "animation-delay-100": i === 0,
                "animation-delay-200": i === 1,
                "animation-delay-300": i === 2,
                "animation-delay-400": i === 3,
                "animation-delay-500": i >= 4,
              },
            )}
            key={skill.id || i}
          >
            {skill.icons.length === 1 ? (
              <StorageImg
                src={skill.icons[0]}
                alt={skill.name}
                className={cn(
                  "block mb-4 w-auto max-w-full",
                  "h-[36px] sm:h-[40px] md:h-[48px]",
                  "filter brightness-0 dark:brightness-100 dark:invert",
                  "opacity-70 group-hover:opacity-100",
                  "transition-opacity",
                )}
              />
            ) : (
              <div className="flex gap-2 mb-4">
                {skill.icons.map((img, i) => {
                  return (
                    <StorageImg
                      key={img}
                      src={img}
                      alt={skill.name}
                      className={cn(
                        "block w-auto max-w-full",
                        "h-[36px] sm:h-[40px] md:h-[48px]",
                        "filter brightness-0 dark:brightness-100 dark:invert",
                        "opacity-70 group-hover:opacity-100",
                        "transition-opacity",
                      )}
                    />
                  );
                })}
              </div>
            )}
            <h3
              className={cn(
                "text-sm sm:text-base font-medium mb-0",
                "text-neutral-8 dark:text-neutral-2",
                "group-hover:text-primary dark:group-hover:text-primary-light",
                "transition-colors",
              )}
            >
              {skill.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
