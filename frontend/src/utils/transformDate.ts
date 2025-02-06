export function transformDate(dateStr: string, locale: string = 'en-GB') {
  const newDate = new Date(dateStr);
  return newDate.toLocaleDateString(locale).split('/').join('-');
}
