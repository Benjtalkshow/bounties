/**
 * Response shapes for the boundless-nestjs public read API. Every response is
 * wrapped in `{ success, message, data, meta }`. `apiFetch` strips that outer
 * envelope, so callers see `Paginated<T>` for lists and the plain resource type
 * for single reads.
 */

import type { components, paths } from './generated/schema';

export type { components, paths };

/**
 * Every named schema (DTO) from the backend OpenAPI document. Derive resource
 * types from here rather than hand-writing them, e.g.
 * `type BuilderListItem = Schemas['UserDirectoryItemDto']`. Regenerate with
 * `npm run codegen` (live backend) or `npm run codegen:snapshot` (committed doc).
 */
export type Schemas = components['schemas'];

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Paginated<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface ResponseMeta {
  timestamp: string;
  requestId: string;
}

export interface ApiEnvelope<T> {
  success: true;
  message: string;
  data: T;
  meta: ResponseMeta;
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorEnvelope {
  success: false;
  /** A list of strings when request validation rejects several rules at once. */
  message: string | string[];
  errors?: ApiErrorDetail[];
  meta: ResponseMeta;
}
