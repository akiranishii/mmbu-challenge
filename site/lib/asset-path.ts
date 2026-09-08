/** Prefix public files for GitHub project Pages while keeping localhost at /. */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}
