import { StorageImg } from "./storage-img";
import { Skill } from "@repo/contracts";

export function SkillCard({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {skills.map((skill, i) => {
        const hidden = !skill.name.length;
        if (hidden) return null;
        
        return (
          <div
            className="group p-6 md:p-8 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary-light/50 transition-all duration-300 hover:scale-105 hover:bg-white/20 dark:hover:bg-white/10"
            data-aos="fade-up"
            data-aos-delay={(i + 1) * 100}
            key={skill.id || i}
          >
            {skill.icons.length === 1 ? (
              <StorageImg
                src={skill.icons[0]}
                alt={skill.name}
                className="block mb-4 w-auto h-[48px] max-w-full filter brightness-0 dark:brightness-100 dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
              />
            ) : (
              <div className="flex gap-2 mb-4">
                {skill.icons.map((img, i) => {
                  return (
                    <StorageImg
                      key={img}
                      src={img}
                      alt={skill.name}
                      className="block w-auto h-[48px] max-w-full filter brightness-0 dark:brightness-100 dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  );
                })}
              </div>
            )}
            <h3 className="text-base font-medium text-neutral-8 dark:text-neutral-2 mb-0 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
              {skill.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
