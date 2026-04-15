/**
 * API Configuration
 * Centralized API endpoint configuration for frontend
 */

// API Base URL - supports:
// 1) window.__API_BASE_URL
// 2) <meta name="api-base-url" content="https://api.example.com">
// 3) localhost fallback for local split setup
// 4) same-origin default for reverse-proxy/single-domain setup
function normalizeAndValidateUrl(value) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

function resolveApiBaseUrl() {
  const runtimeConfig = window.__API_BASE_URL;
  if (runtimeConfig && typeof runtimeConfig === 'string') {
    const safeRuntimeUrl = normalizeAndValidateUrl(runtimeConfig.trim());
    if (safeRuntimeUrl) {
      return safeRuntimeUrl;
    }
  }

  const metaTag = document.querySelector('meta[name="api-base-url"]');
  if (metaTag && metaTag.tagName === 'META' && metaTag.content) {
    const safeMetaUrl = normalizeAndValidateUrl(metaTag.content.trim());
    if (safeMetaUrl) {
      return safeMetaUrl;
    }
  }

  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  return window.location.origin;
}

const API_BASE_URL = resolveApiBaseUrl();

// API Endpoints
const API = {
  // Survey endpoints
  SUBMIT_SURVEY: `${API_BASE_URL}/api/survey/submit`,
  GET_SURVEY: (surveyId) => `${API_BASE_URL}/api/survey/${surveyId}`,
  
  // Results endpoints
  GET_RESULTS: (resultId) => `${API_BASE_URL}/api/results/${resultId}`,
  
  // Myths endpoints
  GET_MYTHS: `${API_BASE_URL}/api/myths`,
  GET_MYTH: (mythId) => `${API_BASE_URL}/api/myths/${mythId}`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API;
}
