const CALENDLY_API_BASE = 'https://api.calendly.com';

export interface CalendlyUser {
  uri: string;
  name: string;
  slug: string;
  email: string;
  scheduling_url: string;
  timezone: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CalendlyEventType {
  uri: string;
  name: string;
  slug: string;
  scheduling_url: string;
  duration: number;
  active: boolean;
  kind: 'solo' | 'group' | 'collective' | 'round_robin';
  type: 'StandardEventType' | 'AdhocEventType';
  color?: string;
  description_plain?: string;
  description_html?: string;
  internal_note?: string;
  pooling_type?: string;
  custom_questions?: unknown[];
}

export interface CalendlyEventTypesResponse {
  collection: CalendlyEventType[];
  pagination: {
    count: number;
    next_page?: string;
    previous_page?: string;
    next_page_token?: string;
    previous_page_token?: string;
  };
}

export interface CalendlyUserResponse {
  resource: CalendlyUser;
}

export async function getCurrentUser(accessToken: string): Promise<CalendlyUser> {
  try {
    const response = await fetch(`${CALENDLY_API_BASE}/users/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get Calendly user: ${response.status} ${error}`);
    }

    const data: CalendlyUserResponse = await response.json();
    return data.resource;
  } catch (error: any) {
    console.error('Failed to get Calendly user:', error);
    throw new Error(error.message || 'Failed to get user');
  }
}

export async function getEventTypes(
  accessToken: string,
  userUri: string,
  options?: {
    active?: boolean;
    count?: number;
    pageToken?: string;
  }
): Promise<CalendlyEventTypesResponse> {
  try {
    const params = new URLSearchParams({
      user: userUri,
    });

    if (options?.active !== undefined) {
      params.append('active', options.active.toString());
    }

    if (options?.count) {
      params.append('count', options.count.toString());
    }

    if (options?.pageToken) {
      params.append('page_token', options.pageToken);
    }

    const response = await fetch(
      `${CALENDLY_API_BASE}/event_types?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get event types: ${response.status} ${error}`);
    }

    const data: CalendlyEventTypesResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error('Failed to get Calendly event types:', error);
    throw new Error(error.message || 'Failed to get event types');
  }
}

export async function getAllEventTypes(
  accessToken: string,
  userUri: string,
  activeOnly: boolean = true
): Promise<CalendlyEventType[]> {
  const allEventTypes: CalendlyEventType[] = [];
  let pageToken: string | undefined;

  try {
    do {
      const response = await getEventTypes(accessToken, userUri, {
        active: activeOnly,
        count: 100,
        pageToken,
      });

      allEventTypes.push(...response.collection);
      pageToken = response.pagination.next_page_token;
    } while (pageToken);

    return allEventTypes;
  } catch (error: any) {
    console.error('Failed to get all Calendly event types:', error);
    throw new Error(error.message || 'Failed to get all event types');
  }
}

export async function getEventType(
  accessToken: string,
  eventTypeUri: string
): Promise<CalendlyEventType> {
  try {
    const response = await fetch(eventTypeUri, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get event type: ${response.status} ${error}`);
    }

    const data = await response.json();
    return data.resource;
  } catch (error: any) {
    console.error('Failed to get Calendly event type:', error);
    throw new Error(error.message || 'Failed to get event type');
  }
}

export interface CalendlyMetadata {
  calendly_user_uri: string;
  scheduling_url: string;
  user_name: string;
  user_email: string;
  user_slug: string;
  timezone?: string;
  avatar_url?: string;
  event_types: Array<{
    uri: string;
    name: string;
    slug: string;
    scheduling_url: string;
    duration: number;
    active: boolean;
    kind: string;
    type: string;
    color?: string;
    description?: string;
  }>;
  default_event_type_uri?: string;
  last_synced_at: string;
}

export async function fetchAndBuildMetadata(
  accessToken: string
): Promise<CalendlyMetadata> {
  const user = await getCurrentUser(accessToken);
  const eventTypes = await getAllEventTypes(accessToken, user.uri, true);

  const metadata: CalendlyMetadata = {
    calendly_user_uri: user.uri,
    scheduling_url: user.scheduling_url,
    user_name: user.name,
    user_email: user.email,
    user_slug: user.slug,
    timezone: user.timezone,
    avatar_url: user.avatar_url,
    event_types: eventTypes.map(et => ({
      uri: et.uri,
      name: et.name,
      slug: et.slug,
      scheduling_url: et.scheduling_url,
      duration: et.duration,
      active: et.active,
      kind: et.kind,
      type: et.type,
      color: et.color,
      description: et.description_plain,
    })),
    default_event_type_uri: eventTypes.length > 0 ? eventTypes[0].uri : undefined,
    last_synced_at: new Date().toISOString(),
  };

  return metadata;
}

export function getSchedulingUrlFromMetadata(
  metadata: CalendlyMetadata,
  eventTypeSlug?: string
): string {
  if (!eventTypeSlug) {
    return metadata.scheduling_url;
  }

  const eventType = metadata.event_types.find(et => et.slug === eventTypeSlug);
  return eventType?.scheduling_url || metadata.scheduling_url;
}

export function getDefaultEventTypeUrl(metadata: CalendlyMetadata): string {
  if (metadata.default_event_type_uri) {
    const defaultEventType = metadata.event_types.find(
      et => et.uri === metadata.default_event_type_uri
    );
    if (defaultEventType) {
      return defaultEventType.scheduling_url;
    }
  }

  return metadata.event_types.length > 0
    ? metadata.event_types[0].scheduling_url
    : metadata.scheduling_url;
}
