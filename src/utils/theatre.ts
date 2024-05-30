import * as theatreCore from "@theatre/core";

/**
 * Export Types properly, does not from work importing directly, or importing default export.
 */
export const { getProject, types, onChange, val } =
  typeof window !== "undefined"
    ? theatreCore
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((theatreCore as any).default as typeof theatreCore);
