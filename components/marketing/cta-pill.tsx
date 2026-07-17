import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type CtaPillProps = {
  label: string;
  icon: LucideIcon;
  iconRight?: boolean;
  active?: boolean;
  className?: string;
};

const SHADOW_ACTIVE =
  'shadow-[0px_5px_5px_0px_rgba(0,0,0,0.05),0px_15px_15px_0px_rgba(0,0,0,0.05),0px_30px_30px_0px_rgba(0,0,0,0.1),inset_0px_0px_100px_0px_rgba(212,255,240,0.04)]';
const SHADOW_IDLE =
  'shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05),0px_15px_30px_0px_rgba(0,0,0,0.05),0px_30px_60px_0px_rgba(0,0,0,0.1),inset_0px_0px_100px_0px_rgba(212,255,240,0.04)]';

/** Pill-shaped product CTA. Enlarges and turns solid green when active. */
export function CtaPill({
  label,
  icon: Icon,
  iconRight,
  active,
  className,
}: CtaPillProps) {
  const icon = (
    <Icon
      className={cn('shrink-0', active ? 'size-5' : 'size-3.5')}
      strokeWidth={1.75}
      aria-hidden
    />
  );
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 rounded-[60px] px-7 py-3 backdrop-blur-[10px]',
        active
          ? cn(
              'w-[180px] bg-primary-700 font-medium text-primary-50',
              SHADOW_ACTIVE
            )
          : cn(
              'h-[39px] w-[140px] bg-white/8 font-normal text-white',
              SHADOW_IDLE
            ),
        className
      )}
    >
      {!iconRight && icon}
      <span className={cn(active ? 'text-[20px]' : 'text-[14px]')}>
        {label}
      </span>
      {iconRight && icon}
    </div>
  );
}
