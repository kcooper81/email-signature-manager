'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Mail, Monitor, Smartphone, AlertCircle, ExternalLink, Apple, Moon, Sun } from 'lucide-react';

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
  const [previewWidth, setPreviewWidth] = useState<'desktop' | 'mobile'>('desktop');
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  const clientInfo = CLIENT_INFO[selectedClient];

  return (
    <div className={cn('bg-card', className)}>
      {/* Client Tabs & Controls */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-1">
          {(Object.keys(CLIENT_INFO) as EmailClient[]).map((client) => (
            <button
              key={client}
              onClick={() => setSelectedClient(client)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                selectedClient === client
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {CLIENT_ICONS[client]}
              <span>{CLIENT_INFO[client].name}</span>
            </button>
          ))}
        </div>
        
        {/* Controls - Far Right */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded p-0.5">
            <button
              onClick={() => setColorMode('light')}
              className={`p-1.5 rounded transition-colors ${
                colorMode === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
              title="Light mode"
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setColorMode('dark')}
              className={`p-1.5 rounded transition-colors ${
                colorMode === 'dark' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
              title="Dark mode"
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
          </div>
          
          {/* Responsive Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded p-0.5">
            <button
              onClick={() => setPreviewWidth('desktop')}
              className={`p-1.5 rounded transition-colors ${
                previewWidth === 'desktop' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
              title="Desktop view"
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setPreviewWidth('mobile')}
              className={`p-1.5 rounded transition-colors ${
                previewWidth === 'mobile' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
              }`}
              title="Mobile view"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Client Description */}
      <div className="flex items-center justify-between px-4 py-2 border-b text-sm bg-gray-50">
        <div>
          <span className="font-medium text-foreground">{clientInfo.name}</span>
          <span className="text-muted-foreground ml-2">{clientInfo.description}</span>
        </div>
        <button
          onClick={() => setShowQuirks(!showQuirks)}
          className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-xs"
        >
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{showQuirks ? 'Hide' : 'View'} notes</span>
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
          className="rounded border shadow-sm p-4 mx-auto transition-all"
          style={{
            borderRadius: selectedClient === 'outlook' ? 0 : undefined,
            maxWidth: previewWidth === 'mobile' ? '375px' : '600px',
            backgroundColor: colorMode === 'dark' ? '#1a1a1a' : '#ffffff',
            color: colorMode === 'dark' ? '#e5e5e5' : '#1a1a1a',
          }}
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
              isMobile={previewWidth === 'mobile'}
              colorMode={colorMode}
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
function SignatureRenderer({ blocks, client, isMobile, colorMode = 'light' }: { blocks: any[]; client: EmailClient; isMobile: boolean; colorMode?: 'light' | 'dark' }) {
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
        fontSize: isMobile ? '12px' : '14px', 
        color: colorMode === 'dark' ? '#e5e5e5' : '#333333',
        borderCollapse: 'collapse',
        width: '100%',
      }}
    >
      <tbody>
        {blocks.map((block) => (
          <BlockPreview 
            key={block.id} 
            block={block} 
            client={client}
            isMobile={isMobile}
            colorMode={colorMode}
          />
        ))}
      </tbody>
    </table>
  );
}

function BlockPreview({ block, client, isMobile, colorMode = 'light' }: { block: any; client: EmailClient; isMobile: boolean; colorMode?: 'light' | 'dark' }) {
  const content = block.content;
  const isOutlook = client === 'outlook';
  
  // Debug: log block info
  console.log('BlockPreview rendering:', block.type, content);
  const isGmail = client === 'gmail';
  const isAppleMail = client === 'apple-mail';
  
  // Helper to adapt colors for dark mode
  const adaptColor = (color: string) => {
    if (colorMode === 'light') return color;
    // Convert common dark text colors to light ones
    if (color === '#333333' || color === '#000000') return '#e5e5e5';
    if (color === '#666666') return '#a0a0a0';
    // Keep brand colors and light colors as-is
    return color;
  };
  
  // Outlook adds extra spacing and uses Calibri font
  const outlookFont = isOutlook ? 'Calibri, Arial, sans-serif' : undefined;
  const outlookPadding = isOutlook ? '4px 0' : '2px 0';

  switch (block.type) {
    case 'text':
      return (
        <tr>
          <td 
            style={{
              fontSize: `${content.fontSize || 14}px`,
              color: adaptColor(content.color || '#333333'),
              fontWeight: content.fontWeight || 'normal',
              fontStyle: content.fontStyle || 'normal',
              textAlign: content.align || 'left',
              padding: outlookPadding,
              fontFamily: outlookFont,
              // Gmail slightly increases line height
              lineHeight: isGmail ? '1.6' : '1.4',
            }}
          >
            {content.text || ''}
          </td>
        </tr>
      );

    case 'image':
      if (!content.src) return null;
      const imgWidth = isMobile ? Math.min(content.width, 300) : content.width;
      return (
        <tr>
          <td style={{ padding: isOutlook ? '8px 0' : '4px 0' }}>
            <img 
              src={content.src} 
              alt={content.alt || ''} 
              width={imgWidth}
              style={{ 
                display: 'block', 
                maxWidth: '100%',
                height: 'auto',
                // Outlook strips border-radius completely
                borderRadius: isOutlook ? 0 : undefined,
                // Outlook adds extra spacing around images
                margin: isOutlook ? '4px 0' : undefined,
              }} 
            />
          </td>
        </tr>
      );

    case 'divider':
      const dividerColor = colorMode === 'dark' && (content.color === '#cccccc' || content.color === '#e5e5e5') 
        ? '#444444' 
        : content.color || '#cccccc';
      // Outlook sometimes adds extra padding around dividers
      const dividerPadding = isOutlook ? '12px 0' : '10px 0';
      return (
        <tr>
          <td style={{ padding: dividerPadding }}>
            <table 
              cellPadding={0} 
              cellSpacing={0} 
              style={{ width: `${content.width || 100}%`, borderCollapse: 'collapse' }}
            >
              <tbody>
                <tr>
                  <td 
                    style={{
                      backgroundColor: dividerColor,
                      height: `${content.thickness || 1}px`,
                      lineHeight: `${content.thickness || 1}px`,
                      fontSize: `${content.thickness || 1}px`,
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
          <td style={{ 
            padding: isOutlook ? '6px 0' : '4px 0', 
            fontSize: isOutlook ? '11px' : '12px', 
            color: adaptColor('#666666'),
            fontFamily: outlookFont,
          }}>
            {items.map((item, i) => (
              <span key={i}>
                {i > 0 && ' | '}
                <span style={{ 
                  color: colorMode === 'dark' ? '#66b3ff' : '#0066cc',
                  // Outlook renders links with underline by default
                  textDecoration: isOutlook ? 'underline' : 'none',
                }}>{item}</span>
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
          <td style={{ padding: isOutlook ? '6px 0' : '4px 0' }}>
            {platforms.map((p: any, i: number) => (
              <span 
                key={i} 
                style={{ 
                  marginRight: isOutlook ? '12px' : '16px',
                  color: colorMode === 'dark' ? '#66b3ff' : '#0066cc',
                  // Outlook shows underlines on links
                  textDecoration: isOutlook ? 'underline' : 'none',
                  fontSize: isOutlook ? '13px' : '14px',
                }}
              >
                {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
              </span>
            ))}
          </td>
        </tr>
      );

    case 'button':
      // Outlook uses VML for buttons, others use regular styling
      if (isOutlook) {
        return (
          <tr>
            <td style={{ padding: '8px 0' }}>
              <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: content.backgroundColor || '#0066cc',
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        color: content.textColor || '#ffffff',
                      }}
                    >
                      {content.text || 'Click Here'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <td style={{ padding: '8px 0' }}>
            <span
              style={{
                display: 'inline-block',
                padding: isMobile ? '8px 16px' : '10px 20px',
                backgroundColor: content.backgroundColor || '#0066cc',
                color: content.textColor || '#ffffff',
                textDecoration: 'none',
                // Gmail and Apple Mail support border-radius
                borderRadius: isAppleMail || isGmail ? `${content.borderRadius || 4}px` : 0,
                fontWeight: 'bold',
                fontSize: isMobile ? '12px' : '14px',
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

    case 'disclaimer':
      if (!content.text) return null;
      return (
        <tr>
          <td 
            style={{
              padding: content.padding ? `${content.padding}px` : (isOutlook ? '10px' : '8px'),
              fontSize: isOutlook ? `${(content.fontSize || 11) - 1}px` : `${content.fontSize || 11}px`,
              color: adaptColor(content.color || '#666666'),
              backgroundColor: content.backgroundColor || 'transparent',
              fontStyle: 'italic',
              fontFamily: outlookFont,
              // Outlook increases line height for small text
              lineHeight: isOutlook ? '1.5' : '1.3',
            }}
          >
            {content.text}
          </td>
        </tr>
      );

    case 'compliance':
      // Render compliance fields based on what's filled in
      const complianceItems: string[] = [];
      
      // Add all non-empty compliance fields
      Object.entries(content).forEach(([key, value]) => {
        if (value && typeof value === 'string' && key !== 'industry') {
          complianceItems.push(value);
        }
      });
      
      if (complianceItems.length === 0) return null;
      
      return (
        <tr>
          <td style={{ padding: '8px 0', fontSize: '11px', color: adaptColor('#666666') }}>
            {complianceItems.map((item, i) => (
              <div key={i} style={{ marginBottom: i < complianceItems.length - 1 ? '4px' : 0 }}>
                {item}
              </div>
            ))}
          </td>
        </tr>
      );

    default:
      return null;
  }
}
