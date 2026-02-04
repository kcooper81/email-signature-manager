'use client';

import { useState } from 'react';
import type {
  SignatureBlock,
  TextBlockContent,
  ImageBlockContent,
  DividerBlockContent,
  SpacerBlockContent,
  ContactInfoBlockContent,
  ButtonBlockContent,
  SocialBlockContent,
  DisclaimerBlockContent,
  ComplianceBlockContent,
  HtmlBlockContent,
} from './types';
import { ComplianceBlockPreview } from './compliance-block';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube, Github, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SignaturePreviewProps {
  blocks: SignatureBlock[];
  userData?: Record<string, string>;
}

type ColorMode = 'light' | 'dark';

// Sample user data for preview
const SAMPLE_USER_DATA: Record<string, string> = {
  '{{first_name}}': 'John',
  '{{last_name}}': 'Smith',
  '{{full_name}}': 'John Smith',
  '{{email}}': 'john.smith@company.com',
  '{{phone}}': '+1 (555) 123-4567',
  '{{mobile}}': '+1 (555) 987-6543',
  '{{job_title}}': 'Senior Product Manager',
  '{{department}}': 'Product',
  '{{company}}': 'Acme Corporation',
  '{{website}}': 'www.company.com',
  '{{address}}': '123 Business St, Suite 100, San Francisco, CA 94102',
  '{{linkedin}}': 'https://linkedin.com/in/johnsmith',
  '{{twitter}}': 'https://twitter.com/johnsmith',
};

export function SignaturePreview({ blocks, userData = SAMPLE_USER_DATA }: SignaturePreviewProps) {
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const replacePlaceholders = (text: string): string => {
    let result = text;
    Object.entries(userData).forEach(([key, value]) => {
      result = result.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), value);
    });
    return result;
  };

  if (blocks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Add blocks to see preview
      </div>
    );
  }

  const bgColor = colorMode === 'dark' ? '#1a1a1a' : '#ffffff';
  const textColor = colorMode === 'dark' ? '#e5e5e5' : '#1a1a1a';

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
          className="gap-2"
        >
          {colorMode === 'light' ? (
            <>
              <Moon className="h-4 w-4" />
              Dark Mode
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              Light Mode
            </>
          )}
        </Button>
      </div>
      <div 
        className="font-sans p-4 rounded-lg border" 
        style={{ 
          maxWidth: '600px',
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        {blocks.map((block) => (
          <div key={block.id}>
            {renderBlock(block, replacePlaceholders, colorMode)}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderBlock(
  block: SignatureBlock,
  replacePlaceholders: (text: string) => string,
  colorMode: ColorMode = 'light'
): React.ReactNode {
  switch (block.type) {
    case 'text':
      return renderTextBlock(block.content as TextBlockContent, replacePlaceholders, colorMode);
    case 'image':
      return renderImageBlock(block.content as ImageBlockContent);
    case 'divider':
      return renderDividerBlock(block.content as DividerBlockContent, colorMode);
    case 'spacer':
      return renderSpacerBlock(block.content as SpacerBlockContent);
    case 'contact-info':
      return renderContactInfoBlock(block.content as ContactInfoBlockContent, replacePlaceholders, colorMode);
    case 'button':
      return renderButtonBlock(block.content as ButtonBlockContent, replacePlaceholders);
    case 'social':
      return renderSocialBlock(block.content as SocialBlockContent, colorMode);
    case 'disclaimer':
      return renderDisclaimerBlock(block.content as DisclaimerBlockContent);
    case 'compliance':
      return <ComplianceBlockPreview content={block.content as ComplianceBlockContent} />;
    case 'html':
      return renderHtmlBlock(block.content as HtmlBlockContent);
    default:
      return null;
  }
}

function renderTextBlock(
  content: TextBlockContent,
  replacePlaceholders: (text: string) => string,
  colorMode: ColorMode = 'light'
): React.ReactNode {
  return (
    <p
      style={{
        fontSize: `${content.fontSize}px`,
        fontWeight: content.fontWeight,
        fontStyle: content.fontStyle || 'normal',
        color: content.color,
        textAlign: content.align || 'left',
        margin: '0 0 4px 0',
        lineHeight: 1.4,
      }}
    >
      {replacePlaceholders(content.text)}
    </p>
  );
}

function renderImageBlock(content: ImageBlockContent): React.ReactNode {
  if (!content.src) {
    return (
      <div
        style={{
          width: content.width,
          height: content.height || 60,
          backgroundColor: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          marginBottom: 8,
        }}
      >
        <span style={{ color: '#94a3b8', fontSize: 12 }}>No image</span>
      </div>
    );
  }

  const img = (
    <img
      src={content.src}
      alt={content.alt}
      style={{
        width: content.width,
        height: content.height || 'auto',
        display: 'block',
        marginBottom: 8,
      }}
    />
  );

  if (content.link) {
    return (
      <a href={content.link} target="_blank" rel="noopener noreferrer">
        {img}
      </a>
    );
  }

  return img;
}

function renderDividerBlock(content: DividerBlockContent, colorMode: ColorMode = 'light'): React.ReactNode {
  const dividerColor = colorMode === 'dark' && content.color === '#e5e5e5' ? '#404040' : content.color;
  return (
    <hr
      style={{
        border: 'none',
        borderTop: `1px ${content.style} ${dividerColor}`,
        width: `${content.width}%`,
        margin: '8px 0',
        height: 0,
        padding: 0,
      }}
    />
  );
}

function renderSpacerBlock(content: SpacerBlockContent): React.ReactNode {
  return <div style={{ height: content.height }} />;
}

function renderContactInfoBlock(
  content: ContactInfoBlockContent,
  replacePlaceholders: (text: string) => string,
  colorMode: ColorMode = 'light'
): React.ReactNode {
  const linkColor = colorMode === 'dark' ? '#9ca3af' : '#666';
  const iconColor = colorMode === 'dark' ? '#6b7280' : '#999';
  const items = [];

  if (content.email) {
    items.push({
      icon: <Mail className="h-3 w-3" />,
      text: replacePlaceholders(content.email),
      href: `mailto:${replacePlaceholders(content.email)}`,
    });
  }

  if (content.phone) {
    items.push({
      icon: <Phone className="h-3 w-3" />,
      text: replacePlaceholders(content.phone),
      href: `tel:${replacePlaceholders(content.phone).replace(/\s/g, '')}`,
    });
  }

  if (content.website) {
    const website = replacePlaceholders(content.website);
    items.push({
      icon: <Globe className="h-3 w-3" />,
      text: website,
      href: website.startsWith('http') ? website : `https://${website}`,
    });
  }

  if (content.address) {
    items.push({
      icon: <MapPin className="h-3 w-3" />,
      text: replacePlaceholders(content.address),
    });
  }

  return (
    <div style={{ fontSize: 13, color: linkColor, marginTop: 8 }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 4,
          }}
        >
          {content.showIcons && (
            <span style={{ color: iconColor }}>{item.icon}</span>
          )}
          {item.href ? (
            <a
              href={item.href}
              style={{ color: linkColor, textDecoration: 'none' }}
            >
              {item.text}
            </a>
          ) : (
            <span>{item.text}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function renderButtonBlock(
  content: ButtonBlockContent,
  replacePlaceholders: (text: string) => string
): React.ReactNode {
  return (
    <a
      href={content.url}
      style={{
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: content.backgroundColor,
        color: content.textColor,
        textDecoration: 'none',
        borderRadius: content.borderRadius,
        fontSize: 14,
        fontWeight: 500,
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      {replacePlaceholders(content.text)}
    </a>
  );
}

function renderSocialBlock(content: SocialBlockContent, colorMode: ColorMode = 'light'): React.ReactNode {
  const getIcon = (type: string) => {
    const size = content.iconSize || 24;
    const props = { style: { width: size, height: size } };

    switch (type) {
      case 'linkedin':
        return <Linkedin {...props} />;
      case 'twitter':
        return <Twitter {...props} />;
      case 'facebook':
        return <Facebook {...props} />;
      case 'instagram':
        return <Instagram {...props} />;
      case 'youtube':
        return <Youtube {...props} />;
      case 'github':
        return <Github {...props} />;
      default:
        return null;
    }
  };

  if (content.platforms.length === 0) {
    return (
      <div style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
        No social links added
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      {content.platforms.map((platform) => (
        <a
          key={platform.type}
          href={platform.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#666' }}
        >
          {getIcon(platform.type)}
        </a>
      ))}
    </div>
  );
}

function renderDisclaimerBlock(content: DisclaimerBlockContent): React.ReactNode {
  return (
    <p
      style={{
        fontSize: `${content.fontSize}px`,
        color: content.color,
        margin: '12px 0 0 0',
        lineHeight: 1.4,
        fontStyle: 'italic',
      }}
    >
      {content.text}
    </p>
  );
}

function renderHtmlBlock(content: HtmlBlockContent): React.ReactNode {
  if (!content.html) {
    return null;
  }
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content.html }}
      style={{ marginTop: 8 }}
    />
  );
}
