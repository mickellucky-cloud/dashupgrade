'use client';

/**
 * app/error.tsx — root error boundary for the public site.
 * Displays error details for troubleshooting while preserving the try-again action.
 */
import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Root Error Boundary caught]:', error);
    void fetch('/api/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        digest: error.digest,
        stack: error.stack,
        location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#0d0d12',
        color: '#ffffff',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          fontSize: '28px',
        }}
      >
        ⚠️
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
        Application Error
      </h2>
      <p style={{ color: '#ef4444', marginBottom: '1rem', maxWidth: '36rem', fontWeight: 600, fontSize: '0.95rem' }}>
        {error?.message || 'An unexpected runtime error occurred.'}
      </p>

      {error?.stack && (
        <pre
          style={{
            maxWidth: '48rem',
            width: '100%',
            overflowX: 'auto',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'left',
            fontSize: '0.75rem',
            color: '#a1a1aa',
            lineHeight: 1.5,
            marginBottom: '1.5rem',
          }}
        >
          {error.stack}
        </pre>
      )}

      {error?.digest && (
        <p style={{ fontSize: '0.75rem', color: '#71717a', marginBottom: '1.5rem' }}>
          Digest: {error.digest}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: '0.7rem 1.5rem',
            borderRadius: '12px',
            border: 'none',
            background: '#7A12F5',
            color: '#ffffff',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(122, 18, 245, 0.4)',
          }}
        >
          Try again
        </button>
        <Link
          href="/app/portfolio"
          style={{
            padding: '0.7rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.05)',
            color: '#ffffff',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Reload Dashboard
        </Link>
      </div>
    </div>
  );
}
