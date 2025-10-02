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
    success?: string;
    warning?: string;
    error?: string;
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
      success?: string;
      warning?: string;
      error?: string;
      [key: string]: string;
    };
    buttonClasses: string;
    cardClasses: string;
    cardPrimaryClasses: string;
    containerClasses: string;
    headerClasses: string;
    tagClasses: string;
    iconButtonClasses: string;
    // Enhanced properties for comprehensive UI
    inputClasses?: string;
    selectClasses?: string;
    textareaClasses?: string;
    tabClasses?: {
      container?: string;
      base?: string;
      active?: string;
      inactive?: string;
    };
    kpiCardClasses?: string;
    avatarClasses?: string;
    badgeClasses?: string;
    progressClasses?: string;
    navLinkClasses?: string;
  };
}

export interface CustomizationOptions {
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing: 'tight' | 'normal' | 'relaxed' | 'loose';
  shadows: 'none' | 'subtle' | 'medium' | 'strong';
  animations: 'none' | 'subtle' | 'normal' | 'playful';
}
