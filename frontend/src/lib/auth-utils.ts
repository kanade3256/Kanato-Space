const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

/**
 * ユーザーが管理者であるか確認
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmails.includes(email.trim().toLowerCase());
}

/**
 * 管理者メールのリスト
 */
export function getAdminEmails(): string[] {
  return adminEmails;
}
