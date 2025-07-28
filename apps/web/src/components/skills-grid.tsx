import { Skill } from "@repo/contracts";
import { SkillCard } from "./skill-card";

interface SkillsGridProps {
  skills: Skill[];
}

/**
 * Intelligently groups skills into rows for better visual balance
 * - 5 items: 3 + 2
 * - 6 items: 3 + 3
 * - 7 items: 4 + 3
 * - 10 items: 4 + 4 + 2
 * - 11 items: 4 + 4 + 3
 * etc.
 */
export function SkillsGrid({ skills }: SkillsGridProps) {
  const validSkills = skills.filter((skill) => skill.name.length > 0);
  const totalCount = validSkills.length;

  const getOptimalDistribution = (count: number): number[] => {
    if (count <= 4) return [count];
    if (count === 5) return [3, 2];
    if (count === 6) return [3, 3];

    // For everything else: Fill rows with 4 items, then add remainder
    const fullRows = Math.floor(count / 4);
    const remainder = count % 4;

    // Start with full rows of 4
    const distribution = Array(fullRows).fill(4);

    // Add remainder if any (including lonely items)
    if (remainder > 0) {
      distribution.push(remainder);
    }

    return distribution;
  };

  const skillRows: Skill[][] = [];
  const distribution = getOptimalDistribution(totalCount);

  let startIndex = 0;
  distribution.forEach((rowCount) => {
    skillRows.push(validSkills.slice(startIndex, startIndex + rowCount));
    startIndex += rowCount;
  });

  return (
    <div className="space-y-8">
      {skillRows.map((skillRow, rowIndex) => (
        <SkillCard
          key={`row-${rowIndex}`}
          skills={skillRow}
          rows={Math.max(...distribution)}
        />
      ))}
    </div>
  );
}
