import { useState, useEffect } from 'react';
import type { FilterCondition } from '../types';

const STORAGE_KEY = 'dynamic-filter-system:filters';

export function usePersistedFilters() {
  const [filters, setFilters] = useState<FilterCondition[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch {
      console.warn('Failed to persist filters');
    }
  }, [filters]);

  const clearPersistedFilters = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFilters([]);
  };

  return { filters, setFilters, clearPersistedFilters };
}