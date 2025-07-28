import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge classes with tailwind-merge with clsx full feature
 * This combines clsx's conditional class handling with tailwind-merge's
 * intelligent merging of Tailwind CSS classes
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
