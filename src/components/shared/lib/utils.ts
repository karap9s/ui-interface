import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isValid, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTableHeader(key: string): string {
  return key
    // Remove nested object prefix (options.size -> size)
    .replace(/.*\./, '')
    // Split camelCase (updatedAt -> updated At)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Split snake_case (updated_at -> updated at)
    .replace(/_/g, ' ')
    // Split kebab-case (updated-at -> updated at) 
    .replace(/-/g, ' ')
    // Capitalize first letter of each word
    .replace(/\b\w/g, letter => letter.toUpperCase())
    .trim();
}

export function formatTableValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  // Check if value is a date string (ISO format or similar)
  if (typeof value === 'string' && isValidDateString(value)) {
    return formatDate(value);
  }

  // Convert boolean to readable format
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return String(value);
}

function isValidDateString(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    return isValid(date);
  } catch {
    return false;
  }
}

function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'd MMMM yyyy, HH:mm', { locale: enGB });
  } catch {
    return dateString;
  }
}
