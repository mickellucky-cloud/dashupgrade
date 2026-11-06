'use client';

/**
 * app/[locale]/app/error.tsx — dashboard error boundary.
 * Displays error details for troubleshooting while preserving the try-again action.
 */
import { useEffect } from 'react';
import Link from 'next/link';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error boundary caught]:', error);
    void fetch('/api/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        digest: error.digest,
        stack: error.stack,
        location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        area: 'app',
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <div className="rounded-2xl bg-destructive/15 p-3.5 text-destructive">
        <svg
          className="size-8 text-destructive"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-extrabold text-[var(--tx)]">Dashboard Render Error</h2>
      <p className="text-sm font-semibold text-destructive max-w-lg">
        {error?.message || 'This page hit a runtime render error.'}
      </p>

      {error?.stack && (
        <pre className="w-full max-h-60 overflow-auto rounded-xl border border-[var(--line)] bg-[var(--s2)] p-4 text-left text-xs text-[var(--mut)] font-mono leading-relaxed">
          {error.stack}
        </pre>
      )}

      {error?.digest && (
        <p className="text-xs text-[var(--mut)]">Digest: {error.digest}</p>
      )}

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-[#7A12F5] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#7A12F5]/30 hover:bg-[#8C38F7] active:scale-95 transition-all cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/app/portfolio"
          className="rounded-xl border border-[var(--line)] bg-[var(--s2)] px-5 py-2.5 text-xs font-bold text-[var(--tx)] hover:bg-[var(--s1)] active:scale-95 transition-all"
        >
          Reload Dashboard
        </Link>
      </div>
    </div>
  );
}
