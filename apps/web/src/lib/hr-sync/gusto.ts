/**
 * Gusto API Client
 */

export interface GustoEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
  phone: string;
  startDate: string;
  terminated: boolean;
}

export async function fetchGustoEmployees(
  accessToken: string,
  companyId: string,
  useSandbox: boolean = false
): Promise<GustoEmployee[]> {
  if (!accessToken || !companyId) {
    throw new Error('Gusto access token and company ID are required');
  }

  const baseUrl = useSandbox ? 'https://api.gusto-demo.com' : 'https://api.gusto.com';
  const url = `${baseUrl}/v1/companies/${companyId}/employees`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Gusto API error: ${response.status} ${response.statusText}`);
  }

  const employees = await response.json();

  return (employees || []).map((emp: any) => ({
    id: String(emp.id),
    firstName: emp.first_name || '',
    lastName: emp.last_name || '',
    email: emp.email || '',
    jobTitle: emp.jobs?.[0]?.title || '',
    department: emp.department?.title || '',
    phone: emp.home_phone || '',
    startDate: emp.date_of_hire || '',
    terminated: emp.terminated || false,
  }));
}
