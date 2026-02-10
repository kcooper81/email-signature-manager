'use client';

import { useState } from 'react';
import { X, Send, Bug, Lightbulb, HelpCircle, CheckCircle, Headphones } from 'lucide-react';
import { Button, Textarea } from '@/components/ui';
import { cn } from '@/lib/utils';

type FeedbackType = 'bug' | 'feature' | 'question' | 'other';

interface FeedbackOption {
  type: FeedbackType;
  icon: typeof Bug;
  label: string;
  placeholder: string;
}

const feedbackOptions: FeedbackOption[] = [
  { type: 'bug', icon: Bug, label: 'Report a Bug', placeholder: 'Describe the issue you encountered...' },
  { type: 'feature', icon: Lightbulb, label: 'Feature Request', placeholder: 'What feature would you like to see?' },
  { type: 'question', icon: HelpCircle, label: 'Ask a Question', placeholder: 'What do you need help with?' },
];

interface FeedbackWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackWidget({ isOpen, onClose }: FeedbackWidgetProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || !feedbackType) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: feedbackType,
          message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFeedbackType(null);
      setMessage('');
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setFeedbackType(null);
    setMessage('');
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50" 
        onClick={handleClose}
      />
      
      {/* Feedback Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 rounded-2xl bg-card shadow-2xl border overflow-hidden animate-in fade-in-0 zoom-in-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 flex items-center justify-between">
            <h3 className="text-white font-semibold">
              {isSubmitted ? 'Thank You!' : feedbackType ? 'Submit Ticket' : 'Help & Support'}
            </h3>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {isSubmitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-foreground font-medium">Ticket Submitted!</p>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you soon.</p>
              </div>
            ) : !feedbackType ? (
              <div className="space-y-2">
                {feedbackOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setFeedbackType(option.type)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border hover:border-violet-300 hover:bg-violet-50 transition-colors text-left"
                  >
                    <div className="rounded-full bg-violet-100 p-2">
                      <option.icon className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="font-medium text-foreground">{option.label}</span>
                  </button>
                ))}
                
                <div className="pt-3 border-t mt-3">
                  <a
                    href="mailto:support@siggly.io"
                    className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Or email us at support@siggly.io
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setFeedbackType(null)}
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  ← Back
                </button>
                
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={feedbackOptions.find(o => o.type === feedbackType)?.placeholder}
                  className="min-h-[120px] resize-none"
                  autoFocus
                />
                
                <Button
                  onClick={handleSubmit}
                  disabled={!message.trim() || isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Ticket
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
    </>
  );
}
