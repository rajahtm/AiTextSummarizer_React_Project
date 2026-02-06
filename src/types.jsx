// Summary length options
export const SummaryLength = {
  SHORT: "short",
  MEDIUM: "medium",
  LONG: "long",
};

// Summary tone options
export const SummaryTone = {
  PROFESSIONAL: "professional",
  CASUAL: "casual",
  ACADEMIC: "academic",
  CREATIVE: "creative",
};

// Default summary configuration (replacement for interface)
export const defaultSummaryConfig = {
  length: SummaryLength.MEDIUM,
  tone: SummaryTone.PROFESSIONAL,
  includeBulletPoints: true,
};

// Example result structure (for reference / documentation)
export const createSummarizationResult = (
  summary,
  originalWordCount,
  summaryWordCount
) => {
  return {
    summary,
    originalWordCount,
    summaryWordCount,
    timestamp: Date.now(),
  };
};
