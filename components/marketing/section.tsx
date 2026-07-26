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
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-body-xs text-white/70',
        className
      )}
    >
      <span className='rounded-full bg-white/10 px-3 py-1 text-body-xs font-medium text-white'>
        {children}
      </span>
    </div>
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
  descriptionClassName,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  // 8pt grid: label down 24px (mt-6) to heading, heading down 24px (mt-6) to subheading.
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
      {eyebrow ? (
        typeof eyebrow === 'string' ? (
          <Eyebrow>{eyebrow}</Eyebrow>
        ) : (
          eyebrow
        )
      ) : null}
      <h2
        className={cn(
          'mt-6 font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-6 max-w-2xl text-body-lg text-muted-foreground',
            align === 'center' && 'mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
