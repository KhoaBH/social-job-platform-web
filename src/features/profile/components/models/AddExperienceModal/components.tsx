// components.tsx
import { ChevronDown } from "lucide-react";

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

  return (
    <div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ colorScheme: "light" }}
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white
                     text-[13.5px] text-gray-800 appearance-none
                     focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent
                     transition-colors duration-150 cursor-pointer pr-10"
        >
          <option value="" disabled hidden>
            {placeholder ?? "Vui lòng chọn"}
          </option>
          {normalizedOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{ backgroundColor: "#ffffff", color: "#111827" }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
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
