import { google, calendar_v3 } from 'googleapis';
import { createAuthenticatedClient } from './oauth';
import { createServiceAccountClient } from './service-account';

/**
 * Google Calendar Integration
 * 
 * Provides functionality for:
 * 1. Fetching user's appointment scheduling links (Google Calendar's booking feature)
 * 2. Detecting out-of-office (OOO) status from calendar events
 * 3. Getting vacation/away events for dynamic signature banners
 */

export interface CalendarBookingLink {
  name: string;
  url: string;
  duration?: number;
  description?: string;
}

export interface OutOfOfficeStatus {
  isOutOfOffice: boolean;
  startDate?: string;
  endDate?: string;
  message?: string;
  eventTitle?: string;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  status: string;
  eventType?: string;
}

/**
 * Create a Calendar client using OAuth tokens
 */
export function createCalendarClient(accessToken: string, refreshToken: string) {
  const auth = createAuthenticatedClient(accessToken, refreshToken);
  return google.calendar({ version: 'v3', auth });
}

/**
 * Create a Calendar client for a specific user using service account (domain-wide delegation)
 */
export function createCalendarClientForUser(userEmail: string) {
  const auth = createServiceAccountClient(userEmail);
  return google.calendar({ version: 'v3', auth });
}

/**
 * Get user's Google Calendar appointment scheduling links
 * Note: This requires the user to have set up appointment schedules in Google Calendar
 */
export async function getAppointmentSchedules(
  accessToken: string,
  refreshToken: string
): Promise<CalendarBookingLink[]> {
  const calendar = createCalendarClient(accessToken, refreshToken);
  
  try {
    // List calendars to find appointment schedule calendars
    const calendarList = await calendar.calendarList.list();
    const bookingLinks: CalendarBookingLink[] = [];
    
    // Look for calendars with appointment scheduling enabled
    // Google Calendar stores appointment schedules as special event types
    for (const cal of calendarList.data.items || []) {
      if (cal.accessRole === 'owner' && cal.primary) {
        // Check for appointment schedule events
        const now = new Date();
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 3);
        
        const events = await calendar.events.list({
          calendarId: cal.id!,
          timeMin: now.toISOString(),
          timeMax: futureDate.toISOString(),
          singleEvents: false,
          maxResults: 100,
        });
        
        // Filter for appointment schedule events
        for (const event of events.data.items || []) {
          if (event.eventType === 'appointmentSchedule' || 
              (event.conferenceData?.conferenceSolution?.name === 'Google Meet' && 
               event.recurringEventId)) {
            // Extract booking link from event
            const bookingUrl = event.htmlLink?.replace('/event?', '/appointments/') || 
                              `https://calendar.google.com/calendar/appointments`;
            
            bookingLinks.push({
              name: event.summary || 'Appointment',
              url: bookingUrl,
              duration: event.start?.dateTime && event.end?.dateTime 
                ? Math.round((new Date(event.end.dateTime).getTime() - 
                             new Date(event.start.dateTime).getTime()) / 60000)
                : undefined,
              description: event.description || undefined,
            });
          }
        }
      }
    }
    
    return bookingLinks;
  } catch (error: any) {
    console.error('Failed to get appointment schedules:', error);
    throw new Error(error.message || 'Failed to fetch appointment schedules');
  }
}

/**
 * Check if user is currently out of office based on calendar events
 * Looks for:
 * 1. Out of Office events (eventType: 'outOfOffice')
 * 2. All-day events with keywords like "vacation", "OOO", "out of office", "PTO"
 * 3. Focus time or working location set to "Out of office"
 */
export async function checkOutOfOfficeStatus(
  accessToken: string,
  refreshToken: string
): Promise<OutOfOfficeStatus> {
  const calendar = createCalendarClient(accessToken, refreshToken);
  
  try {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    // Also check a week ahead for upcoming OOO
    const weekAhead = new Date();
    weekAhead.setDate(weekAhead.getDate() + 7);
    
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: weekAhead.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });
    
    const oooKeywords = [
      'out of office',
      'ooo',
      'vacation',
      'pto',
      'holiday',
      'away',
      'off',
      'leave',
      'time off',
    ];
    
    for (const event of events.data.items || []) {
      // Check for explicit Out of Office event type
      if (event.eventType === 'outOfOffice') {
        return {
          isOutOfOffice: true,
          startDate: (event.start?.dateTime || event.start?.date) ?? undefined,
          endDate: (event.end?.dateTime || event.end?.date) ?? undefined,
          message: event.description ?? undefined,
          eventTitle: event.summary || 'Out of Office',
        };
      }
      
      // Check for all-day events with OOO keywords
      const summary = (event.summary || '').toLowerCase();
      const isAllDay = !!event.start?.date && !event.start?.dateTime;
      
      if (isAllDay && oooKeywords.some(keyword => summary.includes(keyword))) {
        // Check if this event is currently active
        const eventStart = new Date(event.start?.date || '');
        const eventEnd = new Date(event.end?.date || '');
        
        if (now >= eventStart && now < eventEnd) {
          return {
            isOutOfOffice: true,
            startDate: event.start?.date ?? undefined,
            endDate: event.end?.date ?? undefined,
            message: event.description ?? undefined,
            eventTitle: event.summary || 'Out of Office',
          };
        }
      }
      
      // Check event transparency (show as "Free" often indicates OOO)
      if (event.transparency === 'transparent' && isAllDay) {
        if (oooKeywords.some(keyword => summary.includes(keyword))) {
          const eventStart = new Date(event.start?.date || '');
          const eventEnd = new Date(event.end?.date || '');
          
          if (now >= eventStart && now < eventEnd) {
            return {
              isOutOfOffice: true,
              startDate: event.start?.date ?? undefined,
              endDate: event.end?.date ?? undefined,
              eventTitle: event.summary ?? undefined,
            };
          }
        }
      }
    }
    
    return { isOutOfOffice: false };
  } catch (error: any) {
    console.error('Failed to check OOO status:', error);
    // Return not OOO on error to avoid blocking signatures
    return { isOutOfOffice: false };
  }
}

/**
 * Get upcoming out of office events for a user
 * Useful for showing when someone will be away
 */
export async function getUpcomingOOOEvents(
  accessToken: string,
  refreshToken: string,
  daysAhead: number = 30
): Promise<CalendarEvent[]> {
  const calendar = createCalendarClient(accessToken, refreshToken);
  
  try {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: futureDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 100,
    });
    
    const oooKeywords = [
      'out of office',
      'ooo',
      'vacation',
      'pto',
      'holiday',
      'away',
      'leave',
      'time off',
    ];
    
    const oooEvents: CalendarEvent[] = [];
    
    for (const event of events.data.items || []) {
      const summary = (event.summary || '').toLowerCase();
      const isAllDay = !!event.start?.date && !event.start?.dateTime;
      
      // Include explicit OOO events or all-day events with OOO keywords
      if (event.eventType === 'outOfOffice' || 
          (isAllDay && oooKeywords.some(keyword => summary.includes(keyword)))) {
        oooEvents.push({
          id: event.id!,
          summary: event.summary || 'Out of Office',
          start: event.start?.dateTime || event.start?.date || '',
          end: event.end?.dateTime || event.end?.date || '',
          status: event.status || 'confirmed',
          eventType: event.eventType ?? undefined,
        });
      }
    }
    
    return oooEvents;
  } catch (error: any) {
    console.error('Failed to get upcoming OOO events:', error);
    return [];
  }
}

/**
 * Check OOO status using service account (for domain-wide deployment)
 */
export async function checkOutOfOfficeStatusWithServiceAccount(
  userEmail: string
): Promise<OutOfOfficeStatus> {
  const calendar = createCalendarClientForUser(userEmail);
  
  try {
    const now = new Date();
    const weekAhead = new Date();
    weekAhead.setDate(weekAhead.getDate() + 7);
    
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: weekAhead.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });
    
    const oooKeywords = [
      'out of office',
      'ooo',
      'vacation',
      'pto',
      'holiday',
      'away',
      'leave',
      'time off',
    ];
    
    for (const event of events.data.items || []) {
      if (event.eventType === 'outOfOffice') {
        return {
          isOutOfOffice: true,
          startDate: (event.start?.dateTime || event.start?.date) ?? undefined,
          endDate: (event.end?.dateTime || event.end?.date) ?? undefined,
          message: event.description ?? undefined,
          eventTitle: event.summary || 'Out of Office',
        };
      }
      
      const summary = (event.summary || '').toLowerCase();
      const isAllDay = !!event.start?.date && !event.start?.dateTime;
      
      if (isAllDay && oooKeywords.some(keyword => summary.includes(keyword))) {
        const eventStart = new Date(event.start?.date || '');
        const eventEnd = new Date(event.end?.date || '');
        
        if (now >= eventStart && now < eventEnd) {
          return {
            isOutOfOffice: true,
            startDate: event.start?.date ?? undefined,
            endDate: event.end?.date ?? undefined,
            message: event.description ?? undefined,
            eventTitle: event.summary || 'Out of Office',
          };
        }
      }
    }
    
    return { isOutOfOffice: false };
  } catch (error: any) {
    console.error('Failed to check OOO status with service account:', error);
    return { isOutOfOffice: false };
  }
}

/**
 * Format OOO dates for display in signature banner
 */
export function formatOOODateRange(startDate?: string, endDate?: string): string {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric' 
  };
  
  const startStr = start.toLocaleDateString('en-US', options);
  
  if (!end) {
    return startStr;
  }
  
  // If same day, just show one date
  if (start.toDateString() === end.toDateString()) {
    return startStr;
  }
  
  // If end is next day (common for all-day events), show single date
  const nextDay = new Date(start);
  nextDay.setDate(nextDay.getDate() + 1);
  if (end.toDateString() === nextDay.toDateString()) {
    return startStr;
  }
  
  // Adjust end date for all-day events (they end at midnight of the next day)
  const adjustedEnd = new Date(end);
  adjustedEnd.setDate(adjustedEnd.getDate() - 1);
  
  const endStr = adjustedEnd.toLocaleDateString('en-US', options);
  
  return `${startStr} - ${endStr}`;
}
