/**
 * Rippling API Client
 */

export interface RipplingEmployee {
  id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  title: string;
  department: string;
  phone: string;
  startDate: string;
  endDate: string | null;
  status: string;
}

export async function fetchRipplingEmployees(
  apiKey: string,
  _apiUrl?: string
): Promise<RipplingEmployee[]> {
  if (!apiKey) {
    throw new Error('Rippling API key is required');
  }

  const url = 'https://api.rippling.com/platform/api/employees';

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Rippling API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const employees = data.results || data || [];

  return (employees as any[]).map((emp: any) => ({
    id: emp.id || '',
    firstName: emp.first_name || '',
    lastName: emp.last_name || '',
    workEmail: emp.work_email || '',
    title: emp.title || '',
    department: emp.department?.name || '',
    phone: emp.phone_number || '',
    startDate: emp.start_date || '',
    endDate: emp.end_date || null,
    status: emp.employment_status || 'active',
  }));
}
