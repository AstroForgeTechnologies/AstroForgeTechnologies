import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer px-2 text-black hover:opacity-[0.9] dark:text-white"
        onMouseEnter={() => setActive(item)}
      >
        {item}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={transition}
      >
        <AnimatePresence>
          {active === item && (
            <div
              className="z-100 absolute left-1/2 top-[calc(100%_+_1.7rem)] -translate-x-1/2 transform pb-2 pl-2 pr-2"
              id={item}
            >
              <motion.div
                transition={transition}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                layoutId="active" // layoutId ensures smooth animation
                className="overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full w-max p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="justify-center p-3"
      onMouseLeave={() => setActive(null)} // resets the state
    >
      <nav className="shadow-input relative flex justify-center space-x-4 rounded-full px-8 py-6 ">
        {children}
      </nav>
    </div>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
          {title}
        </h4>
        <p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 hover:text-black dark:text-neutral-200 "
    >
      {children}
    </a>
  );
};
