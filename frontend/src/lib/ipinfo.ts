import crypto from "crypto";

/**
 * IPアドレスをハッシュ化
 */
export function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

/**
 * プライベートIP / ローカルホストかどうか判定
 */
export function isPrivateIP(ip: string): boolean {
  const privateRanges = [
    /^127\./, // 127.0.0.0/8 (loopback)
    /^10\./, // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[01])\./, // 172.16.0.0/12
    /^192\.168\./, // 192.168.0.0/16
    /^fc/, // IPv6 unique local addresses
    /^fe80/, // IPv6 link-local
    /^::1/, // IPv6 loopback
  ];

  return privateRanges.some((range) => range.test(ip));
}

/**
 * ボット判定（簡易版）
 */
export function isBotUserAgent(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /headless/i,
    /phantom/i,
    /selenium/i,
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
  ];

  return botPatterns.some((pattern) => pattern.test(userAgent));
}

export interface IPInfoData {
  ip: string;
  country: string;
  region: string;
  city: string;
  org: string;
  company?: {
    name: string;
    domain: string;
  };
}

/**
 * IPinfo APIから企業情報を取得
 */
export async function getIPInfo(ip: string): Promise<IPInfoData | null> {
  if (!process.env.IPINFO_TOKEN) {
    console.warn("IPINFO_TOKEN is not set");
    return null;
  }

  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`);

    if (!response.ok) {
      console.error(`IPinfo API error: ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    return {
      ip: data.ip || ip,
      country: data.country || "",
      region: data.region || "",
      city: data.city || "",
      org: data.org || "",
      company: data.company || undefined,
    };
  } catch (error) {
    console.error("Failed to fetch IPinfo:", error);
    return null;
  }
}

/**
 * リクエストからクライアントIPを抽出
 */
export function getClientIP(request: Request): string | null {
  const headers = request.headers;

  // Vercel / Netlify
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  // Cloudflare
  const cfIP = headers.get("cf-connecting-ip");
  if (cfIP) {
    return cfIP;
  }

  // Generic
  const realIP = headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  return null;
}

export interface CompanyAccessData {
  path: string;
  referrer: string | null;
  user_agent: string;
  ip_hash: string;
  company_name: string | null;
  org: string | null;
  asn: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
}

/**
 * IPinfo データを アクセスログ用に変換
 */
export function transformToAccessLog(
  ipinfo: IPInfoData | null,
  path: string,
  referrer: string | null,
  userAgent: string,
  ipHash: string
): CompanyAccessData {
  const org = ipinfo?.org || null;
  // org は "AS12345 CompanyName" の形式なので、ASNと企業名を分離
  const asnMatch = org?.match(/^AS(\d+)/);
  const asn = asnMatch ? `AS${asnMatch[1]}` : null;

  return {
    path,
    referrer,
    user_agent: userAgent,
    ip_hash: ipHash,
    company_name: ipinfo?.company?.name || null,
    org,
    asn,
    country: ipinfo?.country || null,
    region: ipinfo?.region || null,
    city: ipinfo?.city || null,
  };
}
