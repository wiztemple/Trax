import formatDuration from "format-duration";

export const formatTime = (timeInSeconds = 0) => {
  const duration = formatDuration(timeInSeconds * 1000);
  return duration.replace(/^0:/, "");
};

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
