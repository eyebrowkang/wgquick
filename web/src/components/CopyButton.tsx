import { useState } from 'react';

interface CopyButtonProps {
  value: string;
  label: string;
  copiedLabel: string;
  disabled?: boolean;
}

export function CopyButton({ value, label, copiedLabel, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="copy-row">
      <button
        type="button"
        className="button button-outline"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setError(null);
            window.setTimeout(() => setCopied(false), 1500);
          } catch (err) {
            setError((err as Error).message);
          }
        }}
        disabled={disabled || !value}
      >
        {copied ? copiedLabel : label}
      </button>
      {error ? (
        <span className="copy-feedback" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
