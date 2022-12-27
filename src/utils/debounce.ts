export const debounce = (fn, delay = 300) => {
  let timeout;

  return (...params) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...params), delay);
  };
};
