import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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