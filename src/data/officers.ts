export interface Officer {
  name: string;
  role: string;
  grade?: string;
  image?: string;
  description?: string;
}
export const officers: Officer[] = [];
export const chapterStats: { label: string; value: string }[] = [];
export const openPositions: string[] = [];
