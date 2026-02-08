/**
 * Converts a time string from 12-hour format to 24-hour format with seconds.
 *
 * @param {string} time - The time string in 12-hour format (e.g., "01:30 PM").
 * @returns {string} The time string converted to 24-hour format with seconds.
 */
export const convertTo24HourFormat = (time: string): string => {
  const [hour, minute, period] = time.split(/:|\s/);
  const isPM = period.toLowerCase() === "pm";
  const formattedHour = isPM ? parseInt(hour, 10) + 12 : parseInt(hour, 10);
  return `${formattedHour.toString().padStart(2, "0")}:${minute}:00`;
};

/**
 * Recursively processes nested objects and converts time properties to 24-hour format.
 *
 * @param {Record<string, any>} obj - The object to process.
 */
export const processNestedObjects = (obj: Record<string, any>): void => {
  try {
    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === "string" &&
        value.match(/^(0[1-9]|1[0-2]):[0-5][0-9] [APMapm]{2}$/)
      ) {
        obj[key] = convertTo24HourFormat(value);
      } else if (typeof value === "object" && value !== null) {
        processNestedObjects(value);
      }
    }
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error.message);
  }
};
