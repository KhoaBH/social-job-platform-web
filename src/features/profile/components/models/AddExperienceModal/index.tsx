"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Building2, X, Trash2 } from "lucide-react";
import {
  MONTHS,
  YEARS,
  Checkbox,
  FieldLabel,
  SectionDivider,
  SelectInput,
  TextInput,
} from "./components";
import type { AddExperienceModalProps, ExperienceFormData } from "./types";

export default function AddExperienceModal({
  open,
  onClose,
  companies,
  isSaving = false,
  onSave,
  onDelete,
  isDeleting = false,
  initialData,
}: AddExperienceModalProps) {
  const initialForm: ExperienceFormData = {
    companyId: undefined,
    useCustomCompany: false,
    title: "",
    company: "",
    isCurrent: true,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
  };

  const [form, setForm] = useState<ExperienceFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ExperienceFormData, string>>
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
        
        const startParts = initialData.startDate.split("-");
        const startMonth = startParts[1]?.replace(/^0/, "") || "";
        const startYear = startParts[0] || "";

        let endMonth = "";
        let endYear = "";
        if (initialData.endDate) {
          const endParts = initialData.endDate.split("-");
          endMonth = endParts[1]?.replace(/^0/, "") || "";
          endYear = endParts[0] || "";
        }

        setForm({
          companyId: undefined,
          useCustomCompany: true,
          title: initialData.jobTitle || "",
          company: initialData.companyName || "",
          isCurrent: !initialData.endDate,
          startMonth,
          startYear,
          endMonth,
          endYear,
          description: initialData.description || "",
        });
      } else {
        setForm(initialForm);
      }
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialData]);

  const set = <K extends keyof ExperienceFormData>(
    key: K,
    val: ExperienceFormData[K],
  ) => setForm((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.title.trim()) errs.title = "Vui lòng nhập chức danh";
    if (!form.companyId && !form.company.trim())
      errs.company = "Vui lòng chọn hoặc nhập công ty";
    if (!form.startMonth || !form.startYear)
      errs.startMonth = "Vui lòng chọn ngày bắt đầu";
    if (!form.isCurrent && (!form.endMonth || !form.endYear))
      errs.endMonth = "Vui lòng chọn ngày kết thúc";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (isSaving || !validate()) return;
    try {
      await onSave?.(form);
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu kinh nghiệm:", error);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || isDeleting) return;
    try {
      await onDelete?.(initialData.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      console.error("Lỗi khi xóa kinh nghiệm:", error);
    }
  };

  if (!open) return null;

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
        <div className="animate-fadeIn w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden scale-[0.97]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">
                {initialData ? "Sửa kinh nghiệm" : "Thêm kinh nghiệm"}
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

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            <div className="space-y-4">
              <div>
                <FieldLabel required>Chức danh</FieldLabel>
                <TextInput
                  placeholder="Ví dụ: Frontend Intern"
                  value={form.title}
                  onChange={(v) => set("title", v)}
                />
                {errors.title && (
                  <p className="mt-1 text-[11.5px] text-red-500">
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <FieldLabel required>Công ty hoặc tổ chức</FieldLabel>
                {!form.useCustomCompany ? (
                  <SelectInput
                    placeholder="Chọn công ty"
                    value={form.companyId || ""}
                    onChange={(v) => {
                      const selected = companies.find((c) => c.id === v);
                      set("companyId", v);
                      set("company", selected?.name || "");
                    }}
                    options={companies
                      .filter((c) => Boolean(c.name))
                      .map((c) => ({ label: c.name as string, value: c.id }))}
                  />
                ) : (
                  <div className="relative">
                    <Building2
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      placeholder="Ví dụ: Microsoft"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all duration-150"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const next = !form.useCustomCompany;
                    set("useCustomCompany", next);
                    set("companyId", undefined);
                    set("company", "");
                  }}
                  className="mt-2 text-[12px] text-violet-600 font-semibold bg-transparent border-none cursor-pointer hover:underline"
                >
                  {form.useCustomCompany
                    ? "Chọn từ danh sách công ty"
                    : "Không thấy công ty? Nhập tên thủ công"}
                </button>
                {errors.company && (
                  <p className="mt-1 text-[11.5px] text-red-500">
                    {errors.company}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3 bg-violet-50/60 rounded-2xl p-4">
              <Checkbox
                checked={form.isCurrent}
                onChange={(v) => {
                  set("isCurrent", v);
                  if (v) {
                    set("endMonth", "");
                    set("endYear", "");
                  }
                }}
                label="Tôi hiện đang làm việc ở vai trò này"
              />
            </div>

            <div>
              <SectionDivider label="Thời gian" />
              <div className="space-y-3 mt-3">
                <div>
                  <FieldLabel required>Ngày bắt đầu</FieldLabel>
                  <div className="grid grid-cols-2 gap-2.5">
                    <SelectInput
                      placeholder="Tháng"
                      value={form.startMonth}
                      onChange={(v) => set("startMonth", v)}
                      options={MONTHS.map((m) => ({
                        value: m,
                        label: `Tháng ${m}`,
                      }))}
                    />
                    <SelectInput
                      placeholder="Năm"
                      value={form.startYear}
                      onChange={(v) => set("startYear", v)}
                      options={YEARS}
                    />
                  </div>
                  {errors.startMonth && (
                    <p className="mt-1 text-[11.5px] text-red-500">
                      {errors.startMonth}
                    </p>
                  )}
                </div>

                {!form.isCurrent && (
                  <div>
                    <FieldLabel required>Ngày kết thúc</FieldLabel>
                    <div className="grid grid-cols-2 gap-2.5">
                      <SelectInput
                        placeholder="Tháng"
                        value={form.endMonth}
                        onChange={(v) => set("endMonth", v)}
                        options={MONTHS.map((m) => ({
                          value: m,
                          label: `Tháng ${m}`,
                        }))}
                      />
                      <SelectInput
                        placeholder="Năm"
                        value={form.endYear}
                        onChange={(v) => set("endYear", v)}
                        options={YEARS}
                      />
                    </div>
                    {errors.endMonth && (
                      <p className="mt-1 text-[11.5px] text-red-500">
                        {errors.endMonth}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <SectionDivider label="Mô tả" />
              <div className="space-y-4 mt-3">
                <div>
                  <FieldLabel>Mô tả</FieldLabel>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    maxLength={2000}
                    rows={4}
                    placeholder="Mô tả vai trò, thành tựu và trách nhiệm của bạn..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all duration-150"
                  />
                  <p className="mt-1 text-right text-[11px] text-gray-400">
                    {form.description.length}/2000
                  </p>
                </div>
              </div>
            </div>

            <div className="h-2" />
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0 bg-white">
            {initialData && onDelete && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting || isSaving}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13.5px] font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Trash2 size={16} />
                Xóa
              </button>
            )}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={isSaving || isDeleting}
                className="px-5 py-2.5 rounded-full text-[13.5px] font-semibold text-gray-500 hover:bg-gray-100 transition-all"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || isDeleting}
                className="px-6 py-2.5 rounded-full text-[13.5px] font-semibold text-white bg-violet-600 hover:bg-violet-700 active:scale-[0.97] shadow-sm shadow-violet-200 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? "Đang lưu..." : initialData ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </div>

          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-fadeIn">
                <h3 className="text-[16px] font-bold text-gray-900 mb-2">Xác nhận xóa?</h3>
                <p className="text-[13.5px] text-gray-600 mb-6">
                  Bạn chắc chắn muốn xóa kinh nghiệm này? Hành động này không thể hoàn tác.
                </p>
                <div className="flex items-center gap-3 justify-end">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="px-4 py-2.5 rounded-full text-[13.5px] font-semibold text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-4 py-2.5 rounded-full text-[13.5px] font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.97] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? "Đang xóa..." : "Xóa"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
