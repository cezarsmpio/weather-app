export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  }
) => {
  return new Intl.DateTimeFormat(undefined, options).format(date);
};
