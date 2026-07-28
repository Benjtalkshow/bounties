# Builders App — API Endpoints

This app is **read-only**. It displays builders, projects, and teams that are
created and managed in the main Boundless app. Every read comes from the shared
`boundless-nestjs` backend, so this app and boundless-platform stay consistent
(a project or user followed in the platform is read here from the same data).

The public read API was implemented by the backend team. This document mirrors
`boundless-nestjs/docs/builders-public-reads.md` and maps each endpoint to the
screen that uses it. If the two ever drift, the backend doc is the source of
truth.

## Rules and conventions

- This app calls **`GET` endpoints only**. All writes (follow, create, edit,
  upload) stay in boundless-platform.
- Follows and profiles are stored once and shared. We reuse the same reads, we
  do not duplicate the data model.
- **Prefix:** every path is served under the global `/api` prefix. `GET /projects`
  is `GET /api/projects`. Base URL comes from `NEXT_PUBLIC_API_URL`
  (staging: `https://stage-api.boundlessfi.xyz`).
- **Auth:** the backend runs a global session guard. These routes opt out with
  `@AllowAnonymous()`, so they are public. Personalize-if-present routes use
  `@OptionalAuth()`.
- **No PII:** public reads never return `email` or other sensitive account
  fields. Identity and user-authored public profile fields only.
- **Pagination:** list responses return
  `{ data, pagination: { page, limit, total, totalPages, hasNext, hasPrev } }`.

## Status legend

- **Public**: implemented and public. Use directly.
- **Private-aware**: public, but returns `404` when the target profile is
  private.

---

## `/` — Home / Landing

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /users/top-builders` | Top builders row. Card-ready. Accepts `limit`. | Public |
| `GET /projects/featured` | Featured projects row | Public |
| `GET /discover/landing` | Ecosystem feed / counts | Public |
| `GET /discover/recent-winners` | Recent winners highlight | Public |
| `GET /users/directory?limit=N` | Fallback source for a builders strip | Public |
| `GET /leaderboard` | Ranking + reputation (tier, score, stats). Not card-ready. | Public |

> **Top builders:** use `GET /users/top-builders`. It returns a flat array of
> card-ready builders in the standard `{ success, message, data, meta }`
> envelope, with everything `BuilderCardView` needs:
>
> ```json
> { "id", "name", "username", "image", "role", "location",
>   "country", "skills": [], "followers": 0, "projects": 0 }
> ```
>
> Map: `name` -> displayName, `image` -> avatarSrc, `location` -> location,
> `skills`/`followers`/`projects` straight across. Do **not** map `role` (it is
> the account role, e.g. `"user"`, not a professional title). `GET /leaderboard`
> is kept for ranking/reputation use only; it does **not** carry profile fields
> (role, location, followers, projects), which is why the landing top-builders
> row moved to `GET /users/top-builders`.
>
> A stats strip can derive counts from the `pagination.total` of
> `GET /users/directory`, `GET /projects`, and `GET /organizations`.

---

## `/builders` — Builders Directory

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /users/directory` | Public builders directory. Filters: `country`, `skills` (repeatable/CSV), `status`, `search`, `sort` (`name_asc\|name_desc\|newest\|oldest`), `page`, `limit`. Public profiles only. | Public |
| `GET /users/filters` | Facets: `skills[]`, `countries[]` (with counts), `statuses[]` | Public |

> The directory is `GET /users/directory`, **not** `GET /users`. `GET /users` is
> Admin-only and is not used by this app.

---

## `/builders/[username]` — Builder Profile

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /users/:username` | Public profile. Embeds orgs, projects, stats, followStats. | Public |
| `GET /users/:username/stats` | Public profile stats + follow counts | Private-aware |
| `GET /users/:username/activity` | Contribution timeline (`limit`, `offset`) | Private-aware |
| `GET /users/:username/organizations` | Teams the builder belongs to, with role | Private-aware |
| `GET /users/:username/followers` · `/following` | Follower / following lists | Public |
| `GET /projects?creatorId=:userId` | The builder's projects | Public |

---

## `/projects` — Projects / Products Directory

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /projects` | Directory. Filters: `creatorId`, `organizationId`, `tags` (repeatable/CSV), `category`, `publicStatus`, `originType`, `featured`, `search`. Never returns `IDEA` drafts. | Public |
| `GET /projects/search` | Search public projects | Public |
| `GET /projects/filters` | Facets: `categories[]` + `tags[]` (with counts), `publicStatuses[]`, `originTypes[]` | Public |

---

## `/projects/[slug]` — Project Detail

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /projects/:slug` | Project header and body (PII-scrubbed) | Public |
| `GET /projects/:slug/members` | Contributor roster (from `ProjectMember`). Creator always included as `owner`. Drafts 404. | Public |
| `GET /follows/entity/project/:id/followers` | Project follower list. The generic `entity/:entityType/:entityId/followers` route stays authenticated. | Public |
| `GET /bounties?projectId=` · `GET /grants?projectId=` | Related opportunities | Public |

---

## `/teams` — Teams / Organizations Directory

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /organizations` | Public directory. `search`, `sortBy` (`createdAt\|name`), `sortOrder`, `page`, `limit`. Counts only, no member PII. | Public |
| `GET /organizations/search` | Search organizations | Public |

---

## `/teams/[slug]` — Team Detail

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /organizations/profile/:idOrSlug` | Team profile | Public |
| `GET /organizations/profile/:idOrSlug/funded` | Funded / supported projects | Public |
| `GET /organizations/:id/members` | Public roster (identity fields only, capped, with `total`) | Public |
| `GET /organizations/:id/stats` | Projects / hackathons / bounties / grants / participants / prize pool + followers | Public |

---

## Cross-cutting

| Endpoint | Purpose | Status |
| --- | --- | --- |
| `GET /leaderboard` | Leaderboard widget | Public |
| `GET /follows/:entityType/:entityId/check` | "Am I following" state (only if this app has logged-in sessions) | Auth |

### Not built here (boundary)

`POST` / `DELETE /follows/:entityType/:entityId` and every other write stay in
boundless-platform. This app never calls them.

---

## Backend schema notes

From migration `20260725000000_builders_public_reads`:

- `BuilderStatus` enum (`AVAILABLE`, `OPEN_TO_WORK`, `BUSY`, `UNAVAILABLE`) and
  indexed `UserProfile.country` / `UserProfile.status` back the directory filters
  and facets.
- `ProjectMember` model (`projectId`, `userId`, `role`, `joinedAt`) is the
  first-class replacement for the untyped `Project.teamMembers` JSON and backs
  `GET /projects/:slug/members`.

## Shared data

Follows and profiles are stored once and read by both apps. A user or project
followed in boundless-platform is read here through the same endpoints. Nothing
is duplicated.
