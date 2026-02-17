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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-50 w-full max-w-lg max-h-[90vh] flex flex-col rounded-xl bg-card shadow-xl animate-in fade-in-0 zoom-in-95',
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
    <div className={cn('flex items-start justify-between gap-3 p-4 sm:p-6 pb-4', className)}>
      <div className="flex-1 min-w-0">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-full p-1 hover:bg-secondary transition-colors"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}

function ModalTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h2 className={cn('text-base sm:text-lg font-semibold text-foreground', className)}>
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

function ModalContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('px-4 sm:px-6 py-4 overflow-y-auto flex-1', className)}>
      {children}
    </div>
  );
}

function ModalFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 pt-4', className)}>
      {children}
    </div>
  );
}

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter };
