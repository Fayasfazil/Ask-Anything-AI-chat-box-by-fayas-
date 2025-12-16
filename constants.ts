import { ContentType, FontTheme } from './types';

export const CONTENT_TYPE_OPTIONS = [
  { value: ContentType.Article, label: 'Article' },
  { value: ContentType.Summary, label: 'Summary' },
  { value: ContentType.Caption, label: 'Social Media Caption' },
  { value: ContentType.Paragraph, label: 'Paragraph' },
];

export const FONT_THEME_OPTIONS: { value: FontTheme; label: string }[] = [
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'retro', label: 'Retro Term' },
  { value: 'modern', label: 'Modern Core' },
];

export const FONT_THEMES: Record<FontTheme, { display: string; body: string }> = {
  cyberpunk: { display: '"Orbitron", sans-serif', body: '"Roboto Mono", monospace' },
  retro: { display: '"VT323", monospace', body: '"Share Tech Mono", monospace' },
  modern: { display: '"Exo 2", sans-serif', body: '"Space Mono", monospace' },
};