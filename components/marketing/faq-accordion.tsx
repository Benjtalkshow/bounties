'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import type { FaqItem } from './faq-data';

interface FaqAccordionProps {
  items: FaqItem[];
  /** Indexes open on first render (others collapse). Defaults to none. */
  defaultOpen?: number[];
  className?: string;
}

/** Expandable FAQ list: each row toggles its answer; multiple can stay open. */
export function FaqAccordion({
  items,
  defaultOpen = [],
  className,
}: FaqAccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen);

  const toggle = (index: number) =>
    setOpen(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );

  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);

        return (
          <div
            key={item.question}
            className='border-b border-white/10 py-7 first:pt-0'
          >
            <button
              type='button'
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className='flex w-full items-start gap-4 text-left'
            >
              {isOpen ? (
                <Minus className='mt-0.5 size-6 shrink-0 text-primary' />
              ) : (
                <Plus className='mt-0.5 size-6 shrink-0 text-primary' />
              )}
              <span className='flex flex-1 flex-col'>
                <span className='font-heading text-xl font-semibold tracking-[-0.48px] text-white lg:text-2xl'>
                  {item.question}
                </span>
                {/* grid 0fr -> 1fr animates the answer height smoothly. */}
                <span
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <span className='overflow-hidden'>
                    <span className='block pt-4 text-base leading-[1.45] text-[#b9b9b6]'>
                      {item.answer}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
