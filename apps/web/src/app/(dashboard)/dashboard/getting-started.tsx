'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  CheckCircle2, 
  Link2, 
  Paintbrush, 
  Rocket, 
  X,
  ChevronDown,
  ChevronUp,
  Play,
} from 'lucide-react';

const SUPADEMO_ID = 'cmlbpojgx46fhvhwzml7s51i5';

interface GettingStartedCardProps {
  hasConnection: boolean;
  hasTemplates: boolean;
  hasDeployments: boolean;
  completedSteps: number;
  totalSteps: number;
  progressPercent: number;
  isNewUser: boolean;
}

const DISMISSED_KEY = 'siggly_getting_started_dismissed';

export function GettingStartedCard({
  hasConnection,
  hasTemplates,
  hasDeployments,
  completedSteps,
  totalSteps,
  progressPercent,
  isNewUser,
}: GettingStartedCardProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(DISMISSED_KEY, 'true');
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;
  
  // Don't show if dismissed or all steps complete
  if (isDismissed || completedSteps === totalSteps) return null;

  const steps = [
    {
      title: 'Connect email provider',
      description: 'Link Google Workspace or Microsoft 365',
      completed: hasConnection,
      href: '/integrations',
      icon: Link2,
      color: 'blue',
    },
    {
      title: 'Create a template',
      description: 'Design your signature with our editor',
      completed: hasTemplates,
      href: '/templates/new',
      icon: Paintbrush,
      color: 'violet',
    },
    {
      title: 'Deploy signatures',
      description: 'Push to your team in one click',
      completed: hasDeployments,
      href: '/deployments',
      icon: Rocket,
      color: 'emerald',
    },
  ];

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="py-4 bg-gradient-to-r from-violet-50 to-blue-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold text-foreground">
                Getting Started
              </CardTitle>
              <span className="text-xs font-medium text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
                {completedSteps}/{totalSteps}
              </span>
            </div>
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).Supademo) {
                  (window as any).Supademo.open(SUPADEMO_ID);
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-700 bg-white border border-violet-200 hover:border-violet-300 px-2.5 py-1 rounded-full transition-colors"
            >
              <Play className="h-3 w-3" />
              Watch tour
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleMinimize}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-lg transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-lg transition-colors"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        {!isMinimized && (
          <div className="mt-3 h-1.5 bg-background/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </CardHeader>

      {/* Steps */}
      {!isMinimized && (
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-3">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} stepNumber={index + 1} />
            ))}
          </div>
          
          <p className="text-xs text-muted-foreground mt-4 text-center">
            You can dismiss this card anytime. Access setup from Settings if needed.
          </p>
        </CardContent>
      )}
    </Card>
  );
}

interface Step {
  title: string;
  description: string;
  completed: boolean;
  href: string;
  icon: any;
  color: string;
}

function StepItem({ step, stepNumber }: { step: Step; stepNumber: number }) {
  const Icon = step.icon;
  
  const content = (
    <div
      className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
        step.completed
          ? 'bg-emerald-50 border-emerald-200'
          : 'bg-card border hover:border-violet-300 hover:shadow-sm cursor-pointer'
      }`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
          step.completed
            ? 'bg-emerald-500 text-white'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {step.completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Icon className="h-5 w-5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${step.completed ? 'text-emerald-700' : 'text-foreground'}`}>
          {step.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">{step.description}</p>
      </div>

      {/* Step number */}
      {!step.completed && (
        <div className="shrink-0 h-6 w-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-semibold">
          {stepNumber}
        </div>
      )}
    </div>
  );

  if (step.completed) {
    return content;
  }

  return <Link href={step.href}>{content}</Link>;
}
