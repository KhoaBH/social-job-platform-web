export interface BackendUser {
  id: string;
  email: string;
  username: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  profileText?: string | null;
  headline?: string | null;
  summary?: string | null;
  location?: string | null;
}

export interface BackendCompany {
  id: string;
  name?: string | null;
}

export interface BackendWorkExperience {
  id: string;
  company?: BackendCompany | null;
  companyName?: string | null;
  jobTitle?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string | null;
}

export interface BackendFieldOfStudy {
  id: string;
  name?: string | null;
}

export interface BackendSchool {
  id: string;
  name?: string | null;
}

export interface BackendEducation {
  id: string;
  school?: BackendSchool | null;
  schoolName?: string | null;
  degree?: string | null;
  fieldOfStudy?: BackendFieldOfStudy | null;
  startYear?: number | null;
  endYear?: number | null;
}

export interface BackendFollow {
  id: string;
  follower?: { id: string } | null;
  followee?: { id: string } | null;
}

export interface BackendConnectionUser {
  id: string;
}

export interface BackendConnection {
  id: string;
  requester?: BackendConnectionUser | null;
  addressee?: BackendConnectionUser | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "BLOCKED" | string;
}

export interface BackendSkillCategory {
  id: string;
  name?: string | null;
}

export interface BackendSkill {
  id: string;
  name?: string | null;
  category?: BackendSkillCategory | null;
}

export interface BackendUserSkill {
  id: string;
  level?: number | null;
  skill?: BackendSkill | null;
}

// ===== Payload =====
export interface CreateWorkExperiencePayload {
  companyId?: string;
  companyName?: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface UpdateWorkExperiencePayload {
  companyId?: string;
  companyName?: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface CreateUserSkillPayload {
  skillId: string;
  level: number;
}

export interface CreateEducationPayload {
  schoolId?: string;
  schoolName?: string;
  degree: string;
  fieldOfStudyId: string;
  startYear?: number;
  endYear?: number;
}

// ===== View Model =====
export type Tab = "overview" | "profile" | "activity" | "network";

export type ConnectionRelationshipState =
  | "none"
  | "pending_sent"
  | "pending_received"
  | "friends";

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

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

// ===== Constants =====
export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  1: "Mới bắt đầu",
  2: "Cơ bản",
  3: "Trung cấp",
  4: "Nâng cao",
  5: "Chuyên gia",
};