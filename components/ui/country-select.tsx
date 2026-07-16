'use client';

import { getCountryDataList } from 'countries-list';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/** Countries with a lowercase ISO code (for flags), sorted by name. */
const COUNTRIES = getCountryDataList()
  .map(country => ({ name: country.name, code: country.iso2.toLowerCase() }))
  .sort((a, b) => a.name.localeCompare(b.name));

function Flag({ code }: { code: string }) {
  return (
    <Image
      src={`https://flagcdn.com/w40/${code}.png`}
      alt=''
      width={20}
      height={15}
      // Tiny flags from a CDN: skip the Next optimizer so a long list does not
      // fan out into hundreds of /_next/image requests.
      unoptimized
      className='h-[15px] w-5 shrink-0 rounded-[2px] object-cover'
    />
  );
}

interface CountrySelectProps {
  /** Selected country name. */
  value?: string;
  onChange: (name: string) => void;
  placeholder?: string;
  id?: string;
  error?: boolean;
}

/**
 * Searchable country picker with flags. Value is the country name (a plain
 * string), so it drops into any string form field. Reusable anywhere a country
 * is collected.
 */
export function CountrySelect({
  value,
  onChange,
  placeholder = 'Select your country',
  id,
  error,
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const listId = React.useId();
  const selected = React.useMemo(
    () => COUNTRIES.find(c => c.name === value),
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type='button'
          id={id}
          role='combobox'
          aria-expanded={open}
          aria-controls={listId}
          className={cn(
            'flex h-11 w-full items-center justify-between gap-2 rounded-[6px] border px-4 text-sm text-[#f1fff1] transition-colors outline-none focus-visible:border-[#5c6f6b] sm:h-14',
            error ? 'border-error-500' : 'border-[#42534f]'
          )}
        >
          <span className='flex min-w-0 items-center gap-2'>
            {selected ? <Flag code={selected.code} /> : null}
            <span className={cn('truncate', !selected && 'text-[#7a8f8b]/70')}>
              {selected?.name ?? placeholder}
            </span>
          </span>
          <ChevronDown className='size-4 shrink-0 opacity-60' />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='w-(--radix-popover-trigger-width) p-0'
      >
        <Command>
          <CommandInput placeholder='Search country...' />
          <CommandList id={listId}>
            <CommandEmpty>No country found.</CommandEmpty>
            {COUNTRIES.map(country => (
              <CommandItem
                key={country.code}
                value={country.name}
                onSelect={() => {
                  onChange(country.name);
                  setOpen(false);
                }}
              >
                <Flag code={country.code} />
                <span className='truncate'>{country.name}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
