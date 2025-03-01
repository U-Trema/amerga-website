export const getSize = (data: string) => {
  if (!data) return 'medium'

  const value = Number(data);

  if (value >= 10000) {
    return 'small';
  } else if (value >= 1000) {
    return 'medium';
  } else {
    return 'large';
  }
}
