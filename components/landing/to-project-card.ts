import type {
  OpportunityCardStatus,
  OpportunityCardView,
} from '@/components/cards/types';

export type ProjectPublicStatus =
  | 'LIVE'
  | 'BETA'
  | 'IN_DEVELOPMENT'
  | 'ARCHIVED';

export type ProjectOriginType =
  | 'HACKATHON'
  | 'GRANT'
  | 'BOUNTY'
  | 'CROWDFUNDING'
  | 'MANUAL';

interface ProjectOwnerDto {
  name: string | null;
}

export interface FeaturedProjectDto {
  id: string;
  title: string;
  category: string | null;
  slug: string | null;
  publicStatus: ProjectPublicStatus;
  originType: ProjectOriginType | null;
  isFeatured: boolean;
  teamMembers: unknown[];
  creator: ProjectOwnerDto;
  organization: ProjectOwnerDto | null;
  _count: {
    comments: number;
  };
}

const PROJECT_STATUS: Record<ProjectPublicStatus, OpportunityCardStatus> = {
  LIVE: 'open',
  BETA: 'in_progress',
  IN_DEVELOPMENT: 'in_progress',
  ARCHIVED: 'completed',
};

const ORIGIN_LABEL: Record<ProjectOriginType, string> = {
  HACKATHON: 'Hackathon',
  GRANT: 'Grant',
  BOUNTY: 'Bounty',
  CROWDFUNDING: 'Crowdfunding',
  MANUAL: 'Manual',
};

export function toProjectCard(
  project: FeaturedProjectDto,
  index: number
): OpportunityCardView {
  return {
    id: project.id,
    org: project.organization?.name ?? project.creator?.name ?? '',
    index: index + 1,
    status: PROJECT_STATUS[project.publicStatus],
    title: project.title,
    category: project.category ?? 'Uncategorized',
    participants: project.teamMembers.length + 1,
    mode: project.originType ? ORIGIN_LABEL[project.originType] : '',
    comments: project._count.comments,
    endsIn: '',
    reward: {
      amount: 0,
      currency: '',
    },
    detailUrl: `/projects/${project.slug ?? project.id}`,
    isFeatured: project.isFeatured,
  };
}
