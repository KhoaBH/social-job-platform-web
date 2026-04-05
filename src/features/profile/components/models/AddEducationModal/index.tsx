"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GraduationCap, X, Trash2 } from "lucide-react";
import {
  FieldLabel,
  SelectInput,
  YEARS,
} from "../AddExperienceModal/components";
import { AddEducationModalProps, EducationFormData } from "./types";

const DEGREE_OPTIONS = [
  { value: "ASSOCIATE", label: "Associate" },
  { value: "BACHELOR", label: "Bachelor" },
  { value: "MASTER", label: "Master" },
  { value: "PHD", label: "PhD" },
  { value: "DIPLOMA", label: "Diploma" },
  { value: "CERTIFICATE", label: "Certificate" },
  { value: "OTHER", label: "Other" },
];

export default function AddEducationModal({
  open,
  onClose,
  schools,
  fieldOfStudies,
  isSaving = false,
  onSave,
  onDelete,
  isDeleting = false,
  initialData,
}: AddEducationModalProps) {
  const initialForm: EducationFormData = {
    schoolId: undefined,
    schoolName: "",
    useCustomSchool: false,
    degree: "",
    fieldOfStudyId: "",
    startYear: "",
    endYear: "",
  };

  const [form, setForm] = useState<EducationFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof EducationFormData, string>>
  >({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          schoolId: initialData.schoolId,
          schoolName: initialData.schoolName || "",
          useCustomSchool: !initialData.schoolId,
          degree: initialData.degree || "",
          fieldOfStudyId: initialData.fieldOfStudyId || "",
          startYear: String(initialData.startYear || ""),
          endYear: String(initialData.endYear || ""),
        });
      } else {
        setForm(initialForm);
      }
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialData]);

  const set = <K extends keyof EducationFormData>(
    key: K,
    val: EducationFormData[K],
  ) => setForm((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.schoolId && !form.schoolName.trim()) {
      errs.schoolName = "Vui lòng chọn hoặc nhập tên trường";
    }
    if (!form.degree) {
      errs.degree = "Vui lòng chọn bằng cấp";
    }
    if (!form.fieldOfStudyId) {
      errs.fieldOfStudyId = "Vui lòng chọn ngành học";
    }
    if (!form.startYear) {
      errs.startYear = "Vui lòng chọn năm bắt đầu";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    if (!validate()) {
      return;
    }

    try {
      await onSave?.(form);
      onClose();
    } catch {
      // Keep modal open when save fails so user can retry.
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || isDeleting) return;
    try {
      await onDelete?.(initialData.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      console.error("Lỗi khi xóa học vấn:", error);
    }
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <div
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fadeIn"
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center pt-12"
        style={{ colorScheme: "light" }}
      >
        <div className="animate-fadeIn w-full max-w-xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden scale-[0.97]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">
                {initialData ? "Sửa học vấn" : "Thêm học vấn"}
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

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            <div>
              <FieldLabel required>Trường học</FieldLabel>
              {!form.useCustomSchool ? (
                <SelectInput
                  placeholder="Chọn trường"
                  value={form.schoolId || ""}
                  onChange={(v) => {
                    const selected = schools.find((s) => s.id === v);
                    set("schoolId", v);
                    set("schoolName", selected?.name || "");
                  }}
                  options={schools
                    .filter((s) => Boolean(s.name))
                    .map((s) => ({ label: s.name as string, value: s.id }))}
                />
              ) : (
                <div className="relative">
                  <GraduationCap
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={form.schoolName}
                    onChange={(e) => set("schoolName", e.target.value)}
                    placeholder="Ví dụ: University of Information Technology"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all duration-150"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  const next = !form.useCustomSchool;
                  set("useCustomSchool", next);
                  if (next) {
                    set("schoolId", undefined);
                    set("schoolName", "");
                  } else {
                    set("schoolName", "");
                  }
                }}
                className="mt-2 text-[12px] text-violet-600 font-semibold bg-transparent border-none cursor-pointer hover:underline"
              >
                {form.useCustomSchool
                  ? "Chọn trường từ danh sách"
                  : "Không thấy trường? Nhập tên thủ công"}
              </button>
              {errors.schoolName && (
                <p className="mt-1 text-[11.5px] text-red-500">
                  {errors.schoolName}
                </p>
              )}
            </div>

            <div>
              <FieldLabel required>Bằng cấp</FieldLabel>
              <SelectInput
                placeholder="Chọn bằng cấp"
                value={form.degree}
                onChange={(v) => set("degree", v)}
                options={DEGREE_OPTIONS.map((d) => ({
                  value: d.value,
                  label: d.label,
                }))}
              />
              {errors.degree && (
                <p className="mt-1 text-[11.5px] text-red-500">
                  {errors.degree}
                </p>
              )}
            </div>

            <div>
              <FieldLabel required>Field of study</FieldLabel>
              <SelectInput
                placeholder="Chọn ngành học"
                value={form.fieldOfStudyId}
                onChange={(v) => set("fieldOfStudyId", v)}
                options={fieldOfStudies
                  .filter((f) => Boolean(f.name))
                  .map((f) => ({ value: f.id, label: f.name as string }))}
              />
              {errors.fieldOfStudyId && (
                <p className="mt-1 text-[11.5px] text-red-500">
                  {errors.fieldOfStudyId}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel required>Năm bắt đầu</FieldLabel>
                <SelectInput
                  placeholder="Chọn năm"
                  value={form.startYear}
                  onChange={(v) => set("startYear", v)}
                  options={YEARS}
                />
                {errors.startYear && (
                  <p className="mt-1 text-[11.5px] text-red-500">
                    {errors.startYear}
                  </p>
                )}
              </div>
              <div>
                <FieldLabel>Năm kết thúc</FieldLabel>
                <SelectInput
                  placeholder="Chọn năm"
                  value={form.endYear}
                  onChange={(v) => set("endYear", v)}
                  options={YEARS}
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0 bg-white">
            <div>
              {initialData && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                  className="px-4 py-2.5 rounded-full text-[13.5px] font-semibold text-red-600 hover:bg-red-50 transition-all flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Xóa
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
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

            {showDeleteConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
                <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4">
                  <h3 className="text-[16px] font-bold text-gray-900">Xóa học vấn</h3>
                  <p className="text-[14px] text-gray-600 mt-2">
                    Bạn có chắc muốn xóa bản ghi học vấn này không? Hành động này không thể hoàn tác.
                  </p>
                  <div className="flex items-center gap-3 mt-6 justify-end">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                      className="px-5 py-2.5 rounded-full text-[13.5px] font-semibold text-gray-500 hover:bg-gray-100 transition-all"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="px-5 py-2.5 rounded-full text-[13.5px] font-semibold text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-60"
                    >
                      {isDeleting ? "Đang xóa..." : "Xóa"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
