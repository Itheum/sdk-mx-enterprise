export function checkVersionFormat(version: string) {
  const versionRegex = /^\d+\.\d+\.\d+$/;
  if (!versionRegex.test(version)) {
    throw new Error('Invalid version format. Must be in the format 0.0.0');
  }
}
