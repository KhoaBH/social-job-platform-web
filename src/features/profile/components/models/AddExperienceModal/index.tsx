// index.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Building2, FileText, ImageIcon, Link2, MapPin, Plus, Sparkles, X } from "lucide-react";

import { 
  JOB_TYPES, 
  LOCATION_TYPES, 
  MONTHS, 
  YEARS, 
  FOUND_JOB_OPTIONS,
  FieldLabel,
  TextInput,
  SelectInput,
  Checkbox,
  SectionDivider 
} from "./components";

import type { AddExperienceModalProps, ExperienceFormData, MediaItem } from "./types";

export default function AddExperienceModal({
  open,
  onClose,
  onSave,
}: AddExperienceModalProps) {
  const [form, setForm] = useState<ExperienceFormData>({
    title: "",
    jobType: "",
    company: "",
    isCurrent: true,
    endCurrentRole: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    location: "",
    locationType: "",
    description: "",
    profileHeadline: "Sinh viên tại University of Information Technology – VNU-HCM",
    foundJobThrough: "",
    media: [],
  });

  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ExperienceFormData, string>>>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const set = <K extends keyof ExperienceFormData>(key: K, val: ExperienceFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.title.trim()) errs.title = "Vui lòng nhập chức danh";
    if (!form.company.trim()) errs.company = "Vui lòng nhập công ty";
    if (!form.startMonth || !form.startYear) errs.startMonth = "Vui lòng chọn ngày bắt đầu";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave?.(form);
    onClose();
  };

  const addMedia = (type: MediaItem["type"]) => {
    setForm((prev) => ({ ...prev, media: [...prev.media, { type, value: "" }] }));
    setShowMediaMenu(false);
  };

  if (!open) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fadeIn"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pt-12">
        <div className="animate-fadeIn w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden scale-[0.97]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Thêm kinh nghiệm</h2>
              <p className="text-[12px] text-gray-400 mt-0.5">
                <span className="text-violet-500">*</span> Thông tin bắt buộc
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <FieldLabel required>Chức danh</FieldLabel>
                <TextInput
                  placeholder="Ví dụ: Quản lý"
                  value={form.title}
                  onChange={(v) => set("title", v)}
                />
                {errors.title && <p className="mt-1 text-[11.5px] text-red-500">{errors.title}</p>}
              </div>

              <div>
                <FieldLabel>Loại hình công việc</FieldLabel>
                <SelectInput value={form.jobType} onChange={(v) => set("jobType", v)} options={JOB_TYPES} />
              </div>

              <div>
                <FieldLabel required>Công ty hoặc tổ chức</FieldLabel>
                <div className="relative">
                  <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder="Ví dụ: Microsoft"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all duration-150"
                  />
                </div>
                {errors.company && <p className="mt-1 text-[11.5px] text-red-500">{errors.company}</p>}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 bg-violet-50/60 rounded-2xl p-4">
              <Checkbox checked={form.isCurrent} onChange={(v) => set("isCurrent", v)} label="Tôi hiện đang làm việc ở vai trò này" />
              <Checkbox checked={form.endCurrentRole} onChange={(v) => set("endCurrentRole", v)} label="Kết thúc vị trí hiện tại kể từ bây giờ" />
            </div>

            {/* Dates */}
            <div>
              <SectionDivider label="Thời gian" />
              <div className="space-y-3 mt-3">
                <div>
                  <FieldLabel>Ngày bắt đầu</FieldLabel>
                  <div className="grid grid-cols-2 gap-2.5">
                    <SelectInput placeholder="Tháng" value={form.startMonth} onChange={(v) => set("startMonth", v)} options={MONTHS} />
                    <SelectInput placeholder="Năm" value={form.startYear} onChange={(v) => set("startYear", v)} options={YEARS} />
                  </div>
                  {errors.startMonth && <p className="mt-1 text-[11.5px] text-red-500">{errors.startMonth}</p>}
                </div>

                {!form.isCurrent && (
                  <div>
                    <FieldLabel>Ngày kết thúc</FieldLabel>
                    <div className="grid grid-cols-2 gap-2.5">
                      <SelectInput placeholder="Tháng" value={form.endMonth} onChange={(v) => set("endMonth", v)} options={MONTHS} />
                      <SelectInput placeholder="Năm" value={form.endYear} onChange={(v) => set("endYear", v)} options={YEARS} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <SectionDivider label="Địa điểm" />
              <div className="space-y-3 mt-3">
                <div>
                  <FieldLabel>Vị trí</FieldLabel>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => set("location", e.target.value)}
                      placeholder="Ví dụ: London, Vương quốc Anh"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all duration-150"
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Loại vị trí</FieldLabel>
                  <SelectInput value={form.locationType} onChange={(v) => set("locationType", v)} options={LOCATION_TYPES} hint="Chọn loại địa điểm (ví dụ: từ xa)" />
                </div>
              </div>
            </div>

            {/* Description & Profile */}
            <div>
              <SectionDivider label="Mô tả & Hồ sơ" />
              <div className="space-y-4 mt-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <FieldLabel>Mô tả</FieldLabel>
                    <button className="flex items-center gap-1 text-[11.5px] text-amber-500 font-semibold hover:text-amber-600 transition-colors">
                      <Sparkles size={12} /> Nhận đề xuất AI
                    </button>
                  </div>
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

                <div>
                  <FieldLabel>Tiêu đề hồ sơ</FieldLabel>
                  <TextInput value={form.profileHeadline} onChange={(v) => set("profileHeadline", v)} maxLength={220} />
                  <div className="flex items-start justify-between mt-1">
                    <p className="text-[11.5px] text-gray-400">Xuất hiện bên dưới tên của bạn ở đầu hồ sơ.</p>
                    <p className="text-[11px] text-gray-400 shrink-0 ml-2">{form.profileHeadline.length}/220</p>
                  </div>
                </div>

                <div>
                  <FieldLabel>Bạn đã tìm được việc làm ở đâu?</FieldLabel>
                  <SelectInput value={form.foundJobThrough} onChange={(v) => set("foundJobThrough", v)} options={FOUND_JOB_OPTIONS} hint="Thông tin này sẽ được dùng để cải thiện trải nghiệm tìm kiếm việc làm." />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <SectionDivider label="Kỹ năng" />
              <div className="mt-3">
                <p className="text-[12.5px] text-gray-500 mb-3">Bạn nên thêm 5 kỹ năng được sử dụng nhiều nhất ở vai trò này.</p>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-600 rounded-full text-[12.5px] font-medium">
                        {skill}
                        <button onClick={() => setSkills(skills.filter((_, j) => j !== i))} className="text-violet-400 hover:text-red-400">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Nhập kỹ năng..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[13.5px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent focus:bg-white transition-all duration-150"
                  />
                  <button
                    onClick={() => {
                      if (!skillInput.trim()) return;
                      setSkills([...skills, skillInput.trim()]);
                      setSkillInput("");
                    }}
                    className="px-4 py-2 rounded-full border border-gray-300 text-[13px] font-semibold text-gray-600 hover:border-violet-400 hover:text-violet-600 transition-all"
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>

            {/* Media */}
            <div>
              <SectionDivider label="Phương tiện" />
              <div className="mt-3">
                <p className="text-[12.5px] text-gray-500 leading-relaxed mb-3">
                  Thêm các loại phương tiện như hình ảnh, tài liệu, trang web hoặc bài thuyết trình (tối đa 50).
                </p>

                {form.media.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {form.media.map((m, i) => (
                      <div key={i} className="flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
                        {m.type === "link" && <Link2 size={14} className="text-gray-400 shrink-0" />}
                        {m.type === "image" && <ImageIcon size={14} className="text-gray-400 shrink-0" />}
                        {m.type === "document" && <FileText size={14} className="text-gray-400 shrink-0" />}
                        <input
                          type="text"
                          value={m.value}
                          onChange={(e) => {
                            const updated = [...form.media];
                            updated[i].value = e.target.value;
                            set("media", updated);
                          }}
                          placeholder={m.type === "link" ? "https://..." : "Tên tệp"}
                          className="flex-1 bg-transparent text-[13px] text-gray-700 placeholder-gray-400 outline-none"
                        />
                        <button onClick={() => set("media", form.media.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 transition-colors">
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowMediaMenu((v) => !v)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-[1.5px] border-gray-300 text-[13px] font-semibold text-gray-600 hover:border-violet-400 hover:text-violet-600 transition-all duration-150 bg-white"
                  >
                    <Plus size={14} />
                    Thêm phương tiện truyền thông
                  </button>

                  {showMediaMenu && (
                    <div className="absolute left-0 top-full mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-10 w-52 animate-fadeIn">
                      {[
                        { type: "link" as const, icon: <Link2 size={15} />, label: "Thêm liên kết" },
                        { type: "image" as const, icon: <ImageIcon size={15} />, label: "Thêm ảnh" },
                        { type: "document" as const, icon: <FileText size={15} />, label: "Thêm tài liệu" },
                      ].map((item) => (
                        <button
                          key={item.type}
                          onClick={() => addMedia(item.type)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[13.5px] text-gray-700 hover:bg-gray-50 transition-colors text-left"
                        >
                          <span className="text-gray-400">{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-2" />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0 bg-white">
            <button onClick={onClose} className="px-5 py-2.5 rounded-full text-[13.5px] font-semibold text-gray-500 hover:bg-gray-100 transition-all">
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-full text-[13.5px] font-semibold text-white bg-violet-600 hover:bg-violet-700 active:scale-[0.97] shadow-sm shadow-violet-200 transition-all duration-150"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}