export interface FieldErrorProps {
  error: string | undefined | null;
}

export function FieldError({ error }: FieldErrorProps) {
  if (!error) {
    return null;
  }

  return <span className="text-sm text-red-500">{error}</span>;
}
