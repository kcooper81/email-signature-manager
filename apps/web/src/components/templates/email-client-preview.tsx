'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Mail, Monitor, Smartphone, AlertCircle, ExternalLink, Apple } from 'lucide-react';

type EmailClient = 'gmail' | 'outlook' | 'apple-mail';

interface EmailClientPreviewProps {
  blocks: any[];
  className?: string;
}

// Email client rendering quirks database
// Last updated: January 2026
// Source: caniemail.com, litmus.com documentation
const CLIENT_INFO: Record<EmailClient, { name: string; description: string; quirks: string[] }> = {
  gmail: {
    name: 'Gmail',
    description: 'Web & Mobile',
    quirks: [
      'Strips external CSS, only inline styles work',
      'Good support for most HTML email features',
      'May clip signatures over 102KB',
    ],
  },
  outlook: {
    name: 'Outlook',
    description: 'Desktop (Word engine)',
    quirks: [
      'Uses Microsoft Word rendering engine',
      'No border-radius support',
      'Limited padding/margin support',
      'Background images often fail',
    ],
  },
  'apple-mail': {
    name: 'Apple Mail',
    description: 'macOS & iOS',
    quirks: [
      'Best HTML email support',
      'Supports most modern CSS',
      'Dark mode may invert colors',
    ],
  },
};

const CLIENT_ICONS: Record<EmailClient, React.ReactNode> = {
  gmail: <Mail className="h-4 w-4" />,
  outlook: <Monitor className="h-4 w-4" />,
  'apple-mail': <Smartphone className="h-4 w-4" />,
};

export function EmailClientPreview({ blocks, className }: EmailClientPreviewProps) {
  const [selectedClient, setSelectedClient] = useState<EmailClient>('gmail');
  const [showQuirks, setShowQuirks] = useState(false);

  const clientInfo = CLIENT_INFO[selectedClient];

  return (
    <div className={cn('bg-card', className)}>
      {/* Client Tabs */}
      <div className="flex items-center gap-1 p-2 bg-muted rounded-t-lg">
        {(Object.keys(CLIENT_INFO) as EmailClient[]).map((client) => (
          <button
            key={client}
            onClick={() => setSelectedClient(client)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
              selectedClient === client
                ? 'bg-background text-violet-600 shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            {CLIENT_ICONS[client]}
            <span>{CLIENT_INFO[client].name}</span>
          </button>
        ))}
      </div>

      {/* Client Description */}
      <div className="flex items-center justify-between px-4 py-3 border-b text-sm">
        <div>
          <span className="font-medium text-foreground">{clientInfo.name}</span>
          <span className="text-muted-foreground ml-2">{clientInfo.description}</span>
        </div>
        <button
          onClick={() => setShowQuirks(!showQuirks)}
          className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-xs"
        >
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{showQuirks ? 'Hide' : 'View'} rendering notes</span>
        </button>
      </div>

      {/* Quirks Panel */}
      {showQuirks && (
        <div className="px-4 py-3 bg-amber-50 border-b">
          <p className="text-sm font-medium text-amber-800 mb-2">
            Known rendering differences:
          </p>
          <ul className="text-sm text-amber-700 space-y-1">
            {clientInfo.quirks.map((quirk, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                {quirk}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview Container */}
      <div className="p-4 overflow-auto">
        <div 
          className="bg-background rounded border shadow-sm p-4"
          style={selectedClient === 'outlook' ? { borderRadius: 0 } : {}}
        >
          {/* Email Header Simulation */}
          <div className="border-b pb-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span className="font-medium text-foreground">From:</span>
              <span>you@company.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span className="font-medium text-foreground">To:</span>
              <span>recipient@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Subject:</span>
              <span>Re: Your inquiry</span>
            </div>
          </div>

          {/* Email Body */}
          <div className="text-sm text-muted-foreground mb-4">
            <p>Hi there,</p>
            <p className="mt-2">Thank you for reaching out. I'll get back to you shortly.</p>
            <p className="mt-2">Best regards,</p>
          </div>

          {/* Signature Preview */}
          <div 
            className={cn(
              'border-t pt-4',
              selectedClient === 'outlook' && 'outlook-preview'
            )}
          >
            <SignatureRenderer 
              blocks={blocks} 
              client={selectedClient}
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-muted border-t text-xs text-muted-foreground flex items-center justify-between">
        <span>
          Preview simulation • Last updated: Jan 2026
        </span>
        <a 
          href="https://www.caniemail.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-violet-600 hover:text-violet-700"
        >
          <span>Email CSS support</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

// Internal signature renderer that applies client-specific styles
function SignatureRenderer({ blocks, client }: { blocks: any[]; client: EmailClient }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-muted-foreground text-sm italic">
        No signature blocks yet
      </div>
    );
  }

  return (
    <table 
      cellPadding={0} 
      cellSpacing={0} 
      style={{ 
        fontFamily: 'Arial, sans-serif', 
        fontSize: '14px', 
        color: '#333333',
        borderCollapse: 'collapse',
      }}
    >
      <tbody>
        {blocks.map((block) => (
          <BlockPreview 
            key={block.id} 
            block={block} 
            client={client} 
          />
        ))}
      </tbody>
    </table>
  );
}

function BlockPreview({ block, client }: { block: any; client: EmailClient }) {
  const content = block.content;
  const isOutlook = client === 'outlook';

  switch (block.type) {
    case 'text':
      return (
        <tr>
          <td 
            style={{
              fontSize: `${content.fontSize || 14}px`,
              color: content.color || '#333333',
              fontWeight: content.fontWeight || 'normal',
              fontStyle: content.fontStyle || 'normal',
              textAlign: content.align || 'left',
              padding: '2px 0',
            }}
          >
            {content.text || ''}
          </td>
        </tr>
      );

    case 'image':
      if (!content.src) return null;
      return (
        <tr>
          <td style={{ padding: '4px 0' }}>
            <img 
              src={content.src} 
              alt={content.alt || ''} 
              width={content.width}
              style={{ 
                display: 'block', 
                maxWidth: '100%',
                borderRadius: isOutlook ? 0 : undefined,
              }} 
            />
          </td>
        </tr>
      );

    case 'divider':
      return (
        <tr>
          <td style={{ padding: '10px 0' }}>
            <table 
              cellPadding={0} 
              cellSpacing={0} 
              style={{ width: '100%', borderCollapse: 'collapse' }}
            >
              <tbody>
                <tr>
                  <td 
                    style={{
                      backgroundColor: content.color || '#cccccc',
                      height: `${content.width || 1}px`,
                      lineHeight: `${content.width || 1}px`,
                      fontSize: `${content.width || 1}px`,
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      );

    case 'spacer':
      return (
        <tr>
          <td 
            style={{ 
              height: `${content.height || 20}px`, 
              lineHeight: `${content.height || 20}px` 
            }}
          >
            &nbsp;
          </td>
        </tr>
      );

    case 'contact-info':
      const items: string[] = [];
      if (content.email) items.push(content.email);
      if (content.phone) items.push(content.phone);
      if (content.website) items.push(content.website);
      if (content.address) items.push(content.address);
      
      if (items.length === 0) return null;
      
      return (
        <tr>
          <td style={{ padding: '4px 0', fontSize: '12px', color: '#666666' }}>
            {items.map((item, i) => (
              <span key={i}>
                {i > 0 && ' | '}
                <span style={{ color: '#0066cc' }}>{item}</span>
              </span>
            ))}
          </td>
        </tr>
      );

    case 'social':
      const platforms = content.platforms || [];
      if (platforms.length === 0) return null;
      
      return (
        <tr>
          <td style={{ padding: '4px 0' }}>
            {platforms.map((p: any, i: number) => (
              <span 
                key={i} 
                style={{ 
                  marginRight: '16px', 
                  color: '#0066cc',
                  textDecoration: 'none',
                }}
              >
                {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
              </span>
            ))}
          </td>
        </tr>
      );

    case 'button':
      return (
        <tr>
          <td style={{ padding: '8px 0' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: content.backgroundColor || '#0066cc',
                color: content.textColor || '#ffffff',
                textDecoration: 'none',
                borderRadius: isOutlook ? 0 : `${content.borderRadius || 4}px`,
                fontWeight: 'bold',
              }}
            >
              {content.text || 'Click Here'}
            </span>
          </td>
        </tr>
      );

    case 'banner':
      if (!content.src) return null;
      return (
        <tr>
          <td style={{ padding: '8px 0' }}>
            <img 
              src={content.src} 
              alt={content.alt || 'Banner'} 
              width={content.width}
              style={{ 
                display: 'block', 
                maxWidth: '100%',
                borderRadius: isOutlook ? 0 : undefined,
              }} 
            />
          </td>
        </tr>
      );

    case 'html':
      if (!content.html) return null;
      return (
        <tr>
          <td 
            style={{ padding: '4px 0' }}
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
        </tr>
      );

    default:
      return null;
  }
}
