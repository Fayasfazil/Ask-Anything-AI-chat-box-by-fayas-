export enum ContentType {
  Article = 'Article',
  Summary = 'Summary',
  Caption = 'Social Media Caption',
  Paragraph = 'Paragraph',
}

export interface SavedItem {
  id: string;
  prompt: string;
  contentType: ContentType;
  content: string;
  timestamp: number;
  creativityLevel?: number;
  responseLength?: ResponseLength;
}

export type FontTheme = 'cyberpunk' | 'retro' | 'modern';

export type ResponseLength = 'short' | 'medium' | 'long';