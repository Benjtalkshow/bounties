/**
 * Derive up-to-two-letter initials from a display name, falling back to the
 * Boundless "B" for empty names. Single home for the rule previously copied in
 * the discover org avatar, the bounty card mapper, and the detail org row.
 */
export function deriveInitials(name: string): string {
  const parts = name
    .split(/\s+/)
    .map(token => token.trim())
    .filter(Boolean);
  if (parts.length === 0) return 'B';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
