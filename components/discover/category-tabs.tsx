'use client';

import { Button } from '@/components/ui/button';

export function CategoryTabs({
  categories,
  active,
  onSelect,
}: {
  categories: readonly string[];
  active: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className='flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible'>
      {categories.map(category => {
        const isActive = category === active;
        return (
          <Button
            key={category}
            appearance={isActive ? 'solid' : 'outline'}
            intent={isActive ? 'primary' : 'secondary'}
            shape='pill'
            size='small'
            aria-pressed={isActive}
            onClick={() => onSelect(category)}
            className='shrink-0'
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}
