import type { Employee } from '../types';

function flattenEmployee(emp: Employee): Record<string, string> {
  return {
    id: String(emp.id),
    name: emp.name,
    email: emp.email,
    department: emp.department,
    role: emp.role,
    salary: String(emp.salary),
    joinDate: emp.joinDate,
    isActive: String(emp.isActive),
    skills: emp.skills.join(', '),
    city: emp.address.city,
    state: emp.address.state,
    country: emp.address.country,
    projects: String(emp.projects),
    lastReview: emp.lastReview,
    performanceRating: String(emp.performanceRating),
  };
}

export function exportToCSV(data: Employee[], filename = 'employees') {
  if (!data.length) return;
  const rows = data.map(flattenEmployee);
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map(row => headers.map(h => `"${row[h]}"`).join(',')),
  ].join('\n');

  downloadFile(csv, `${filename}.csv`, 'text/csv');
}

export function exportToJSON(data: Employee[], filename = 'employees') {
  if (!data.length) return;
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `${filename}.json`, 'application/json');
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}