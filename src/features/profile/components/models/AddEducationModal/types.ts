export interface EducationFormData {
  schoolId?: string;
  schoolName: string;
  useCustomSchool: boolean;
  degree: string;
  fieldOfStudyId: string;
  startYear: string;
  endYear: string;
}

export interface AddEducationModalProps {
  open: boolean;
  onClose: () => void;
  schools: Array<{ id: string; name?: string | null }>;
  fieldOfStudies: Array<{ id: string; name?: string | null }>;
  isSaving?: boolean;
  onSave?: (data: EducationFormData) => void | Promise<void>;
  onDelete?: (id: string) => void | Promise<void>;
  isDeleting?: boolean;
  initialData?: {
    id?: string;
    schoolName?: string;
    schoolId?: string;
    degree?: string;
    fieldOfStudyId?: string;
    startYear?: number;
    endYear?: number;
  };
}
