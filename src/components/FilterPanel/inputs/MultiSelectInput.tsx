import { useState, useRef, useEffect } from 'react';

interface Props {
  value: string[];
  onChange: (v: string[]) => void;
  options: string[];
}

export function MultiSelectInput({ value, onChange, options }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" onClick={() => setOpen(!open)} className="filter-input">
        {value.length ? value.join(', ') : 'Select options...'}
      </button>
      {open && (
        <div className="dropdown">
          {options.map(opt => (
            <label key={opt} className="dropdown-item">
              <input type="checkbox" checked={value.includes(opt)} onChange={() => toggle(opt)} />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}