export class DigitCodeProvider {
  private static padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  static generate(): string {
    const now = new Date();

    // Using template literals for formatting
    const formattedTime = `${this.padZero(now.getHours())}${this.padZero(
      now.getMinutes()
    )}${this.padZero(now.getSeconds())}${now
      .getMilliseconds()
      .toString()
      .slice(-3)}`;

    // Return the last 4 characters
    return formattedTime.slice(-4);
  }
}
