export const DEFAULT_OBFUSCATED_MATRIX_VERSIONS = [
  '1.21.11',
  '1.21.10',
  '1.20.1',
  '1.19.4',
] as const;
export const DEFAULT_UNOBFUSCATED_MATRIX_VERSIONS = [
  '26.1-snapshot-1',
  '26.1-snapshot-8',
  '26.1-snapshot-9',
] as const;

function isUnobfuscatedSnapshot(version: string): boolean {
  return /^26\.1-snapshot-\d+$/.test(version);
}

export function parseMatrixVersionsFromEnv(): {
  obfuscatedVersions: string[];
  unobfuscatedVersions: string[];
} {
  const envList = process.env.MCP_E2E_VERSIONS?.trim();
  if (!envList) {
    return {
      obfuscatedVersions: [...DEFAULT_OBFUSCATED_MATRIX_VERSIONS],
      unobfuscatedVersions: [...DEFAULT_UNOBFUSCATED_MATRIX_VERSIONS],
    };
  }

  const requested = envList
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const obfuscatedVersions = requested.filter((version) => !isUnobfuscatedSnapshot(version));
  const unobfuscatedVersions = requested.filter(isUnobfuscatedSnapshot);

  return {
    obfuscatedVersions,
    unobfuscatedVersions,
  };
}
