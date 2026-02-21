import { ToggleButtonGroup, ToggleButton } from '@mui/material';

interface Props { value: string; onChange: (v: string) => void; }

export function BooleanInput({ value, onChange }: Props) {
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={value}
      onChange={(_, v) => { if (v !== null) onChange(v); }}
    >
      <ToggleButton value="true" sx={{ fontSize: 12, px: 2 }}>True</ToggleButton>
      <ToggleButton value="false" sx={{ fontSize: 12, px: 2 }}>False</ToggleButton>
    </ToggleButtonGroup>
  );
}