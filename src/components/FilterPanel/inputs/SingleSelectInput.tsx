import { Select, MenuItem, FormControl } from '@mui/material';

interface Props { value: string; onChange: (v: string) => void; options: string[]; }

export function SingleSelectInput({ value, onChange, options }: Props) {
  return (
    <FormControl size="small" fullWidth>
      <Select value={value ?? ''} onChange={e => onChange(e.target.value)} displayEmpty sx={{ fontSize: 13 }}>
        <MenuItem value="" sx={{ fontSize: 13, color: 'text.disabled' }}>Select...</MenuItem>
        {options.map(opt => <MenuItem key={opt} value={opt} sx={{ fontSize: 13 }}>{opt}</MenuItem>)}
      </Select>
    </FormControl>
  );
}