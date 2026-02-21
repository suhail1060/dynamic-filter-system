import axios from 'axios';
import type { Employee } from '../types';

const BASE_URL = 'http://localhost:3001';

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await axios.get<Employee[]>(`${BASE_URL}/api/employees`);
  return response.data;
}