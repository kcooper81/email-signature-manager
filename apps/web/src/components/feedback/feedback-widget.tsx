'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Bug, Lightbulb, HelpCircle, CheckCircle } from 'lucide-react';
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

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() || !feedbackType) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - replace with actual endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, send to your feedback endpoint:
    // await fetch('/api/feedback', {
    //   method: 'POST',
    //   body: JSON.stringify({ type: feedbackType, message }),
    // });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFeedbackType(null);
      setMessage('');
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFeedbackType(null);
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105',
          isOpen && 'hidden'
        )}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Feedback</span>
      </button>

      {/* Feedback Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 fade-in-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 flex items-center justify-between">
            <h3 className="text-white font-semibold">
              {isSubmitted ? 'Thank You!' : feedbackType ? 'Send Feedback' : 'How can we help?'}
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
                <p className="text-gray-900 font-medium">Feedback Received!</p>
                <p className="text-sm text-gray-500 mt-1">We appreciate your input.</p>
              </div>
            ) : !feedbackType ? (
              <div className="space-y-2">
                {feedbackOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setFeedbackType(option.type)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-colors text-left"
                  >
                    <div className="rounded-full bg-violet-100 p-2">
                      <option.icon className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="font-medium text-gray-900">{option.label}</span>
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
                      Send Feedback
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
