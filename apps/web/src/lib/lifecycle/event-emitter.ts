/**
 * Lifecycle Event Emitter
 * Creates lifecycle events from various sources (HR sync, directory sync, invites, manual)
 */

import { createClient } from '@/lib/supabase/server';

export type LifecycleEventType = 'user_joined' | 'user_left' | 'user_moved' | 'user_updated' | 'invite_accepted';
export type LifecycleEventSource = 'hr_sync' | 'google_sync' | 'microsoft_sync' | 'manual' | 'invite';

export interface EmitEventParams {
  organizationId: string;
  userId?: string;
  eventType: LifecycleEventType;
  eventSource: LifecycleEventSource;
  eventData?: Record<string, any>;
}

export async function emitLifecycleEvent(params: EmitEventParams): Promise<string | null> {
  try {
    const supabase = createClient();

    const { data: event, error } = await supabase
      .from('lifecycle_events')
      .insert({
        organization_id: params.organizationId,
        user_id: params.userId || null,
        event_type: params.eventType,
        event_source: params.eventSource,
        event_data: params.eventData || {},
        processed: false,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Failed to emit lifecycle event:', error);
      return null;
    }

    return event?.id || null;
  } catch (err) {
    console.error('Error emitting lifecycle event:', err);
    return null;
  }
}

export async function emitUserJoined(organizationId: string, userId: string, source: LifecycleEventSource, data?: Record<string, any>) {
  return emitLifecycleEvent({ organizationId, userId, eventType: 'user_joined', eventSource: source, eventData: data });
}

export async function emitUserLeft(organizationId: string, userId: string, source: LifecycleEventSource, data?: Record<string, any>) {
  return emitLifecycleEvent({ organizationId, userId, eventType: 'user_left', eventSource: source, eventData: data });
}

export async function emitUserMoved(organizationId: string, userId: string, source: LifecycleEventSource, data?: Record<string, any>) {
  return emitLifecycleEvent({ organizationId, userId, eventType: 'user_moved', eventSource: source, eventData: data });
}

export async function emitUserUpdated(organizationId: string, userId: string, source: LifecycleEventSource, data?: Record<string, any>) {
  return emitLifecycleEvent({ organizationId, userId, eventType: 'user_updated', eventSource: source, eventData: data });
}

export async function emitInviteAccepted(organizationId: string, userId: string, data?: Record<string, any>) {
  return emitLifecycleEvent({ organizationId, userId, eventType: 'invite_accepted', eventSource: 'invite', eventData: data });
}
