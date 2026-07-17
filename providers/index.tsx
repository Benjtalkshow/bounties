import type { ReactNode } from 'react';

import { ThemeProvider } from './theme-provider';

/**
 * The app's provider tree, composed once and mounted in the root layout. The app
 * defaults to `dark`, matching the canonical Boundless theme. Extend this tree
 * (query client, wallet, toasts) as features are ported from boundless-platform.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
