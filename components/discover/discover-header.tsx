import { Bookmark, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';

/** Page header for a discovery view: title with result count, subtext, actions. */
export function DiscoverHeader({
  heading,
  subtext,
  count,
}: {
  heading: string;
  subtext: string;
  count?: number;
}) {
  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-[32px]'>
          {heading}
          {typeof count === 'number' ? (
            <span className='font-normal text-muted-foreground'>
              {' '}
              ({count})
            </span>
          ) : null}
        </h1>
        <p className='text-sm text-muted-foreground'>{subtext}</p>
      </div>
      <div className='hidden items-center gap-3 sm:flex'>
        <Button
          appearance='outline'
          intent='secondary'
          shape='pill'
          size='small'
          aria-pressed='true'
        >
          <Bookmark className='size-4' strokeWidth={1.75} aria-hidden />
          Bookmarks
        </Button>
        <Button
          appearance='solid'
          intent='white'
          shape='pill'
          size='small'
          aria-pressed='true'
        >
          <Users className='size-4' strokeWidth={1.75} aria-hidden />
          Leaderboard
        </Button>
      </div>
    </div>
  );
}
