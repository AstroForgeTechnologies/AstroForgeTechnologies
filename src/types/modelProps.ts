import { types } from "@utils/theatre.ts";
import type { UnknownShorthandCompoundProps } from "@theatre/core";

export default {
  opacity: types.number(1, { range: [0, 1] }),
} as UnknownShorthandCompoundProps;
