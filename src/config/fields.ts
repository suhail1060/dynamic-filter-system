import type { FieldDefinition, FieldType, OperatorType } from '../types/index.ts';

export const FIELD_DEFINITIONS: FieldDefinition[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'department', label: 'Department', type: 'single_select',
    options: ['Engineering', 'Design', 'Marketing', 'Sales', 'Finance', 'HR'] },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'salary', label: 'Salary', type: 'amount' },
  { key: 'joinDate', label: 'Join Date', type: 'date' },
  { key: 'isActive', label: 'Active Status', type: 'boolean' },
  { key: 'skills', label: 'Skills', type: 'multi_select',
    options: ['React', 'TypeScript', 'Node.js', 'Python', 'Go', 'AWS', 'Docker', 'Figma', 'SQL'] },
  { key: 'address.city', label: 'City', type: 'text' },
  { key: 'address.state', label: 'State', type: 'single_select',
    options: ['CA', 'TX', 'NY', 'WA', 'CO', 'MA', 'IL', 'FL', 'GA'] },
  { key: 'projects', label: 'Projects Count', type: 'number' },
  { key: 'performanceRating', label: 'Performance Rating', type: 'number' },
  { key: 'lastReview', label: 'Last Review Date', type: 'date' },
];

export const OPERATORS_BY_TYPE: Record<FieldType, { value: OperatorType; label: string }[]> = {
  text: [
    { value: 'contains', label: 'Contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'not_contains', label: 'Does Not Contain' },
  ],
  number: [
    { value: 'equals', label: 'Equals' },
    { value: 'gt', label: 'Greater Than' },
    { value: 'lt', label: 'Less Than' },
    { value: 'gte', label: 'Greater Than or Equal' },
    { value: 'lte', label: 'Less Than or Equal' },
  ],
  date: [{ value: 'between', label: 'Between' }],
  amount: [{ value: 'between', label: 'Between' }],
  single_select: [
    { value: 'is', label: 'Is' },
    { value: 'is_not', label: 'Is Not' },
  ],
  multi_select: [
    { value: 'in', label: 'In' },
    { value: 'not_in', label: 'Not In' },
  ],
  boolean: [{ value: 'is', label: 'Is' }],
};