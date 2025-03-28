export function transformDate(
  dateStr: string,
  locale: string = 'en-GB',
): string {
  if (!dateStr) {
    return '--';
  }
  const newDate = new Date(dateStr);
  return newDate.toLocaleDateString(locale).split('/').join('-');
}

export function formatDate(
  dateString: string,
  locale: string = 'en-GB',
): string {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
}

export function getYearFromDate(dateString: string): number {
  const date = new Date(dateString);
  return date.getFullYear();
}
