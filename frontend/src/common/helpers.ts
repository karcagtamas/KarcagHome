export const toLocalDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const fromLocalDate = (d: string): Date => {
  const parts = d.split('-');

  return new Date(+parts[0], +parts[1], +parts[2]);
};
