import { TextField } from '@mui/material';

interface Props { value: string; onChange: (v: string) => void; }

export function NumberInput({ value, onChange }: Props) {
  return (
    <TextField
      size="small" fullWidth type="number"
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder="Enter number..."
      sx={{ '& .MuiOutlinedInput-root': { fontSize: 13 } }}
    />
  );
}