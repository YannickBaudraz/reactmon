export {}

declare global {
  interface String {
    /**
     * Returns a new string with the first character converted to uppercase and the remaining characters converted to lowercase.
     */
    capitalize(): string;
  }
}

String.prototype.capitalize = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
