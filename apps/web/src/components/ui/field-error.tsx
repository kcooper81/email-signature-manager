'use client';

interface FieldErrorProps {
  error?: string | null;
}

export function FieldError({ error }: FieldErrorProps) {
  if (!error) return null;
  return (
    <p className="text-xs text-destructive mt-1">{error}</p>
  );
}
