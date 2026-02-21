interface Props {
  value: string;
  value2: string;
  onChange: (v: string) => void;
  onChange2: (v: string) => void;
}

export function AmountRangeInput({ value, value2, onChange, onChange2 }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        type="number"
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder="Min amount"
      />
      <span>–</span>
      <input
        type="number"
        value={value2 ?? ''}
        onChange={e => onChange2(e.target.value)}
        placeholder="Max amount"
      />
    </div>
  );
}