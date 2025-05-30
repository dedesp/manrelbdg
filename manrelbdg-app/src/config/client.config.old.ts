// Client Configuration Template
// Copy file ini dan sesuaikan dengan kebutuhan client

export interface ClientConfig {
  // Branding
  appName: string;
  appTagline: string;
  appInitial: string;
  region: string;
  fullTitle: string;
  
  // Terminology
  terminology: {
    relawan: string;
    koordinator: string;
    dapil: string;
    dashboard: string;
    dataManagement: string;
    reports: string;
    importExport: string;
    settings: string;
  };
  
  // Colors (hex codes)
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    sidebar: string;
    sidebarSecondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  
  // Regional Settings
  locale: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  
  // Features Toggle
  features: {
    importExport: boolean;
    reports: boolean;
    analytics: boolean;
    notifications: boolean;
    charts: boolean;
    userManagement: boolean;
  };

  // Logo Settings
  logo: {
    type: 'text' | 'image';
    imagePath?: string;
    backgroundColor?: string;
  };
}

// ==========================================
// CONTOH 1: MANRELBDG (Default/Bandung)
// ==========================================
export const MANRELBDG_CONFIG: ClientConfig = {
  appName: 'MANRELBDG',
  appTagline: 'Management System',
  appInitial: 'M',
  region: 'Bandung',
  fullTitle: 'Manajemen Relawan Bandung',
  
  terminology: {
    relawan: 'Relawan',
    koordinator: 'Koordinator',
    dapil: 'Dapil',
    dashboard: 'Dashboard',
    dataManagement: 'Data Management',
    reports: 'Reports & Analytics',
    importExport: 'Import/Export',
    settings: 'Settings',
  },
  
  colors: {
    primary: '#1890ff',
    secondary: '#096dd9',
    accent: '#52c41a',
    sidebar: '#001529',
    sidebarSecondary: '#002140',
    success: '#52c41a',
    warning: '#fa8c16',
    error: '#ff4d4f',
    info: '#1890ff',
  },
  
  locale: 'id-ID',
  timezone: 'Asia/Jakarta',
  currency: 'IDR',
  dateFormat: 'DD/MM/YYYY',
  
  features: {
    importExport: true,
    reports: true,
    analytics: true,
    notifications: true,
    charts: true,
    userManagement: true,
  },

  logo: {
    type: 'text',
    backgroundColor: '#1890ff',
  },
};

// ==========================================
// CONTOH 2: MANRELSBY (Surabaya)
// ==========================================
export const MANRELSBY_CONFIG: ClientConfig = {
  appName: 'MANRELSBY',
  appTagline: 'Sistem Manajemen',
  appInitial: 'S',
  region: 'Surabaya',
  fullTitle: 'Manajemen Relawan Surabaya',
  
  terminology: {
    relawan: 'Anggota',
    koordinator: 'Tim Lead',
    dapil: 'Area',
    dashboard: 'Beranda',
    dataManagement: 'Manajemen Data',
    reports: 'Laporan & Analitik',
    importExport: 'Import/Export Data',
    settings: 'Pengaturan',
  },
  
  colors: {
    primary: '#13c2c2',
    secondary: '#08979c',
    accent: '#722ed1',
    sidebar: '#001d23',
    sidebarSecondary: '#003339',
    success: '#52c41a',
    warning: '#fa8c16',
    error: '#ff4d4f',
    info: '#13c2c2',
  },
  
  locale: 'id-ID',
  timezone: 'Asia/Jakarta',
  currency: 'IDR',
  dateFormat: 'DD/MM/YYYY',
  
  features: {
    importExport: true,
    reports: true,
    analytics: false,
    notifications: true,
    charts: true,
    userManagement: false,
  },

  logo: {
    type: 'text',
    backgroundColor: '#13c2c2',
  },
};

// ==========================================
// CONTOH 3: PARTAIJKV (Jakarta - Custom)
// ==========================================
export const PARTAIJKV_CONFIG: ClientConfig = {
  appName: 'PARTAIJKV',
  appTagline: 'Volunteer Management',
  appInitial: 'P',
  region: 'Jakarta',
  fullTitle: 'Partai Jakarta Volunteer Management',
  
  terminology: {
    relawan: 'Volunteer',
    koordinator: 'Supervisor',
    dapil: 'Zone',
    dashboard: 'Dashboard',
    dataManagement: 'Data Management',
    reports: 'Reports',
    importExport: 'Data Import/Export',
    settings: 'Settings',
  },
  
  colors: {
    primary: '#eb2f96',
    secondary: '#c41d7f',
    accent: '#fa541c',
    sidebar: '#291620',
    sidebarSecondary: '#3f1f2b',
    success: '#52c41a',
    warning: '#fa8c16',
    error: '#ff4d4f',
    info: '#eb2f96',
  },
  
  locale: 'id-ID',
  timezone: 'Asia/Jakarta',
  currency: 'IDR',
  dateFormat: 'DD/MM/YYYY',
  
  features: {
    importExport: true,
    reports: true,
    analytics: true,
    notifications: true,
    charts: true,
    userManagement: true,
  },

  logo: {
    type: 'image',
    imagePath: '/clients/partaijkv/logo.png',
  },
};

// ==========================================
// EXPORT ACTIVE CONFIG
// ==========================================
// Ganti dengan config yang sesuai untuk client
export const CLIENT_CONFIG = MANRELBDG_CONFIG;

// Atau gunakan environment variable
// export const CLIENT_CONFIG = process.env.NODE_ENV === 'production' 
//   ? PRODUCTION_CLIENT_CONFIG 
//   : MANRELBDG_CONFIG;
