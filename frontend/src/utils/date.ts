export function transformDate(
  dateStr: string,
  locale: string = 'en-GB',
): string {
  const newDate = new Date(dateStr);
  return newDate.toLocaleDateString(locale).split('/').join('-');
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
}
