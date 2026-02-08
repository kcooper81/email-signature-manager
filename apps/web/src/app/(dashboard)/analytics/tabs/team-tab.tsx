'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  Search,
  ArrowUpDown,
  UserCheck,
  UserX,
  Mail,
} from 'lucide-react';
import { AnalyticsData, EmployeeSignatureStatus } from '../types';

interface TeamTabProps {
  data: AnalyticsData;
  employeeData: EmployeeSignatureStatus[];
}

type SortField = 'name' | 'department' | 'status' | 'lastDeployed';
type SortDirection = 'asc' | 'desc';

export function TeamTab({ data, employeeData }: TeamTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('status');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'deployed' | 'pending'>('all');

  const getAdoptionColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  // Filter and sort employees
  const filteredEmployees = employeeData
    .filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           emp.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' ||
                           (filterStatus === 'deployed' && emp.hasSignature) ||
                           (filterStatus === 'pending' && !emp.hasSignature);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'department':
          comparison = a.department.localeCompare(b.department);
          break;
        case 'status':
          comparison = (a.hasSignature ? 1 : 0) - (b.hasSignature ? 1 : 0);
          break;
        case 'lastDeployed':
          const aDate = a.lastDeployedAt ? new Date(a.lastDeployedAt).getTime() : 0;
          const bDate = b.lastDeployedAt ? new Date(b.lastDeployedAt).getTime() : 0;
          comparison = aDate - bDate;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const deployedCount = employeeData.filter(e => e.hasSignature).length;
  const pendingCount = employeeData.filter(e => !e.hasSignature).length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Users className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{deployedCount}</p>
                <p className="text-sm text-muted-foreground">With Signatures</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <UserX className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending Deployment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-violet-600" />
            Adoption by Department
          </CardTitle>
          <CardDescription>
            Signature coverage across your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.departmentStats.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No department data available. Sync users to see breakdown.
            </p>
          ) : (
            <div className="space-y-4">
              {data.departmentStats.map((dept) => (
                <div key={dept.department}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium truncate">{dept.department}</span>
                    <span className="text-muted-foreground">{dept.deployedUsers}/{dept.totalUsers} ({dept.adoptionRate}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${getAdoptionColor(dept.adoptionRate)}`}
                      style={{ width: `${dept.adoptionRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Employee-Level Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-violet-600" />
                Employee Signature Status
              </CardTitle>
              <CardDescription>
                Individual team member signature deployment status
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4">
            {(['all', 'deployed', 'pending'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  filterStatus === status
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {status === 'all' ? 'All' : status === 'deployed' ? 'Deployed' : 'Pending'}
                <span className="ml-1.5 text-xs">
                  ({status === 'all' ? employeeData.length : status === 'deployed' ? deployedCount : pendingCount})
                </span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {filteredEmployees.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No employees found matching your criteria.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">
                      <button 
                        onClick={() => toggleSort('name')}
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Name
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-2 hidden sm:table-cell">
                      <button 
                        onClick={() => toggleSort('department')}
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Department
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-2">
                      <button 
                        onClick={() => toggleSort('status')}
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Status
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-2 hidden md:table-cell">Template</th>
                    <th className="text-left py-3 px-2 hidden lg:table-cell">
                      <button 
                        onClick={() => toggleSort('lastDeployed')}
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Last Deployed
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.slice(0, 50).map((employee) => (
                    <tr key={employee.email} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-sm">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2 hidden sm:table-cell">
                        <span className="text-sm">{employee.department}</span>
                      </td>
                      <td className="py-3 px-2">
                        {employee.hasSignature ? (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Deployed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-600 border-amber-200">
                            <XCircle className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {employee.templateName || '—'}
                        </span>
                      </td>
                      <td className="py-3 px-2 hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {employee.lastDeployedAt 
                            ? new Date(employee.lastDeployedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredEmployees.length > 50 && (
                <p className="text-center text-sm text-muted-foreground py-4">
                  Showing 50 of {filteredEmployees.length} employees
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
