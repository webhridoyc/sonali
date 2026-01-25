import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function get(obj: any, path: string, defaultValue: any = undefined) {
  const result = path
    .split('.')
    .reduce((acc, part) => acc && acc[part], obj);
  return result === undefined ? defaultValue : result;
}
