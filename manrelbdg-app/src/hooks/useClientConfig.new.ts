// Custom hook for using client configuration throughout the application
import { CLIENT_CONFIG, ClientConfig } from '@/config/client.config'

export const useClientConfig = (): ClientConfig => {
  return CLIENT_CONFIG
}

// Utility functions for easy access to specific config sections
export const useBranding = () => {
  return CLIENT_CONFIG.branding
}

export const useContent = () => {
  return CLIENT_CONFIG.content  
}

export const useRegional = () => {
  return CLIENT_CONFIG.regional
}

export const useFeatures = () => {
  return CLIENT_CONFIG.features
}

// Theme provider utility for CSS-in-JS
export const getThemeColors = () => {
  return CLIENT_CONFIG.branding.colors
}

// Utility for generating CSS custom properties
export const generateCSSVariables = () => {
  const colors = CLIENT_CONFIG.branding.colors
  
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
    }
  `
}

// Utility for date formatting based on regional settings
export const formatDate = (date: Date): string => {
  const { dateFormat } = CLIENT_CONFIG.regional
  
  if (dateFormat === 'DD/MM/YYYY') {
    return date.toLocaleDateString('id-ID')
  } else if (dateFormat === 'MM/DD/YYYY') {
    return date.toLocaleDateString('en-US')
  }
  
  return date.toLocaleDateString(CLIENT_CONFIG.regional.locale)
}

// Utility for number formatting based on regional settings
export const formatNumber = (number: number): string => {
  const { numberFormat } = CLIENT_CONFIG.regional
  
  return number.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).replace(',', ',').replace(/\./g, '.')
}

// Utility for currency formatting
export const formatCurrency = (amount: number): string => {
  const { currency } = CLIENT_CONFIG.regional
  
  if (currency === 'IDR') {
    return `Rp ${formatNumber(amount)}`
  }
  
  return `${currency} ${formatNumber(amount)}`
}

// Utility to check if feature is enabled
export const isFeatureEnabled = (featurePath: string): boolean => {
  const pathArray = featurePath.split('.')
  let current: any = CLIENT_CONFIG.features
  
  for (const path of pathArray) {
    if (current[path] === undefined) return false
    current = current[path]
  }
  
  return Boolean(current)
}

// Utility to get translated text
export const getText = (path: string, fallback?: string): string => {
  const pathArray = path.split('.')
  let current: any = CLIENT_CONFIG.content
  
  for (const pathSegment of pathArray) {
    if (current[pathSegment] === undefined) {
      return fallback || path
    }
    current = current[pathSegment]
  }
  
  return current || fallback || path
}

// Export the config for direct access when needed
export { CLIENT_CONFIG }
export type { ClientConfig } from '@/config/client.config'
