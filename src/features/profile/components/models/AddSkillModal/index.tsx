"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BadgeCheck, X } from "lucide-react";
import { SelectInput, FieldLabel } from "../AddExperienceModal/components";
import { SKILL_LEVEL_LABELS, SkillLevel } from "@/features/profile/types";
import { AddSkillFormData, AddSkillModalProps } from "./types";

const LEVEL_OPTIONS = (
  Object.entries(SKILL_LEVEL_LABELS) as Array<[string, string]>
).map(([value, label]) => ({ value, label }));

export default function AddSkillModal({
  open,
  onClose,
  availableSkills,
  isSaving = false,
  onSave,
}: AddSkillModalProps) {
  const initialForm: AddSkillFormData = {
    skillId: "",
    level: 3,
  };

  const [form, setForm] = useState<AddSkillFormData>(initialForm);
  const [error, setError] = useState<string>("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm(initialForm);
    setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const skillOptions = useMemo(
    () =>
      availableSkills.map((skill) => ({
        value: skill.id,
        label:
          skill.category && skill.category !== "Khác"
            ? `${skill.name} (${skill.category})`
            : skill.name,
      })),
    [availableSkills],
  );

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    if (!form.skillId) {
      setError("Vui lòng chọn kỹ năng");
      return;
    }

    try {
      await onSave?.(form);
      onClose();
    } catch {
      setError("Không thể lưu kỹ năng. Vui lòng thử lại.");
    }
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <div
        ref={overlayRef}
        onClick={(event) => event.target === overlayRef.current && onClose()}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fadeIn"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center pt-12">
        <div className="animate-fadeIn w-full max-w-2xl max-h-[82vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden scale-[0.97]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">
                Thêm kỹ năng
              </h2>
              <p className="text-[12px] text-gray-400 mt-0.5">
                <span className="text-violet-500">*</span> Thông tin bắt buộc
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isSaving}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-4 overflow-y-auto">
            <div>
              <FieldLabel required>Kỹ năng</FieldLabel>
              <SelectInput
                placeholder="Chọn kỹ năng"
                value={form.skillId}
                onChange={(value) => {
                  setForm((prev) => ({ ...prev, skillId: value }));
                  setError("");
                }}
                options={skillOptions}
              />
            </div>

            <div>
              <FieldLabel required>Mức độ</FieldLabel>
              <SelectInput
                placeholder="Chọn mức độ"
                value={String(form.level)}
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    level: Number(value) as SkillLevel,
                  }));
                }}
                options={LEVEL_OPTIONS}
              />
            </div>

            {error && <p className="text-[12px] text-red-500">{error}</p>}

            <div className="rounded-xl bg-violet-50 text-violet-700 text-[12.5px] px-3 py-2 flex items-center gap-2">
              <BadgeCheck size={14} />
              Mức độ hiện tại: {SKILL_LEVEL_LABELS[form.level]}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0 bg-white">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-full text-[13.5px] font-semibold text-gray-500 hover:bg-gray-100 transition-all"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full text-[13.5px] font-semibold text-white bg-violet-600 hover:bg-violet-700 active:scale-[0.97] shadow-sm shadow-violet-200 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
