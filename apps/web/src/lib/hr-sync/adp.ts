/**
 * ADP Workforce Now API Client
 * Uses API credentials (Client ID + Secret) for authentication
 */

export interface ADPEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
  phone: string;
  hireDate: string;
  terminated: boolean;
}

export async function fetchADPEmployees(
  clientId: string,
  clientSecret: string,
  apiUrl?: string
): Promise<ADPEmployee[]> {
  if (!clientId || !clientSecret) {
    throw new Error('ADP Client ID and Client Secret are required');
  }

  // Step 1: Get access token
  const tokenUrl = 'https://api.adp.com/auth/oauth/v2/token';
  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!tokenResponse.ok) {
    throw new Error(`ADP authentication failed: ${tokenResponse.status} ${tokenResponse.statusText}`);
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Step 2: Fetch workers/employees
  const employeesUrl = apiUrl || 'https://api.adp.com/hr/v2/workers';
  const response = await fetch(employeesUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`ADP API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const workers = data.workers || [];

  return workers.map((worker: any) => {
    const person = worker.person || {};
    const workAssignment = worker.workAssignments?.[0] || {};
    const communication = person.communication || {};
    const email = communication.emails?.find((e: any) => e.emailUri)?.emailUri || '';
    const phone = communication.landlines?.find((l: any) => l.formattedNumber)?.formattedNumber || '';

    return {
      id: worker.associateOID || '',
      firstName: person.legalName?.givenName || '',
      lastName: person.legalName?.familyName1 || '',
      email: email,
      jobTitle: workAssignment.jobTitle || '',
      department: workAssignment.homeOrganizationalUnits?.[0]?.nameCode?.longName || '',
      phone: phone,
      hireDate: workAssignment.hireDate || '',
      terminated: workAssignment.terminationDate ? true : false,
    };
  });
}
