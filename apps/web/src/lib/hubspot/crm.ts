import { Client } from '@hubspot/api-client';

export interface HubSpotContact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  phone?: string;
  mobilePhone?: string;
  department?: string;
}

export interface HubSpotList {
  id: string;
  name: string;
  listType: 'STATIC' | 'DYNAMIC';
  size: number;
}

export async function listHubSpotContacts(accessToken: string): Promise<HubSpotContact[]> {
  const hubspotClient = new Client({ accessToken });

  try {
    const contacts: HubSpotContact[] = [];
    let after: string | undefined;

    do {
      const response = await hubspotClient.crm.contacts.basicApi.getPage(
        100, // limit
        after, // pagination cursor
        [
          'email',
          'firstname',
          'lastname',
          'jobtitle',
          'phone',
          'mobilephone',
          'department',
          'contact_type', // To filter employees vs customers
          'lifecyclestage', // Alternative filtering method
        ]
      );

      if (response.results) {
        for (const contact of response.results) {
          const props = contact.properties;
          
          // Filter: Only include contacts with email addresses AND marked as employees
          // Skip if contact_type exists and is NOT 'employee' or 'team_member'
          // This allows syncing all contacts if contact_type is not set (backward compatible)
          const isEmployee = !props.contact_type || 
                           props.contact_type === 'employee' || 
                           props.contact_type === 'team_member' ||
                           props.contact_type === 'Employee' ||
                           props.contact_type === 'Team Member';
          
          if (props.email && isEmployee) {
            contacts.push({
              id: contact.id,
              email: props.email,
              firstName: props.firstname || undefined,
              lastName: props.lastname || undefined,
              jobTitle: props.jobtitle || undefined,
              phone: props.phone || undefined,
              mobilePhone: props.mobilephone || undefined,
              department: props.department || undefined,
            });
          }
        }
      }

      after = response.paging?.next?.after;
    } while (after);

    return contacts;
  } catch (error: any) {
    console.error('Failed to list HubSpot contacts:', error);
    throw new Error(error.message || 'Failed to list contacts');
  }
}

export async function getHubSpotContact(
  accessToken: string,
  contactId: string
): Promise<HubSpotContact | null> {
  const hubspotClient = new Client({ accessToken });

  try {
    const contact = await hubspotClient.crm.contacts.basicApi.getById(
      contactId,
      [
        'email',
        'firstname',
        'lastname',
        'jobtitle',
        'phone',
        'mobilephone',
        'department',
      ]
    );

    const props = contact.properties;

    if (!props.email) {
      return null;
    }

    return {
      id: contact.id,
      email: props.email,
      firstName: props.firstname || undefined,
      lastName: props.lastname || undefined,
      jobTitle: props.jobtitle || undefined,
      phone: props.phone || undefined,
      mobilePhone: props.mobilephone || undefined,
      department: props.department || undefined,
    };
  } catch (error: any) {
    console.error('Failed to get HubSpot contact:', error);
    return null;
  }
}

export async function searchHubSpotContactByEmail(
  accessToken: string,
  email: string
): Promise<HubSpotContact | null> {
  const hubspotClient = new Client({ accessToken });

  try {
    const response = await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ' as any,
              value: email,
            },
          ],
        },
      ],
      properties: [
        'email',
        'firstname',
        'lastname',
        'jobtitle',
        'phone',
        'mobilephone',
        'department',
      ],
      limit: 1,
    });

    if (response.results && response.results.length > 0) {
      const contact = response.results[0];
      const props = contact.properties;

      if (!props.email) {
        return null;
      }

      return {
        id: contact.id,
        email: props.email,
        firstName: props.firstname || undefined,
        lastName: props.lastname || undefined,
        jobTitle: props.jobtitle || undefined,
        phone: props.phone || undefined,
        mobilePhone: props.mobilephone || undefined,
        department: props.department || undefined,
      };
    }

    return null;
  } catch (error: any) {
    console.error('Failed to search HubSpot contact:', error);
    return null;
  }
}

export async function getHubSpotLists(accessToken: string): Promise<HubSpotList[]> {
  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/lists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch lists: ${response.statusText}`);
    }

    const data = await response.json();
    
    return (data.lists || []).map((list: any) => ({
      id: list.listId || list.id,
      name: list.name,
      listType: list.processingType === 'DYNAMIC' ? 'DYNAMIC' : 'STATIC',
      size: list.size || 0,
    }));
  } catch (error: any) {
    console.error('Failed to get HubSpot lists:', error);
    throw new Error(error.message || 'Failed to get lists');
  }
}

export async function getContactsFromList(
  accessToken: string,
  listId: string
): Promise<HubSpotContact[]> {
  const hubspotClient = new Client({ accessToken });

  try {
    const contacts: HubSpotContact[] = [];
    let after: string | undefined;

    do {
      const response = await fetch(
        `https://api.hubapi.com/crm/v3/lists/${listId}/memberships?limit=100${after ? `&after=${after}` : ''}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch list members: ${response.statusText}`);
      }

      const data = await response.json();
      const recordIds = (data.results || []).map((r: any) => r.recordId);

      // Fetch contact details for each record ID
      for (const recordId of recordIds) {
        try {
          const contact = await hubspotClient.crm.contacts.basicApi.getById(
            recordId,
            [
              'email',
              'firstname',
              'lastname',
              'jobtitle',
              'phone',
              'mobilephone',
              'department',
            ]
          );

          const props = contact.properties;
          if (props.email) {
            contacts.push({
              id: contact.id,
              email: props.email,
              firstName: props.firstname || undefined,
              lastName: props.lastname || undefined,
              jobTitle: props.jobtitle || undefined,
              phone: props.phone || undefined,
              mobilePhone: props.mobilephone || undefined,
              department: props.department || undefined,
            });
          }
        } catch (err) {
          console.error(`Failed to fetch contact ${recordId}:`, err);
        }
      }

      after = data.paging?.next?.after;
    } while (after);

    return contacts;
  } catch (error: any) {
    console.error('Failed to get contacts from list:', error);
    throw new Error(error.message || 'Failed to get contacts from list');
  }
}
