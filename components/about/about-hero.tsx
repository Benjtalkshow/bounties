import { HeroBackground } from '@/components/marketing/hero-background';
import { Eyebrow, Section, SectionHeading } from '@/components/marketing/section';

export function AboutHero() {
  return (
    <HeroBackground fieldHeight={640} fadeBottom>
      <Section className='py-24 text-center lg:py-32'>
        <SectionHeading
          eyebrow={<Eyebrow>About</Eyebrow>}
          title={
            <>
              The people behind the{' '}
              <span className='text-primary-500'>products</span>
            </>
          }
          titleClassName='text-display-sm font-normal text-foreground lg:text-display-lg'
          description='Boundless Builders is a living showcase of the builders, teams, and projects shipping across the ecosystem. This is where their work steps into the light.'
          descriptionClassName='mt-6 max-w-2xl text-body-lg text-muted-foreground'
        />
      </Section>
    </HeroBackground>
  );
}
