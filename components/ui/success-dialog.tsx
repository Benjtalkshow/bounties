'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

/** One CTA in the success modal; `href` renders a link, otherwise a button. */
export interface SuccessDialogAction {
  label: string;
  href?: string;
  onClick?: () => void;
  intent?: ComponentProps<typeof Button>['intent'];
  appearance?: ComponentProps<typeof Button>['appearance'];
}

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Small accent line above the title, e.g. "Congratulations!". */
  eyebrow?: ReactNode;
  /** Heading. Defaults to the onboarding copy. */
  title?: string;
  /** Supporting line under the heading. */
  description?: ReactNode;
  /**
   * CTAs, rendered top-to-bottom (primary first). When omitted, falls back to a
   * single button built from `actionLabel` / `onAction` (legacy onboarding API).
   */
  actions?: SuccessDialogAction[];
  /** Primary action label (legacy single-action API). */
  actionLabel?: string;
  /** Primary action handler (legacy single-action API). */
  onAction?: () => void;
  /** Override the default success illustration. */
  illustration?: ReactNode;
  /** Show the top-right close button. Defaults to true. */
  showClose?: boolean;
}

/**
 * Reusable success confirmation modal (Figma 3120:47365 / 3123:48896). A
 * centered card with an illustration, optional eyebrow, title, description, and
 * one or more actions. Used at the end of onboarding and for submission
 * confirmation, so copy, illustration, and CTAs are fully configurable.
 */
export function SuccessDialog({
  open,
  onOpenChange,
  eyebrow,
  title = "You're all set!",
  description = 'Your account has been created successfully. Start exploring bounties, projects, grants, and more.',
  actions,
  actionLabel = 'Browse Opportunities',
  onAction,
  illustration,
  showClose = true,
}: SuccessDialogProps) {
  const resolvedActions: SuccessDialogAction[] = actions ?? [
    { label: actionLabel, onClick: onAction, intent: 'primary' },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='flex w-[calc(100%-2rem)] flex-col items-center gap-8 overflow-hidden rounded-[20px] border-[#2e3a38] bg-ink-soft px-6 py-10 shadow-[16px_16px_20px_rgba(73,75,66,0.16)] sm:max-w-[420px]'
      >
        {showClose ? (
          <DialogClose
            aria-label='Close'
            className='absolute top-6 right-6 rounded-xs text-white opacity-80 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary-200'
          >
            <svg viewBox='0 0 24 24' className='size-6' aria-hidden>
              <path
                d='M6 6l12 12M18 6L6 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </DialogClose>
        ) : null}

        <div className='flex flex-col items-center gap-6'>
          {illustration ?? (
            <Image
              src='/onboarding/success-badge.svg'
              alt=''
              width={186}
              height={138}
              priority
              className='h-auto w-[160px] sm:w-[186px]'
            />
          )}

          <div className='flex flex-col items-center gap-2 text-center'>
            {eyebrow ? (
              <p className='text-sm font-semibold text-primary-500'>
                {eyebrow}
              </p>
            ) : null}
            <DialogTitle className='font-heading text-[24px] leading-[1.2] font-semibold tracking-[-0.48px] text-white'>
              {title}
            </DialogTitle>
            {description ? (
              <DialogDescription className='text-xs leading-[1.45] text-[#e8e9e7]/80'>
                {description}
              </DialogDescription>
            ) : null}
          </div>
        </div>

        <div className='flex w-full flex-col gap-2'>
          {resolvedActions.map(action =>
            action.href ? (
              <Button
                key={action.label}
                asChild
                intent={action.intent ?? 'primary'}
                appearance={action.appearance ?? 'solid'}
                shape='pill'
                className='w-full font-semibold'
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ) : (
              <Button
                key={action.label}
                type='button'
                intent={action.intent ?? 'primary'}
                appearance={action.appearance ?? 'solid'}
                shape='pill'
                className='w-full font-semibold'
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
