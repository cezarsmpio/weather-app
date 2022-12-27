export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const combine = (data: Record<string, any>) => {
  const keys = Object.keys(data);

  if (keys.length === 0) return [];

  return Object.values(data)[0].map((_, index) => {
    return Object.fromEntries(keys.map((key) => [key, data[key][index]]));
  });
};
