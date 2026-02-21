import { useCallback } from 'react';
import { Box, Button, Typography, Stack, Divider } from '@mui/material';
import { Filter, X } from 'lucide-react';
import type { FilterCondition } from '../../types';
import { FIELD_DEFINITIONS, OPERATORS_BY_TYPE } from '../../config/fields';
import { FilterRow } from './FilterRow';

interface Props {
  filters: FilterCondition[];
  onChange: (filters: FilterCondition[]) => void;
}

export function FilterPanel({ filters, onChange }: Props) {
  const addFilter = () => {
    const first = FIELD_DEFINITIONS[0];
    onChange([...filters, {
      id: Date.now().toString(),
      fieldKey: first.key,
      operator: OPERATORS_BY_TYPE[first.type][0].value,
      value: '',
      value2: '',
    }]);
  };

  const updateFilter = useCallback((id: string, updated: FilterCondition) => {
    onChange(filters.map(f => f.id === id ? updated : f));
  }, [filters, onChange]);

  const removeFilter = useCallback((id: string) => {
    onChange(filters.filter(f => f.id !== id));
  }, [filters, onChange]);

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      border: '1px solid #1e3a5f',
      borderRadius: 3,
      p: 3,
      mb: 3,
    }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={filters.length ? 2.5 : 0}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box sx={{
            width: 34, height: 34, borderRadius: 2,
            background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Filter size={16} color="white" />
          </Box>
          <Box>
            <Typography fontWeight={700} fontSize={15} color="text.primary">
              Filter Conditions
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              {filters.length
                ? `${filters.length} filter${filters.length > 1 ? 's' : ''} active — AND between fields, OR within same field`
                : 'Add filters to narrow results'}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" gap={1}>
          {filters.length > 0 && (
            <Button
              size="small"
              startIcon={<X size={14} />}
              onClick={() => onChange([])}
              sx={{ color: 'error.main', borderColor: 'error.dark', border: '1px solid', bgcolor: 'rgba(239,68,68,0.05)' }}
            >
              Clear All
            </Button>
          )}
          <Button
            size="small"
            variant="outlined"
            onClick={addFilter}
            sx={{ color: 'primary.main', borderColor: 'primary.main', bgcolor: 'rgba(56,189,248,0.05)' }}
          >
            + Add Filter
          </Button>
        </Stack>
      </Stack>

      {/* Filter Rows */}
      {filters.map((filter, idx) => (
        <Box key={filter.id}>
          {idx > 0 && (
            <Stack direction="row" alignItems="center" gap={1} my={1}>
              <Divider sx={{ flex: 1, borderColor: '#1e3a5f' }} />
              <Typography fontSize={10} color="text.disabled" fontWeight={700} letterSpacing="0.08em">AND</Typography>
              <Divider sx={{ flex: 1, borderColor: '#1e3a5f' }} />
            </Stack>
          )}
          <FilterRow
            filter={filter}
            onUpdate={updated => updateFilter(filter.id, updated)}
            onRemove={() => removeFilter(filter.id)}
          />
        </Box>
      ))}
    </Box>
  );
}