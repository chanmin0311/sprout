import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

function FormField({
  label,
  htmlFor,
  error,
  helper,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={htmlFor} error={!!error}>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : helper ? (
        <p className="text-xs text-muted-foreground">{helper}</p>
      ) : null}
    </div>
  );
}

export { FormField };
