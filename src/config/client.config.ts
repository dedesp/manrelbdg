// Client Configuration for MANRELBDG Application
// This file contains all customizable settings for different clients

export interface ClientConfig {
  // Client Information
  client: {
    name: string
    code: string
    region: string
    version: string
    environment: 'development' | 'staging' | 'production'
  }
  
  // Branding Configuration
  branding: {
    appName: string
    appNameShort: string
    appTagline: string
    appInitial: string
    logoPath?: string
    faviconPath?: string
    colors: {
      primary: string
      primaryHover: string
      secondary: string
      accent: string
      background: string
      backgroundDark: string
      textPrimary: string
      textSecondary: string
      sidebarBg: string
      sidebarText: string
      sidebarHover: string
      headerBg: string
      headerText: string
      cardBg: string
      borderColor: string
      successColor: string
      warningColor: string
      errorColor: string
      infoColor: string
    }
  }
  
  // Content and Text Configuration
  content: {
    // Navigation Menu Labels
    navigation: {
      dashboard: string
      dataManagement: string
      relawan: string
      koordinator: string
      dapil: string
      reports: string
      import: string
      export: string
      settings: string
    }
    
    // Page Content
    pages: {
      dashboard: {
        title: string
        subtitle: string
        welcomeMessage: string
      }
      relawan: {
        title: string
        description: string
        addButtonText: string
      }
      koordinator: {
        title: string
        description: string
        addButtonText: string
      }
      dapil: {
        title: string
        description: string
        addButtonText: string
      }
      reports: {
        title: string
        description: string
      }
      import: {
        title: string
        description: string
        uploadText: string
        supportedFormats: string
      }
      export: {
        title: string
        description: string
        downloadText: string
      }
      settings: {
        title: string
        description: string
      }
    }
    
    // Form Labels
    forms: {
      common: {
        name: string
        email: string
        phone: string
        address: string
        submit: string
        cancel: string
        delete: string
        edit: string
        save: string
        close: string
        search: string
        filter: string
        reset: string
      }
      relawan: {
        fullName: string
        idNumber: string
        birthDate: string
        gender: string
        occupation: string
        coordinator: string
      }
      koordinator: {
        position: string
        area: string
        level: string
      }
    }
    
    // Messages and Notifications
    messages: {
      success: {
        save: string
        delete: string
        import: string
        export: string
        update: string
        create: string
      }
      error: {
        save: string
        delete: string
        import: string
        export: string
        network: string
        validation: string
        notFound: string
      }
      confirmation: {
        delete: string
        logout: string
        unsavedChanges: string
      }
      info: {
        loading: string
        noData: string
        selectFile: string
      }
    }
  }
  
  // Styling Configuration
  styling: {
    layout: {
      sidebarWidth: string
      sidebarCollapsedWidth: string
      headerHeight: string
      contentPadding: string
      borderRadius: string
      boxShadow: string
    }
    typography: {
      fontFamily: string
      fontSize: {
        xs: string
        sm: string
        base: string
        lg: string
        xl: string
        '2xl': string
        '3xl': string
        '4xl': string
      }
      fontWeight: {
        normal: number
        medium: number
        semibold: number
        bold: number
      }
      lineHeight: {
        tight: string
        normal: string
        relaxed: string
      }
    }
    animations: {
      duration: string
      easing: string
      hoverScale: string
      hoverShadow: string
    }
  }
  
  // Regional Settings
  regional: {
    language: 'id' | 'en'
    locale: string
    dateFormat: string
    timeFormat: string
    timezone: string
    currency: string
    numberFormat: {
      decimal: string
      thousands: string
    }
    regions: {
      city: string
      province: string
      country: string
      postalCode?: string
    }
    terminology: {
      relawan: string
      koordinator: string
      dapil: string
      area: string
      region: string
    }
  }
  
  // Feature Configuration
  features: {
    dashboard: {
      enabled: boolean
      showCharts: boolean
      showStats: boolean
      showRecentActivity: boolean
    }
    dataManagement: {
      relawan: boolean
      koordinator: boolean
      dapil: boolean
    }
    reports: {
      enabled: boolean
      exportPdf: boolean
      exportExcel: boolean
      charts: boolean
    }
    import: {
      enabled: boolean
      supportedFormats: string[]
      maxFileSize: string
    }
    export: {
      enabled: boolean
      formats: string[]
      includeImages: boolean
    }
    notifications: boolean
    userProfile: boolean
    search: boolean
    filters: boolean
  }
}

// Default Configuration Template
export const defaultClientConfig: ClientConfig = {
  client: {
    name: "Default Management System",
    code: "DEFAULT",
    region: "Indonesia",
    version: "1.0.0",
    environment: "development"
  },
  
  branding: {
    appName: "MANREL SYSTEM",
    appNameShort: "MANREL",
    appTagline: "Management System",
    appInitial: "M",
    colors: {
      primary: "#1890ff",
      primaryHover: "#40a9ff",
      secondary: "#722ed1",
      accent: "#52c41a",
      background: "#f0f2f5",
      backgroundDark: "#001529",
      textPrimary: "#262626",
      textSecondary: "#8c8c8c",
      sidebarBg: "#001529",
      sidebarText: "#ffffff",
      sidebarHover: "#1890ff",
      headerBg: "#ffffff",
      headerText: "#262626",
      cardBg: "#ffffff",
      borderColor: "#d9d9d9",
      successColor: "#52c41a",
      warningColor: "#faad14",
      errorColor: "#ff4d4f",
      infoColor: "#1890ff"
    }
  },
  
  content: {
    navigation: {
      dashboard: "Dashboard",
      dataManagement: "Data Management",
      relawan: "Relawan",
      koordinator: "Koordinator",
      dapil: "Dapil",
      reports: "Reports",
      import: "Import",
      export: "Export",
      settings: "Settings"
    },
    
    pages: {
      dashboard: {
        title: "Dashboard",
        subtitle: "Overview and Statistics",
        welcomeMessage: "Welcome to Management System"
      },
      relawan: {
        title: "Relawan Management",
        description: "Manage volunteer data and information",
        addButtonText: "Add New Relawan"
      },
      koordinator: {
        title: "Koordinator Management", 
        description: "Manage coordinator data and assignments",
        addButtonText: "Add New Koordinator"
      },
      dapil: {
        title: "Dapil Management",
        description: "Manage electoral district data",
        addButtonText: "Add New Dapil"
      },
      reports: {
        title: "Reports",
        description: "Generate and view system reports"
      },
      import: {
        title: "Import Data",
        description: "Import data from external files",
        uploadText: "Select file to upload",
        supportedFormats: "Supported formats: CSV, Excel"
      },
      export: {
        title: "Export Data",
        description: "Export data to external formats",
        downloadText: "Download data"
      },
      settings: {
        title: "Settings",
        description: "Configure system preferences"
      }
    },
    
    forms: {
      common: {
        name: "Name",
        email: "Email",
        phone: "Phone Number",
        address: "Address",
        submit: "Submit",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        save: "Save",
        close: "Close",
        search: "Search",
        filter: "Filter",
        reset: "Reset"
      },
      relawan: {
        fullName: "Full Name",
        idNumber: "ID Number",
        birthDate: "Birth Date",
        gender: "Gender",
        occupation: "Occupation",
        coordinator: "Coordinator"
      },
      koordinator: {
        position: "Position",
        area: "Area",
        level: "Level"
      }
    },
    
    messages: {
      success: {
        save: "Data saved successfully",
        delete: "Data deleted successfully",
        import: "Data imported successfully",
        export: "Data exported successfully",
        update: "Data updated successfully",
        create: "Data created successfully"
      },
      error: {
        save: "Failed to save data",
        delete: "Failed to delete data",
        import: "Failed to import data",
        export: "Failed to export data",
        network: "Network connection error",
        validation: "Validation error",
        notFound: "Data not found"
      },
      confirmation: {
        delete: "Are you sure you want to delete this data?",
        logout: "Are you sure you want to logout?",
        unsavedChanges: "You have unsaved changes. Continue?"
      },
      info: {
        loading: "Loading...",
        noData: "No data available",
        selectFile: "Please select a file"
      }
    }
  },
  
  styling: {
    layout: {
      sidebarWidth: "250px",
      sidebarCollapsedWidth: "80px",
      headerHeight: "64px",
      contentPadding: "24px",
      borderRadius: "6px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px", 
        xl: "20px",
        '2xl': "24px",
        '3xl': "30px",
        '4xl': "36px"
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75"
      }
    },
    animations: {
      duration: "0.3s",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      hoverScale: "1.02",
      hoverShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }
  },
  
  regional: {
    language: "id",
    locale: "id-ID",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    timezone: "Asia/Jakarta",
    currency: "IDR",
    numberFormat: {
      decimal: ",",
      thousands: "."
    },
    regions: {
      city: "Default City",
      province: "Default Province",
      country: "Indonesia"
    },
    terminology: {
      relawan: "Relawan",
      koordinator: "Koordinator",
      dapil: "Dapil",
      area: "Area",
      region: "Region"
    }
  },
  
  features: {
    dashboard: {
      enabled: true,
      showCharts: true,
      showStats: true,
      showRecentActivity: true
    },
    dataManagement: {
      relawan: true,
      koordinator: true,
      dapil: true
    },
    reports: {
      enabled: true,
      exportPdf: true,
      exportExcel: true,
      charts: true
    },
    import: {
      enabled: true,
      supportedFormats: ["csv", "xlsx", "xls"],
      maxFileSize: "10MB"
    },
    export: {
      enabled: true,
      formats: ["csv", "xlsx", "pdf"],
      includeImages: false
    },
    notifications: true,
    userProfile: true,
    search: true,
    filters: true
  }
}

// Example: Bandung Client Configuration
export const bandungClientConfig: ClientConfig = {
  ...defaultClientConfig,
  
  client: {
    name: "Manajemen Relawan Bandung",
    code: "BANDUNG",
    region: "Bandung",
    version: "1.0.0",
    environment: "production"
  },
  
  branding: {
    ...defaultClientConfig.branding,
    appName: "MANREL BANDUNG",
    appNameShort: "MRB",
    appTagline: "Sistem Manajemen Relawan",
    appInitial: "B",
    colors: {
      ...defaultClientConfig.branding.colors,
      primary: "#e74c3c",
      primaryHover: "#c0392b",
      secondary: "#2c3e50",
      accent: "#f39c12",
      sidebarBg: "#2c3e50"
    }
  },
  
  content: {
    ...defaultClientConfig.content,
    navigation: {
      dashboard: "Beranda",
      dataManagement: "Kelola Data",
      relawan: "Data Relawan",
      koordinator: "Data Koordinator", 
      dapil: "Data Dapil",
      reports: "Laporan",
      import: "Import Data",
      export: "Export Data",
      settings: "Pengaturan"
    },
    
    pages: {
      ...defaultClientConfig.content.pages,
      dashboard: {
        title: "Dashboard Relawan Bandung",
        subtitle: "Sistem Manajemen Relawan Kota Bandung",
        welcomeMessage: "Selamat datang di Sistem Manajemen Relawan Bandung"
      }
    }
  },
  
  regional: {
    ...defaultClientConfig.regional,
    regions: {
      city: "Bandung",
      province: "Jawa Barat",
      country: "Indonesia",
      postalCode: "40xxx"
    }
  }
}

// Example: Jakarta Client Configuration  
export const jakartaClientConfig: ClientConfig = {
  ...defaultClientConfig,
  
  client: {
    name: "Manajemen Relawan Jakarta",
    code: "JAKARTA", 
    region: "Jakarta",
    version: "1.0.0",
    environment: "production"
  },
  
  branding: {
    ...defaultClientConfig.branding,
    appName: "MANREL JAKARTA",
    appNameShort: "MRJ",
    appTagline: "Sistem Relawan DKI",
    appInitial: "J",
    colors: {
      ...defaultClientConfig.branding.colors,
      primary: "#3498db",
      primaryHover: "#2980b9", 
      secondary: "#e67e22",
      accent: "#27ae60",
      sidebarBg: "#34495e"
    }
  },
  
  regional: {
    ...defaultClientConfig.regional,
    regions: {
      city: "Jakarta",
      province: "DKI Jakarta",
      country: "Indonesia",
      postalCode: "1xxxx"
    }
  }
}

// Export current active configuration
// Change this to switch between different client configs
export const clientConfig = bandungClientConfig // <-- Change this for different clients
