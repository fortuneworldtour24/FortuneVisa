import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import type { ChangeEvent } from 'react';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  disabled?: boolean;
  id?: string;
  name?: string;
};

export function SelectField({ label, value, onChange, options, placeholder, disabled = false, id, name }: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value);

  return (
    <div className="space-y-2">
      <label htmlFor={selectId} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-11 text-base font-medium text-ink shadow-sm transition-colors hover:border-primary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
