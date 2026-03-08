export const BUY_PLATFORMS = [
  "instagram",
  "threads",
  "facebook",
  "tiktok",
  "x",
  "reddit",
  "snapchat",
  "gmail",
] as const

export type BuyPlatform = (typeof BUY_PLATFORMS)[number]

export const BUY_YEARS = Array.from({ length: 2026 - 2010 + 1 }, (_, i) => String(2010 + i))

export const BUY_PLATFORM_YEARS: Record<BuyPlatform, readonly string[]> = {
  instagram: BUY_YEARS,
  threads: BUY_YEARS.filter((year) => Number(year) >= 2023),
  facebook: BUY_YEARS,
  tiktok: BUY_YEARS.filter((year) => Number(year) >= 2018),
  x: BUY_YEARS.filter((year) => Number(year) >= 2012),
  reddit: BUY_YEARS.filter((year) => Number(year) >= 2012),
  snapchat: BUY_YEARS.filter((year) => Number(year) >= 2015),
  gmail: BUY_YEARS,
}

export const INVENTORY_REFRESH_ISO = "2026-03-06T00:00:00.000Z"

interface PlatformConfig {
  displayLabel: string
  metaLabel: string
  primaryIntent: string
  warmupAngle: string
  trustEdge: string
  handoffFocus: string
  modifiedAtISO: string
}

const PLATFORM_CONFIGS: Record<BuyPlatform, PlatformConfig> = {
  instagram: {
    displayLabel: "Instagram",
    metaLabel: "Instagram",
    primaryIntent: "outreach and profile scaling",
    warmupAngle: "stabilize warm-up velocity across DMs and content",
    trustEdge: "legacy profile history that lowers early risk flags",
    handoffFocus: "lock device, proxy, and recovery changes in one controlled session",
    modifiedAtISO: INVENTORY_REFRESH_ISO,
  },
  threads: {
    displayLabel: "Threads",
    metaLabel: "Threads",
    primaryIntent: "discussion reach and creator growth",
    warmupAngle: "launch with safer first-week posting cadence",
    trustEdge: "IG-linked reputation that improves discovery confidence",
    handoffFocus: "keep identity signals aligned with the paired Instagram asset",
    modifiedAtISO: INVENTORY_REFRESH_ISO,
  },
  facebook: {
    displayLabel: "Facebook",
    metaLabel: "Facebook",
    primaryIntent: "marketplace and ads reliability",
    warmupAngle: "avoid restriction loops on early actions",
    trustEdge: "older account trails that improve policy tolerance",
    handoffFocus: "finish security changes before any ad or Marketplace actions",
    modifiedAtISO: INVENTORY_REFRESH_ISO,
  },
  tiktok: {
    displayLabel: "TikTok",
    metaLabel: "TikTok",
    primaryIntent: "creator growth and viral testing",
    warmupAngle: "reduce sandbox behavior on new sessions",
    trustEdge: "aged watch-history footprints that raise trust",
    handoffFocus: "keep early posting cadence stable before scaling volume",
    modifiedAtISO: INVENTORY_REFRESH_ISO,
  },
  x: {
    displayLabel: "X/Twitter",
    metaLabel: "X",
    primaryIntent: "DM outreach and authority posting",
    warmupAngle: "control send-volume and avoid trust decay",
    trustEdge: "older interaction history for safer outreach volume",
    handoffFocus: "stage DM volume across multiple days to preserve trust",
    modifiedAtISO: INVENTORY_REFRESH_ISO,
  },
  reddit: {
    displayLabel: "Reddit",
    metaLabel: "Reddit",
    primaryIntent: "community seeding and traffic capture",
    warmupAngle: "pass subreddit thresholds with less friction",
    trustEdge: "older karma and activity patterns for faster acceptance",
    handoffFocus: "mirror subreddit behavior norms before link-oriented activity",
    modifiedAtISO: INVENTORY_REFRESH_ISO,
  },
  snapchat: {
    displayLabel: "Snapchat",
    metaLabel: "Snapchat",
    primaryIntent: "story distribution and influencer workflows",
    warmupAngle: "maintain session stability in the first 72 hours",
    trustEdge: "aged score history that helps behavioral consistency",
    handoffFocus: "stagger first-week story and outreach actions to avoid spikes",
    modifiedAtISO: INVENTORY_REFRESH_ISO,
  },
  gmail: {
    displayLabel: "Gmail",
    metaLabel: "Gmail",
    primaryIntent: "email infrastructure and account recovery",
    warmupAngle: "protect sender reputation from day one",
    trustEdge: "older mailbox reputation for cleaner deliverability",
    handoffFocus: "secure recovery channels and sender posture before scaling usage",
    modifiedAtISO: INVENTORY_REFRESH_ISO,
  },
}

const PLATFORM_RELATED_GUIDES: Record<BuyPlatform, { title: string; slug: string }[]> = {
  instagram: [
    { title: "The 2026 OFM Survival Guide", slug: "ofm-survival-guide-2026" },
    { title: "OGE vs. Non-OGE: Security Math", slug: "oge-security-math" },
    { title: "The 24-Hour Warmup Rule", slug: "warmup-rule-2026" },
  ],
  threads: [
    { title: "Scaling AI-Influencers on Threads", slug: "threads-ai-influencer" },
    { title: "Threads DM Automation Protocols", slug: "threads-dm-automation" },
    { title: "Threads vs. X: Which Converts Better?", slug: "threads-vs-x-ofm" },
  ],
  facebook: [
    { title: "OGE Security Mastery", slug: "oge-security-mastery" },
    { title: "The 24-Hour Warmup Rule", slug: "warmup-rule-2026" },
  ],
  tiktok: [
    { title: "The 24-Hour Warmup Rule", slug: "warmup-rule-2026" },
    { title: "Proxy Selection Guide", slug: "proxy-selection-2012" },
  ],
  x: [
    { title: "Threads vs. X: Which Converts Better?", slug: "threads-vs-x-ofm" },
    { title: "Shadowban Recovery Guide", slug: "shadowban-recovery-guide" },
  ],
  reddit: [
    { title: "Proxy Selection Guide", slug: "proxy-selection-2012" },
    { title: "OGE Security Mastery", slug: "oge-security-mastery" },
  ],
  snapchat: [
    { title: "The 24-Hour Warmup Rule", slug: "warmup-rule-2026" },
  ],
  gmail: [
    { title: "2FA Best Practices", slug: "2fa-best-practices-professional" },
    { title: "OGE Security Mastery", slug: "oge-security-mastery" },
  ],
}

interface YearSignal {
  trustSignal: string
  marketSignal: string
  riskControl: string
}

const YEAR_SIGNALS: Record<string, YearSignal> = {
  "2010": {
    trustSignal: "legacy behavior from the pre-ML moderation era",
    marketSignal: "strongest long-tail trust profile for conservative scaling",
    riskControl: "best suited for strict proxy consistency and low-noise sessions",
  },
  "2011": {
    trustSignal: "long device-age footprints with mature recovery trails",
    marketSignal: "high credibility for premium outreach stacks",
    riskControl: "works best with fixed browser profiles and staged logins",
  },
  "2012": {
    trustSignal: "one of the most stable trust vintages for social infrastructure",
    marketSignal: "often used for mother-account strategies in scaled systems",
    riskControl: "supports higher action ceilings when warm-up is respected",
  },
  "2013": {
    trustSignal: "older interaction graphs that still map to human-like behavior",
    marketSignal: "balanced trust and cost for agency buying",
    riskControl: "responds well to gradual first-week action ramps",
  },
  "2014": {
    trustSignal: "longstanding trust trails with broad historical activity windows",
    marketSignal: "strong conversion vintage for DM-driven funnels",
    riskControl: "benefits from conservative timezone and locale matching",
  },
  "2015": {
    trustSignal: "mature identity history with reliable session continuity",
    marketSignal: "popular baseline for medium-to-high velocity teams",
    riskControl: "stable when mobile proxy residency remains unchanged",
  },
  "2016": {
    trustSignal: "aged metadata that still outperforms fresh registrations",
    marketSignal: "good blend of availability and trust depth",
    riskControl: "requires predictable warm-up blocks for best survival",
  },
  "2017": {
    trustSignal: "solid mid-legacy footprint with lower onboarding friction",
    marketSignal: "cost-efficient choice for multi-account pilots",
    riskControl: "best results with strict action pacing on day 1-3",
  },
  "2018": {
    trustSignal: "aged-but-flexible profile history for modern workflows",
    marketSignal: "common for creator and affiliate test funnels",
    riskControl: "keeps stability when device fingerprints remain fixed",
  },
  "2019": {
    trustSignal: "consistent historical activity with practical trust carryover",
    marketSignal: "good entry vintage for teams scaling from zero",
    riskControl: "works best with staggered session start windows",
  },
  "2020": {
    trustSignal: "pandemic-era activity windows that still signal account maturity",
    marketSignal: "high stock vintage for fast operational deployment",
    riskControl: "needs tighter cooldown control on outreach loops",
  },
  "2021": {
    trustSignal: "post-legacy trust profile with strong recovery usability",
    marketSignal: "balanced option for mixed content and outreach teams",
    riskControl: "maintains stability with low-variance geolocation settings",
  },
  "2022": {
    trustSignal: "younger aged footprint with measurable trust advantage over fresh",
    marketSignal: "frequent choice for aggressive testing environments",
    riskControl: "requires cleaner action spacing to avoid velocity alerts",
  },
  "2023": {
    trustSignal: "early-modern account history that beats brand-new account trust",
    marketSignal: "supports fast launches with lower acquisition cost",
    riskControl: "depends on disciplined first-week behavior constraints",
  },
  "2024": {
    trustSignal: "recent aged trail that still improves initial platform confidence",
    marketSignal: "useful for high-volume inventory strategies",
    riskControl: "needs clear proxy hygiene to preserve longevity",
  },
  "2025": {
    trustSignal: "near-current age with cleaner ownership transfer paths",
    marketSignal: "best for teams prioritizing quantity plus baseline trust",
    riskControl: "requires strict session order and anti-detect discipline",
  },
  "2026": {
    trustSignal: "fresh-vintage history with managed trust uplift versus new signups",
    marketSignal: "built for rapid deployment while retaining safer setup posture",
    riskControl: "must follow hard warm-up limits before scaling actions",
  },
}

const PLATFORM_KEY_POINTS: Record<BuyPlatform, string[]> = {
  instagram: [
    "Supports DM and profile activity with better early-session tolerance.",
    "Works well for OFM, creator growth, and authority account stacks.",
    "Pairs cleanly with 2FA workflow and OGE transfer validation.",
    "Improves day-1 survivability when warm-up policy is respected.",
  ],
  threads: [
    "Best paired with IG-linked identity for stronger discovery confidence.",
    "Useful for conversational reach and creator funnel testing.",
    "Safer launch profile than fresh registrations in early outreach phases.",
    "Built for consistent posting cadence across first-week deployment.",
  ],
  facebook: [
    "Stronger starting point for Marketplace and ad-adjacent workflows.",
    "Helps reduce first-session trust friction on older account vintages.",
    "Useful for agencies running multi-account local demand tests.",
    "Supports cleaner access continuity with OGE-backed transfer steps.",
  ],
  tiktok: [
    "Improves setup reliability for creator growth and trend testing.",
    "Gives more stable baseline than brand-new creator accounts.",
    "Supports regional launch plans with lower early-action friction.",
    "Useful for teams running short-cycle campaign experiments.",
  ],
  x: [
    "Better suited for outreach-heavy DM workflows than fresh signups.",
    "Supports stable posting and response loops for authority pages.",
    "Useful for affiliate and traffic-routing operations at scale.",
    "Helps reduce trust decay from sudden send-volume spikes.",
  ],
  reddit: [
    "Improves early participation reliability across stricter communities.",
    "Useful for content seeding and discussion-led traffic capture.",
    "Supports safer entry into subreddits with age and history requirements.",
    "Works best with context-relevant posting and reply cadence.",
  ],
  snapchat: [
    "Helps maintain cleaner story distribution in first-week sessions.",
    "Useful for influencer-style content loops and daily posting tests.",
    "Supports launch consistency with stable device and proxy pairing.",
    "Better baseline for rapid campaign setup than brand-new profiles.",
  ],
  gmail: [
    "Supports account-recovery operations with stronger mailbox trust.",
    "Useful for safer social account onboarding and password resets.",
    "Improves sender reputation baseline for operational mail flows.",
    "Works well as backbone inventory for larger account stacks.",
  ],
}

export interface BuyYearSeoProfile {
  platform: BuyPlatform
  platformSlug: BuyPlatform
  platformLabel: string
  year: string
  keywordFocus: string
  introVariant: string
  keyPoints: string[]
  trustSignal: string
  marketSignal: string
  riskControl: string
  operationalChecklist: string[]
  buyerFitNotes: string[]
  migrationNotes: string[]
  adjacentYears: {
    year: string
    href: string
    label: string
  }[]
  relatedGuides: {
    title: string
    slug: string
  }[]
  modifiedAtISO: string
  metaTitle: string
  metaDescription: string
  h1: string
}

const YEAR_OVERRIDES: Record<string, Partial<BuyYearSeoProfile>> = {
  "instagram-2026": {
    metaTitle: "Instagram Aged Accounts 2026 | OGE + 2FA Ready",
    metaDescription:
      "Buy aged Instagram accounts from 2026 with OGE and 2FA. Built for safer warm-up, cleaner launches, and fast Telegram delivery for agencies.",
    introVariant:
      "Instagram aged accounts from 2026 give you a safer launch layer than brand-new registrations, especially when your workflow depends on outreach consistency. This vintage is ideal for teams that need quick deployment without sacrificing operational safety. With OGE transfer discipline, strict warm-up, and clean proxy pairing, 2026 inventory can scale predictably for creator, OFM, and growth operations.",
    keyPoints: [
      "2026 vintage improves launch reliability versus same-week new registrations.",
      "Best fit for teams that want quick deployment with controlled risk.",
      "OGE + 2FA workflow keeps ownership and access transitions cleaner.",
      "Use conservative first-week velocity to preserve long-term stability.",
    ],
  },
  "instagram-2012": {
    metaTitle: "Instagram Aged Accounts 2012 | High-Trust OGE",
    metaDescription:
      "Buy aged Instagram 2012 accounts with deep trust history, OGE, and 2FA. Ideal for DM outreach, OFM funnels, and scale-ready operations.",
    introVariant:
      "Instagram 2012 inventory remains one of the strongest trust vintages for agencies that need durable outreach performance. These accounts carry deep historical footprints that can reduce early moderation pressure when setup is clean. For operators running OFM funnels or large creator stacks, 2012 assets are commonly used as anchor profiles because they balance survivability, trust, and long-run control.",
    keyPoints: [
      "2012 is a high-trust vintage often used for anchor account strategy.",
      "Performs well for outreach-heavy operations when proxy hygiene is strict.",
      "OGE recovery paths add stronger long-term control of ownership.",
      "A staged warm-up keeps this vintage stable under scaling pressure.",
    ],
  },
}

function normalizePlatform(input: string): BuyPlatform | null {
  const lowered = input.toLowerCase()
  return BUY_PLATFORMS.includes(lowered as BuyPlatform) ? (lowered as BuyPlatform) : null
}

function normalizeYear(input: string): string | null {
  return BUY_YEARS.includes(input) ? input : null
}

function buildTitle(platformLabel: string, year: string): string {
  const candidate = `${platformLabel} Aged Accounts ${year} | OGE + 2FA Ready`
  if (candidate.length <= 60) {
    return candidate
  }

  return `${platformLabel} Aged ${year} | OGE + 2FA`
}

function buildDescription(platformLabel: string, year: string): string {
  return `Buy aged ${platformLabel.toLowerCase()} accounts from ${year} with OGE and 2FA. Trusted inventory for agencies and creators with fast Telegram delivery.`
}

export function isValidBuyPlatform(platform: string): platform is BuyPlatform {
  return normalizePlatform(platform) !== null
}

export function isValidBuyYear(year: string): boolean {
  return normalizeYear(year) !== null
}

export function getBuyPlatformDisplayLabel(platformInput: string): string | null {
  const platform = normalizePlatform(platformInput)
  if (!platform) return null
  return PLATFORM_CONFIGS[platform].displayLabel
}

export function getBuyPlatformModifiedAtISO(platformInput: string): string | null {
  const platform = normalizePlatform(platformInput)
  if (!platform) return null
  return PLATFORM_CONFIGS[platform].modifiedAtISO
}

export function getValidBuyYearsForPlatform(platformInput: string): readonly string[] | null {
  const platform = normalizePlatform(platformInput)
  if (!platform) return null
  return BUY_PLATFORM_YEARS[platform]
}

export function isValidBuyPlatformYear(platformInput: string, yearInput: string): boolean {
  const years = getValidBuyYearsForPlatform(platformInput)
  return years ? years.includes(yearInput) : false
}

export function getBuyYearSeoProfile(platformInput: string, yearInput: string): BuyYearSeoProfile | null {
  const platform = normalizePlatform(platformInput)
  const year = normalizeYear(yearInput)

  if (!platform || !year) {
    return null
  }

  if (!BUY_PLATFORM_YEARS[platform].includes(year)) {
    return null
  }

  const platformConfig = PLATFORM_CONFIGS[platform]
  const yearSignal = YEAR_SIGNALS[year]
  const yearIndex = Number(year) - 2010
  const keyPointPool = PLATFORM_KEY_POINTS[platform]
  const firstPoint = keyPointPool[yearIndex % keyPointPool.length]
  const secondPoint = keyPointPool[(yearIndex + 1) % keyPointPool.length]
  const validPlatformYears = BUY_PLATFORM_YEARS[platform]
  const yearPosition = validPlatformYears.indexOf(year)

  const adjacentYears = [-1, 1]
    .map((offset) => validPlatformYears[yearPosition + offset])
    .filter((candidate): candidate is string => Boolean(candidate))
    .map((adjacentYear) => ({
      year: adjacentYear,
      href: `/buy/${platform}/${adjacentYear}`,
      label: YEAR_SIGNALS[adjacentYear].marketSignal,
    }))

  const introTemplates = [
    `Aged ${platformConfig.metaLabel} accounts from ${year} still carry ${yearSignal.trustSignal}. For teams focused on ${platformConfig.primaryIntent}, this vintage offers ${platformConfig.trustEdge}. ${yearSignal.marketSignal}, and the safest path is to ${platformConfig.warmupAngle}.`,
    `If your stack depends on ${platformConfig.primaryIntent}, ${year} ${platformConfig.metaLabel} inventory gives a practical trust advantage over fresh registrations. The account profile keeps ${yearSignal.trustSignal}, which supports cleaner rollout quality. ${yearSignal.riskControl}.`,
    `${year} ${platformConfig.metaLabel} accounts are a strong choice for operations that need predictable setup quality. Compared with new signups, they retain ${yearSignal.trustSignal} and fit teams that need ${platformConfig.primaryIntent}. ${yearSignal.marketSignal}.`,
  ]

  const profile: BuyYearSeoProfile = {
    platform,
    platformSlug: platform,
    platformLabel: platformConfig.displayLabel,
    year,
    keywordFocus: `buy aged ${platformConfig.metaLabel.toLowerCase()} accounts ${year}`,
    introVariant: introTemplates[yearIndex % introTemplates.length],
    keyPoints: [
      `${yearSignal.marketSignal}.`,
      `${yearSignal.riskControl}.`,
      firstPoint,
      secondPoint,
    ],
    trustSignal: yearSignal.trustSignal,
    marketSignal: yearSignal.marketSignal,
    riskControl: yearSignal.riskControl,
    operationalChecklist: [
      `Run ownership handoff in one clean pass: ${platformConfig.handoffFocus}.`,
      `During the first week, ${platformConfig.warmupAngle} and avoid abrupt action spikes.`,
      `Keep login geography and session rhythm consistent to preserve ${yearSignal.trustSignal}.`,
    ],
    buyerFitNotes: [
      `In market terms, this vintage is ${yearSignal.marketSignal} and a practical fit for teams focused on ${platformConfig.primaryIntent}.`,
      `This vintage works best when you need ${platformConfig.trustEdge} instead of raw day-one volume.`,
      `Compared with fresh signups, ${year} inventory gives more predictable rollout quality when controls are respected.`,
    ],
    migrationNotes: [
      `Before scale, rotate recovery credentials and verify 2FA ownership with test sign-ins.`,
      `Map account behavior to your production workflow gradually instead of switching to full velocity on day one.`,
      `Document proxy, device, and timezone settings for repeatability across all accounts in this vintage.`,
    ],
    adjacentYears,
    relatedGuides: PLATFORM_RELATED_GUIDES[platform],
    modifiedAtISO: platformConfig.modifiedAtISO,
    metaTitle: buildTitle(platformConfig.metaLabel, year),
    metaDescription: buildDescription(platformConfig.metaLabel, year),
    h1: `Buy Aged ${platformConfig.displayLabel} Accounts from ${year}`,
  }

  const overrideKey = `${platform}-${year}`
  const override = YEAR_OVERRIDES[overrideKey]

  return override ? { ...profile, ...override } : profile
}
