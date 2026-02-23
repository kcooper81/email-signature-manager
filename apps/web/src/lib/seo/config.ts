/**
 * SEO Engine Configuration — all algorithm parameters with sensible defaults.
 * The DB stores overrides in a single JSONB column; this module merges them.
 */

export interface SEOEngineConfig {
  // --- Data Maturity ---
  minPageAgeDays: number;
  minImpressionsForCTR: number;
  comparisonWindowDays: number;
  changeLockoutDays: number;
  positionFluctuationTolerance: number;
  recentSnapshotDays: number;

  // --- Issue Detection ---
  lowCTRThreshold: number;
  lowCTRMaxPosition: number;
  trafficDeclineMedium: number;
  trafficDeclineHigh: number;
  opportunityZoneMinPosition: number;
  opportunityZoneMaxPosition: number;
  opportunityZoneMinImpressions: number;
  highBounceThreshold: number;
  highBounceMinSessions: number;
  metaTitleMinLength: number;
  metaTitleMaxLength: number;
  metaDescMinLength: number;
  metaDescMaxLength: number;
  contentGapMaxPosition: number;
  competitorTopPosition: number;
  outrankedMinPosition: number;
  outrankedMaxPosition: number;
  outrankedByPosition: number;

  // --- Recommendation Confidence ---
  confidenceMetaTooLong: number;
  confidenceMetaTooShort: number;
  confidenceLowCTR: number;
  confidenceMissingFAQ: number;
  confidenceOpportunityZone: number;
  confidenceHighBounce: number;
  confidenceExpandContent: number;
  confidenceNewPage: number;

  // --- Data Collection ---
  dataCollectionWindowDays: number;
  topQueriesPerPage: number;
  snapshotBatchSize: number;
  maxSnapshotsForAnalysis: number;
  highVolumeThreshold: number;
  mediumVolumeThreshold: number;
  serpRateLimitMs: number;

  // --- Optimizer Limits ---
  maxExpandContentRecs: number;
  maxNewPageRecs: number;
  suggestedInternalLinks: number;

  // --- Cache ---
  overrideCacheTTLMinutes: number;
}

export const DEFAULT_CONFIG: SEOEngineConfig = {
  // Data Maturity
  minPageAgeDays: 28,
  minImpressionsForCTR: 200,
  comparisonWindowDays: 28,
  changeLockoutDays: 28,
  positionFluctuationTolerance: 3,
  recentSnapshotDays: 7,

  // Issue Detection
  lowCTRThreshold: 0.02,
  lowCTRMaxPosition: 10,
  trafficDeclineMedium: 0.30,
  trafficDeclineHigh: 0.50,
  opportunityZoneMinPosition: 5,
  opportunityZoneMaxPosition: 20,
  opportunityZoneMinImpressions: 50,
  highBounceThreshold: 0.80,
  highBounceMinSessions: 10,
  metaTitleMinLength: 30,
  metaTitleMaxLength: 60,
  metaDescMinLength: 70,
  metaDescMaxLength: 160,
  contentGapMaxPosition: 20,
  competitorTopPosition: 5,
  outrankedMinPosition: 5,
  outrankedMaxPosition: 20,
  outrankedByPosition: 3,

  // Recommendation Confidence
  confidenceMetaTooLong: 0.90,
  confidenceMetaTooShort: 0.85,
  confidenceLowCTR: 0.60,
  confidenceMissingFAQ: 0.70,
  confidenceOpportunityZone: 0.65,
  confidenceHighBounce: 0.60,
  confidenceExpandContent: 0.60,
  confidenceNewPage: 0.50,

  // Data Collection
  dataCollectionWindowDays: 30,
  topQueriesPerPage: 20,
  snapshotBatchSize: 50,
  maxSnapshotsForAnalysis: 500,
  highVolumeThreshold: 1000,
  mediumVolumeThreshold: 200,
  serpRateLimitMs: 250,

  // Optimizer Limits
  maxExpandContentRecs: 20,
  maxNewPageRecs: 10,
  suggestedInternalLinks: 3,

  // Cache
  overrideCacheTTLMinutes: 5,
};

/**
 * Merge DB-stored overrides over code defaults.
 * Only known keys are merged; unknown keys in dbConfig are ignored.
 */
export function mergeConfig(dbConfig: Record<string, unknown> | null | undefined): SEOEngineConfig {
  if (!dbConfig || typeof dbConfig !== 'object') return { ...DEFAULT_CONFIG };

  const merged = { ...DEFAULT_CONFIG };
  for (const key of Object.keys(DEFAULT_CONFIG) as (keyof SEOEngineConfig)[]) {
    if (key in dbConfig && typeof dbConfig[key] === 'number') {
      (merged as any)[key] = dbConfig[key];
    }
  }
  return merged;
}
