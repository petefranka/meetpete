import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { colors } from '../../../theme';

interface LogoProps {
  size?: number | string | Record<string, number | string>;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

/** Meet Pete speech-mark logo. Decorative; give the parent link the accessible name. */
export function Logo({ size = 40, fill = colors.pink, stroke = colors.ink, strokeWidth = 6 }: LogoProps) {
  const path =
    'M24,6 H68 Q86,6 86,24 V58 Q86,76 68,76 H42 L22,94 L26,76 H24 Q6,76 6,58 V24 Q6,6 24,6 Z';
  return (
    <Box
      component="svg"
      viewBox="0 0 100 100"
      aria-hidden
      sx={{ width: size, height: size, overflow: 'visible', flex: 'none', display: 'block' }}
    >
      <path d={path} transform="translate(5 5)" fill={stroke} />
      <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <rect x={29} y={25} width={11} height={42} rx={2} fill={colors.ink} />
      <circle cx={50} cy={39} r={12} fill="none" stroke={colors.ink} strokeWidth={11} />
    </Box>
  );
}

interface PinkDotProps {
  size?: number;
  color?: string;
  bordered?: boolean;
}

export function PinkDot({ size = 10, color = colors.pink, bordered = true }: PinkDotProps) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: color,
        border: bordered ? `1.5px solid ${colors.ink}` : 'none',
        flex: 'none',
      }}
    />
  );
}

/** Rotated pink highlight behind a word in a heading. */
export function Highlight({ children, hero = false }: { children: ReactNode; hero?: boolean }) {
  return (
    <Box
      component="span"
      className="pm-wiggle"
      sx={{
        display: 'inline-block',
        bgcolor: 'secondary.main',
        px: hero ? { xs: '0.16em', md: '0.18em' } : '0.14em',
        mt: hero ? { xs: '6px', md: 0 } : 0,
        border: `${hero ? 3 : 2}px solid ${colors.ink}`,
        boxShadow: hero
          ? { xs: `5px 5px 0 ${colors.ink}`, md: `6px 6px 0 ${colors.ink}` }
          : `4px 4px 0 ${colors.ink}`,
        transform: 'rotate(-1.5deg)',
      }}
    >
      {children}
    </Box>
  );
}

/** Dark CTA with offset pink shadow — the hero "Book a free call" treatment. */
export const PrimaryCta = styled(Button)({
  borderRadius: 14,
  padding: '15px 26px',
  fontSize: 17,
  color: colors.bg,
  background: colors.ink,
  border: `2px solid ${colors.ink}`,
  boxShadow: `4px 4px 0 ${colors.pink}`,
  gap: 10,
  '&:hover': { background: '#3A3733' },
}) as typeof Button;

/** White pill CTA with offset ink shadow, pink on hover. */
export const OutlineCta = styled(Button)({
  borderRadius: 999,
  padding: '11px 22px',
  fontSize: 16,
  color: colors.ink,
  background: colors.white,
  border: `2px solid ${colors.ink}`,
  boxShadow: `3px 3px 0 ${colors.ink}`,
  gap: 10,
  '&:hover': { background: colors.pink },
}) as typeof Button;

/** White rounded-rectangle secondary action with no shadow. */
export const SecondaryCta = styled(Button)({
  borderRadius: 14,
  padding: '13px 26px',
  fontSize: 16,
  color: colors.ink,
  background: colors.white,
  border: `2px solid ${colors.ink}`,
  '&:hover': { background: colors.hoverPink },
}) as typeof Button;

/** Outlined pill used for header menu, reveal prices and panel toggles. */
export const PillButton = styled(Button)({
  borderRadius: 999,
  padding: '10px 20px',
  fontSize: 14,
  fontWeight: 600,
  color: colors.ink,
  background: 'transparent',
  border: `1px solid ${colors.ink}`,
  gap: 10,
  '&:hover': { background: 'rgba(26,25,24,0.05)' },
}) as typeof Button;

/** Striped placeholder portrait disc. */
export function Portrait({ size = 52, pink = false }: { size?: number; pink?: boolean }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flex: 'none',
        borderRadius: '50%',
        background: pink
          ? `repeating-linear-gradient(135deg,${colors.pink} 0 5px,#FFB3D9 5px 10px)`
          : `repeating-linear-gradient(135deg,${colors.border} 0 5px,${colors.track} 5px 10px)`,
      }}
    />
  );
}

const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
} as const;

const fieldSx = {
  width: '100%',
  font: 'inherit',
  fontSize: 15,
  color: colors.ink,
  bgcolor: colors.white,
  border: `1.5px solid ${colors.input}`,
  borderRadius: '12px',
  px: { xs: '14px', md: '16px' },
  py: '13px',
  outline: 'none',
  transition: 'border-color 0.2s',
  '&:focus': { borderColor: colors.ink },
  '&::placeholder': { color: colors.faint },
} as const;

/** Brand text input. Pass label for an accessible name (rendered visually hidden). */
export function TextInput({
  label,
  ...props
}: { label: string } & React.ComponentProps<'input'>) {
  return (
    <Box component="label" sx={{ display: 'block' }}>
      <Box component="span" sx={visuallyHidden}>
        {label}
      </Box>
      <Box component="input" aria-label={label} sx={fieldSx} {...props} />
    </Box>
  );
}

/** Brand textarea. Pass label for an accessible name (rendered visually hidden). */
export function TextArea({
  label,
  ...props
}: { label: string } & React.ComponentProps<'textarea'>) {
  return (
    <Box component="label" sx={{ display: 'block' }}>
      <Box component="span" sx={visuallyHidden}>
        {label}
      </Box>
      <Box component="textarea" aria-label={label} sx={{ ...fieldSx, minHeight: 120, resize: 'vertical' }} {...props} />
    </Box>
  );
}
