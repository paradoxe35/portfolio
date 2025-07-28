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
 * - 9 items: 5 + 4 or 3 + 3 + 3
 * - 10 items: 4 + 3 + 3
 * etc.
 */
export function SkillsGrid({ skills }: SkillsGridProps) {
  const validSkills = skills.filter((skill) => skill.name.length > 0);
  const totalCount = validSkills.length;

  const getOptimalDistribution = (count: number): number[] => {
    if (count <= 4) return [count];

    switch (count) {
      case 5:
        return [3, 2];
      case 6:
        return [3, 3];
      case 7:
        return [4, 3];
      case 8:
        return [4, 4];
      case 9:
        return [3, 3, 3];
      case 10:
        return [4, 3, 3];
      case 11:
        return [4, 4, 3];
      case 12:
        return [4, 4, 4];
      case 13:
        return [4, 3, 3, 3];
      case 14:
        return [4, 4, 3, 3];
      case 15:
        return [4, 4, 4, 3];
      case 16:
        return [4, 4, 4, 4];
      default:
        // For larger numbers, try to distribute evenly with max 4 per row
        const rows = Math.ceil(count / 4);
        const distribution: number[] = [];
        let remaining = count;

        for (let i = 0; i < rows; i++) {
          const itemsInRow = Math.ceil(remaining / (rows - i));
          distribution.push(Math.min(itemsInRow, 4));
          remaining -= distribution[i];
        }

        return distribution;
    }
  };

  const distribution = getOptimalDistribution(totalCount);
  const skillRows: Skill[][] = [];
  let startIndex = 0;

  distribution.forEach((rowCount) => {
    skillRows.push(validSkills.slice(startIndex, startIndex + rowCount));
    startIndex += rowCount;
  });

  return (
    <div className="space-y-8">
      {skillRows.map((skillRow, rowIndex) => (
        <SkillCard key={`row-${rowIndex}`} skills={skillRow} />
      ))}
    </div>
  );
}
