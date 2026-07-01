const SCALE = 10;

export const formatCgpa = (value: number): string => {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded.toFixed(1)}/${SCALE}`;
};

export const getCgpaPercentage = (value: number): string => `${Math.round(value * SCALE)}%`;

