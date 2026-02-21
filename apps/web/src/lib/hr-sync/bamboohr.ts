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
  subdomainOrUrl: string
): Promise<BambooHREmployee[]> {
  if (!apiKey || !subdomainOrUrl) {
    throw new Error('BambooHR API key and subdomain are required');
  }

  // Extract subdomain from URL if full URL provided, otherwise use as-is
  let subdomain = subdomainOrUrl;
  if (subdomainOrUrl.includes('bamboohr.com')) {
    const match = subdomainOrUrl.match(/https?:\/\/([^.]+)\.bamboohr\.com/);
    subdomain = match ? match[1] : subdomainOrUrl;
  } else if (subdomainOrUrl.includes('api.bamboohr.com')) {
    const match = subdomainOrUrl.match(/gateway\.php\/([^/]+)/);
    subdomain = match ? match[1] : subdomainOrUrl;
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
