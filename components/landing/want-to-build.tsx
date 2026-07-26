import { CtaBand } from '@/components/marketing/cta-band';

export function WantToBuild() {
  return (
    <CtaBand
      heading='Want to be a builder?'
      description='Create your profile, join a team, and start shipping on Boundless. Your work belongs in the showcase.'
      action={{
        label: 'Get started on Boundless',
        href:
          process.env.NEXT_PUBLIC_BOUNDLESS_APP_URL ??
          'https://boundlessfi.xyz',
        external: true,
      }}
    />
  );
}
