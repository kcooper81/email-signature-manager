'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
  Megaphone,
  Image,
  MousePointerClick,
  Link2,
  Target,
  TrendingUp,
  Users,
  Eye,
  Palette,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { AnalyticsData, EmployeeSignatureStatus } from '../types';

interface MarketingTabProps {
  data: AnalyticsData;
  employeeData: EmployeeSignatureStatus[];
}

export function MarketingTab({ data, employeeData }: MarketingTabProps) {
  // Filter marketing department employees
  const marketingEmployees = employeeData.filter(e => 
    e.department.toLowerCase().includes('marketing') || 
    e.department.toLowerCase().includes('brand') ||
    e.department.toLowerCase().includes('communications')
  );
  
  const marketingDeployed = marketingEmployees.filter(e => e.hasSignature).length;
  const marketingTotal = marketingEmployees.length;
  const marketingAdoption = marketingTotal > 0 ? Math.round((marketingDeployed / marketingTotal) * 100) : 0;

  // Calculate brand consistency metrics
  const brandConsistencyScore = data.totalTemplates > 0 
    ? Math.round((data.templatesWithBanners / data.totalTemplates) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Marketing KPIs */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-pink-50 to-white border-pink-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Megaphone className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-700">{marketingAdoption}%</p>
                <p className="text-sm text-muted-foreground">Marketing Team Adoption</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-white border-violet-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Palette className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-violet-700">{brandConsistencyScore}%</p>
                <p className="text-sm text-muted-foreground">Brand Consistency</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Image className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">{data.bannersDeployed}</p>
                <p className="text-sm text-muted-foreground">Campaign Banners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Link2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-700">{data.socialLinksDeployed}</p>
                <p className="text-sm text-muted-foreground">Social Links Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Elements Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-pink-600" />
            Campaign Elements in Signatures
          </CardTitle>
          <CardDescription>
            Track marketing assets deployed across all email signatures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Banners */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Image className="h-4 w-4 text-pink-600" />
                  Promotional Banners
                </h4>
                <Badge variant="outline" className="text-pink-600 border-pink-200">
                  {data.templatesWithBanners} templates
                </Badge>
              </div>
              <p className="text-3xl font-bold text-pink-700">{data.bannersDeployed}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Active banners across signatures
              </p>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  {data.totalTemplates > 0 
                    ? `${Math.round((data.templatesWithBanners / data.totalTemplates) * 100)}% of templates include banners`
                    : 'No templates created yet'}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4 text-violet-600" />
                  Call-to-Action Buttons
                </h4>
              </div>
              <p className="text-3xl font-bold text-violet-700">{data.ctaButtonsDeployed}</p>
              <p className="text-sm text-muted-foreground mt-1">
                CTA buttons driving engagement
              </p>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Avg {data.totalTemplates > 0 ? (data.ctaButtonsDeployed / data.totalTemplates).toFixed(1) : 0} CTAs per template
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-blue-600" />
                  Social Media Links
                </h4>
              </div>
              <p className="text-3xl font-bold text-blue-700">{data.socialLinksDeployed}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Social profile links deployed
              </p>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Avg {data.avgSocialLinksPerSignature} social links per signature
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing Team Signature Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-600" />
                Marketing Team Signature Status
              </CardTitle>
              <CardDescription>
                {marketingDeployed} of {marketingTotal} marketing team members have signatures deployed
              </CardDescription>
            </div>
            {marketingTotal - marketingDeployed > 0 && (
              <Link href="/deployments">
                <Button size="sm">
                  Deploy to {marketingTotal - marketingDeployed} remaining
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {marketingEmployees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Megaphone className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No marketing team members found.</p>
              <p className="text-sm mt-1">Users with "Marketing", "Brand", or "Communications" department will appear here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {marketingEmployees.slice(0, 10).map((employee) => (
                <div 
                  key={employee.email}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    employee.hasSignature ? 'bg-green-50' : 'bg-amber-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${employee.hasSignature ? 'bg-green-500' : 'bg-amber-500'}`} />
                    <div>
                      <p className="font-medium text-sm">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">{employee.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {employee.hasSignature ? (
                      <>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Deployed</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{employee.templateName}</p>
                      </>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 border-amber-200">Pending</Badge>
                    )}
                  </div>
                </div>
              ))}
              {marketingEmployees.length > 10 && (
                <p className="text-center text-sm text-muted-foreground pt-2">
                  +{marketingEmployees.length - 10} more team members
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Brand Reach */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-pink-600" />
            Brand Reach Potential
          </CardTitle>
          <CardDescription>
            Estimated brand impressions through email signatures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold">{data.usersWithSignatures}</p>
              <p className="text-sm text-muted-foreground">Users with Branded Signatures</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold">{data.usersWithSignatures * 40}</p>
              <p className="text-sm text-muted-foreground">Est. Daily Email Impressions</p>
              <p className="text-xs text-muted-foreground">(~40 emails/user/day)</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-3xl font-bold">{(data.usersWithSignatures * 40 * 22).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Est. Monthly Impressions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
