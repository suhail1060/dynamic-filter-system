export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'amount'
  | 'single_select'
  | 'multi_select'
  | 'boolean';

export type OperatorType =
  | 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'not_contains'
  | 'gt' | 'lt' | 'gte' | 'lte'
  | 'between'
  | 'is' | 'is_not'
  | 'in' | 'not_in';

export interface FieldDefinition {
  key: string;           // supports dot notation e.g. "address.city"
  label: string;
  type: FieldType;
  options?: string[];    // for single_select and multi_select
}

export interface FilterCondition {
  id: string;
  fieldKey: string;
  operator: OperatorType;
  value: string | string[] | boolean | null;
  value2?: string | null; // for range inputs (date, amount)
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
  skills: string[];
  address: {
    city: string;
    state: string;
    country: string;
  };
  projects: number;
  lastReview: string;
  performanceRating: number;
}

export interface SortConfig {
  key: string;
  dir: 'asc' | 'desc';
}