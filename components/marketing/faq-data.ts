export interface FaqItem {
  question: string;
  answer: string;
}

/** When the FAQ content was last reviewed; shown under the page title. */
export const FAQ_LAST_UPDATED = 'Last Updated June 2026';

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What types of opportunities are available?',
    answer:
      'Hackathons, grants, bounties, crowdfunding campaigns, and community initiatives.',
  },
  {
    question: 'Can I launch my own program?',
    answer:
      'Yes. Organizations and communities can create funding programs, challenges, and campaigns.',
  },
  {
    question: 'Do I need cryptocurrency to use Boundless?',
    answer:
      'No. Boundless is designed to help people discover and participate in opportunities regardless of their technical background.',
  },
  {
    question: 'Who can use Boundless?',
    answer:
      'Developers, designers, researchers, founders, creators, students, nonprofits, and communities.',
  },
  {
    question: 'What is Boundless?',
    answer:
      'Boundless is a platform where people can complete work, join hackathons, raise funds, and apply for grants—all from one account.',
  },
  {
    question: 'How do I get paid?',
    answer:
      'Payments are released directly to your Boundless wallet once work or milestones are approved.',
  },
  {
    question: 'What kind of work can I find on Boundless?',
    answer:
      'You can find opportunities in development, design, writing, research, marketing, community management, and more.',
  },
  {
    question: 'How does escrow work?',
    answer:
      'Funds are locked before work begins and released only when agreed requirements are completed.',
  },
  {
    question: 'Can teams use Boundless?',
    answer:
      'Yes. Teams and organizations can post opportunities, run hackathons, launch campaigns, and manage contributors.',
  },
  {
    question: "What happens if there's a dispute?",
    answer:
      'A review process helps resolve disagreements fairly, using submitted work and project requirements as evidence.',
  },
  {
    question: 'How does reputation work?',
    answer:
      'Your activity and completed work contribute to a reputation score that helps showcase your track record.',
  },
  {
    question: 'Can I use Boundless from any country?',
    answer:
      'Boundless is designed for a global audience, though some features may vary depending on local regulations and availability.',
  },
  {
    question: 'Is there a fee to join?',
    answer:
      'Creating an account and exploring the platform is free. Any applicable fees are clearly shown before transactions are made.',
  },
  {
    question: 'How do I apply for a grant?',
    answer:
      'Browse available grant programs, review the requirements, and submit your proposal through the platform.',
  },
  {
    question: 'What makes Boundless different?',
    answer:
      'Boundless combines opportunities, funding, accountability, and reputation into one platform, making it easier to discover, fund, and complete meaningful work.',
  },
];
