'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function Modal({ open, onClose, children, className }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-50 w-full max-w-lg rounded-xl bg-card p-6 shadow-xl animate-in fade-in-0 zoom-in-95',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ className, children, onClose }: { className?: string; children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-accent transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}

function ModalTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h2 className={cn('text-lg font-semibold text-foreground', className)}>
      {children}
    </h2>
  );
}

function ModalDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
}

function ModalFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex items-center justify-end gap-3 mt-6', className)}>
      {children}
    </div>
  );
}

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter };
