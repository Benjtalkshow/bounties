import { Skeleton } from '@/components/ui/skeleton';

/** Loading placeholder that mirrors the OpportunityCard layout. */
export function OpportunityCardSkeleton() {
  return (
    <div className='flex flex-col gap-5 rounded-2xl border border-[#1f2a28] bg-ink p-4'>
      <div className='flex items-center gap-2'>
        <Skeleton className='size-6 rounded-full' />
        <Skeleton className='h-4 w-28' />
        <Skeleton className='ml-auto h-5 w-16 rounded-full' />
      </div>

      <div className='flex min-h-[52px] flex-col gap-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/5' />
      </div>

      <div className='flex items-center gap-3'>
        <Skeleton className='h-5 w-16 rounded-full' />
        <Skeleton className='h-4 w-10' />
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-4 w-8' />
      </div>

      <span aria-hidden className='h-px w-full bg-[#1f2a28]' />

      <div className='flex items-center justify-between gap-3'>
        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-6 w-24' />
      </div>
    </div>
  );
}
