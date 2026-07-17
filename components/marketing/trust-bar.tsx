import { PartnerLogos } from './partner-logos';
import { Section } from './section';

/**
 * Ecosystem trust strip: a label over an auto-scrolling partner-logo marquee.
 * The teal-at-top gradient continues the hero's bottom glow so the seam merges.
 */
export function TrustBar() {
  return (
    <Section
      className='bg-ink bg-[linear-gradient(180deg,rgba(46,237,170,0.08)_0%,rgba(13,17,17,0)_100%)]'
      innerClassName='flex flex-col gap-8'
    >
      <p className='text-base font-semibold tracking-[-0.32px] text-[#939898] uppercase'>
        Trusted By Communities, Ecosystems &amp; Builders
      </p>
      <PartnerLogos />
    </Section>
  );
}
