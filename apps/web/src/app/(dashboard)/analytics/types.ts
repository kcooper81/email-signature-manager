export interface TemplatePerformance {
  id: string;
  name: string;
  deploymentCount: number;
  usersDeployed: number;
  successRate: number;
  lastDeployed: string | null;
}

export interface DepartmentStats {
  department: string;
  totalUsers: number;
  deployedUsers: number;
  adoptionRate: number;
}

export interface EmployeeSignatureStatus {
  email: string;
  name: string;
  department: string;
  hasSignature: boolean;
  templateName: string | null;
  lastDeployedAt: string | null;
}

export interface AnalyticsData {
  // Core metrics
  totalUsers: number;
  totalTemplates: number;
  totalDeployments: number;
  successfulDeployments: number;
  failedDeployments: number;
  
  // Adoption metrics
  usersWithSignatures: number;
  adoptionRate: number;
  
  // Comparison metrics (vs previous period)
  deploymentsChange: number;
  adoptionChange: number;
  
  // Template performance
  templatePerformance: TemplatePerformance[];
  topTemplate: TemplatePerformance | null;
  
  // Department breakdown
  departmentStats: DepartmentStats[];
  
  // Recent activity
  recentDeployments: {
    id: string;
    status: string;
    total_users: number;
    successful_count: number;
    failed_count: number;
    created_at: string;
    template: { name: string } | null;
  }[];
  
  // Trends
  deploymentsByDay: { date: string; count: number; users: number }[];
  
  // Health indicators
  healthScore: number;
  complianceIssues: number;
  pendingDeployments: number;
  
  // IT-focused metrics
  syncStatus: {
    google: { connected: boolean; lastSync: string | null; userCount: number };
    microsoft: { connected: boolean; lastSync: string | null; userCount: number };
  };
  errorRate: number;
  avgDeploymentTime: number;
  failedDeploymentReasons: { reason: string; count: number }[];
  
  // HR-focused metrics
  newUsersThisPeriod: number;
  usersWithoutSignatures: number;
  departmentCoverage: number;
  onboardingPending: number;
  
  // Marketing-focused metrics
  bannersDeployed: number;
  ctaButtonsDeployed: number;
  socialLinksDeployed: number;
  templatesWithBanners: number;
  avgSocialLinksPerSignature: number;
}
