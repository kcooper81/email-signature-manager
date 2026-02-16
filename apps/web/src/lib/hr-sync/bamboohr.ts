/**
 * BambooHR API Client
 */

export interface BambooHREmployee {
  id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  jobTitle: string;
  department: string;
  location: string;
  mobilePhone: string;
  workPhone: string;
  photoUrl: string;
  supervisor: string;
  hireDate: string;
  status: string;
}

export async function fetchBambooHREmployees(
  apiKey: string,
  subdomain: string
): Promise<BambooHREmployee[]> {
  if (!apiKey || !subdomain) {
    throw new Error('BambooHR API key and subdomain are required');
  }

  const url = `https://api.bamboohr.com/api/gateway.php/${subdomain}/v1/employees/directory`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${apiKey}:x`).toString('base64')}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`BambooHR API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const employees = data.employees || [];

  return employees.map((emp: any) => ({
    id: emp.id,
    firstName: emp.firstName || '',
    lastName: emp.lastName || '',
    workEmail: emp.workEmail || '',
    jobTitle: emp.jobTitle || '',
    department: emp.department || '',
    location: emp.location || '',
    mobilePhone: emp.mobilePhone || '',
    workPhone: emp.workPhone || '',
    photoUrl: emp.photoUrl || '',
    supervisor: emp.supervisor || '',
    hireDate: emp.hireDate || '',
    status: emp.status || 'active',
  }));
}
