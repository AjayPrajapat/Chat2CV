export const formatDateRange = (start?: string, end?: string) => {
  if (!start && !end) return 'Present';
  const startFormatted = start ? new Date(start).toLocaleDateString() : '';
  const endFormatted = end ? new Date(end).toLocaleDateString() : 'Present';
  return `${startFormatted} - ${endFormatted}`.trim();
};
