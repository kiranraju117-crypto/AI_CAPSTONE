import { format, formatDistanceToNowStrict } from 'date-fns';

export function formatCount(value: number): string {
  return value.toLocaleString('en-US');
}

/** Renders a 0-1 probability as a percentage, or "--" when the backend gave nothing. */
export function formatPercent(value: number | null | undefined, digits = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '--';
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatDate(iso: string): string {
  return format(new Date(iso), 'dd MMM yyyy, HH:mm');
}

export function formatRelative(iso: string): string {
  return `${formatDistanceToNowStrict(new Date(iso))} ago`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}