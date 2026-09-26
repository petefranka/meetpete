import type { Priority } from '../../../models';
import { colors } from '../../../theme';

export const ARCHIVO = "'Archivo', sans-serif";
export const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

export const GREEN = '#2F9E44';
export const AMBER = '#F08C00';
export const RED = '#E03131';

/** Red below 40, amber 40–70, green above 70, gray when not applicable. */
export function scoreColor(score: number | null): string {
  if (score === null) return colors.faint;
  if (score > 70) return GREEN;
  if (score >= 40) return AMBER;
  return RED;
}

/** Pastel bar fill used on mobile score bars: green >70, yellow 40–70, coral below. */
export function pastelScoreColor(score: number | null): string {
  if (score === null) return colors.track;
  if (score > 70) return '#8EE3B5';
  if (score >= 40) return '#FFD66B';
  return '#FF7A6B';
}

// Solid pastel fills with ink text/border, straight from the prototype.
export const priorityStyles: Record<Priority, { bg: string }> = {
  Critical: { bg: '#FF7A6B' },
  High: { bg: '#FFA36B' },
  Medium: { bg: '#FFD66B' },
  Low: { bg: '#FFF0B8' },
  Passing: { bg: '#8EE3B5' },
};

/** White card with the hard ink border and offset shadow used across the scan page. */
export const inkCardSx = {
  bgcolor: 'background.paper',
  border: `2px solid ${colors.ink}`,
  borderRadius: '20px',
  boxShadow: `6px 6px 0 ${colors.ink}`,
} as const;

/** Small green result pill, e.g. "✓ #3" or "In stock". */
export const greenPillSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  bgcolor: '#8EE3B5',
  color: colors.ink,
  border: `1px solid ${colors.ink}`,
  borderRadius: 999,
  px: '10px',
  py: '4px',
  fontWeight: 800,
  fontSize: 12,
  whiteSpace: 'nowrap',
} as const;

/** Small white inner chip used for the decorative demos in the seven-areas cards. */
export const demoChipSx = {
  bgcolor: 'background.paper',
  border: `2px solid ${colors.ink}`,
  borderRadius: '12px',
  boxShadow: `3px 3px 0 ${colors.ink}`,
  transform: 'rotate(2deg)',
  p: '14px',
  width: '100%',
  maxWidth: 230,
} as const;

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
