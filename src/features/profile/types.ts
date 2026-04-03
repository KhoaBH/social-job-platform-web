export type Tab = "overview" | "profile" | "activity" | "network";

export type ConnectionRelationshipState =
  | "none"
  | "pending_sent"
  | "pending_received"
  | "friends";

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  1: "Mới bắt đầu",
  2: "Cơ bản",
  3: "Trung cấp",
  4: "Nâng cao",
  5: "Chuyên gia",
};

export interface ProfileSkillView {
  id: string;
  skillId: string;
  name: string;
  category: string;
  level: SkillLevel;
}

export interface SkillOptionView {
  id: string;
  name: string;
  category: string;
}

export const normalizeSkillLevel = (value?: number | null): SkillLevel => {
  if (!value || Number.isNaN(value)) {
    return 1;
  }

  if (value <= 1) {
    return 1;
  }

  if (value >= 5) {
    return 5;
  }

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

export interface ProfileUserView {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
  headline: string;
  location: string;
  bio: string;
  isOwner: boolean;
  connections: number;
  followers: number;
  openToWork: boolean;
}

export interface ProfileExperienceView {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyColor: string;
  type: string;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
}

export interface ProfileEducationView {
  id: string;
  school: string;
  schoolLogo: string;
  schoolColor: string;
  degree: string;
  major: string;
  startYear: string;
  endYear: string;
  gpa: string;
  activities: string;
}

export const toMonthYear = (dateInput?: string | null): string => {
  if (!dateInput) {
    return "";
  }

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

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
