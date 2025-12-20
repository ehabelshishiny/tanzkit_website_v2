'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface IsolatedHtmlContentProps {
  html: string;
  className?: string;
}

/**
 * IsolatedHtmlContent Component
 * 
 * Renders arbitrary HTML content in an isolated iframe to prevent:
 * - Style leakage to the main application
 * - JavaScript interference with the main app
 * - Global CSS conflicts
 * 
 * Features:
 * - Auto-adjusts height based on content
 * - Inherits app theme (light/dark mode)
 * - Applies consistent prose styling
 * - Fully responsive
 */
export function IsolatedHtmlContent({ html, className = '' }: IsolatedHtmlContentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState('600px');
  const { theme, systemTheme } = useTheme();
  
  // Determine the actual theme (resolve 'system' to actual theme)
  const actualTheme = theme === 'system' ? systemTheme : theme;
  const isDark = actualTheme === 'dark';

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Create the full HTML document with styling
    const iframeDocument = `
      <!DOCTYPE html>
      <html class="${isDark ? 'dark' : ''}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Reset and base styles */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            html {
              font-size: 16px;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: ${isDark ? '#e5e7eb' : '#374151'};
              background-color: transparent;
              padding: 0;
              margin: 0;
            }

            /* Prose styling - matching Tailwind prose */
            body {
              font-size: 1.125rem;
              line-height: 1.75;
            }

            h1, h2, h3, h4, h5, h6 {
              font-weight: 700;
              letter-spacing: -0.025em;
              color: ${isDark ? '#f9fafb' : '#111827'};
            }

            h1 {
              font-size: 2.25rem;
              margin-bottom: 2rem;
              line-height: 1.1;
            }

            h2 {
              font-size: 1.875rem;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              line-height: 1.2;
            }

            h3 {
              font-size: 1.5rem;
              margin-top: 2rem;
              margin-bottom: 1rem;
              line-height: 1.3;
            }

            h4 {
              font-size: 1.25rem;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
            }

            p {
              margin-bottom: 1.5rem;
              color: ${isDark ? '#d1d5db' : '#6b7280'};
            }

            a {
              color: ${isDark ? '#60a5fa' : '#2563eb'};
              text-decoration: none;
            }

            a:hover {
              text-decoration: underline;
            }

            code {
              color: ${isDark ? '#60a5fa' : '#2563eb'};
              background-color: ${isDark ? '#1f2937' : '#f3f4f6'};
              padding: 0.125rem 0.375rem;
              border-radius: 0.25rem;
              font-size: 0.875em;
              font-family: 'Courier New', monospace;
            }

            pre {
              background-color: ${isDark ? '#1f2937' : '#f3f4f6'};
              border: 1px solid ${isDark ? '#374151' : '#e5e7eb'};
              border-radius: 0.5rem;
              padding: 1rem;
              overflow-x: auto;
              margin: 1.5rem 0;
            }

            pre code {
              background-color: transparent;
              padding: 0;
              border-radius: 0;
            }

            img {
              max-width: 100%;
              height: auto;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              margin: 1.5rem 0;
            }

            ul, ol {
              margin: 1.5rem 0;
              padding-left: 1.5rem;
            }

            li {
              margin: 0.5rem 0;
            }

            blockquote {
              border-left: 4px solid ${isDark ? '#60a5fa' : '#2563eb'};
              padding-left: 1rem;
              margin: 1.5rem 0;
              font-style: italic;
              color: ${isDark ? '#9ca3af' : '#6b7280'};
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.5rem 0;
            }

            th, td {
              border: 1px solid ${isDark ? '#374151' : '#e5e7eb'};
              padding: 0.75rem;
              text-align: left;
            }

            th {
              background-color: ${isDark ? '#1f2937' : '#f9fafb'};
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          ${html}
          <script>
            // Send height updates to parent
            function updateHeight() {
              const height = document.documentElement.scrollHeight;
              window.parent.postMessage({ type: 'iframe-height', height: height }, '*');
            }
            
            // Update height on load and when content changes
            window.addEventListener('load', updateHeight);
            window.addEventListener('resize', updateHeight);
            
            // Use MutationObserver to detect content changes
            const observer = new MutationObserver(updateHeight);
            observer.observe(document.body, {
              childList: true,
              subtree: true,
              attributes: true,
              characterData: true
            });
            
            // Initial height update
            updateHeight();
          </script>
        </body>
      </html>
    `;

    // Write the document to the iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(iframeDocument);
      iframeDoc.close();
    }

    // Listen for height updates from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'iframe-height') {
        setIframeHeight(`${event.data.height}px`);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [html, isDark]);

  return (
    <iframe
      ref={iframeRef}
      className={`w-full border-0 ${className}`}
      style={{ height: iframeHeight }}
      title="Documentation Content"
      sandbox="allow-same-origin allow-scripts"
    />
  );
}

