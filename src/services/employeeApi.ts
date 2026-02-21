import axios from 'axios';
import type { Employee } from '../types';
import employeesJson from '../data/employees.json';

const BASE_URL = 'http://localhost:3001';

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await axios.get<Employee[]>(`${BASE_URL}/api/employees`);
    return response.data;
  } catch {
    // Fallback to local JSON when mock server isn't running (e.g. production)
    return employeesJson as Employee[];
  }
}