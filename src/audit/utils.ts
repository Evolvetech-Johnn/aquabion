export interface UserAgentInfo {
  browser?: string;
  operatingSystem?: string;
}

export function parseUserAgent(userAgent?: string): UserAgentInfo {
  if (!userAgent) return {};

  const ua = userAgent.toLowerCase();
  let browser: string | undefined;
  let os: string | undefined;

  // Detect OS
  if (ua.includes("win")) os = "Windows";
  else if (ua.includes("mac")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad")) os = "iOS";

  // Detect Browser
  if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("edg")) browser = "Edge";
  else if (ua.includes("opera") || ua.includes("opr")) browser = "Opera";

  return { browser, operatingSystem: os };
}

export function maskSensitiveData(data: Record<string, any> | null): Record<string, any> | null {
  if (!data) return null;
  const masked = { ...data };
  const sensitiveFields = [
    "password",
    "secret",
    "token",
    "jwt",
    "api_key",
    "apiKey",
    "credit_card",
    "creditCard",
    "cvv",
    "ssn",
    "cpf",
    "cnpj",
    "cookies",
  ];
  for (const key of sensitiveFields) {
    if (masked[key] !== undefined) {
      masked[key] = "***REDACTED***";
    }
  }
  return masked;
}
