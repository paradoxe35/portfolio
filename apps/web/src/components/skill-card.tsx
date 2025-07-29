import { StorageImg } from "./storage-img";
import { Skill } from "@repo/contracts";
import { cn } from "@/utils/cn";

type SkillCardProps = {
  skills: Skill[];
  rows?: number;
};

const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const validStyleCSS = (style: Record<string, string> | undefined) => {
  if (!style || Object.keys(style).length === 0) {
    return undefined;
  }

  return Object.entries(style).reduce(
    (acc, [prop, value]) => {
      if (typeof value === "string") {
        acc[prop] = value;
      }

      return acc;
    },
    {} as Record<string, string>
  );
};

export function SkillCard({ skills, rows }: SkillCardProps) {
  // Filter out empty skills
  const validSkills = skills.filter((skill) => skill.name.length > 0);

  // Determine grid columns based on number of skills with responsive breakpoints
  const getGridClass = () => {
    const count = rows && rows >= 3 ? rows : validSkills.length;

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
              "bg-white/80 dark:bg-white/5 backdrop-blur-md",
              "border border-black/10 dark:border-white/10",
              "shadow-sm dark:shadow-none",
              "hover:border-primary/50 dark:hover:border-primary-light/50",
              "transition-all duration-300 hover:scale-105",
              "hover:bg-white/90 dark:hover:bg-white/10",
              "hover:shadow-lg dark:hover:shadow-none",
              "animate-fadeUp",
              {
                "animation-delay-100": i === 0,
                "animation-delay-200": i === 1,
                "animation-delay-300": i === 2,
                "animation-delay-400": i === 3,
                "animation-delay-500": i >= 4,
              }
            )}
            key={skill.id || i}
          >
            {skill.icons.length === 1 ? (
              <StorageImg
                src={skill.icons[0]}
                alt={skill.name}
                id={slugify(skill.name)}
                style={validStyleCSS(skill.style)}
                className={cn(
                  "block mb-4 w-auto max-w-full",
                  "h-[36px] sm:h-[40px] md:h-[48px]",
                  "filter brightness-100 dark:invert",
                  "opacity-90 dark:opacity-70 group-hover:opacity-100",
                  "transition-opacity"
                )}
                width={70}
                height={70}
              />
            ) : (
              <div className="flex gap-2 mb-4">
                {skill.icons.map((img, i) => {
                  return (
                    <StorageImg
                      key={img}
                      src={img}
                      alt={skill.name}
                      id={slugify(skill.name) + "-" + i}
                      style={validStyleCSS(skill.style)}
                      width={70}
                      height={70}
                      className={cn(
                        "block w-auto max-w-full",
                        "h-[36px] sm:h-[40px] md:h-[48px]",
                        "filter brightness-100 dark:invert",
                        "opacity-90 dark:opacity-70 group-hover:opacity-100",
                        "transition-opacity"
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
                "transition-colors"
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
