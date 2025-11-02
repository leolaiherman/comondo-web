// COMONDO Design System
// Comprehensive design tokens for consistent UI/UX

export const colors = {
  // Primary palette
  primary: {
    forest: '#0C4D38',      // Deep forest green - main brand
    forestLight: '#1a6d52', // Lighter forest for hovers
    forestDark: '#084030',  // Darker for text
  },

  // Secondary palette
  secondary: {
    orange: '#E2861D',      // Warm orange - energy & transformation
    orangeLight: '#f5a145', // Lighter orange for hovers
    orangeDark: '#c47116',  // Darker orange
  },

  // Accent colors
  accent: {
    coconutWhite: '#F8F6F0', // Fresh coconut white
    success: '#339777',      // Vibrant green for CTAs
    successHover: '#2d8566', // Success hover state
  },

  // Neutral palette
  neutral: {
    black: '#1A1A1A',       // Carbon black for tech sections
    gray900: '#2D2D2D',
    gray800: '#404040',
    gray700: '#575757',
    gray600: '#737373',
    gray500: '#8C8C8C',
    gray400: '#A6A6A6',
    gray300: '#C4C4C4',
    gray200: '#E0E0E0',
    gray100: '#F0F0F0',
    gray50: '#F8F8F8',
    white: '#FFFFFF',
  },

  // Semantic colors
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
};

export const typography = {
  // Font families
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },

  // Font sizes (using a modular scale)
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  // Line heights
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Font weights
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
};

export const spacing = {
  // Spacing scale (based on 4px grid)
  px: '1px',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
};

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  base: '0.5rem',   // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
  full: '9999px',
};

export const shadows = {
  // Elevation system
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

  // Custom shadows
  card: '0 4px 12px rgba(0, 0, 0, 0.08)',
  cardHover: '0 8px 24px rgba(0, 0, 0, 0.12)',
  button: '0 2px 8px rgba(51, 151, 119, 0.2)',
  buttonHover: '0 4px 16px rgba(51, 151, 119, 0.3)',
};

export const transitions = {
  // Duration
  duration: {
    fast: '150ms',
    base: '200ms',
    medium: '300ms',
    slow: '500ms',
  },

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.45, 0, 0.15, 1)',
  },
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
};

// Animation presets for GSAP
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    duration: 0.8,
    ease: 'power2.out',
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    duration: 0.6,
    ease: 'power2.out',
  },

  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    duration: 0.8,
    ease: 'power2.out',
  },

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    duration: 0.8,
    ease: 'power2.out',
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    duration: 0.6,
    ease: 'power2.out',
  },

  staggerChildren: {
    stagger: 0.1,
    duration: 0.5,
  },
};

// Layout constraints
export const layout = {
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    full: '100%',
  },

  containerPadding: {
    mobile: '1rem',      // 16px
    tablet: '2rem',      // 32px
    desktop: '4rem',     // 64px
  },
};
