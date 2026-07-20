# Builders App — API Endpoints

This app is **read-only**. It displays builders, projects, and teams that are
created and managed in the main Boundless app. Every read comes from the shared
`boundless-nestjs` backend, so this app and boundless-platform stay consistent
(a project or user followed in the platform is read here from the same data).

This document maps each screen to the endpoints it needs, marking what already
exists versus what has to be built or opened up.

## Rules

- This app calls **`GET` endpoints only**. All writes (follow, create, edit,
  upload) stay in boundless-platform.
- Follows and profiles are stored once and shared. We reuse the same reads, we
  do not duplicate the data model.
- Paths below are backend routes. The frontend reaches them through the `/api`
  proxy, so `GET /projects` is `GET /api/projects` from the client.

## Legend

- **Exists (public)**: already `@AllowAnonymous` / `@Public`. Reuse as-is.
- **Exists (auth-gated)**: the endpoint exists but is behind `AuthGuard`. Needs a
  public or optional-auth variant for this app.
- **Needed**: no endpoint yet. Must be added in `boundless-nestjs`.

---

## `/` — Home / Landing

### Existing (reuse)

| Endpoint | Purpose |
| --- | --- |
| `GET /projects/featured` | Featured projects |
| `GET /discover/landing` | Ecosystem stats and counts |
| `GET /discover/recent-winners` | Highlights |

### Needed

| Endpoint | Purpose |
| --- | --- |
| `GET /users?featured=true` | Featured builders strip (depends on the new public builders list) |

---

## `/builders` — Builders Directory

### Existing (reuse)

None. The only user list today, `GET /users`, is Admin-only.

### Needed

| Endpoint | Purpose |
| --- | --- |
| `GET /users` | Public, paginated, filterable builders list (`?country=&skills=&status=&sort=name_asc&page=`) |
| `GET /users/filters` | Filter option lists (skills, countries, statuses) |

---

## `/builders/[username]` — Builder Profile

### Existing (reuse)

| Endpoint | Purpose |
| --- | --- |
| `GET /users/:username` | Profile header (bio, role, location, follow status) |
| `GET /users/:username/followers` | Followers list |
| `GET /users/:username/following` | Following list |
| `GET /projects?builder=:username` | Their projects (confirm the filter param) |

### Needed

| Endpoint | Purpose |
| --- | --- |
| `GET /users/:username/stats` | Public stats (projects, contributions, earnings). The current `GET /users/profile/stats` is auth-only for the own profile. |
| `GET /users/:username/activity` | Public activity feed by username. The current `GET /users/profile/activity/public` is not username-scoped. |
| `GET /users/:username/organizations` | Teams this builder belongs to |

---

## `/projects` — Projects / Products Directory

### Existing (reuse)

| Endpoint | Purpose |
| --- | --- |
| `GET /projects` | Project cards, paginated with filters |
| `GET /projects/search` | Search |

### Needed

| Endpoint | Purpose |
| --- | --- |
| `GET /projects/filters` | Filter facets (category, stage, network, sector) |

---

## `/projects/[slug]` — Project Detail

### Existing (reuse)

| Endpoint | Purpose |
| --- | --- |
| `GET /projects/:slug` | Project header and body |
| `GET /bounties?projectId=` | Related bounties |
| `GET /grants?projectId=` | Related grants |

### Needed

| Endpoint | Purpose |
| --- | --- |
| `GET /projects/:slug/members` | Team and contributors |
| `GET /follows/entity/project/:id/followers` | Followers. Exists but auth-gated; needs a public variant. |

---

## `/teams` — Teams / Organizations Directory

### Existing (reuse)

None public. The list and search are auth-gated today.

### Needed

| Endpoint | Purpose |
| --- | --- |
| `GET /organizations` | Public variant of the list (currently behind `AuthGuard`) |
| `GET /organizations/search` | Public variant of search (currently behind `AuthGuard`) |

---

## `/teams/[slug]` — Team Detail

### Existing (reuse)

| Endpoint | Purpose |
| --- | --- |
| `GET /organizations/profile/:idOrSlug` | Team profile |
| `GET /organizations/profile/:idOrSlug/funded` | Funded and supported projects |

### Needed

| Endpoint | Purpose |
| --- | --- |
| `GET /organizations/:id/members` | Members. Exists but auth-gated; needs a public variant. |
| `GET /organizations/:id/stats` | Stats. Exists but auth-gated; needs a public variant. |

---

## Cross-cutting (used on multiple screens)

### Existing (reuse)

| Endpoint | Purpose |
| --- | --- |
| `GET /leaderboard` | Leaderboard widget |
| `GET /follows/:entityType/:entityId/check` | "Am I following" state. Only if this app has logged-in sessions. Auth-gated by nature. |

### Not built here (boundary)

| Endpoint | Note |
| --- | --- |
| `POST` / `DELETE /follows/:entityType/:entityId` | Follow and unfollow. Writes stay in boundless-platform. This app never calls it. |

---

## Summary

### Reuse as-is (already public)

Projects (list, search, featured, detail), builder profile plus followers and
following, team profile plus funded, discover, leaderboard.

### Build 7 new public reads

1. `GET /users` — public builders directory with filters
2. `GET /users/filters` — builder filter facets
3. `GET /users/:username/stats` — public builder stats
4. `GET /users/:username/activity` — public builder activity
5. `GET /users/:username/organizations` — a builder's teams
6. `GET /projects/filters` — project filter facets
7. `GET /projects/:slug/members` — project contributors

### Open 4 existing endpoints to public

1. `GET /organizations` — list
2. `GET /organizations/search` — search
3. `GET /organizations/:id/members` — members
4. `GET /organizations/:id/stats` — stats

Plus the entity-level project followers read
`GET /follows/entity/project/:id/followers`.

### Shared data

Follows and profiles are stored once and read by both apps. A user or project
followed in boundless-platform is read here through the same endpoints. Nothing
is duplicated. The only care point is that some of those reads are auth-gated
today and need a public or optional-auth variant, not a new data model.
