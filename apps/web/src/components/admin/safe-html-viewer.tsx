'use client';

import { useEffect, useRef, useState } from 'react';

interface SafeHtmlViewerProps {
  html: string;
  className?: string;
  minHeight?: number;
}

/**
 * Renders untrusted HTML (e.g. inbound email) inside a sandboxed iframe
 * using a blob URL. This prevents XSS by isolating the content in a
 * separate origin. The iframe auto-resizes to fit its content.
 */
export function SafeHtmlViewer({ html, className = '', minHeight = 80 }: SafeHtmlViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Clean up previous blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (!html) return;

    // Wrap the HTML in a full document with base styles
    const wrappedHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #1a1a1a;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  img { max-width: 100%; height: auto; }
  a { color: #2563eb; }
  pre, code { white-space: pre-wrap; word-wrap: break-word; }
  table { max-width: 100%; border-collapse: collapse; }
  blockquote {
    margin: 0.5em 0;
    padding-left: 1em;
    border-left: 3px solid #d1d5db;
    color: #6b7280;
  }
</style>
</head>
<body>${html}</body>
</html>`;

    const blob = new Blob([wrappedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    blobUrlRef.current = url;

    if (iframeRef.current) {
      iframeRef.current.src = url;
    }

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [html]);

  const handleLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc?.body) {
        const contentHeight = doc.body.scrollHeight;
        setHeight(Math.max(contentHeight + 16, minHeight));
      }
    } catch {
      // Cross-origin — can't measure, use default
      setHeight(300);
    }
  };

  return (
    <iframe
      ref={iframeRef}
      onLoad={handleLoad}
      sandbox="allow-same-origin"
      style={{ height: `${height}px`, minHeight: `${minHeight}px` }}
      className={`w-full border-0 ${className}`}
      title="Email content"
    />
  );
}
