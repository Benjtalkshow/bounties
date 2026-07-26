import type { ReactNode } from 'react';

import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

/**
 * The app's provider tree, composed once and mounted in the root layout. The app
 * defaults to `dark`, matching the canonical Boundless theme. Extend this tree
 * (wallet, toasts) as features are ported from boundless-platform.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
