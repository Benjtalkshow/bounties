import type { BuilderCardView } from '@/components/cards/types';

const MAX_SKILLS = 4;

/** One row of `GET /users/top-builders`. */
export interface TopBuilder {
  id: string;
  name: string;
  username: string;
  image: string | null;
  /** Account role ("user"), not a professional title. Not mapped to the card. */
  role: string;
  location: string | null;
  country: string | null;
  skills: string[];
  followers: number;
  projects: number;
}

export function toBuilderCard(builder: TopBuilder): BuilderCardView {
  return {
    id: builder.id,
    displayName: builder.name,
    username: builder.username,
    avatarSrc: builder.image ?? undefined,
    location: builder.location ?? builder.country ?? undefined,
    skills: builder.skills.slice(0, MAX_SKILLS),
    followers: builder.followers,
    projects: builder.projects,
    detailUrl: `/builders/${builder.username}`,
  };
}
