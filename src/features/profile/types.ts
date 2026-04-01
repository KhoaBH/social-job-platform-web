export type Tab = "overview" | "profile" | "activity" | "network";

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
