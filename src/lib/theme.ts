export const breakpoints = {
  xs: 380,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
  xxl: 1400,
  xxxl: 1640,
};

const theme = {
  breakpointsVariables: breakpoints,
  pageMaxWidth: `${breakpoints.xxl}px`,
  breakpoints: {
    xs: `@media only screen and (min-width: ${breakpoints.xs}px)`,
    s: `@media only screen and (min-width: ${breakpoints.s}px)`,
    m: `@media only screen and (min-width: ${breakpoints.m}px)`,
    l: `@media only screen and (min-width: ${breakpoints.l}px)`,
    xl: `@media only screen and (min-width: ${breakpoints.xl}px)`,
    xxl: `@media only screen and (min-width: ${breakpoints.xxl}px)`,
    xxxl: `@media only screen and (min-width: ${breakpoints.xxxl}px)`,
  },
  fontSize: {
    landing: "9rem",
    xxxl: "7.2rem",
    xxl: "4.8rem",
    xl: "3.2rem",
    l: "2.4rem",
    m: "2rem",
    s: "1.6rem",
    xs: "1.4rem",
    xxs: "1.2rem",
  },
  colors: {
    white: "var(--color-white)",
    black: "var(--color-black)",
		blue: {
			100: "var(--color-blue-100)",
			200: "var(--color-blue-200)",
			300: "var(--color-blue-300)",
		}
  },
  shadows: {
    default: "var(--box-shadow-default)",
  },
};

export default theme;
