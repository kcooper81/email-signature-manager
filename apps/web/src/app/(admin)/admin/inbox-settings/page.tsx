'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@/components/ui';
import {
  Loader2,
  Mail,
  Zap,
  Clock,
  Save,
  Plus,
  Trash2,
  Edit2,
  X,
  Check,
} from 'lucide-react';

interface MailboxSignature {
  id: string;
  alias: string;
  display_name: string;
  signature_html: string;
  is_enabled: boolean;
}

interface AutoResponderSettings {
  is_enabled: boolean;
  subject: string;
  body: string;
  only_outside_hours: boolean;
  business_hours_start: string;
  business_hours_end: string;
  business_timezone: string;
}

interface CannedResponse {
  id: string;
  title: string;
  content: string;
  category: string;
  shortcut: string | null;
}

export default function InboxSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [mailboxes, setMailboxes] = useState<MailboxSignature[]>([]);
  const [autoResponder, setAutoResponder] = useState<AutoResponderSettings>({
    is_enabled: false,
    subject: 'We received your message',
    body: 'Thank you for reaching out. We\'ve received your message and will get back to you as soon as possible.',
    only_outside_hours: false,
    business_hours_start: '09:00',
    business_hours_end: '17:00',
    business_timezone: 'America/New_York',
  });
  const [cannedResponses, setCannedResponses] = useState<CannedResponse[]>([]);
  const [editingMailbox, setEditingMailbox] = useState<string | null>(null);
  const [editingCanned, setEditingCanned] = useState<string | null>(null);
  const [newCanned, setNewCanned] = useState<{ title: string; content: string; category: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'mailboxes' | 'canned' | 'autoresponder'>('mailboxes');

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    const [settingsRes, cannedRes] = await Promise.all([
      fetch('/api/admin/inbox-settings'),
      fetch('/api/admin/canned-responses'),
    ]);

    if (settingsRes.ok) {
      const data = await settingsRes.json();
      setMailboxes(data.mailboxes || []);
      if (data.autoResponder) setAutoResponder(data.autoResponder);
    }

    if (cannedRes.ok) {
      const data = await cannedRes.json();
      setCannedResponses(data.data || []);
    }

    setLoading(false);
  };

  const saveMailboxSignature = async (mb: MailboxSignature) => {
    setSaving(mb.id);
    await fetch('/api/admin/inbox-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'mailbox',
        id: mb.id,
        signature_html: mb.signature_html,
        is_enabled: mb.is_enabled,
      }),
    });
    setSaving(null);
    setEditingMailbox(null);
  };

  const saveAutoResponder = async () => {
    setSaving('autoresponder');
    await fetch('/api/admin/inbox-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'auto_responder',
        ...autoResponder,
      }),
    });
    setSaving(null);
  };

  const createCannedResponse = async () => {
    if (!newCanned?.title?.trim() || !newCanned?.content?.trim()) return;
    setSaving('new-canned');
    const res = await fetch('/api/admin/canned-responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCanned),
    });
    if (res.ok) {
      const { data } = await res.json();
      setCannedResponses(prev => [...prev, data]);
      setNewCanned(null);
    }
    setSaving(null);
  };

  const updateCannedResponse = async (cr: CannedResponse) => {
    setSaving(cr.id);
    await fetch(`/api/admin/canned-responses/${cr.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cr),
    });
    setSaving(null);
    setEditingCanned(null);
  };

  const deleteCannedResponse = async (id: string) => {
    await fetch(`/api/admin/canned-responses/${id}`, { method: 'DELETE' });
    setCannedResponses(prev => prev.filter(c => c.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Inbox Settings</h1>

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {[
          { key: 'mailboxes' as const, label: 'Mailbox Signatures', icon: Mail },
          { key: 'canned' as const, label: 'Saved Replies', icon: Zap },
          { key: 'autoresponder' as const, label: 'Auto-Responder', icon: Clock },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mailbox Signatures Tab */}
      {activeTab === 'mailboxes' && (
        <div className="space-y-3">
          <p className="text-sm text-slate-500">
            Set an HTML signature for each mailbox. When replying from that mailbox, this signature is used instead of the admin's personal signature.
          </p>
          {mailboxes.map(mb => (
            <Card key={mb.id}>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-800">{mb.alias}@siggly.io</span>
                    <span className="text-xs text-slate-400">{mb.display_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mb.is_enabled}
                        onChange={(e) => setMailboxes(prev => prev.map(m => m.id === mb.id ? { ...m, is_enabled: e.target.checked } : m))}
                        className="w-3.5 h-3.5 rounded"
                      />
                      Enabled
                    </label>
                    {editingMailbox !== mb.id ? (
                      <button onClick={() => setEditingMailbox(mb.id)} className="text-xs text-blue-600 hover:underline">
                        Edit
                      </button>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => saveMailboxSignature(mb)}
                          disabled={saving === mb.id}
                          className="text-xs text-green-600 hover:underline flex items-center gap-0.5"
                        >
                          {saving === mb.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                          Save
                        </button>
                        <button onClick={() => setEditingMailbox(null)} className="text-xs text-slate-400 hover:underline">
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {editingMailbox === mb.id ? (
                  <Textarea
                    value={mb.signature_html}
                    onChange={(e) => setMailboxes(prev => prev.map(m => m.id === mb.id ? { ...m, signature_html: e.target.value } : m))}
                    placeholder="Paste HTML signature here..."
                    className="font-mono text-xs min-h-[120px]"
                  />
                ) : (
                  mb.signature_html ? (
                    <div className="bg-slate-50 rounded p-3 text-sm" dangerouslySetInnerHTML={{ __html: mb.signature_html }} />
                  ) : (
                    <p className="text-xs text-slate-400 italic">No signature set — will use admin's personal signature</p>
                  )
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Canned Responses Tab */}
      {activeTab === 'canned' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Saved replies you can quickly insert when responding to tickets.
            </p>
            {!newCanned && (
              <Button size="sm" variant="outline" onClick={() => setNewCanned({ title: '', content: '', category: 'general' })}>
                <Plus className="h-3.5 w-3.5 mr-1" />
                New
              </Button>
            )}
          </div>

          {newCanned && (
            <Card className="border-blue-200 bg-blue-50/30">
              <CardContent className="pt-5 space-y-3">
                <Input
                  placeholder="Title (e.g., 'Greeting', 'Billing Question')"
                  value={newCanned.title}
                  onChange={(e) => setNewCanned({ ...newCanned, title: e.target.value })}
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Category"
                    value={newCanned.category}
                    onChange={(e) => setNewCanned({ ...newCanned, category: e.target.value })}
                    className="text-sm w-40"
                  />
                </div>
                <Textarea
                  placeholder="Reply content..."
                  value={newCanned.content}
                  onChange={(e) => setNewCanned({ ...newCanned, content: e.target.value })}
                  className="text-sm min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={createCannedResponse} disabled={saving === 'new-canned' || !newCanned.title.trim() || !newCanned.content.trim()}>
                    {saving === 'new-canned' ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <Save className="h-3.5 w-3.5 mr-1" />}
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setNewCanned(null)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {cannedResponses.length === 0 && !newCanned && (
            <div className="text-center py-12 text-slate-400">
              <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No saved replies yet</p>
            </div>
          )}

          {cannedResponses.map(cr => (
            <Card key={cr.id}>
              <CardContent className="pt-4">
                {editingCanned === cr.id ? (
                  <div className="space-y-2">
                    <Input
                      value={cr.title}
                      onChange={(e) => setCannedResponses(prev => prev.map(c => c.id === cr.id ? { ...c, title: e.target.value } : c))}
                      className="text-sm"
                    />
                    <Input
                      value={cr.category}
                      onChange={(e) => setCannedResponses(prev => prev.map(c => c.id === cr.id ? { ...c, category: e.target.value } : c))}
                      className="text-sm w-40"
                      placeholder="Category"
                    />
                    <Textarea
                      value={cr.content}
                      onChange={(e) => setCannedResponses(prev => prev.map(c => c.id === cr.id ? { ...c, content: e.target.value } : c))}
                      className="text-sm min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => updateCannedResponse(cr)} disabled={saving === cr.id}>
                        {saving === cr.id ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <Check className="h-3.5 w-3.5 mr-1" />}
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingCanned(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800">{cr.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{cr.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setEditingCanned(cr.id)} className="p-1 hover:bg-slate-100 rounded">
                          <Edit2 className="h-3.5 w-3.5 text-slate-400" />
                        </button>
                        <button onClick={() => deleteCannedResponse(cr.id)} className="p-1 hover:bg-red-50 rounded">
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{cr.content}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Auto-Responder Tab */}
      {activeTab === 'autoresponder' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Automatically reply to new inbound emails confirming receipt. The reply comes from the mailbox the customer emailed.
          </p>

          <Card>
            <CardContent className="pt-5 space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoResponder.is_enabled}
                  onChange={(e) => setAutoResponder({ ...autoResponder, is_enabled: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Enable auto-responder</span>
              </label>

              {autoResponder.is_enabled && (
                <>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Subject line</label>
                    <Input
                      value={autoResponder.subject}
                      onChange={(e) => setAutoResponder({ ...autoResponder, subject: e.target.value })}
                      className="text-sm"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Ticket ID is automatically appended</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Message body</label>
                    <Textarea
                      value={autoResponder.body}
                      onChange={(e) => setAutoResponder({ ...autoResponder, body: e.target.value })}
                      className="text-sm min-h-[100px]"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoResponder.only_outside_hours}
                      onChange={(e) => setAutoResponder({ ...autoResponder, only_outside_hours: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-700">Only send outside business hours</span>
                  </label>

                  {autoResponder.only_outside_hours && (
                    <div className="flex items-center gap-3 pl-6">
                      <div>
                        <label className="text-[10px] text-slate-500 block">Start</label>
                        <input
                          type="time"
                          value={autoResponder.business_hours_start}
                          onChange={(e) => setAutoResponder({ ...autoResponder, business_hours_start: e.target.value })}
                          className="px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <span className="text-slate-400 mt-3">to</span>
                      <div>
                        <label className="text-[10px] text-slate-500 block">End</label>
                        <input
                          type="time"
                          value={autoResponder.business_hours_end}
                          onChange={(e) => setAutoResponder({ ...autoResponder, business_hours_end: e.target.value })}
                          className="px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Timezone</label>
                        <select
                          value={autoResponder.business_timezone}
                          onChange={(e) => setAutoResponder({ ...autoResponder, business_timezone: e.target.value })}
                          className="px-2 py-1 border rounded text-xs"
                        >
                          <option value="America/New_York">Eastern</option>
                          <option value="America/Chicago">Central</option>
                          <option value="America/Denver">Mountain</option>
                          <option value="America/Los_Angeles">Pacific</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>
                  )}
                </>
              )}

              <Button onClick={saveAutoResponder} disabled={saving === 'autoresponder'} size="sm">
                {saving === 'autoresponder' ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <Save className="h-3.5 w-3.5 mr-1" />}
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
