/**
 * Simple className concatenation utility
 * Filters out falsy values and joins class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

