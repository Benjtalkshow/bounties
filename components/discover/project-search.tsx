'use client';

import { useCallback, useRef, useState } from 'react';

import { SearchIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';

import { CategoryTabs } from './category-tabs';

export function ProjectSearch({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: readonly string[];
}) {
  const [localSearch, setLocalSearch] = useState(search);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalSearch(value);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onSearchChange(value), 300);
    },
    [onSearchChange]
  );

  return (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Search opportunities, skills, or organizations'
        leftIcon={<SearchIcon className='size-5' />}
        value={localSearch}
        onChange={handleSearchChange}
        shape='pill'
      />
      <CategoryTabs
        categories={['All', ...categories]}
        active={category}
        onSelect={onCategoryChange}
      />
    </div>
  );
}
