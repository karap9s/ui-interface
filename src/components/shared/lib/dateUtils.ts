import { format, isValid, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale';

export function isValidDateString(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    return isValid(date);
  } catch {
    return false;
  }
}

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'd MMMM yyyy, HH:mm', { locale: enGB });
  } catch {
    return dateString;
  }
}
