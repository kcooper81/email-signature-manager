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
 * separate origin (no allow-same-origin). Links open in a new tab via
 * an inline script, and height is communicated via postMessage.
 */
export function SafeHtmlViewer({ html, className = '', minHeight = 80 }: SafeHtmlViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (!html) return;

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
  a { color: #2563eb; cursor: pointer; text-decoration: underline; }
  a:hover { color: #1d4ed8; }
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
<body>${html}
<script>
// Force all links to open in a new window
document.addEventListener('click', function(e) {
  var a = e.target;
  while (a && a.tagName !== 'A') a = a.parentElement;
  if (a && a.href) {
    e.preventDefault();
    e.stopPropagation();
    window.open(a.href, '_blank', 'noopener,noreferrer');
  }
});
// Report height to parent for auto-resize
function reportHeight() {
  var h = document.documentElement.scrollHeight || document.body.scrollHeight;
  window.parent.postMessage({ type: 'safe-html-height', height: h }, '*');
}
reportHeight();
new MutationObserver(reportHeight).observe(document.body, { childList: true, subtree: true });
window.addEventListener('load', reportHeight);
</script>
</body>
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

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'safe-html-height' && typeof e.data.height === 'number') {
        setHeight(Math.max(e.data.height + 16, minHeight));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [minHeight]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
      style={{ height: `${height}px`, minHeight: `${minHeight}px` }}
      className={`w-full border-0 ${className}`}
      title="Email content"
    />
  );
}
