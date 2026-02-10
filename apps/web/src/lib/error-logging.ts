import { createClient } from '@supabase/supabase-js';

// Use service role for server-side error logging
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export type ErrorType = 
  | 'api_error'
  | 'auth_error'
  | 'integration_error'
  | 'deployment_error'
  | 'billing_error'
  | 'sync_error'
  | 'validation_error'
  | 'calendar_error'
  | 'calendar_settings_error'
  | 'ooo_status_error'
  | 'unknown_error';

interface LogErrorParams {
  errorType: ErrorType;
  errorMessage: string;
  errorStack?: string;
  route?: string;
  method?: string;
  statusCode?: number;
  userId?: string;
  organizationId?: string;
  requestBody?: Record<string, any>;
  metadata?: Record<string, any>;
}

/**
 * Log an error to the database for admin monitoring
 */
export async function logError(params: LogErrorParams): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    
    // Sanitize request body to remove sensitive data
    const sanitizedBody = params.requestBody 
      ? sanitizeRequestBody(params.requestBody) 
      : null;

    await supabase.from('error_logs').insert({
      error_type: params.errorType,
      error_message: params.errorMessage,
      error_stack: params.errorStack,
      route: params.route,
      method: params.method,
      status_code: params.statusCode,
      user_id: params.userId,
      organization_id: params.organizationId,
      request_body: sanitizedBody,
      metadata: params.metadata,
    });
  } catch (err) {
    // Don't throw - error logging should never break the app
    console.error('[Error Logger] Failed to log error:', err);
  }
}

/**
 * Remove sensitive data from request body before logging
 */
function sanitizeRequestBody(body: Record<string, any>): Record<string, any> {
  const sensitiveKeys = [
    'password',
    'confirmPassword',
    'token',
    'accessToken',
    'refreshToken',
    'access_token',
    'refresh_token',
    'apiKey',
    'api_key',
    'secret',
    'authorization',
  ];

  const sanitized = { ...body };
  
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
      sanitized[key] = '[REDACTED]';
    }
  }

  return sanitized;
}

/**
 * Create an error log entry from a caught exception
 */
export async function logException(
  error: Error | unknown,
  context: {
    route?: string;
    method?: string;
    userId?: string;
    organizationId?: string;
    errorType?: ErrorType;
    metadata?: Record<string, any>;
  }
): Promise<void> {
  const err = error instanceof Error ? error : new Error(String(error));
  
  await logError({
    errorType: context.errorType || 'unknown_error',
    errorMessage: err.message,
    errorStack: err.stack,
    route: context.route,
    method: context.method,
    userId: context.userId,
    organizationId: context.organizationId,
    metadata: context.metadata,
  });
}
