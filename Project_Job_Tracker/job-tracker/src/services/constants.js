export const COLUMNS = [
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'applied', label: 'Applied' },
  { id: 'follow-up', label: 'Follow-up' },
  { id: 'interview', label: 'Interview' },
  { id: 'offer', label: 'Offer' },
  { id: 'rejected', label: 'Rejected' },
];

export const STATUS_COLORS = {
  wishlist: 'border-l-wishlist',
  applied: 'border-l-applied',
  'follow-up': 'border-l-followup',
  interview: 'border-l-interview',
  offer: 'border-l-offer',
  rejected: 'border-l-rejected',
};

export const STATUS_BG = {
  wishlist: 'bg-wishlist/10 text-wishlist',
  applied: 'bg-applied/10 text-applied',
  'follow-up': 'bg-followup/10 text-followup',
  interview: 'bg-interview/10 text-interview',
  offer: 'bg-offer/10 text-offer',
  rejected: 'bg-rejected/10 text-rejected',
};

export const DEFAULT_RESUMES = ['SDE_Resume_v3', 'QA_Lead_Resume', 'FullStack_Resume'];
