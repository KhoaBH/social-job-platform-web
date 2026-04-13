import { SkillLevel, ProfileSkillView } from "@/features/profile/types";

export interface AddSkillFormData {
  skillId: string;
  level: SkillLevel;
}

export interface AddSkillModalProps {
  open: boolean;
  onClose: () => void;
  availableSkills: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  isSaving?: boolean;
  onSave?: (data: AddSkillFormData) => Promise<void>;
  onDelete?: (skillId: string) => Promise<void>;
  isDeleting?: boolean;
  initialData?: ProfileSkillView;
}
