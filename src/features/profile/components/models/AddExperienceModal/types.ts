// types.ts
export interface ExperienceFormData {
  companyId?: string;
  useCustomCompany: boolean;
  title: string;
  company: string;
  isCurrent: boolean;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  description: string;
}

export interface AddExperienceModalProps {
  open: boolean;
  onClose: () => void;
  companies: Array<{ id: string; name?: string | null }>;
  isSaving?: boolean;
  onSave?: (data: ExperienceFormData) => void | Promise<void>;
}
