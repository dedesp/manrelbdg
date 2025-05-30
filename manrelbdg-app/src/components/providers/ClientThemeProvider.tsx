'use client';

import React, { useEffect } from 'react';
import { generateCSSVariables } from '@/hooks/useClientConfig';

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  useEffect(() => {
    // Generate and inject CSS variables
    const cssVariables = generateCSSVariables();
    
    // Create or update style element
    let styleElement = document.getElementById('client-theme-variables');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'client-theme-variables';
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = cssVariables;
  }, []);

  return <>{children}</>;
}
