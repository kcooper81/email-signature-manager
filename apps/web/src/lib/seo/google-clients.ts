import { google } from 'googleapis';
import { getServiceAccountCredentials } from '@/lib/google/service-account';

/**
 * Google Search Console + GA4 API clients for SEO engine.
 * Uses service account credentials WITHOUT subject (site-level, not user impersonation).
 */

const SEO_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly',
];

function createSEOAuth() {
  const credentials = getServiceAccountCredentials();
  if (!credentials) {
    throw new Error('Google service account credentials not configured');
  }

  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SEO_SCOPES,
    // No subject — site-level access, not user impersonation
  });
}

export function getSearchConsoleClient() {
  const auth = createSEOAuth();
  return google.searchconsole({ version: 'v1', auth });
}

export function getGA4Client() {
  const auth = createSEOAuth();
  return google.analyticsdata({ version: 'v1beta', auth });
}

// --- Search Console helpers ---

export interface SearchConsoleRow {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchConsoleQueryRow extends SearchConsoleRow {
  query: string;
}

/**
 * Fetch page-level performance data from Search Console.
 */
export async function fetchPagePerformance(
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<SearchConsoleRow[]> {
  const client = getSearchConsoleClient();

  const response = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 5000,
      dataState: 'final',
    },
  });

  return (response.data.rows || []).map((row) => ({
    page: row.keys![0],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

/**
 * Fetch page+query level data for top queries per page.
 */
export async function fetchPageQueries(
  siteUrl: string,
  startDate: string,
  endDate: string
): Promise<SearchConsoleQueryRow[]> {
  const client = getSearchConsoleClient();

  const response = await client.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page', 'query'],
      rowLimit: 5000,
      dataState: 'final',
    },
  });

  return (response.data.rows || []).map((row) => ({
    page: row.keys![0],
    query: row.keys![1],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

// --- GA4 helpers ---

export interface GA4PageData {
  pagePath: string;
  sessions: number;
  bounceRate: number;
  avgEngagementTime: number;
}

/**
 * Fetch page-level GA4 data (sessions, bounce rate, engagement time).
 */
export async function fetchGA4PageData(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<GA4PageData[]> {
  const client = getGA4Client();

  const response = await client.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
      limit: '5000',
    },
  });

  return (response.data.rows || []).map((row: any) => ({
    pagePath: row.dimensionValues?.[0]?.value || '',
    sessions: parseInt(row.metricValues?.[0]?.value || '0', 10),
    bounceRate: parseFloat(row.metricValues?.[1]?.value || '0'),
    avgEngagementTime: parseFloat(row.metricValues?.[2]?.value || '0'),
  }));
}
