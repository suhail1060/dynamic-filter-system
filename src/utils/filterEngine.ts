import  type { Employee, FilterCondition } from '../types';
import { FIELD_DEFINITIONS } from '../config/fields';

// Reads nested paths like "address.city" from an object
export function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function applyFilter(record: Employee, filter: FilterCondition): boolean {
  const { fieldKey, operator, value, value2 } = filter;
  const fieldDef = FIELD_DEFINITIONS.find(f => f.key === fieldKey);
  if (!fieldDef) return true;

  const rawVal = getNestedValue(record as any, fieldKey);

  switch (fieldDef.type) {
    case 'text': {
      const str = String(rawVal ?? '').toLowerCase();
      const v = String(value ?? '').toLowerCase();
      if (!v) return true;
      if (operator === 'equals') return str === v;
      if (operator === 'contains') return str.includes(v);
      if (operator === 'starts_with') return str.startsWith(v);
      if (operator === 'ends_with') return str.endsWith(v);
      if (operator === 'not_contains') return !str.includes(v);
      return true;
    }
    case 'number': {
      const num = parseFloat(rawVal);
      const v = parseFloat(value as string);
      if (isNaN(num) || isNaN(v)) return true;
      if (operator === 'equals') return num === v;
      if (operator === 'gt') return num > v;
      if (operator === 'lt') return num < v;
      if (operator === 'gte') return num >= v;
      if (operator === 'lte') return num <= v;
      return true;
    }
    case 'amount': {
      const num = parseFloat(rawVal);
      const min = value !== '' && value != null ? parseFloat(value as string) : null;
      const max = value2 !== '' && value2 != null ? parseFloat(value2) : null;
      if (min !== null && max !== null) return num >= min && num <= max;
      if (min !== null) return num >= min;
      if (max !== null) return num <= max;
      return true;
    }
    case 'date': {
      if (!value && !value2) return true;
      const d = new Date(rawVal);
      const from = value ? new Date(value as string) : null;
      const to = value2 ? new Date(value2) : null;
      if (from && to) return d >= from && d <= to;
      if (from) return d >= from;
      if (to) return d <= to;
      return true;
    }
    case 'single_select': {
      if (!value) return true;
      const str = String(rawVal ?? '');
      if (operator === 'is') return str === value;
      if (operator === 'is_not') return str !== value;
      return true;
    }
    case 'multi_select': {
      const selected = value as string[];
      if (!selected?.length) return true;
      const arr = Array.isArray(rawVal) ? rawVal : [];
      if (operator === 'in') return selected.some(v => arr.includes(v));
      if (operator === 'not_in') return !selected.some(v => arr.includes(v));
      return true;
    }
    case 'boolean': {
      if (value === null || value === '') return true;
      return rawVal === (value === 'true' || value === true);
    }
    default:
      return true;
  }
}

// AND between different fields, OR within the same field
export function filterData(data: Employee[], filters: FilterCondition[]): Employee[] {
  if (!filters.length) return data;

  const byField: Record<string, FilterCondition[]> = {};
  filters.forEach(f => {
    if (!byField[f.fieldKey]) byField[f.fieldKey] = [];
    byField[f.fieldKey].push(f);
  });

  return data.filter(record =>
    Object.values(byField).every(fieldFilters =>
      fieldFilters.some(filter => applyFilter(record, filter))
    )
  );
}