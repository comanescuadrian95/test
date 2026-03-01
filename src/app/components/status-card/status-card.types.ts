export type Color = 'primary' | 'success' | 'warning' | 'danger' | 'attention';

export type ColorToken = Readonly<{
  surface: string;
  text: string;
}>;

export const COLOR_TOKENS: Readonly<Record<Color, ColorToken>> = {
  primary: {
    surface: 'var(--status-card-primary-surface)',
    text: 'var(--status-card-primary-text)',
  },
  success: {
    surface: 'var(--status-card-success-surface)',
    text: 'var(--status-card-success-text)',
  },
  warning: {
    surface: 'var(--status-card-warning-surface)',
    text: 'var(--status-card-warning-text)',
  },
  danger: {
    surface: 'var(--status-card-danger-surface)',
    text: 'var(--status-card-danger-text)',
  },
  attention: {
    surface: 'var(--status-card-attention-surface)',
    text: 'var(--status-card-attention-text)',
  },
};
