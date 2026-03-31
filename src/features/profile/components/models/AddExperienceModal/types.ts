// types.ts
export interface MediaItem {
  type: "link" | "image" | "document";
  value: string;
}

export interface ExperienceFormData {
  title: string;
  jobType: string;
  company: string;
  isCurrent: boolean;
  endCurrentRole: boolean;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  location: string;
  locationType: string;
  description: string;
  profileHeadline: string;
  foundJobThrough: string;
  media: MediaItem[];
}

export interface AddExperienceModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: ExperienceFormData) => void;
}