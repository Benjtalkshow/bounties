/**
 * View models for the project / opportunity cards. These are presentation
 * types: the display app receives already-shaped data (built in the main
 * Boundless app / backend) and renders it. Keep them free of API-schema
 * imports so the cards stay portable.
 */

export type OpportunityCardStatus =
  | 'open'
  | 'applications'
  | 'in_progress'
  | 'review'
  | 'completed';

export interface OpportunityCardView {
  id: string;
  org: string;
  /** Display number rendered as `#42` next to the org. Pillar-local sequence. */
  index: number;
  status: OpportunityCardStatus;
  title: string;
  category: string;
  participants: number;
  /** Sub-mode label or pillar name. Empty string when nothing better is available. */
  mode: string;
  comments: number;
  /** Pre-formatted countdown like `4D:22H:49M`, or an empty string when no deadline. */
  endsIn: string;
  reward: { amount: number; currency: string };
  /** Detail page path so cards can link out. */
  detailUrl: string;
  isFeatured: boolean;
}
