'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Avatar, Input } from '@/components/ui';
import { PageHeader } from '@/components/dashboard';
import { 
  FileSignature, 
  Users as UsersIcon, 
  Building2, 
  Search,
  ArrowLeft,
  Filter,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
}

interface Deployment {
  id: string;
  template_id: string;
  template_name: string;
  status: string;
  total_users: number;
  successful_count: number;
  created_at: string;
}

interface Employee {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  department: string | null;
}

interface TemplateUsage {
  templateId: string;
  templateName: string;
  totalDeployments: number;
  lastDeployedAt: string | null;
  departments: string[];
  userCount: number;
}

export default function TemplateAssignmentsPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    
    // Get current user's organization
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: currentUser } = await supabase
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (!currentUser?.organization_id) {
      setLoading(false);
      return;
    }

    const organizationId = currentUser.organization_id;

    // Load templates - FILTERED BY ORGANIZATION
    const { data: templatesData } = await supabase
      .from('signature_templates')
      .select('id, name')
      .eq('organization_id', organizationId)
      .order('name');
    
    if (templatesData) setTemplates(templatesData);

    // Load deployments with template info - FILTERED BY ORGANIZATION
    const { data: deploymentsData } = await supabase
      .from('signature_deployments')
      .select('id, template_id, status, total_users, successful_count, created_at, signature_templates(name)')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });
    
    if (deploymentsData) {
      setDeployments(deploymentsData.map((d: any) => ({
        ...d,
        template_name: d.signature_templates?.name || 'Unknown',
      })));
    }

    // Load employees - FILTERED BY ORGANIZATION
    const { data: employeesData } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, department')
      .eq('organization_id', organizationId)
      .order('email');
    
    if (employeesData) setEmployees(employeesData);

    setLoading(false);
  };

  // Get unique departments
  const departments = useMemo(() => {
    const depts = new Set<string>();
    employees.forEach(e => {
      if (e.department) depts.add(e.department);
    });
    return Array.from(depts).sort();
  }, [employees]);

  // Calculate template usage statistics
  const templateUsage = useMemo(() => {
    const usage = new Map<string, TemplateUsage>();
    
    templates.forEach(t => {
      const templateDeployments = deployments.filter(d => d.template_id === t.id);
      const totalUsers = templateDeployments.reduce((sum, d) => sum + (d.successful_count || 0), 0);
      const lastDeployment = templateDeployments[0];
      
      usage.set(t.id, {
        templateId: t.id,
        templateName: t.name,
        totalDeployments: templateDeployments.length,
        lastDeployedAt: lastDeployment?.created_at || null,
        departments: [], // Would need deployment-level tracking to populate
        userCount: totalUsers,
      });
    });
    
    return usage;
  }, [templates, deployments]);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = searchQuery === '' || 
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDepartment === 'all' || emp.department === selectedDepartment;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchQuery, selectedDepartment]);

  // Group employees by department for display
  const employeesByDepartment = useMemo(() => {
    const grouped = new Map<string, Employee[]>();
    filteredEmployees.forEach(emp => {
      const dept = emp.department || 'No Department';
      if (!grouped.has(dept)) grouped.set(dept, []);
      grouped.get(dept)!.push(emp);
    });
    return grouped;
  }, [filteredEmployees]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/templates">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader
          title="Template Usage"
          description="See which templates are deployed and to whom"
        />
      </div>

      {/* Template Usage Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map(template => {
          const usage = templateUsage.get(template.id);
          return (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
              onClick={() => setSelectedTemplate(selectedTemplate === template.id ? 'all' : template.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileSignature className="h-4 w-4 text-primary" />
                  {template.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <UsersIcon className="h-3 w-3" />
                      {usage?.userCount || 0} users
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3" />
                      {usage?.totalDeployments || 0} deployments
                    </span>
                  </div>
                </div>
                {usage?.lastDeployedAt && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last deployed {new Date(usage.lastDeployedAt).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Employees by Department */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Employees by Department</CardTitle>
              <CardDescription>
                {selectedTemplate !== 'all' 
                  ? `Showing employees - select a department to deploy "${templates.find(t => t.id === selectedTemplate)?.name}"`
                  : 'Select a template above to see deployment options'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              {departments.length > 0 && (
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="text-sm border rounded-lg px-3 py-2 bg-background"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {employeesByDepartment.size === 0 ? (
            <p className="text-center text-muted-foreground py-8">No employees found</p>
          ) : (
            <div className="space-y-6">
              {Array.from(employeesByDepartment.entries()).map(([dept, emps]) => (
                <div key={dept}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {dept}
                      <Badge variant="secondary">{emps.length}</Badge>
                    </h3>
                    {selectedTemplate !== 'all' && (
                      <Link href={`/deployments?template=${selectedTemplate}&department=${encodeURIComponent(dept)}`}>
                        <Button size="sm" variant="outline">
                          Deploy to {dept}
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {emps.slice(0, 6).map(emp => (
                      <div key={emp.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                        <Avatar 
                          alt={`${emp.first_name || ''} ${emp.last_name || ''}`}
                          fallback={`${(emp.first_name?.[0] || emp.email[0]).toUpperCase()}${emp.last_name?.[0]?.toUpperCase() || ''}`}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {emp.first_name && emp.last_name 
                              ? `${emp.first_name} ${emp.last_name}`
                              : emp.email}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{emp.email}</p>
                        </div>
                      </div>
                    ))}
                    {emps.length > 6 && (
                      <div className="flex items-center justify-center p-2 rounded-lg bg-muted text-sm text-muted-foreground">
                        +{emps.length - 6} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
