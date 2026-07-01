const SCALE = 10;

export const formatCgpa = (value: number): string => `${value.toFixed(1)}/${SCALE}`;

export const getCgpaPercentage = (value: number): string => `${(value * SCALE).toFixed(0)}%`;
