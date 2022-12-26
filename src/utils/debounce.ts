export const debounce = (fn, delay = 300) => {
  let timeout;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
};
