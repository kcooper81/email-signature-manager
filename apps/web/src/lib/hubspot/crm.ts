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
        ]
      );

      if (response.results) {
        for (const contact of response.results) {
          const props = contact.properties;
          
          // Only include contacts with email addresses
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
              operator: 'EQ',
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
