import { useState, useMemo, useCallback, useEffect } from 'react';
import { Box, Typography, Chip, Stack, CircularProgress, Alert } from '@mui/material';
import type { FilterCondition, SortConfig, Employee } from './types';
import { FilterPanel } from './components/FilterPanel/FilterPanel';
import { DataTable } from './components/DataTable/DataTable';
import { fetchEmployees } from './services/employeeApi';
import { filterData, getNestedValue } from './utils/filterEngine';

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', dir: 'asc' });

  // Fetch from mock API on mount
  useEffect(() => {
    fetchEmployees()
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch employees. Is the mock server running?');
        setLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    const result = filterData(employees, filters);
    return [...result].sort((a, b) => {
      const av = getNestedValue(a as any, sortConfig.key) ?? '';
      const bv = getNestedValue(b as any, sortConfig.key) ?? '';
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortConfig.dir === 'asc' ? cmp : -cmp;
    });
  }, [employees, filters, sortConfig]);

  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', px: 4, py: 4 }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" gap={1.5} mb={1}>
            <Chip label="Employee Directory" size="small" sx={{ bgcolor: 'rgba(56,189,248,0.1)', color: 'primary.main', border: '1px solid rgba(56,189,248,0.3)', fontWeight: 700, fontSize: 11 }} />
            <Chip label={`${employees.length} Records`} size="small" sx={{ bgcolor: 'rgba(129,140,248,0.1)', color: 'secondary.main', border: '1px solid rgba(129,140,248,0.3)', fontSize: 11 }} />
          </Stack>
          <Typography variant="h4" fontWeight={700} color="text.primary" letterSpacing="-0.02em">
            Dynamic Filter{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              System
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Real-time filtering — {filteredData.length} of {employees.length} records shown
          </Typography>
        </Box>

        {/* Loading */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            <FilterPanel filters={filters} onChange={setFilters} />
            <DataTable data={filteredData} total={employees.length} sortConfig={sortConfig} onSort={handleSort} />
          </>
        )}

      </Box>
    </Box>
  );
}