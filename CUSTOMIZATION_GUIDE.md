# 🎨 MANRELBDG - Panduan Kustomisasi Aplikasi

## 📖 Overview

Aplikasi **MANRELBDG** dirancang sebagai sistem manajemen relawan yang dapat disesuaikan untuk berbagai client dengan kebutuhan personal mereka. Panduan ini akan membantu Anda melakukan customization tanpa mengubah struktur inti aplikasi.

## 🆕 Sistem Konfigurasi Terbaru

### ✅ Fitur Baru yang Tersedia:
- **Konfigurasi Client Terpusat** - Semua customization dalam satu file
- **Multi-Client Support** - Support multiple client dalam satu codebase  
- **Dynamic Theming** - Warna dan styling yang dapat berubah secara dinamis
- **Auto CSS Variables** - Generate CSS variables otomatis dari konfigurasi
- **Client Switcher Script** - Tool untuk beralih antar konfigurasi client
- **Type Safety** - Full TypeScript support untuk semua konfigurasi

---

## 🚀 Quick Start - Cara Cepat Setup Client Baru

### 1. **Switch ke Client yang Sudah Ada**
```bash
# Masuk ke directory aplikasi
cd manrelbdg-app

# Switch ke client Bandung
./switch-client.sh bandung

# Switch ke client Jakarta  
./switch-client.sh jakarta

# Switch ke default
./switch-client.sh default

# Lihat konfigurasi saat ini
./switch-client.sh --current
```

### 2. **Buat Client Baru**
```bash
# Buat konfigurasi client baru
./switch-client.sh create surabaya

# Edit konfigurasi di src/config/client.config.ts
# Tambahkan client ke daftar di switch-client.sh
```

### 3. **Restart Development Server**
```bash
npm run dev
```

---

## 🎯 Areas yang Dapat Di-customize

### 1. 🏢 **Branding & Identity**
### 2. 🎨 **Visual Design & Styling**
### 3. 📝 **Content & Text**
### 4. 📊 **Data Structure**
### 5. 🌍 **Regional Settings**

---

## 🏢 1. BRANDING & IDENTITY

### Logo & App Name

**File:** `/src/components/layout/Sidebar.tsx`
```tsx
// Line 80-90 - Logo Section
{!collapsed && (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">M</span> {/* UBAH INITIAL */}
    </div>
    <div className="text-white">
      <div className="font-bold text-sm">MANRELBDG</div> {/* UBAH NAMA APP */}
      <div className="text-xs text-gray-400">Management System</div> {/* UBAH TAGLINE */}
    </div>
  </div>
)}
```

**Customization Steps:**
1. **App Name:** Ubah `MANRELBDG` dengan nama client
2. **Initial:** Ubah huruf `M` dengan initial client
3. **Tagline:** Sesuaikan dengan deskripsi yang relevan
4. **Logo Image:** Ganti dengan logo client (opsional)

### Header Title

**File:** `/src/components/layout/Header.tsx`
```tsx
// Line 60 - App Title
<Text className="text-lg font-medium text-gray-800">
  Manajemen Relawan Bandung {/* UBAH SESUAI WILAYAH CLIENT */}
</Text>
```

### Footer

**File:** `/src/components/layout/MainLayout.tsx`
```tsx
// Line 45 - Footer Text
<Footer className="text-center bg-white border-t">
  <div className="text-gray-600">
    MANRELBDG © 2024 - Sistem Manajemen Relawan Bandung {/* UBAH */}
  </div>
</Footer>
```

---

## 🎨 2. VISUAL DESIGN & STYLING

### Color Scheme

**File:** `/src/app/globals.css`
```css
/* Primary Colors - Ubah sesuai brand client */
.ant-btn-primary {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%); /* CUSTOM */
}

.ant-layout-sider-dark {
  background: linear-gradient(180deg, #001529 0%, #002140 100%); /* CUSTOM */
}

/* Content Background */
.ant-layout-content {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); /* CUSTOM */
}
```

**Customization Variables:**
```css
/* Tambahkan di awal globals.css */
:root {
  --primary-color: #1890ff;      /* Warna utama client */
  --secondary-color: #096dd9;    /* Warna sekunder */
  --accent-color: #52c41a;       /* Warna accent */
  --sidebar-bg: #001529;         /* Background sidebar */
  --content-bg: #f5f7fa;         /* Background konten */
}
```

### Logo Customization

**Option 1: Text-based Logo**
```tsx
// Sidebar.tsx - Simple text logo
<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-sm">{CLIENT_INITIAL}</span>
</div>
```

**Option 2: Image Logo**
```tsx
// Sidebar.tsx - Image logo
<div className="w-8 h-8">
  <img src="/logo-client.png" alt="Logo" className="w-full h-full object-contain" />
</div>
```

---

## 📝 3. CONTENT & TEXT

### Dashboard Content

**File:** `/src/app/dashboard/page.tsx`

```tsx
// Page Header - Line 35-40
<div>
  <Title level={2} className="mb-2">Dashboard</Title>
  <p className="text-gray-600">
    Selamat datang di sistem manajemen relawan [NAMA_WILAYAH] {/* CUSTOM */}
  </p>
</div>

// Statistics Labels - Line 45-75
<Statistic
  title="Total Relawan"        {/* BISA: Total Anggota, Total Peserta */}
  value={dashboardData.totalRelawan}
  prefix={<UserOutlined className="text-blue-500" />}
/>

<Statistic
  title="Total Koordinator"    {/* BISA: Total Tim Lead, Total Supervisor */}
  value={dashboardData.totalKoordinator}
  prefix={<TeamOutlined className="text-green-500" />}
/>

<Statistic
  title="Total Dapil"          {/* BISA: Total Area, Total Wilayah */}
  value={dashboardData.totalDapil}
  prefix={<EnvironmentOutlined className="text-orange-500" />}
/>
```

### Menu Labels

**File:** `/src/components/layout/Sidebar.tsx`

```tsx
// Line 35-45 - Menu Items
const menuItems: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <DashboardOutlined />),
  getItem('Data Management', 'data', <TeamOutlined />, [ {/* CUSTOM: Manajemen Data */}
    getItem('Relawan', '/data/relawan', <UserOutlined />),     {/* CUSTOM: Anggota */}
    getItem('Koordinator', '/data/koordinator', <TeamOutlined />), {/* CUSTOM: Tim Lead */}
    getItem('Dapil', '/data/dapil', <EnvironmentOutlined />),      {/* CUSTOM: Area */}
  ]),
  getItem('Reports & Analytics', '/reports', <BarChartOutlined />), {/* CUSTOM */}
  // ... dst
];
```

---

## 📊 4. DATA STRUCTURE

### Regional Terminology

**File:** `/src/app/dashboard/page.tsx`
```tsx
// Mock Data - Sesuaikan dengan istilah daerah
const dashboardData = {
  totalRelawan: 1234,        // Anggota, Peserta, dll
  totalKoordinator: 56,      // Team Lead, Supervisor, dll  
  totalDapil: 12,           // Area, Wilayah, Zona, dll
  targetAchievement: 75,
  recentActivities: [
    { id: 1, message: 'Relawan baru bergabung di Dapil 1', time: '2 jam lalu' }, {/* CUSTOM */}
    { id: 2, message: 'Data koordinator diperbarui', time: '4 jam lalu' },       {/* CUSTOM */}
    { id: 3, message: 'Export data relawan selesai', time: '1 hari lalu' },      {/* CUSTOM */}
  ]
};
```

### Breadcrumb Labels

**File:** `/src/components/layout/Breadcrumb.tsx`
```tsx
// Line 35-55 - Segment Labels
switch (segment) {
  case 'data':
    title = 'Data Management';     // CUSTOM: Manajemen Data
    break;
  case 'relawan':
    title = 'Relawan';            // CUSTOM: Anggota, Peserta
    break;
  case 'koordinator':
    title = 'Koordinator';        // CUSTOM: Tim Lead, Supervisor
    break;
  case 'dapil':
    title = 'Dapil';             // CUSTOM: Area, Wilayah
    break;
  // ... dst
}
```

---

## 🌍 5. REGIONAL SETTINGS

### Create Configuration File

**File:** `/src/config/client.config.ts` (BUAT BARU)
```typescript
export const CLIENT_CONFIG = {
  // Branding
  appName: 'MANRELBDG',
  appTagline: 'Management System',
  appInitial: 'M',
  region: 'Bandung',
  
  // Terminology
  terminology: {
    relawan: 'Relawan',        // Anggota, Peserta, Volunteer
    koordinator: 'Koordinator', // Team Lead, Supervisor, Manager
    dapil: 'Dapil',           // Area, Wilayah, Zona, Region
    dashboard: 'Dashboard',    // Beranda, Home
  },
  
  // Colors
  colors: {
    primary: '#1890ff',
    secondary: '#096dd9',
    accent: '#52c41a',
    sidebar: '#001529',
  },
  
  // Regional Settings
  locale: 'id-ID',
  timezone: 'Asia/Jakarta',
  currency: 'IDR',
  
  // Features (enable/disable)
  features: {
    importExport: true,
    reports: true,
    analytics: true,
    notifications: true,
  }
};
```

### Use Configuration

**File:** `/src/app/dashboard/page.tsx`
```tsx
import { CLIENT_CONFIG } from '@/config/client.config';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <Title level={2} className="mb-2">{CLIENT_CONFIG.terminology.dashboard}</Title>
          <p className="text-gray-600">
            Selamat datang di sistem manajemen {CLIENT_CONFIG.terminology.relawan} {CLIENT_CONFIG.region}
          </p>
        </div>
        // ... rest of component
      </div>
    </MainLayout>
  );
}
```

---

## 🔧 Konfigurasi Client Detail

### File Struktur Konfigurasi

```
src/
  config/
    client.config.ts          # ← File konfigurasi utama
  hooks/
    useClientConfig.ts        # ← Hooks untuk menggunakan konfigurasi
  components/
    providers/
      ClientThemeProvider.tsx # ← Provider untuk CSS variables
```

### Contoh Konfigurasi Lengkap

#### 1. **Client Bandung** (Merah/Conservative)
```typescript
export const bandungClientConfig: ClientConfig = {
  client: {
    name: "Manajemen Relawan Bandung",
    code: "BANDUNG",
    region: "Bandung",
    version: "1.0.0",
    environment: "production"
  },
  
  branding: {
    appName: "MANREL BANDUNG",
    appNameShort: "MRB", 
    appTagline: "Sistem Manajemen Relawan",
    appInitial: "B",
    colors: {
      primary: "#e74c3c",        // Merah Bandung
      primaryHover: "#c0392b",
      secondary: "#2c3e50",      // Navy Professional  
      accent: "#f39c12",         // Orange Accent
      sidebarBg: "#2c3e50",      // Navy Sidebar
      // ... colors lainnya
    }
  },
  
  content: {
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
      dashboard: {
        title: "Dashboard Relawan Bandung",
        subtitle: "Sistem Manajemen Relawan Kota Bandung",
        welcomeMessage: "Selamat datang di Sistem Manajemen Relawan Bandung"
      }
    }
  },
  
  regional: {
    language: "id",
    regions: {
      city: "Bandung",
      province: "Jawa Barat", 
      country: "Indonesia"
    },
    terminology: {
      relawan: "Relawan",
      koordinator: "Koordinator Wilayah",
      dapil: "Daerah Pemilihan"
    }
  }
}
```

#### 2. **Client Jakarta** (Biru/Modern)
```typescript
export const jakartaClientConfig: ClientConfig = {
  client: {
    name: "Manajemen Relawan Jakarta",
    code: "JAKARTA",
    region: "Jakarta", 
    version: "1.0.0",
    environment: "production"
  },
  
  branding: {
    appName: "MANREL JAKARTA",
    appNameShort: "MRJ",
    appTagline: "Sistem Relawan DKI",
    appInitial: "J",
    colors: {
      primary: "#3498db",        // Biru Modern
      primaryHover: "#2980b9",
      secondary: "#e67e22",      // Orange Secondary
      accent: "#27ae60",         // Green Accent
      sidebarBg: "#34495e",      // Dark Grey Sidebar
      // ... colors lainnya
    }
  },
  
  content: {
    navigation: {
      dashboard: "Dashboard",
      dataManagement: "Manajemen Data",
      relawan: "Sukarelawan", 
      koordinator: "Koordinator",
      dapil: "Wilayah",
      reports: "Laporan",
      import: "Impor",
      export: "Ekspor",
      settings: "Pengaturan"
    }
  },
  
  regional: {
    regions: {
      city: "Jakarta",
      province: "DKI Jakarta",
      country: "Indonesia"
    },
    terminology: {
      relawan: "Sukarelawan",
      koordinator: "Koordinator Area", 
      dapil: "Wilayah Pemilihan"
    }
  }
}
```

---

## 🎨 Cara Menggunakan di Komponen

### 1. **Menggunakan Hooks**
```typescript
import { useBranding, useContent } from '@/hooks/useClientConfig'

export default function MyComponent() {
  const branding = useBranding()
  const content = useContent()
  
  return (
    <div style={{ backgroundColor: branding.colors.primary }}>
      <h1>{content.pages.dashboard.title}</h1>
      <p>{content.pages.dashboard.welcomeMessage}</p>
    </div>
  )
}
```

### 2. **Menggunakan CSS Variables** 
```css
/* Automatic CSS variables dari ClientThemeProvider */
.my-component {
  background-color: var(--primary-color);
  color: var(--text-primary);
  border-radius: var(--border-radius);
}

.sidebar {
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  width: var(--sidebar-width);
}
```

### 3. **Dynamic Styling**
```typescript
import { getThemeColors } from '@/hooks/useClientConfig'

const colors = getThemeColors()

const dynamicStyles = {
  button: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ':hover': {
      backgroundColor: colors.primaryHover
    }
  }
}
```

---

## 🔄 Client Switcher Tool

### Penggunaan Script
```bash
# Lihat bantuan dan status saat ini
./switch-client.sh

# Switch ke client tertentu
./switch-client.sh bandung
./switch-client.sh jakarta
./switch-client.sh default

# Lihat konfigurasi aktif
./switch-client.sh --current

# Buat client baru
./switch-client.sh create surabaya
```

### Output Script
```
MANRELBDG Client Configuration Switcher

✓ Switched to Bandung configuration

Configuration Summary:
  App Name: MANREL BANDUNG
  Primary Color: #e74c3c (Red)
  Region: Bandung, Jawa Barat

✓ Client configuration updated successfully!
Please restart your development server to see changes.
```

---

## 📝 Customization Workflow

### Untuk Client Baru:

#### Step 1: Buat Konfigurasi
```bash
./switch-client.sh create clientname
```

#### Step 2: Edit Konfigurasi  
```typescript
// src/config/client.config.ts
export const clientnameClientConfig: ClientConfig = {
  client: {
    name: "Nama Client",
    code: "CLIENTCODE", 
    // ... config lainnya
  },
  
  branding: {
    appName: "APP NAME",
    colors: {
      primary: "#your-color",
      // ... warna lainnya
    }
  },
  
  content: {
    navigation: {
      dashboard: "Label Menu",
      // ... label lainnya  
    }
  }
}
```

#### Step 3: Update Script Switcher
```bash
# Edit switch-client.sh
CLIENTS=("bandung" "jakarta" "default" "clientname")
```

#### Step 4: Switch & Test
```bash
./switch-client.sh clientname
npm run dev
```

### Untuk Modify Client Existing:

#### Step 1: Switch ke Client
```bash
./switch-client.sh bandung
```

#### Step 2: Edit Konfigurasi
```typescript
// Ubah konfigurasi di bandungClientConfig
branding: {
  colors: {
    primary: "#new-color",
    // ... 
  }
}
```

#### Step 3: Restart Server
```bash
npm run dev
```

---

## 🎯 Contoh Kasus Penggunaan

### Case 1: Ganti Warna Tema
```typescript
// Dari biru ke merah
branding: {
  colors: {
    primary: "#e74c3c",      // Merah
    primaryHover: "#c0392b", // Merah gelap
    sidebarBg: "#2c3e50"     // Navy
  }
}
```

### Case 2: Ganti Bahasa Menu
```typescript
content: {
  navigation: {
    dashboard: "Beranda",        // Indonesia
    // dashboard: "Dashboard",   // English  
    // dashboard: "Tableau",     // French
    dataManagement: "Kelola Data",
    relawan: "Data Relawan"
  }
}
```

### Case 3: Ganti Terminologi
```typescript
regional: {
  terminology: {
    relawan: "Kader",           // Ganti dari "Relawan"
    koordinator: "Ketua Wilayah", // Ganti dari "Koordinator"
    dapil: "Area Pemilihan"     // Ganti dari "Dapil"
  }
}
```

### Case 4: Regional Customization
```typescript
regional: {
  regions: {
    city: "Surabaya",
    province: "Jawa Timur", 
    country: "Indonesia"
  },
  dateFormat: "DD-MM-YYYY",    // Format tanggal
  numberFormat: {
    decimal: ",",              // Koma untuk desimal  
    thousands: "."             // Titik untuk ribuan
  }
}
```

---

## 🚀 Deployment Multi-Client

### Environment-based Deployment
```bash
# Build untuk client tertentu
CLIENT=bandung npm run build
CLIENT=jakarta npm run build

# Deploy dengan environment variable
export CLIENT_CONFIG=bandung
npm run build
npm run start
```

### Docker Multi-Client
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .

# Build argument untuk client
ARG CLIENT_NAME=default
ENV CLIENT_NAME=${CLIENT_NAME}

# Switch client sebelum build
RUN ./switch-client.sh ${CLIENT_NAME}
RUN npm run build

CMD ["npm", "start"]
```

```bash
# Build image untuk client berbeda
docker build --build-arg CLIENT_NAME=bandung -t manrel-bandung .
docker build --build-arg CLIENT_NAME=jakarta -t manrel-jakarta .
```

---
## 🛠️ Troubleshooting & Best Practices

### ❌ Masalah Umum & Solusi

#### 1. **CSS Variables Tidak Berubah**
```bash
# Problem: Warna tidak berubah setelah switch client
# Solution: Clear browser cache dan restart server

rm -rf .next
npm run dev

# Atau force refresh browser (Cmd+Shift+R di Mac)
```

#### 2. **TypeScript Errors**
```typescript
// Problem: Cannot find name 'branding'
// Solution: Pastikan import hooks di component

import { useBranding, useContent } from '@/hooks/useClientConfig'

export default function MyComponent() {
  const branding = useBranding() // ✅ Benar
  const content = useContent()   // ✅ Benar
  
  // const colors = branding.colors // ❌ Error jika tidak ada import
}
```

#### 3. **Client Config Tidak Ter-switch**
```bash
# Problem: Aplikasi masih menggunakan config lama
# Solution: Pastikan file ter-update dan restart

# Check current config
grep "export const clientConfig" src/config/client.config.ts

# Manual switch jika script gagal
# Edit src/config/client.config.ts line terakhir:
export const clientConfig = bandungClientConfig // Ganti sesuai client
```

#### 4. **Import Path Error**
```typescript
// Problem: Module not found '@/hooks/useClientConfig'
// Solution: Pastikan path mapping di tsconfig.json

// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // ✅ Pastikan ada ini
    }
  }
}
```

### ✅ Best Practices

#### 1. **Naming Convention**
```typescript
// ✅ Good naming
export const bandungClientConfig: ClientConfig = { ... }
export const jakartaClientConfig: ClientConfig = { ... }
export const surabayaClientConfig: ClientConfig = { ... }

// ❌ Bad naming  
export const client1Config: ClientConfig = { ... }
export const configBandung: ClientConfig = { ... }
```

#### 2. **Color Palette Consistency**
```typescript
// ✅ Good color scheme
colors: {
  primary: "#e74c3c",
  primaryHover: "#c0392b",    // Darker shade
  secondary: "#2c3e50",       // Complementary
  accent: "#f39c12",          // Accent color
  
  // Semantic colors
  successColor: "#27ae60",
  warningColor: "#f39c12", 
  errorColor: "#e74c3c",
  infoColor: "#3498db"
}

// ❌ Bad color scheme
colors: {
  primary: "#ff0000",         // Too bright
  primaryHover: "#00ff00",    // Unrelated color
  secondary: "#purple",       // Invalid CSS
}
```

#### 3. **Content Organization**
```typescript
// ✅ Good content structure
content: {
  navigation: {
    dashboard: "Dashboard",
    dataManagement: "Data Management", 
    // ... consistent naming
  },
  pages: {
    dashboard: {
      title: "Dashboard Title",
      subtitle: "Dashboard Subtitle",
      welcomeMessage: "Welcome message"
    }
  },
  forms: {
    common: {
      save: "Save",
      cancel: "Cancel"
      // ... reusable labels
    }
  }
}
```

#### 4. **Type Safety**
```typescript
// ✅ Use types for consistency
import { ClientConfig } from '@/config/client.config'

export const myClientConfig: ClientConfig = {
  // TypeScript akan validate structure
}

// ✅ Use hooks in components
const { primary, secondary } = useBranding().colors
const { dashboard } = useContent().navigation
```

#### 5. **Environment Management**
```typescript
// ✅ Environment-specific configs
client: {
  name: "Client Name",
  code: "CLIENT",
  region: "Region",
  version: "1.0.0",
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}
```

---

## 🔍 Advanced Customization

### 1. **Dynamic Feature Flags**
```typescript
features: {
  dashboard: {
    enabled: true,
    showCharts: true,
    showStats: true,
    showRecentActivity: false  // Disable untuk client tertentu
  },
  reports: {
    enabled: true,
    exportPdf: true,
    exportExcel: false,        // Disable Excel untuk client ini
    charts: true
  }
}

// Usage in component
const features = useFeatures()

{features.dashboard.showCharts && <ChartComponent />}
{features.reports.exportPdf && <PDFExportButton />}
```

### 2. **Conditional Menu Items**
```typescript
// Sidebar component with conditional menu
const menuItems = [
  getItem(content.navigation.dashboard, '/dashboard', <DashboardOutlined />),
  
  // Conditional submenu based on features
  ...(features.dataManagement.relawan ? [
    getItem(content.navigation.relawan, '/data/relawan', <UserOutlined />)
  ] : []),
  
  ...(features.reports.enabled ? [
    getItem(content.navigation.reports, '/reports', <BarChartOutlined />)
  ] : []),
]
```

### 3. **Custom Logo Implementation**
```typescript
// branding config
branding: {
  logoPath: "/logos/client-logo.png",  // Path ke logo
  appName: "CLIENT NAME",
  appInitial: "C"  // Fallback jika logo tidak ada
}

// Component implementation
const branding = useBranding()

return (
  <div className="logo">
    {branding.logoPath ? (
      <img 
        src={branding.logoPath} 
        alt={branding.appName}
        className="h-8 w-auto"
      />
    ) : (
      <div className="logo-initial">
        {branding.appInitial}
      </div>
    )}
    <span>{branding.appName}</span>
  </div>
)
```

### 4. **Multi-Language Support**
```typescript
// Regional config with language
regional: {
  language: "id",  // or "en"
  locale: "id-ID", // or "en-US"
  // ...
}

// Content berdasarkan bahasa
const getLocalizedContent = (language: string) => {
  const baseContent = {
    navigation: {
      dashboard: language === 'id' ? 'Beranda' : 'Dashboard',
      dataManagement: language === 'id' ? 'Kelola Data' : 'Data Management',
      // ...
    }
  }
  return baseContent
}
```

### 5. **Custom Styling dengan CSS-in-JS**
```typescript
// Generate styles from config
const getComponentStyles = () => {
  const colors = getThemeColors()
  
  return {
    button: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      borderRadius: '6px',
      '&:hover': {
        backgroundColor: colors.primaryHover,
      }
    },
    card: {
      backgroundColor: colors.cardBg,
      borderColor: colors.borderColor,
      boxShadow: '0 2px 8px rgba(0,0,