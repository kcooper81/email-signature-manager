/**
 * Brand Governance - Main Entry Point
 */

export { calculateComplianceScore } from './scorer';
export type { BrandGuideline, SignatureData, ScoringResult } from './scorer';
export { runOrgAudit, auditUser } from './auditor';
export type { AuditResult } from './auditor';
export { enforceGuidelines } from './enforcer';
export type { EnforcementResult } from './enforcer';
