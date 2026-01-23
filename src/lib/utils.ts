import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve caminhos de assets da pasta public considerando o base path do Vite.
 * Necessário para funcionamento correto no GitHub Pages.
 */
export const getAssetPath = (path: string): string => {
  const basePath = import.meta.env.BASE_URL;
  const cleanPath = path.replace(/^\//, "");
  return `${basePath}${cleanPath}`;
};
