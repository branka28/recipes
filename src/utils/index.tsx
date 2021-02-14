export const calculateTime = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return hours + "H " + minutes + "M";
};

export const showShortenText = (text: string, max: number) => {
  if (text.length <= max) return text;
  return text.substr(0, text.lastIndexOf(" ", max)) + "...";
};
