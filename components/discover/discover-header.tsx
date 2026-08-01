/** Page header for a discovery view: title with result count and subtext. */
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
    <div className='flex flex-col gap-1'>
      <h1 className='text-2xl font-semibold tracking-tight text-foreground sm:text-[32px]'>
        {heading}
        {typeof count === 'number' ? (
          <span className='font-normal text-muted-foreground'> ({count})</span>
        ) : null}
      </h1>
      <p className='text-sm text-muted-foreground'>{subtext}</p>
    </div>
  );
}
