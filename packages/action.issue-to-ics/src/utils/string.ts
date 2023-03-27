/**
 * Converts a given string into an object.
 * The string is separated by newline characters, and each line contains a key-value pair separated by a colon (:).
 * This function ignores empty lines and adds valid key-value pairs to the object.
 *
 * @param input - The string to convert
 * @returns The converted object
 */
export function stringToObject(input: string): Record<string, string> {
  return input
    .split('\n')
    .filter((line) => line.trim()) // Remove empty lines.
    .reduce((acc: Record<string, string>, line: string) => {
      const [key, value] = line.split(':').map((item) => item.trim());
      return { ...acc, [key]: value };
    }, {});
}
