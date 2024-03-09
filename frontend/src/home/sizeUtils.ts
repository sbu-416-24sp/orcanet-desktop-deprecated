export const sizeToBytes = (size: string) => {
    const units = { KiB: 1024, MiB: 1024 * 1024, GiB: 1024 * 1024 * 1024 };
    const match = size.match(/(\d+(?:\.\d+)?)\s*(KiB|MiB|GiB)/);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = match[2] as keyof typeof units;
      return value * units[unit];
    }
    return 0;
  };

