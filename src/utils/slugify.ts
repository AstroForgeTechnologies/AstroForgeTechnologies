import slug from "slug";
import { unemojify } from "node-emoji";

slug.extend({ _: "-" });

export function slugifyStr(str: string): string {
  return slug(unemojify(str));
}
