interface Props {
  value: string;
  value2: string;
  onChange: (v: string) => void;
  onChange2: (v: string) => void;
}

export function DateRangeInput({ value, value2, onChange, onChange2 }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input type="date" value={value} onChange={e => onChange(e.target.value)} className="filter-input" />
      <span>to</span>
      <input type="date" value={value2} onChange={e => onChange2(e.target.value)} className="filter-input" />
    </div>
  );
}