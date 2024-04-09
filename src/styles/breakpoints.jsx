import { useMediaQuery } from "react-responsive";

export const MF_BREAKPOINTS = {
  mobileSm: "320px",
  mobile: "375px",
  tabletSm: "640px",
  tablet: "768px",
  tabletLg: "900px",
  tabletXLg: "1024px",
  desktopSm: "1280px",
  desktop: "1440px",
};

export const smMobileMF = `(min-width: ${MF_BREAKPOINTS.mobileSm})`;
export const mobileMF = `(min-width: ${MF_BREAKPOINTS.mobile})`;
export const smTabletMF = `(min-width: ${MF_BREAKPOINTS.tabletSm})`;
export const tabletMF = `(min-width: ${MF_BREAKPOINTS.tablet})`;
export const lgTabletMF = `(min-width: ${MF_BREAKPOINTS.tabletLg})`;
export const xlgTabletMF = `(min-width: ${MF_BREAKPOINTS.tabletXLg})`;
export const smDesktopMF = `(min-width: ${MF_BREAKPOINTS.desktopSm})`;
export const desktopMF = `(min-width: ${MF_BREAKPOINTS.desktop})`;

export const useQuery = () => {
  const queries = {
    isSmMobile: useMediaQuery({ query: smMobileMF }),
    isMobile: useMediaQuery({ query: mobileMF }),
    isTabletOrMobile: useMediaQuery({ query: tabletMF }),
    isTablet: useMediaQuery({ query: tabletMF }),
    isLgTablet: useMediaQuery({ query: lgTabletMF }),
    isXlgTablet: useMediaQuery({ query: xlgTabletMF }),
    isSmDesktop: useMediaQuery({ query: smDesktopMF }),
  };

  return queries;
};
