import { cn } from '@/lib/utils';

/** Centered max-width container with vertical rhythm for a marketing section. */
export function Section({
  id,
  className,
  innerClassName,
  children,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  // 8pt grid: 64px/20px vertical/horizontal on mobile, 80px/100px on desktop.
  return (
    <section
      id={id}
      className={cn('px-5 py-16 lg:px-[100px] lg:py-20', className)}
    >
      <div className={cn('mx-auto w-full max-w-page', innerClassName)}>
        {children}
      </div>
    </section>
  );
}

/** Small bordered pill used as a label above section headings. */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70',
        className
      )}
    >
      {children}
    </span>
  );
}

/** Eyebrow + title + description block shared by most sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
  titleClassName?: string;
}) {
  // 8pt grid: label down 8px to heading, heading down 12px (16px desktop)
  // to subheading. Content below the block sits 32px lower (mt-8 by callers).
  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-left',
        className
      )}
    >
      {eyebrow ? <Eyebrow className='mb-2'>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          'font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-3 max-w-2xl text-pretty text-white/60 lg:mt-4',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
