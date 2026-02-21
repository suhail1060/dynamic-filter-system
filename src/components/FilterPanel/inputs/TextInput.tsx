import { TextField } from '@mui/material';

interface Props { value: string; onChange: (v: string) => void; }

export function TextInput({ value, onChange }: Props) {
  return (
    <TextField
      size="small" fullWidth
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder="Enter value..."
      sx={{ '& .MuiOutlinedInput-root': { fontSize: 13 } }}
    />
  );
}