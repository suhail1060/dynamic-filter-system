import { Box, Select, MenuItem, IconButton, FormControl } from '@mui/material';
import { Trash2 } from 'lucide-react';
import type { FilterCondition } from '../../types';
import type { OperatorType } from '../../types';
import { FIELD_DEFINITIONS, OPERATORS_BY_TYPE } from '../../config/fields';
import { TextInput } from './inputs/TextInput';
import { NumberInput } from './inputs/NumberInput';
// import { DateRangeInput } from './inputs/DateRangeInput';
import { DateRangeInput } from './inputs/DataRangeInput';
import { AmountRangeInput } from './inputs/AmountRangeInput';
import { SingleSelectInput } from './inputs/SingleSelectInput';
import { MultiSelectInput } from './inputs/MultiSelectInput';
import { BooleanInput } from './inputs/BooleanInput';

interface Props {
    filter: FilterCondition;
    onUpdate: (updated: FilterCondition) => void;
    onRemove: () => void;
}

const selectSx = {
    fontSize: 13,
    color: 'text.primary',
    '.MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#38bdf8' },
    '.MuiSvgIcon-root': { color: '#64748b' },
};

export function FilterRow({ filter, onUpdate, onRemove }: Props) {
    const fieldDef = FIELD_DEFINITIONS.find(f => f.key === filter.fieldKey);
    const operators = fieldDef ? OPERATORS_BY_TYPE[fieldDef.type] : [];

    const handleFieldChange = (fieldKey: string) => {
        const newField = FIELD_DEFINITIONS.find(f => f.key === fieldKey);
        const defaultOp = newField ? OPERATORS_BY_TYPE[newField.type][0].value : 'equals';
        onUpdate({ ...filter, fieldKey, operator: defaultOp as OperatorType, value: '', value2: '' });
    };

    const renderInput = () => {
        if (!fieldDef) return null;
        switch (fieldDef.type) {
            case 'text':
                return <TextInput value={filter.value as string} onChange={v => onUpdate({ ...filter, value: v })} />;
            case 'number':
                return <NumberInput value={filter.value as string} onChange={v => onUpdate({ ...filter, value: v })} />;
            case 'date':
                return <DateRangeInput value={filter.value as string} value2={filter.value2 ?? ''} onChange={v => onUpdate({ ...filter, value: v })} onChange2={v => onUpdate({ ...filter, value2: v })} />;
            case 'amount':
                return <AmountRangeInput value={filter.value as string} value2={filter.value2 ?? ''} onChange={v => onUpdate({ ...filter, value: v })} onChange2={v => onUpdate({ ...filter, value2: v })} />;
            case 'single_select':
                return <SingleSelectInput value={filter.value as string} onChange={v => onUpdate({ ...filter, value: v })} options={fieldDef.options ?? []} />;
            case 'multi_select':
                return <MultiSelectInput value={filter.value as string[]} onChange={v => onUpdate({ ...filter, value: v })} options={fieldDef.options ?? []} />;
            case 'boolean':
                return <BooleanInput value={filter.value as string} onChange={v => onUpdate({ ...filter, value: v })} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            p: 1.5, borderRadius: 2,
            bgcolor: 'rgba(15,23,42,0.6)',
            border: '1px solid #1e3a5f',
        }}>
            {/* Field selector */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select
                    value={filter.fieldKey}
                    onChange={e => handleFieldChange(e.target.value)}
                    inputProps={{ 'aria-label': 'Select field to filter' }}
                    sx={selectSx}
                >
                    {FIELD_DEFINITIONS.map(f => (
                        <MenuItem key={f.key} value={f.key} sx={{ fontSize: 13 }}>
                            {f.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Operator selector */}
            {
                operators.length > 0 && (
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <Select
                            value={filter.operator}
                            onChange={e => onUpdate({ ...filter, operator: e.target.value as OperatorType })}
                            inputProps={{ 'aria-label': 'Select filter operator' }}
                            sx={selectSx}
                        >
                            {operators.map(op => (
                                <MenuItem key={op.value} value={op.value} sx={{ fontSize: 13 }}>
                                    {op.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )
            }

            {/* Value input */}
            <Box sx={{ flex: 1 }}>{renderInput()}</Box>

            {/* Remove button */}
            <IconButton
                size="small"
                onClick={onRemove}
                aria-label="Remove filter"
                sx={{ color: 'error.main', border: '1px solid #334155', borderRadius: 2, '&:hover': { bgcolor: 'rgba(239,68,68,0.1)', borderColor: 'error.main' } }}
            >
                <Trash2 size={14} />
            </IconButton>
        </Box >
    );
}