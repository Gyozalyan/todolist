export function formatDate(date) {

    if (date instanceof Date) {
      return date.toISOString().slice(0, 10);
    }
    if (typeof date === "string") {
      return date.slice(0, 10);
    }
    throw new Error("Date must be object or string");
  }
  
  export function truncateText(text = '', maxLength = 30) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }