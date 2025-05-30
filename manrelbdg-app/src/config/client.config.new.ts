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
    
    // Terminology and Labels
    terminology: {
      relawan: string
      relawanPlural: string
      koordinator: string
      koordinatorPlural: string
      dapil: string
      dapilPlural: string
    }
    
    // Button Labels
    buttons: {
      add: string
      edit: string
      delete: string
      save: string
      cancel: string
      upload: string
      download: string
      import: string
      export: string
      view: string
      details: string
    }
    
    // Form Labels
    forms: {
      name: string
      email: string
      phone: string
      address: string
      status: string
      description: string
      notes: string
    }
  }
  
  // Feature Flags
  features: {
    importExport: boolean
    reports: boolean
    analytics: boolean
    notifications: boolean
    charts: boolean
    userManagement: boolean
    dashboard: boolean
    darkMode: boolean
    multiLanguage: boolean
  }
  
  // Regional Settings
  regional: {
    locale: string
    timezone: string
    currency: string
    dateFormat: string
    timeFormat: string
    numberFormat: string
  }
  
  // API Configuration
  api: {
    baseUrl: string
    timeout: number
    retryAttempts: number
  }
}

// ==========================================
// DEFAULT CONFIG: MANRELBDG (Bandung)
// ==========================================
export const MANRELBDG_CONFIG: ClientConfig = {
  client: {
    name: 'MANRELBDG',
    code: 'MANRELBDG',
    region: 'Bandung',
    version: '1.0.0',
    environment: 'development'
  },
  
  branding: {
    appName: 'MANRELBDG',
    appNameShort: 'MANREL',
    appTagline: 'Management System',
    appInitial: 'M',
    logoPath: '/images/logo.png',
    faviconPath: '/images/favicon.ico',
    colors: {
      primary: '#1890ff',
      primaryHover: '#096dd9',
      secondary: '#722ed1',
      accent: '#52c41a',
      background: '#ffffff',
      backgroundDark: '#f0f2f5',
      textPrimary: '#262626',
      textSecondary: '#8c8c8c',
      sidebarBg: '#001529',
      sidebarText: '#ffffff',
      sidebarHover: '#1890ff',
      headerBg: '#ffffff',
      headerText: '#262626',
      cardBg: '#ffffff',
      borderColor: '#d9d9d9',
      successColor: '#52c41a',
      warningColor: '#fa8c16',
      errorColor: '#ff4d4f',
      infoColor: '#1890ff'
    }
  },
  
  content: {
    navigation: {
      dashboard: 'Dashboard',
      dataManagement: 'Data Management',
      relawan: 'Relawan',
      koordinator: 'Koordinator',
      dapil: 'Dapil',
      reports: 'Reports & Analytics',
      import: 'Import Data',
      export: 'Export Data',
      settings: 'Settings'
    },
    
    pages: {
      dashboard: {
        title: 'Dashboard',
        subtitle: 'Selamat datang di MANRELBDG',
        welcomeMessage: 'Kelola data relawan dan koordinator dengan mudah'
      },
      relawan: {
        title: 'Data Relawan',
        description: 'Kelola data relawan yang terdaftar dalam sistem',
        addButtonText: 'Tambah Relawan'
      },
      koordinator: {
        title: 'Data Koordinator',
        description: 'Kelola data koordinator dan tim',
        addButtonText: 'Tambah Koordinator'
      },
      dapil: {
        title: 'Data Dapil',
        description: 'Kelola data daerah pemilihan',
        addButtonText: 'Tambah Dapil'
      },
      reports: {
        title: 'Reports & Analytics',
        description: 'Lihat laporan dan analisis data relawan'
      },
      import: {
        title: 'Import Data',
        description: 'Import data dari file Excel atau CSV',
        uploadText: 'Upload File',
        supportedFormats: 'Format yang didukung: Excel (.xlsx), CSV (.csv)'
      },
      export: {
        title: 'Export Data',
        description: 'Export data ke berbagai format',
        downloadText: 'Download Data'
      },
      settings: {
        title: 'Settings',
        description: 'Pengaturan aplikasi dan konfigurasi sistem'
      }
    },
    
    terminology: {
      relawan: 'Relawan',
      relawanPlural: 'Relawan',
      koordinator: 'Koordinator',
      koordinatorPlural: 'Koordinator',
      dapil: 'Dapil',
      dapilPlural: 'Dapil'
    },
    
    buttons: {
      add: 'Tambah',
      edit: 'Edit',
      delete: 'Hapus',
      save: 'Simpan',
      cancel: 'Batal',
      upload: 'Upload',
      download: 'Download',
      import: 'Import',
      export: 'Export',
      view: 'Lihat',
      details: 'Detail'
    },
    
    forms: {
      name: 'Nama',
      email: 'Email',
      phone: 'Telepon',
      address: 'Alamat',
      status: 'Status',
      description: 'Deskripsi',
      notes: 'Catatan'
    }
  },
  
  features: {
    importExport: true,
    reports: true,
    analytics: true,
    notifications: true,
    charts: true,
    userManagement: true,
    dashboard: true,
    darkMode: false,
    multiLanguage: false
  },
  
  regional: {
    locale: 'id-ID',
    timezone: 'Asia/Jakarta',
    currency: 'IDR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: '1.000,00'
  },
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retryAttempts: 3
  }
}

// ==========================================
// SURABAYA CONFIG: MANRELSBY
// ==========================================
export const MANRELSBY_CONFIG: ClientConfig = {
  client: {
    name: 'MANRELSBY',
    code: 'MANRELSBY',
    region: 'Surabaya',
    version: '1.0.0',
    environment: 'development'
  },
  
  branding: {
    appName: 'MANRELSBY',
    appNameShort: 'MANREL',
    appTagline: 'Sistem Manajemen',
    appInitial: 'S',
    logoPath: '/images/logo-sby.png',
    faviconPath: '/images/favicon-sby.ico',
    colors: {
      primary: '#13c2c2',
      primaryHover: '#08979c',
      secondary: '#722ed1',
      accent: '#fa541c',
      background: '#ffffff',
      backgroundDark: '#f0f2f5',
      textPrimary: '#262626',
      textSecondary: '#8c8c8c',
      sidebarBg: '#001d23',
      sidebarText: '#ffffff',
      sidebarHover: '#13c2c2',
      headerBg: '#ffffff',
      headerText: '#262626',
      cardBg: '#ffffff',
      borderColor: '#d9d9d9',
      successColor: '#52c41a',
      warningColor: '#fa8c16',
      errorColor: '#ff4d4f',
      infoColor: '#13c2c2'
    }
  },
  
  content: {
    navigation: {
      dashboard: 'Beranda',
      dataManagement: 'Manajemen Data',
      relawan: 'Anggota',
      koordinator: 'Tim Lead',
      dapil: 'Area',
      reports: 'Laporan & Analitik',
      import: 'Import Data',
      export: 'Export Data',
      settings: 'Pengaturan'
    },
    
    pages: {
      dashboard: {
        title: 'Beranda',
        subtitle: 'Selamat datang di MANRELSBY',
        welcomeMessage: 'Kelola data anggota dan tim lead dengan efisien'
      },
      relawan: {
        title: 'Data Anggota',
        description: 'Kelola data anggota yang terdaftar dalam sistem',
        addButtonText: 'Tambah Anggota'
      },
      koordinator: {
        title: 'Data Tim Lead',
        description: 'Kelola data tim lead dan supervisor',
        addButtonText: 'Tambah Tim Lead'
      },
      dapil: {
        title: 'Data Area',
        description: 'Kelola data area kerja dan wilayah',
        addButtonText: 'Tambah Area'
      },
      reports: {
        title: 'Laporan & Analitik',
        description: 'Lihat laporan dan analisis data anggota'
      },
      import: {
        title: 'Import Data',
        description: 'Import data dari file Excel atau CSV',
        uploadText: 'Upload File',
        supportedFormats: 'Format yang didukung: Excel (.xlsx), CSV (.csv)'
      },
      export: {
        title: 'Export Data',
        description: 'Export data ke berbagai format',
        downloadText: 'Download Data'
      },
      settings: {
        title: 'Pengaturan',
        description: 'Pengaturan aplikasi dan konfigurasi sistem'
      }
    },
    
    terminology: {
      relawan: 'Anggota',
      relawanPlural: 'Anggota',
      koordinator: 'Tim Lead',
      koordinatorPlural: 'Tim Lead',
      dapil: 'Area',
      dapilPlural: 'Area'
    },
    
    buttons: {
      add: 'Tambah',
      edit: 'Edit',
      delete: 'Hapus',
      save: 'Simpan',
      cancel: 'Batal',
      upload: 'Upload',
      download: 'Download',
      import: 'Import',
      export: 'Export',
      view: 'Lihat',
      details: 'Detail'
    },
    
    forms: {
      name: 'Nama',
      email: 'Email',
      phone: 'Telepon',
      address: 'Alamat',
      status: 'Status',
      description: 'Deskripsi',
      notes: 'Catatan'
    }
  },
  
  features: {
    importExport: true,
    reports: true,
    analytics: false,
    notifications: true,
    charts: true,
    userManagement: false,
    dashboard: true,
    darkMode: false,
    multiLanguage: false
  },
  
  regional: {
    locale: 'id-ID',
    timezone: 'Asia/Jakarta',
    currency: 'IDR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: '1.000,00'
  },
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retryAttempts: 3
  }
}

// ==========================================
// JAKARTA CONFIG: PARTAIJKV
// ==========================================
export const PARTAIJKV_CONFIG: ClientConfig = {
  client: {
    name: 'PARTAIJKV',
    code: 'PARTAIJKV',
    region: 'Jakarta',
    version: '1.0.0',
    environment: 'development'
  },
  
  branding: {
    appName: 'PARTAIJKV',
    appNameShort: 'PARTAI',
    appTagline: 'Volunteer Management',
    appInitial: 'P',
    logoPath: '/images/logo-jkv.png',
    faviconPath: '/images/favicon-jkv.ico',
    colors: {
      primary: '#eb2f96',
      primaryHover: '#c41d7f',
      secondary: '#fa541c',
      accent: '#52c41a',
      background: '#ffffff',
      backgroundDark: '#f0f2f5',
      textPrimary: '#262626',
      textSecondary: '#8c8c8c',
      sidebarBg: '#291620',
      sidebarText: '#ffffff',
      sidebarHover: '#eb2f96',
      headerBg: '#ffffff',
      headerText: '#262626',
      cardBg: '#ffffff',
      borderColor: '#d9d9d9',
      successColor: '#52c41a',
      warningColor: '#fa8c16',
      errorColor: '#ff4d4f',
      infoColor: '#eb2f96'
    }
  },
  
  content: {
    navigation: {
      dashboard: 'Dashboard',
      dataManagement: 'Data Management',
      relawan: 'Volunteers',
      koordinator: 'Supervisors',
      dapil: 'Zones',
      reports: 'Reports',
      import: 'Import Data',
      export: 'Export Data',
      settings: 'Settings'
    },
    
    pages: {
      dashboard: {
        title: 'Dashboard',
        subtitle: 'Welcome to PARTAIJKV',
        welcomeMessage: 'Manage volunteers and supervisors efficiently'
      },
      relawan: {
        title: 'Volunteer Data',
        description: 'Manage registered volunteers in the system',
        addButtonText: 'Add Volunteer'
      },
      koordinator: {
        title: 'Supervisor Data',
        description: 'Manage supervisors and teams',
        addButtonText: 'Add Supervisor'
      },
      dapil: {
        title: 'Zone Data',
        description: 'Manage electoral zones and areas',
        addButtonText: 'Add Zone'
      },
      reports: {
        title: 'Reports',
        description: 'View reports and volunteer data analysis'
      },
      import: {
        title: 'Import Data',
        description: 'Import data from Excel or CSV files',
        uploadText: 'Upload File',
        supportedFormats: 'Supported formats: Excel (.xlsx), CSV (.csv)'
      },
      export: {
        title: 'Export Data',
        description: 'Export data to various formats',
        downloadText: 'Download Data'
      },
      settings: {
        title: 'Settings',
        description: 'Application settings and system configuration'
      }
    },
    
    terminology: {
      relawan: 'Volunteer',
      relawanPlural: 'Volunteers',
      koordinator: 'Supervisor',
      koordinatorPlural: 'Supervisors',
      dapil: 'Zone',
      dapilPlural: 'Zones'
    },
    
    buttons: {
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      upload: 'Upload',
      download: 'Download',
      import: 'Import',
      export: 'Export',
      view: 'View',
      details: 'Details'
    },
    
    forms: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      status: 'Status',
      description: 'Description',
      notes: 'Notes'
    }
  },
  
  features: {
    importExport: true,
    reports: true,
    analytics: true,
    notifications: true,
    charts: true,
    userManagement: true,
    dashboard: true,
    darkMode: true,
    multiLanguage: true
  },
  
  regional: {
    locale: 'en-US',
    timezone: 'Asia/Jakarta',
    currency: 'IDR',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    numberFormat: '1,000.00'
  },
  
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retryAttempts: 3
  }
}

// ==========================================
// EXPORT ACTIVE CONFIG
// ==========================================
// Change this to the appropriate config for your client
export const CLIENT_CONFIG = MANRELBDG_CONFIG

// Or use environment variable
// export const CLIENT_CONFIG = process.env.NEXT_PUBLIC_CLIENT === 'MANRELSBY' 
//   ? MANRELSBY_CONFIG 
//   : process.env.NEXT_PUBLIC_CLIENT === 'PARTAIJKV'
//   ? PARTAIJKV_CONFIG
//   : MANRELBDG_CONFIG
