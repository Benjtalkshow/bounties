import { Crown } from 'lucide-react';

import { cn } from '@/lib/utils';

import { PillarCard } from './pillar-card';

/**
 * "Explore path" cluster: a crown badge framed by a dashed outline above two
 * stacked pillar cards offset so each shows a different product pillar.
 */
export function ExplorePath({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex flex-col items-center gap-5', className)}>
      <span
        aria-hidden
        className='absolute top-[18px] left-1/2 h-[72px] w-[197px] -translate-x-1/2 rounded-[12px] border border-dashed border-[#66c589]'
      />
      <span className='relative z-10 flex items-center gap-1.5 rounded-full bg-[#40b66b] px-[13.5px] py-1.5'>
        <Crown
          className='size-[18px] shrink-0 text-white'
          strokeWidth={1.75}
          aria-hidden
        />
        <span className='text-body-xs font-bold text-white'>Explore path</span>
      </span>
      <div className='relative z-10 flex flex-col items-start gap-1'>
        <PillarCard />
        <PillarCard animationDelay='-5s' />
      </div>
    </div>
  );
}
