'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterSignupProps {
  source: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  inline?: boolean;
}

export function NewsletterSignup({
  source,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  className = '',
  inline = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          metadata: {
            url: window.location.href,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-2 text-green-600 ${className}`}>
        <Check className="h-5 w-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={inline ? 'flex gap-2' : 'space-y-2'}>
        <div className="flex-1">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === 'loading'}
            className={status === 'error' ? 'border-red-500' : ''}
          />
        </div>
        <Button
          type="submit"
          disabled={status === 'loading'}
          className={inline ? '' : 'w-full'}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-2">{message}</p>
      )}
    </form>
  );
}

// Compact inline version for footers/sidebars
export function NewsletterSignupCompact({ source }: { source: string }) {
  return (
    <NewsletterSignup
      source={source}
      placeholder="Your email"
      buttonText="Subscribe"
      inline
    />
  );
}

// Full version with heading for dedicated sections
export function NewsletterSignupSection({ 
  source,
  title = 'Stay Updated',
  description = 'Get the latest tips and updates delivered to your inbox.',
}: { 
  source: string;
  title?: string;
  description?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-8 border border-violet-200">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Mail className="h-6 w-6 text-violet-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <NewsletterSignup
            source={source}
            placeholder="Enter your email"
            buttonText="Subscribe"
          />
        </div>
      </div>
    </div>
  );
}
