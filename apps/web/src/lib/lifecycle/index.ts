/**
 * Lifecycle Automation - Main Entry Point
 */

export { emitLifecycleEvent, emitUserJoined, emitUserLeft, emitUserMoved, emitUserUpdated, emitInviteAccepted } from './event-emitter';
export type { LifecycleEventType, LifecycleEventSource, EmitEventParams } from './event-emitter';
export { processEvent } from './workflow-runner';
export type { WorkflowRunContext } from './workflow-runner';
