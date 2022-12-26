export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const combine = (data: Record<string, any>) => {
  const keys = Object.keys(data);

  return Object.values(data)[0].map((_, index) => {
    return Object.fromEntries(keys.map((key) => [key, data[key][index]]));
  });
};
