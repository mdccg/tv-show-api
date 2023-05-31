/**
 * 
 * @param date Data no formato `YYYY-MM-DD`
 */
export const parseDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
}