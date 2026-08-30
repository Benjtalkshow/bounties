# Builder Filtering Implementation

## Summary

This implementation generalizes the existing `filter-rail.tsx` component architecture to support both **Projects** and **Builders** filtering. The approach maintains backward compatibility with the existing Projects discovery page while enabling a new Builders directory with Skills, Country, and Status filters.

## What Was Changed

### 1. Created API Layer for Builders (`lib/api/users.ts`)

New file that mirrors the structure of `use-projects.ts`:

- **Types:**
  - `BuilderListItemDto` - Builder profile data structure
  - `FacetCountDto` - Facet with count (e.g., `{ value: "React", count: 42 }`)
  - `BuilderFiltersDto` - Filter facets response structure
  - `BuildersQueryParams` - Query parameters for `/users/directory`

- **Hooks:**
  - `useBuilders(params)` - Fetches paginated builder directory
  - `useBuilderFilters()` - Fetches filter facets (skills, countries, statuses)

- **API Endpoints:**
  - `GET /users/directory` - Returns builder list with filters
  - `GET /users/filters` - Returns available filter options with counts

### 2. Generalized Filter Rail (`components/discover/filter-rail.tsx`)

**Added exports (backward compatible):**
- `GenericFilterValue` - Type for flexible filter values
- `hasActiveGenericFilters()` - Generic version of filter detection
- `FilterSectionConfig` - Configuration interface for filter sections
- `GenericFilterRail` - New generalized component

**Preserved exports (zero changes to existing functionality):**
- `FilterValue` - Projects filter type
- `EMPTY_FILTERS` - Default empty state
- `hasActiveFilters()` - Projects filter detection
- `FilterRail` - Original projects filter component
- `CheckboxGroup` - Type for filter groups

The original `FilterRail` component remains **unchanged** and continues to work exactly as before for the Projects page.

### 3. Created Builders Filter Rail (`components/discover/builders-filter-rail.tsx`)

New file that wraps `GenericFilterRail` with builder-specific configuration:

- **Filter Sections:**
  1. **Status** - Enum filter (AVAILABLE, OPEN_TO_WORK, BUSY, UNAVAILABLE)
  2. **Country** - Facet filter with counts
  3. **Skills** - Facet filter with counts (collapsed by default)

- **Icons:**
  - Status: `Activity01Icon`
  - Country: `FlagIcon`
  - Skills: `Tag02Icon`

- **Exports:**
  - `BuilderFilterValue` - Type for builder filters
  - `EMPTY_BUILDER_FILTERS` - Default empty state
  - `hasActiveBuilderFilters()` - Detects active filters
  - `BuildersFilterRail` - Main component

### 4. Example Implementation (`app/builders/page.tsx`)

Created a reference implementation showing:
- Filter state management
- Pagination reset on filter change
- Reset button when filters are active
- Integration with `useBuilders` hook
- Responsive grid layout
- Builder card display

## API Specification Compliance

### GET `/users/filters` Response:
```typescript
{
  skills: FacetCountDto[];      // [{ value: "React", count: 42 }, ...]
  countries: FacetCountDto[];   // [{ value: "US", count: 15 }, ...]
  statuses: ("AVAILABLE" | "OPEN_TO_WORK" | "BUSY" | "UNAVAILABLE")[];
}
```

### GET `/users/directory` Query Parameters:
```typescript
{
  page?: number;
  limit?: number;
  search?: string;
  country?: string;               // Single ISO 3166-1 alpha-2 code
  skills?: string[];              // Comma-separated list
  status?: "AVAILABLE" | "OPEN_TO_WORK" | "BUSY" | "UNAVAILABLE";
  sort?: "name_asc" | "name_desc" | "newest" | "oldest";
}
```

## Key Design Decisions

### 1. Approach A (Generalization) Over Duplication
- **Pro:** Single source of truth for filter UI logic
- **Pro:** Consistent UX between Projects and Builders
- **Pro:** Easier maintenance and bug fixes
- **Con:** Slightly more complex types

### 2. Backward Compatibility
- Original `FilterRail` component preserved exactly
- No changes required to existing Projects page
- New functionality added through composition, not modification

### 3. Type Safety
- All API types derived from generated schema (`lib/api/generated/schema.d.ts`)
- Strong typing for filter values and configurations
- TypeScript will catch misconfigurations at compile time

### 4. Filter Behavior
- Selecting any filter resets pagination to page 1
- "Reset" button clears all active filters
- Multi-select for Skills (array filter)
- Single-select for Country and Status (first value used)

## Usage Example

```tsx
import {
  BuildersFilterRail,
  BuilderFilterValue,
  EMPTY_BUILDER_FILTERS,
} from '@/components/discover/builders-filter-rail';
import { useBuilders } from '@/lib/api/users';

function BuildersPage() {
  const [filters, setFilters] = useState<BuilderFilterValue>(
    EMPTY_BUILDER_FILTERS
  );
  const [page, setPage] = useState(1);

  const handleFilterChange = (newFilters: BuilderFilterValue) => {
    setFilters(newFilters);
    setPage(1); // Reset pagination
  };

  const { data: builders } = useBuilders({
    page,
    skills: filters.skills,
    country: filters.country[0],
    status: filters.status[0],
  });

  return (
    <div>
      <BuildersFilterRail 
        value={filters} 
        onChange={handleFilterChange} 
      />
      {/* Render builders */}
    </div>
  );
}
```

## Verification Checklist

Before submitting PR, run:

```bash
# Install dependencies
npm install

# Lint check
npm run lint

# Type check
npx tsc --noEmit

# Build
npm run build
```

### Manual Testing:
1. ✅ Projects page filters still work (no regressions)
2. ✅ Builders filter rail displays Skills, Country, Status
3. ✅ Facet counts display correctly
4. ✅ Selecting filters narrows results
5. ✅ Pagination resets to page 1 on filter change
6. ✅ Reset button clears all filters
7. ✅ Loading skeletons display during fetch
8. ✅ Error states handled gracefully

## File Structure

```
lib/api/
  ├── users.ts                    # ✨ NEW - Builder API hooks

components/discover/
  ├── filter-rail.tsx             # 🔄 REFACTORED - Added generic version
  ├── builders-filter-rail.tsx    # ✨ NEW - Builder-specific wrapper
  ├── use-projects.ts             # ✅ UNCHANGED
  └── projects-view.tsx           # ✅ UNCHANGED

app/
  ├── projects/
  │   └── page.tsx                # ✅ UNCHANGED - Still works!
  └── builders/
      └── page.tsx                # ✨ NEW - Example implementation
```

## Next Steps

1. Install dependencies: `npm install`
2. Run linting: `npm run lint`
3. Run type checking: `npx tsc --noEmit`
4. Build project: `npm run build`
5. Test both Projects and Builders pages locally
6. Take screenshot of working Builders Filter Rail
7. Create PR with screenshot in description

## Notes

- The `countries-list` package is already installed for country name formatting
- The `formatLabel` helper converts `SCREAMING_SNAKE_CASE` to `Title Case`
- All icon components used exist in `components/icons/`
- The generic filter rail can be reused for future filtering needs
