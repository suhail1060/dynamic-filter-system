import {
  Box, Table, TableHead, TableBody, TableRow, TableCell,
  TableContainer, Typography, Chip, Stack, TableSortLabel,
} from '@mui/material';
import type { Employee, SortConfig } from '../../types';
import { getNestedValue } from '../../utils/filterEngine';

interface Props {
  data: Employee[];
  total: number;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

const DEPT_COLORS: Record<string, string> = {
  Engineering: '#3b82f6', Design: '#a855f7', Marketing: '#f59e0b',
  Sales: '#10b981', Finance: '#ef4444', HR: '#ec4899',
};

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'department', label: 'Department' },
  { key: 'role', label: 'Role' },
  { key: 'salary', label: 'Salary' },
  { key: 'joinDate', label: 'Joined' },
  { key: 'isActive', label: 'Status' },
  { key: 'projects', label: 'Projects' },
  { key: 'performanceRating', label: 'Rating' },
  { key: 'address.city', label: 'Location' },
  { key: 'skills', label: 'Skills' },
];

function renderCell(key: string, row: Employee) {
  const value = getNestedValue(row as any, key);
  switch (key) {
    case 'department': {
      const color = DEPT_COLORS[value] ?? '#64748b';
      return <Chip label={value} size="small" sx={{ bgcolor: color + '20', color, border: `1px solid ${color}40`, fontWeight: 600, fontSize: 11 }} />;
    }
    case 'salary':
      return <Typography fontSize={13} color="success.main" fontWeight={600}>${value?.toLocaleString()}</Typography>;
    case 'isActive':
      return (
        <Chip
          label={value ? 'Active' : 'Inactive'}
          size="small"
          sx={{
            bgcolor: value ? 'rgba(52,211,153,0.1)' : 'rgba(148,163,184,0.1)',
            color: value ? 'success.main' : 'text.disabled',
            border: `1px solid ${value ? 'rgba(52,211,153,0.3)' : 'rgba(148,163,184,0.2)'}`,
            fontSize: 11, fontWeight: 600,
          }}
        />
      );
    case 'performanceRating':
      return (
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography fontSize={13} color="warning.main">{'★'.repeat(Math.round(value))}</Typography>
          <Typography fontSize={11} color="text.disabled">{value}</Typography>
        </Stack>
      );
    case 'skills': {
      const arr = value as string[];
      return (
        <Stack direction="row" gap={0.5} flexWrap="wrap">
          {arr.slice(0, 2).map((s: string) => (
            <Chip key={s} label={s} size="small" sx={{ fontSize: 10, bgcolor: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }} />
          ))}
          {arr.length > 2 && <Chip label={`+${arr.length - 2}`} size="small" sx={{ fontSize: 10, color: 'text.disabled' }} />}
        </Stack>
      );
    }
    case 'address.city':
      return <Typography fontSize={12} color="text.secondary">{row.address.city}, {row.address.state}</Typography>;
    default:
      return <Typography fontSize={13} color="text.secondary">{String(value ?? '')}</Typography>;
  }
}

export function DataTable({ data, total, sortConfig, onSort }: Props) {
  return (
    <Box sx={{ border: '1px solid #1e3a5f', borderRadius: 3, overflow: 'hidden' }}>
      {/* Stats bar */}
      <Stack direction="row" alignItems="center" gap={1.5} sx={{ px: 2.5, py: 1.5, bgcolor: 'background.paper', borderBottom: '1px solid #1e3a5f' }}>
        <Typography fontSize={13} color="primary.main" fontWeight={700}>{data.length}</Typography>
        <Typography fontSize={13} color="text.disabled">/ {total} records</Typography>
        {data.length < total && (
          <Chip label="Filtered" size="small" sx={{ fontSize: 10, bgcolor: 'rgba(56,189,248,0.1)', color: 'primary.main', border: '1px solid rgba(56,189,248,0.2)' }} />
        )}
      </Stack>

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'rgba(15,23,42,0.95)' }}>
              {COLUMNS.map(col => (
                <TableCell key={col.key} sx={{ borderBottom: '1px solid #1e3a5f', py: 1.5, whiteSpace: 'nowrap' }}>
                  <TableSortLabel
                    active={sortConfig.key === col.key}
                    direction={sortConfig.key === col.key ? sortConfig.dir : 'asc'}
                    onClick={() => onSort(col.key)}
                    sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'text.disabled !important', '&.Mui-active': { color: 'primary.main !important' } }}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMNS.length} sx={{ textAlign: 'center', py: 8, borderBottom: 'none' }}>
                  <Typography fontSize={32} mb={1}>🔍</Typography>
                  <Typography fontWeight={600} color="text.secondary">No results found</Typography>
                  <Typography fontSize={12} color="text.disabled">Try adjusting your filter conditions</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map(row => (
                <TableRow
                  key={row.id}
                  sx={{
                    borderBottom: '1px solid rgba(30,58,95,0.3)',
                    '&:hover': { bgcolor: 'rgba(30,58,95,0.3)' },
                    transition: 'background 0.1s',
                  }}
                >
                  {COLUMNS.map(col => (
                    <TableCell key={col.key} sx={{ py: 1.2, borderBottom: 'none' }}>
                      {renderCell(col.key, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}