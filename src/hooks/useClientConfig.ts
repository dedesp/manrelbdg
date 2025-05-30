// Custom hook for using client configuration throughout the application
import { clientConfig, ClientConfig } from '@/config/client.config'

export const useClientConfig = (): ClientConfig => {
  return clientConfig
}

// Utility functions for easy access to specific config sections
export const useBranding = () => {
  return clientConfig.branding
}

export const useContent = () => {
  return clientConfig.content  
}

export const useStyling = () => {
  return clientConfig.styling
}

export const useRegional = () => {
  return clientConfig.regional
}

export const useFeatures = () => {
  return clientConfig.features
}

// Theme provider utility for CSS-in-JS
export const getThemeColors = () => {
  return clientConfig.branding.colors
}

// Utility for generating CSS custom properties
export const generateCSSVariables = () => {
  const colors = clientConfig.branding.colors
  const layout = clientConfig.styling.layout
  const typography = clientConfig.styling.typography
  
  return `
    :root {
      /* Colors */
      --primary-color: ${colors.primary};
      --primary-hover: ${colors.primaryHover};
      --secondary-color: ${colors.secondary};
      --accent-color: ${colors.accent};
      --background-color: ${colors.background};
      --background-dark: ${colors.backgroundDark};
      --text-primary: ${colors.textPrimary};
      --text-secondary: ${colors.textSecondary};
      --sidebar-bg: ${colors.sidebarBg};
      --sidebar-text: ${colors.sidebarText};
      --sidebar-hover: ${colors.sidebarHover};
      --header-bg: ${colors.headerBg};
      --header-text: ${colors.headerText};
      --card-bg: ${colors.cardBg};
      --border-color: ${colors.borderColor};
      --success-color: ${colors.successColor};
      --warning-color: ${colors.warningColor};
      --error-color: ${colors.errorColor};
      --info-color: ${colors.infoColor};
      
      /* Layout */
      --sidebar-width: ${layout.sidebarWidth};
      --sidebar-collapsed-width: ${layout.sidebarCollapsedWidth};
      --header-height: ${layout.headerHeight};
      --content-padding: ${layout.contentPadding};
      --border-radius: ${layout.borderRadius};
      --box-shadow: ${layout.boxShadow};
      
      /* Typography */
      --font-family: ${typography.fontFamily};
      --font-size-xs: ${typography.fontSize.xs};
      --font-size-sm: ${typography.fontSize.sm};
      --font-size-base: ${typography.fontSize.base};
      --font-size-lg: ${typography.fontSize.lg};
      --font-size-xl: ${typography.fontSize.xl};
      --font-size-2xl: ${typography.fontSize['2xl']};
      --font-size-3xl: ${typography.fontSize['3xl']};
      --font-size-4xl: ${typography.fontSize['4xl']};
    }
  `
}

// Utility for date formatting based on regional settings
export const formatDate = (date: Date): string => {
  const { dateFormat, locale } = clientConfig.regional
  
  if (dateFormat === 'DD/MM/YYYY') {
    return date.toLocaleDateString('id-ID')
  } else if (dateFormat === 'MM/DD/YYYY') {
    return date.toLocaleDateString('en-US')
  }
  
  return date.toLocaleDateString(locale)
}

// Utility for number formatting based on regional settings
export const formatNumber = (number: number): string => {
  const { numberFormat } = clientConfig.regional
  
  return number.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).replace(',', numberFormat.decimal).replace(/\./g, numberFormat.thousands)
}

// Utility for currency formatting
export const formatCurrency = (amount: number): string => {
  const { currency } = clientConfig.regional
  
  if (currency === 'IDR') {
    return `Rp ${formatNumber(amount)}`
  }
  
  return `${currency} ${formatNumber(amount)}`
}

// Utility to check if feature is enabled
export const isFeatureEnabled = (featurePath: string): boolean => {
  const pathArray = featurePath.split('.')
  let current: any = clientConfig.features
  
  for (const path of pathArray) {
    if (current[path] === undefined) return false
    current = current[path]
  }
  
  return Boolean(current)
}

// Utility to get translated text
export const getText = (path: string, fallback?: string): string => {
  const pathArray = path.split('.')
  let current: any = clientConfig.content
  
  for (const pathSegment of pathArray) {
    if (current[pathSegment] === undefined) {
      return fallback || path
    }
    current = current[pathSegment]
  }
  
  return current || fallback || path
}

// Export the config for direct access when needed
export { clientConfig }
export type { ClientConfig } from '@/config/client.config'
