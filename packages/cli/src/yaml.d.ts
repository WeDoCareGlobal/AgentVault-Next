declare module "yaml" {
  export function parse(input: string, options?: unknown): unknown;
  export function stringify(input: unknown, options?: unknown): string;
}
