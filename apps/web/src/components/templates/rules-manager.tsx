'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle, Badge, Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui';
import { Plus, Edit, Trash2, Loader2, Save, X, AlertCircle, CheckCircle2, Calendar, Users, Mail, Target } from 'lucide-react';

interface SignatureRule {
  id: string;
  name: string;
  description: string | null;
  priority: number;
  is_active: boolean;
  sender_condition: string;
  sender_user_ids: string[] | null;
  sender_departments: string[] | null;
  email_type: string;
  recipient_condition: string;
  start_date: string | null;
  end_date: string | null;
  subject_contains: string | null;
  subject_not_contains: string | null;
}

interface RulesManagerProps {
  templateId: string;
  templateName: string;
  organizationId: string;
}

export function RulesManager({ templateId, templateName, organizationId }: RulesManagerProps) {
  const [rules, setRules] = useState<SignatureRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<SignatureRule | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 0,
    is_active: true,
    sender_condition: 'all',
    sender_departments: [] as string[],
    sender_user_ids: [] as string[],
    email_type: 'all',
    recipient_condition: 'all',
    start_date: '',
    end_date: '',
    subject_contains: '',
    subject_not_contains: '',
  });

  const [departments, setDepartments] = useState<string[]>([]);
  const [employees, setEmployees] = useState<{id: string; name: string; email: string}[]>([]);

  useEffect(() => {
    loadRules();
    loadDepartments();
    loadEmployees();
  }, [templateId]);

  const loadRules = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('signature_rules')
        .select('*')
        .eq('template_id', templateId)
        .order('priority', { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('users')
        .select('department')
        .eq('organization_id', organizationId)
        .not('department', 'is', null);

      if (data) {
        const uniqueDepts = [...new Set(data.map(u => u.department).filter(Boolean))];
        setDepartments(uniqueDepts as string[]);
      }
    } catch (err) {
      console.error('Failed to load departments:', err);
    }
  };

  const loadEmployees = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('users')
        .select('id, first_name, last_name, email')
        .eq('organization_id', organizationId)
        .order('first_name', { ascending: true });

      if (data) {
        setEmployees(data.map(u => ({
          id: u.id,
          name: `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.email,
          email: u.email
        })));
      }
    } catch (err) {
      console.error('Failed to load employees:', err);
    }
  };

  const openCreateModal = () => {
    setEditingRule(null);
    setFormData({
      name: '',
      description: '',
      priority: rules.length,
      is_active: true,
      sender_condition: 'all',
      sender_departments: [],
      sender_user_ids: [],
      email_type: 'all',
      recipient_condition: 'all',
      start_date: '',
      end_date: '',
      subject_contains: '',
      subject_not_contains: '',
    });
    setShowModal(true);
  };

  const openEditModal = (rule: SignatureRule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      description: rule.description || '',
      priority: rule.priority,
      is_active: rule.is_active,
      sender_condition: rule.sender_condition,
      sender_departments: rule.sender_departments || [],
      sender_user_ids: rule.sender_user_ids || [],
      email_type: rule.email_type,
      recipient_condition: rule.recipient_condition,
      start_date: rule.start_date ? rule.start_date.split('T')[0] : '',
      end_date: rule.end_date ? rule.end_date.split('T')[0] : '',
      subject_contains: rule.subject_contains || '',
      subject_not_contains: rule.subject_not_contains || '',
    });
    setShowModal(true);
  };

  const saveRule = async () => {
    if (!formData.name.trim()) {
      setError('Rule name is required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      
      const ruleData = {
        template_id: templateId,
        organization_id: organizationId,
        name: formData.name,
        description: formData.description || null,
        priority: formData.priority,
        is_active: formData.is_active,
        sender_condition: formData.sender_condition,
        sender_departments: formData.sender_departments.length > 0 ? formData.sender_departments : null,
        sender_user_ids: formData.sender_user_ids.length > 0 ? formData.sender_user_ids : null,
        email_type: formData.email_type,
        recipient_condition: formData.recipient_condition,
        start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
        subject_contains: formData.subject_contains || null,
        subject_not_contains: formData.subject_not_contains || null,
      };

      if (editingRule) {
        const { error } = await supabase
          .from('signature_rules')
          .update(ruleData)
          .eq('id', editingRule.id);

        if (error) throw error;
        setSuccess('Rule updated successfully');
      } else {
        const { error } = await supabase
          .from('signature_rules')
          .insert(ruleData);

        if (error) throw error;
        setSuccess('Rule created successfully');
      }

      setShowModal(false);
      await loadRules();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteRule = async (ruleId: string) => {
    if (!confirm('Are you sure you want to delete this rule?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('signature_rules')
        .delete()
        .eq('id', ruleId);

      if (error) throw error;
      setSuccess('Rule deleted successfully');
      await loadRules();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleRuleActive = async (rule: SignatureRule) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('signature_rules')
        .update({ is_active: !rule.is_active })
        .eq('id', rule.id);

      if (error) throw error;
      await loadRules();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Signature Rules</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Control when "{templateName}" is applied based on conditions
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-destructive hover:text-destructive/80">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <p className="text-emerald-800">{success}</p>
        </div>
      )}

      {/* Rules List */}
      {rules.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No rules yet</h3>
            <p className="text-muted-foreground mb-4">
              Create rules to control when this signature is applied based on sender, recipients, or email type.
            </p>
            <Button onClick={openCreateModal}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Rule
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {rules.map((rule) => (
            <Card key={rule.id} className={!rule.is_active ? 'opacity-60' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <Badge variant={rule.is_active ? 'default' : 'secondary'}>
                        {rule.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="outline">Priority: {rule.priority}</Badge>
                    </div>
                    {rule.description && (
                      <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRuleActive(rule)}
                    >
                      {rule.is_active ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(rule)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRule(rule.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Users className="h-3 w-3" />
                      <span className="font-medium">Sender</span>
                    </div>
                    <p className="capitalize">{rule.sender_condition.replace(/_/g, ' ')}</p>
                    {rule.sender_departments && rule.sender_departments.length > 0 && (
                      <p className="text-xs text-muted-foreground">{rule.sender_departments.join(', ')}</p>
                    )}
                    {rule.sender_user_ids && rule.sender_user_ids.length > 0 && (
                      <p className="text-xs text-muted-foreground">{rule.sender_user_ids.length} employee(s) selected</p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Mail className="h-3 w-3" />
                      <span className="font-medium">Email Type</span>
                    </div>
                    <p className="capitalize">{rule.email_type}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Target className="h-3 w-3" />
                      <span className="font-medium">Recipients</span>
                    </div>
                    <p className="capitalize">{rule.recipient_condition.replace(/_/g, ' ')}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" />
                      <span className="font-medium">Campaign Dates</span>
                    </div>
                    {rule.start_date || rule.end_date ? (
                      <p className="text-xs">
                        {rule.start_date && new Date(rule.start_date).toLocaleDateString()} - {rule.end_date && new Date(rule.end_date).toLocaleDateString()}
                      </p>
                    ) : (
                      <p className="text-muted-foreground">Always active</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>
          <ModalTitle>{editingRule ? 'Edit Rule' : 'Create Rule'}</ModalTitle>
          <ModalDescription>
            Define conditions for when this signature should be applied
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          {/* Basic Info */}
          <div className="space-y-2">
            <Label htmlFor="rule_name">Rule Name *</Label>
            <Input
              id="rule_name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., External Emails Only"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rule_description">Description</Label>
            <Input
              id="rule_description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
              />
              <p className="text-xs text-muted-foreground">Higher numbers evaluated first</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="is_active">Status</Label>
              <select
                id="is_active"
                value={formData.is_active ? 'active' : 'inactive'}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                className="w-full text-sm border rounded-lg px-3 py-2 bg-background"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Sender Conditions */}
          <div className="space-y-2 pt-4 border-t">
            <Label>Sender Conditions</Label>
            <select
              value={formData.sender_condition}
              onChange={(e) => setFormData({ ...formData, sender_condition: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 bg-background"
            >
              <option value="all">All employees</option>
              <option value="specific_departments">Specific departments</option>
              <option value="specific_users">Specific employees</option>
            </select>

            {formData.sender_condition === 'specific_departments' && (
              <div className="space-y-2 mt-3">
                <Label>Select Departments</Label>
                {departments.length === 0 ? (
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    No departments found. Add departments to team members on the Team page first.
                  </p>
                ) : (
                  <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-1">
                    {departments.map((dept) => (
                      <label key={dept} className="flex items-center gap-2 p-1 hover:bg-muted rounded">
                        <input
                          type="checkbox"
                          checked={formData.sender_departments.includes(dept)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                sender_departments: [...formData.sender_departments, dept],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                sender_departments: formData.sender_departments.filter(d => d !== dept),
                              });
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <span className="text-sm">{dept}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {formData.sender_condition === 'specific_users' && (
              <div className="space-y-2 mt-3">
                <Label>Select Employees</Label>
                {employees.length === 0 ? (
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    No employees found.
                  </p>
                ) : (
                  <div className="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-1">
                    {employees.map((emp) => (
                      <label key={emp.id} className="flex items-center gap-2 p-1 hover:bg-muted rounded">
                        <input
                          type="checkbox"
                          checked={formData.sender_user_ids.includes(emp.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                sender_user_ids: [...formData.sender_user_ids, emp.id],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                sender_user_ids: formData.sender_user_ids.filter(id => id !== emp.id),
                              });
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <span className="text-sm">{emp.name}</span>
                        <span className="text-xs text-muted-foreground">({emp.email})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Email Type */}
          <div className="space-y-2">
            <Label>Email Type</Label>
            <select
              value={formData.email_type}
              onChange={(e) => setFormData({ ...formData, email_type: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 bg-background"
            >
              <option value="all">All emails</option>
              <option value="new">New emails (Compose)</option>
              <option value="reply">Reply emails only</option>
            </select>
          </div>

          {/* Recipient Conditions */}
          <div className="space-y-2">
            <Label>Recipient Conditions</Label>
            <select
              value={formData.recipient_condition}
              onChange={(e) => setFormData({ ...formData, recipient_condition: e.target.value })}
              className="w-full text-sm border rounded-lg px-3 py-2 bg-background"
            >
              <option value="all">All recipients</option>
              <option value="all_internal">All internal (within organization)</option>
              <option value="all_external">All external (outside organization)</option>
              <option value="at_least_one_internal">At least one internal</option>
              <option value="at_least_one_external">At least one external</option>
            </select>
          </div>

          {/* Campaign Dates */}
          <div className="space-y-2 pt-4 border-t">
            <Label>Campaign Dates (Optional)</Label>
            <p className="text-xs text-muted-foreground">Set dates to run this as a time-limited campaign</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={saveRule} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
