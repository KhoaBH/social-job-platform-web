// components.tsx
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export const MONTHS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from({ length: 40 }, (_, i) =>
  String(CURRENT_YEAR - i),
);

// Sub Components
export function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-violet-500 ml-0.5">*</span>}
    </label>
  );
}

export function TextInput({
  placeholder,
  value,
  onChange,
  maxLength,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                 text-[13.5px] text-gray-800 placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent
                 focus:bg-white transition-all duration-150"
    />
  );
}

export function SelectInput({
  placeholder,
  value,
  onChange,
  options,
  hint,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<string | { label: string; value: string }>;
  hint?: string;
}) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(() => {
    const selected = normalizedOptions.find((opt) => opt.value === value);
    return selected?.label ?? "";
  }, [normalizedOptions, value]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div>
      <div className="relative" ref={rootRef}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-left
                     text-[13.5px] text-gray-800 appearance-none
                     focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent
                     transition-[box-shadow,border-color,background-color] duration-150 ease-out cursor-pointer pr-10"
        >
          <span className={selectedLabel ? "text-gray-800" : "text-gray-400"}>
            {selectedLabel || placeholder || "Vui lòng chọn"}
          </span>
        </button>
        <ChevronDown
          size={15}
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />

        {open && (
          <div
            role="listbox"
            className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white py-1 shadow-lg max-h-56 overflow-auto animate-[fadeIn_0.12s_ease]"
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-3.5 py-2 text-left text-[13.5px] transition-colors ${
                    isSelected
                      ? "bg-violet-50 text-violet-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      {hint && <p className="mt-1 text-[11.5px] text-gray-400">{hint}</p>}
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-150
          ${checked ? "bg-violet-600 border-violet-600" : "border-gray-300 bg-white group-hover:border-violet-400"}`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-[13.5px] text-gray-700 select-none">{label}</span>
    </label>
  );
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}
