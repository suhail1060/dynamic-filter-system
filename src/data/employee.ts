import type { Employee } from '../types';

export const EMPLOYEES: Employee[] = [
  {
    id: 1, name: 'John Smith', email: 'john.smith@company.com',
    department: 'Engineering', role: 'Senior Developer', salary: 95000,
    joinDate: '2021-03-15', isActive: true,
    skills: ['React', 'TypeScript', 'Node.js'],
    address: { city: 'San Francisco', state: 'CA', country: 'USA' },
    projects: 3, lastReview: '2024-01-15', performanceRating: 4.5,
  },
  // ... add 49+ more records
];