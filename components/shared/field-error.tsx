export interface FieldErrorProps {
    touched?: boolean;
    error: string | undefined | null;
}

export function FieldError({ touched, error }: FieldErrorProps) {
    if (!error || !touched) {
        return null;
    }

    return (
        <span data-testid="field-error" className="text-sm text-red-500">
            {error}
        </span>
    );
}
