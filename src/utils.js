export function yearsSince(date) {
  if (!date) return 0;
  const start = new Date(date);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  if (now < new Date(now.getFullYear(), start.getMonth(), start.getDate())) years -= 1;
  return Math.max(years, 0);
}

export function statValue(stat, profile) {
  return stat.value === 'auto' ? `${yearsSince(profile.careerStart)}+` : stat.value;
}

export const telHref = (phone = '') => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
