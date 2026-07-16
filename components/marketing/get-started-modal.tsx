'use client';

import { XIcon } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface GetStartedModalProps {
  /** Controlled open state. Omit to let the trigger manage it. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the modal. Skip it for fully controlled usage. */
  trigger?: ReactNode;
  /** Fired when the primary action is pressed. */
  onGetStarted?: () => void;
}

/**
 * Promotional get-started modal: the Boundless mark, a headline, supporting
 * copy and the primary / dismiss actions. Built on the Dialog and Button
 * primitives so it inherits the design system focus and overlay behaviour.
 */
export function GetStartedModal({
  open,
  onOpenChange,
  trigger,
  onGetStarted,
}: GetStartedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        showCloseButton={false}
        className='flex w-full max-w-[400px] flex-col items-center gap-8 rounded-[20px] border-neutral-700/50 bg-[#182120] p-6 text-center shadow-[16px_16px_20px_0px_rgba(73,75,66,0.16)]'
      >
        <DialogClose
          aria-label='Close'
          className='absolute top-6 right-6 rounded-xs text-white opacity-80 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary-200'
        >
          <XIcon className='size-6' />
        </DialogClose>

        <div className='flex flex-col items-center gap-6'>
          <Image
            src='/brand/Boundless-mark-card.svg'
            alt=''
            width={80}
            height={80}
            className='size-20'
          />
          <div className='flex flex-col items-center gap-2'>
            <DialogTitle className='font-heading text-h4 leading-[1.2] font-semibold text-white'>
              Ready to Turn Skills Into Rewards?
            </DialogTitle>
            <DialogDescription className='text-body-sm text-text-muted-brand/80'>
              Access bounties, hackathons, grants, and crowdfunding
              opportunities, all in one ecosystem.
            </DialogDescription>
          </div>
        </div>

        <div className='flex w-full flex-col gap-4'>
          <Button
            intent='primary'
            shape='pill'
            className='w-full'
            onClick={onGetStarted}
          >
            Get Started
          </Button>
          <DialogClose asChild>
            <Button
              intent='secondary'
              appearance='outline'
              shape='pill'
              className='w-full'
            >
              Maybe later
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
