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

export const generateFileHash = async (file: Blob): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.slice(0, 20);
};
