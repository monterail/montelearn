import { SCREEN } from "@/constants/breakpoints";

export const isMobile = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.innerWidth < SCREEN.SM;
};
