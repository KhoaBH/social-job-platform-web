import { SkillLevel } from "../profile/types";

export const normalizeSkillLevel = (value?: number | null): SkillLevel => {
  if (!value || Number.isNaN(value)) return 1;
  if (value <= 1) return 1;
  if (value >= 5) return 5;
  return value as SkillLevel;
};

export const initials = (name: string): string =>
  name
    ? name
        .split(" ")
        .map((w) => w[0])
        .slice(-2)
        .join("")
    : "U";

export const toMonthYear = (dateInput?: string | null): string => {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";

  return `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
};

export const randomSoftColorFromString = (seed: string): string => {
  const palette = [
    "#FF6B35",
    "#0EA5E9",
    "#10B981",
    "#8B5CF6",
    "#F59E0B",
    "#EF4444",
  ];
  const value = seed.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return palette[value % palette.length];
};