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

// --- Goal-Based Presets ---

export interface SEOPreset {
  id: string;
  name: string;
  description: string;
  icon: 'shield' | 'scale' | 'rocket' | 'star';
  /** Partial config overrides — keys not listed use DEFAULT_CONFIG values */
  config: Partial<SEOEngineConfig>;
  /** Auto-run settings applied alongside the config */
  autoRun: {
    enabled: boolean;
    minConfidence: number;
    types: string[];
  };
}

export const SEO_PRESETS: SEOPreset[] = [
  {
    id: 'conservative',
    name: 'Conservative',
    description: 'Protect existing rankings. High confidence thresholds, longer lockout periods, auto-run disabled.',
    icon: 'shield',
    config: {
      changeLockoutDays: 45,
      minPageAgeDays: 42,
      minImpressionsForCTR: 500,
      confidenceMetaTooLong: 0.95,
      confidenceMetaTooShort: 0.90,
      confidenceLowCTR: 0.80,
      confidenceMissingFAQ: 0.85,
      confidenceOpportunityZone: 0.80,
      confidenceHighBounce: 0.80,
      confidenceExpandContent: 0.80,
      confidenceNewPage: 0.75,
      maxExpandContentRecs: 10,
      maxNewPageRecs: 5,
    },
    autoRun: { enabled: false, minConfidence: 0.95, types: [] },
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Standard configuration with sensible defaults. Good starting point for most sites.',
    icon: 'scale',
    config: {}, // All defaults
    autoRun: { enabled: false, minConfidence: 0.80, types: [] },
  },
  {
    id: 'aggressive',
    name: 'Aggressive Growth',
    description: 'Grow quickly with lower thresholds, shorter lockouts, and auto-run enabled for all fixable types.',
    icon: 'rocket',
    config: {
      changeLockoutDays: 14,
      minPageAgeDays: 14,
      minImpressionsForCTR: 50,
      confidenceMetaTooLong: 0.50,
      confidenceMetaTooShort: 0.45,
      confidenceLowCTR: 0.40,
      confidenceMissingFAQ: 0.45,
      confidenceOpportunityZone: 0.40,
      confidenceHighBounce: 0.40,
      confidenceExpandContent: 0.40,
      confidenceNewPage: 0.35,
      maxExpandContentRecs: 50,
      maxNewPageRecs: 25,
      suggestedInternalLinks: 5,
    },
    autoRun: {
      enabled: true,
      minConfidence: 0.50,
      types: ['meta_title', 'meta_description', 'add_faq', 'expand_content'],
    },
  },
  {
    id: 'content-quality',
    name: 'Content Quality',
    description: 'Prioritize content quality. Stricter meta rules, high FAQ confidence, more internal links.',
    icon: 'star',
    config: {
      metaTitleMinLength: 35,
      metaTitleMaxLength: 55,
      metaDescMinLength: 80,
      metaDescMaxLength: 150,
      confidenceMetaTooLong: 0.95,
      confidenceMetaTooShort: 0.90,
      confidenceMissingFAQ: 0.90,
      confidenceExpandContent: 0.75,
      suggestedInternalLinks: 5,
      highBounceThreshold: 0.70,
      highBounceMinSessions: 5,
    },
    autoRun: { enabled: false, minConfidence: 0.85, types: [] },
  },
];

/**
 * Build a full config from a preset by merging its overrides on top of defaults.
 */
export function buildPresetConfig(preset: SEOPreset): SEOEngineConfig {
  return { ...DEFAULT_CONFIG, ...preset.config };
}

/**
 * Detect which preset (if any) matches the current config + auto-run settings.
 * Returns the preset id or null if no preset matches.
 */
export function detectActivePreset(
  currentConfig: SEOEngineConfig,
  autoRunEnabled: boolean,
  autoRunMinConfidence: number,
  autoRunTypes: string[]
): string | null {
  for (const preset of SEO_PRESETS) {
    const fullConfig = buildPresetConfig(preset);
    const configMatches = (Object.keys(DEFAULT_CONFIG) as (keyof SEOEngineConfig)[]).every(
      (key) => currentConfig[key] === fullConfig[key]
    );
    const autoRunMatches =
      preset.autoRun.enabled === autoRunEnabled &&
      Math.abs(preset.autoRun.minConfidence - autoRunMinConfidence) < 0.001 &&
      preset.autoRun.types.length === autoRunTypes.length &&
      preset.autoRun.types.every((t) => autoRunTypes.includes(t));

    if (configMatches && autoRunMatches) return preset.id;
  }
  return null;
}

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
