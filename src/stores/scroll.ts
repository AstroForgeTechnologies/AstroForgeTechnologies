import { type Readable } from "svelte/store";
import { spring, tweened } from "svelte/motion";
import { currentWritable } from "@threlte/core";
import { derived } from "svelte/store";

export interface Settable<T> extends Readable<T> {
  setHard(this: void, value: T): void;
  set(this: void, value: T): void;
}

function createScrollStores(
  createSpring: boolean,
  createTweened: boolean,
): {
  scrollY: Settable<number>;
  springY?: Readable<number>;
  tweenedY?: Readable<number>;
} {
  const scrollY = currentWritable(0);

  const springYFound = createSpring
    ? spring(0, {
        precision: 0.0000001,
        damping: 0.95,
        stiffness: 0.1,
      })
    : undefined;

  const springY = springYFound
    ? derived(springYFound, _springYFound => Math.max(0, _springYFound))
    : undefined;

  const tweenedY = createTweened
    ? tweened(0, {
        duration: 100,
      })
    : undefined;

  return {
    scrollY: {
      subscribe: scrollY.subscribe,
      setHard: value => {
        scrollY.set(value);
        tweenedY?.set(value, { duration: 0 });
        springYFound?.set(value, { hard: true });
      },
      set: value => {
        scrollY.set(value);
        tweenedY?.set(value);
        springYFound?.set(value);
      },
    },
    springY: springY
      ? {
          subscribe: springY.subscribe,
        }
      : undefined,
    tweenedY: tweenedY
      ? {
          subscribe: tweenedY.subscribe,
        }
      : undefined,
  };
}

// No spring needed for normal scroll yet
const scrollStores = createScrollStores(false, true);

// No tweened needed for paged scroll yet
const scrollPagedStores = createScrollStores(true, false);

export default scrollStores.scrollY;
export const tweenedY = scrollStores.tweenedY!;

// get normalized scroll position in document. 0 should equal top of page, 1
// should equal 1 page height from top, 2 should equal 2 page heights from
// top, etc. This allows easier addition of content to the bottom as opposed
// to a normalized scroll position where 1 is the bottom of the page.
// (From https://github.com/threlte/threlte/blob/main/apps/docs/src/components/Hero/HeroWrapper.svelte#L22-L30)
export const scrollPagedY = scrollPagedStores.scrollY;
export const springPagedY = scrollPagedStores.springY!;
