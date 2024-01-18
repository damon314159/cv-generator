// Converts camelCase or PascalCase to Title Case
export default function titleCase(str: string): string {
  return (
    str
      // Insert spaces before capitals
      .replace(/[A-Z]/g, (char) => ` ${char}`)
      // Capitalise starting letter
      .replace(/^[a-z]/, (char) => char.toUpperCase())
      // Trim extra whitespace in front of PascalCase
      .trim()
  )
}
