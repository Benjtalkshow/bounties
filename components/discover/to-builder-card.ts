import type { BuilderCardView } from '@/components/cards/types';

import type { BuilderListItem } from './use-builders';

const MAX_SKILLS = 4;

/**
 * Map a `GET /users/directory` row to the builder card view model. The landing
 * mapper (`components/landing/to-builder-card.ts`) fills followers/projects from
 * `TopBuilder`; directory rows carry neither, so those stay undefined and the
 * card simply omits them. `role` on the DTO is the account role, not a job
 * title, so it is not mapped either.
 */
export function toBuilderCard(builder: BuilderListItem): BuilderCardView {
  const username = builder.username ?? builder.id;
  return {
    id: builder.id,
    displayName: builder.name ?? username,
    username,
    avatarSrc: builder.image ?? undefined,
    location: builder.location ?? builder.country ?? undefined,
    skills: builder.skills.slice(0, MAX_SKILLS),
    detailUrl: `/builders/${username}`,
  };
}
