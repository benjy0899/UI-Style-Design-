export interface UIStyle {
  id: number;
  name: string;
  fonts: {
    primary: string;
    secondary: string;
  };
  colors: {
    primary: string;
    accent: string;
    dark: string;
    light: string;
    [key: string]: string;
  };
  layout: string;
  style: string;
  previewConfig: {
    palette: {
      bg: string;
      text: string;
      primary: string;
      accent: string;
      neutral: string;
      [key: string]: string;
    };
    buttonClasses: string;
    cardClasses: string;
    cardPrimaryClasses: string;
    containerClasses: string;
    headerClasses: string;
    tagClasses: string;
    iconButtonClasses: string;
    // New properties for shadcn-style dashboard
    inputClasses?: string;
    tabClasses?: {
      container?: string;
      base?: string;
      active?: string;
      inactive?: string;
    };
    kpiCardClasses?: string;
    avatarClasses?: string;
  };
}
