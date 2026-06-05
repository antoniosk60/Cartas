export type PageId = 'home' | 'rara' | 'dificil' | 'aburrida' | 'extranas' | 'triste' | 'feliz' | 'fisico' | 'cerca';

export interface SectionCard {
  id: PageId;
  title: string;
  question: string;
  color: string; // Tailwind class background
  hoverColor: string; // Hover background
  emoji: string;
}
