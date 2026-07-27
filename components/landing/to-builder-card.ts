import type { BuilderCardView } from '@/components/cards/types';

const MAX_SKILLS = 4;

export interface LeaderboardStats {
  totalCompleted: number;
  totalWins: number;
  totalEarnings: number;
  earningsCurrency: string;
  totalEarningsUsdc: number;
  completionRate: number;
  averageCompletionTime: number;
  currentStreak: number;
  longestStreak: number;
}

export interface LeaderboardContributor {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  totalScore: number;
  tier: string;
  stats: LeaderboardStats;
  topTags: string[];
  lastActiveAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  contributor: LeaderboardContributor;
}

export interface LeaderboardData {
  entries: LeaderboardEntry[];
  totalCount: number;
  lastUpdatedAt: string;
}

export function toBuilderCard({
  contributor,
}: LeaderboardEntry): BuilderCardView {
  return {
    id: contributor.id,
    displayName: contributor.displayName,
    username: contributor.username,
    avatarSrc: contributor.avatarUrl ?? undefined,
    skills: contributor.topTags.slice(0, MAX_SKILLS),
    detailUrl: `/builders/${contributor.username}`,
  };
}
