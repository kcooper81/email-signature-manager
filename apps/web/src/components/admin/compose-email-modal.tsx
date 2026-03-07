'use client';

import { useState, useRef } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RichTextEditor, type RichTextEditorRef } from '@/components/admin/rich-text-editor';
import { Send, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

interface ComposeEmailModalProps {
  open: boolean;
  onClose: () => void;
  /** Pre-filled recipient email */
  defaultTo?: string;
  /** Pre-filled subject line */
  defaultSubject?: string;
  /** Context for the ticket metadata (e.g. "org:abc123", "subscription:xyz") */
  context?: string;
  /** Label shown in the modal description (e.g. "Acme Corp") */
  recipientLabel?: string;
}

const MAILBOX_OPTIONS = [
  { value: 'support@siggly.io', label: 'Support' },
  { value: 'sales@siggly.io', label: 'Sales' },
  { value: 'help@siggly.io', label: 'Help' },
  { value: 'kade@siggly.io', label: 'Kade' },
  { value: 'team@siggly.io', label: 'Team' },
  { value: 'info@siggly.io', label: 'Info' },
];

export function ComposeEmailModal({
  open,
  onClose,
  defaultTo = '',
  defaultSubject = '',
  context,
  recipientLabel,
}: ComposeEmailModalProps) {
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState('');
  const [sendAs, setSendAs] = useState('support@siggly.io');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; ticketId?: string } | null>(null);
  const editorRef = useRef<RichTextEditorRef>(null);

  // Reset state when modal opens with new defaults
  const handleOpen = () => {
    setTo(defaultTo);
    setSubject(defaultSubject);
    setBody('');
    setSending(false);
    setResult(null);
    editorRef.current?.clear();
  };

  // Reset when defaultTo changes (new recipient)
  useState(() => {
    if (open) handleOpen();
  });

  const handleSend = async () => {
    const htmlContent = editorRef.current?.getHTML() || body;
    if (!to.trim() || !subject.trim() || !htmlContent.trim() || htmlContent === '<p></p>') return;

    setSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: to.trim(),
          subject: subject.trim(),
          body: htmlContent,
          sendAs,
          context,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResult({
          success: true,
          message: data.warning || 'Email sent and ticket created',
          ticketId: data.ticketId,
        });
        // Auto-close after success
        setTimeout(() => {
          onClose();
          // Reset for next use
          setTo('');
          setSubject('');
          setBody('');
          setResult(null);
          editorRef.current?.clear();
        }, 1500);
      } else {
        setResult({ success: false, message: data.error || 'Failed to send' });
      }
    } catch {
      setResult({ success: false, message: 'Network error' });
    } finally {
      setSending(false);
    }
  };

  const canSend = to.trim() && subject.trim() && body.trim() && body !== '<p></p>' && !sending;

  return (
    <Modal open={open} onClose={onClose} className="max-w-2xl">
      <ModalHeader onClose={onClose}>
        <ModalTitle>Compose Email</ModalTitle>
        {recipientLabel && (
          <ModalDescription>Sending to {recipientLabel}</ModalDescription>
        )}
      </ModalHeader>

      <ModalContent className="space-y-4">
        {/* To field */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">To</label>
          <Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
            type="email"
          />
        </div>

        {/* Subject field */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
          />
        </div>

        {/* Send As selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">From</label>
          <select
            value={sendAs}
            onChange={(e) => setSendAs(e.target.value)}
            className="w-full h-9 px-3 border rounded-md text-sm bg-background"
          >
            {MAILBOX_OPTIONS.map((mb) => (
              <option key={mb.value} value={mb.value}>{mb.label} ({mb.value})</option>
            ))}
          </select>
        </div>

        {/* Rich text body */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
          <RichTextEditor
            ref={editorRef}
            placeholder="Write your email..."
            onChange={(html) => setBody(html)}
            initialContent=""
          />
        </div>

        {/* Result message */}
        {result && (
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
            result.success
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            {result.message}
          </div>
        )}
      </ModalContent>

      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={sending}>Cancel</Button>
        <Button onClick={handleSend} disabled={!canSend}>
          {sending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
          Send Email
        </Button>
      </ModalFooter>
    </Modal>
  );
}
