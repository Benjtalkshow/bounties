'use client';

import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { CheckIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export interface SnapshotRow {
  label: string;
  value: React.ReactNode;
}

/**
 * Sidebar snapshot card shared by the contributor and organization profiles:
 * a titled card of label/value rows. Rows vary by profile and active tab, so
 * the host passes them in (and can omit a row rather than show a blank).
 */
export function SnapshotCard({
  title,
  rows,
}: {
  title: string;
  rows: SnapshotRow[];
}) {
  return (
    <aside className='flex w-full flex-col gap-4 rounded-2xl border border-[#2e3a38] bg-[#0d1111] p-5'>
      <h2 className='font-heading text-base font-semibold tracking-[-0.36px] text-[#F1FFF1]'>
        {title}
      </h2>
      <div className='flex flex-col gap-4'>
        {rows.map(row => (
          <div
            key={row.label}
            className='flex items-center justify-between gap-3 text-sm'
          >
            <span className='text-[#929f9c]'>{row.label}</span>
            <span className='text-[#f1fff1]'>{row.value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

/** Status row value: "Verified" with the blue tick, "Unverified" otherwise. */
export function StatusBadge({ verified }: { verified: boolean }) {
  return (
    <span className='flex items-center gap-1.5 text-[#f1fff1]'>
      {verified ? 'Verified' : 'Unverified'}
      <span
        className={cn(
          'grid size-4 place-items-center rounded-full',
          verified ? 'bg-[#3698e8]' : 'bg-[#42534f]'
        )}
      >
        <CheckIcon className='size-2.5 text-white' aria-hidden />
      </span>
    </span>
  );
}

/** Truncated Stellar public key with a copy control, per the snapshot row. */
export function WalletAddress({ publicKey }: { publicKey: string }) {
  const short = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
  return (
    <button
      type='button'
      title={publicKey}
      aria-label='Copy wallet address'
      onClick={() => {
        void navigator.clipboard.writeText(publicKey).then(() => {
          toast.success('Wallet address copied');
        });
      }}
      className='flex items-center gap-1.5 rounded-full bg-white/8 py-1 pr-2 pl-3 font-mono text-xs text-[#c2d0cd] transition-colors outline-none hover:bg-white/12 hover:text-white'
    >
      {short}
      <CopyIcon className='size-3.5' aria-hidden />
    </button>
  );
}
