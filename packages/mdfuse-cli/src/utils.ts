// Props https://stackoverflow.com/a/70029241/198232
// deno-lint-ignore ban-types
export function hasKey<K extends string, T extends object>(
  k: K,
  o: T
): o is T & Record<K, unknown> {
  return k in o;
}
