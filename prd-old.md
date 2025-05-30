# **Aplikasi Manajemen Pendukung - PRD (Product Requirements Document)**
## **Next.js Fullstack Application**

### **Project Overview**
Aplikasi manajemen data relawan dan koordinator untuk mendukung kampanye politik dengan fitur pemetaan geografis, analitik dashboard, dan manajemen data yang komprehensif.

### **Tech Stack**
- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js / Custom JWT
- **UI Library**: Ant Design + Tailwind CSS
- **Maps**: React Leaflet + OpenStreetMap
- **Charts**: Recharts
- **File Processing**: XLSX, CSV Parser
- **State Management**: Zustand + TanStack Query
- **Deployment**: Vercel (recommended) / Docker

## 1. Struktur Proyek:
manrelbdg-app/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/               # Backend API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   └── logout/route.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── summary/route.ts
│   │   │   │   ├── growth/route.ts
│   │   │   │   └── map-data/route.ts
│   │   │   ├── relawan/
│   │   │   │   ├── route.ts       # GET, POST
│   │   │   │   ├── [id]/route.ts  # PUT, DELETE
│   │   │   │   ├── import/route.ts
│   │   │   │   └── export/route.ts
│   │   │   └── koordinator/
│   │   │       └── ...similar structure
│   │   ├── (auth)/
│   │   │   └── login/page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── data/
│   │   │   ├── relawan/page.tsx
│   │   │   └── koordinator/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   ├── maps/
│   │   ├── charts/
│   │   └── tables/
│   ├── lib/
│   │   ├── database.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   ├── types/
│   │   └── index.ts           # Shared types
│   └── hooks/
│       └── use-auth.ts
├── public/
├── middleware.ts
├── next.config.js
└── package.json

## 2. Halaman Utama (Dashboard)
## •  Menampilkan base map (misal: OpenStreetMap tiles). •  Memuat layer batas Wilayah Administratif dan Dapil dari backend (API GeoJSON). •  Memuat dan menampilkan data agregasi untuk indikator (pertumbuhan relawan, potensi suara) per Dapil/Wilayah dari backend (API Dashboard). •  Visualisasi indikator di peta (misal: gradasi warna pada poligon Dapil berdasarkan persentase rekrutmen atau potensi suara). •  Menampilkan Legenda peta yang jelas untuk setiap layer indikator. •  (Opsional) Tooltip atau popup saat hover/klik area Dapil/ Wilayah untuk menampilkan detail angka. •  (Opsional) Layer terpisah untuk potensi lokasi Koordinator (jika ada data koordinat). •  Kartu Statistik Kunci: Menampilkan angka ringkasan seperti: •  Total Relawan Terinput. •  Persentase Pencapaian Rekrutmen Global (jika relevan) atau per Dapil yang dipilih. •  Total Potensi Suara Global atau per Dapil yang dipilih. •  Angka Proyeksi Keterpilihan Global atau per Dapil yang dipilih. •  Grafifik: •  Menampilkan grafifik pertumbuhan jumlah relawan dari waktu ke waktu (total atau per Dapil). •  Jenis grafifik: Line chart atau Area chart. •  Memanggil endpoint API Dashboard backend untuk mendapatkan semua data yang dibutuhkan (GET /api/ dashboard/summary, GET /api/dashboard/growth, GET /api/ dashboard/map-data, dll.). •  Menampilkan indikator loading saat data dashboard sedang diambil. 

## 3. Bagian Manajemen Data
Seringkali disajikan dengan sub-menu di sidebar atau tab di bagian atas. •  Halaman  Manajemen Relawan (/data/relawan) •  Menampilkan daftar relawan dalam tabel data. •  Tabel menampilkan kolom kunci dari BNBA (Nama, NIK, Alamat, Kontak, TPS, dll.). •  Implementasi Pagination untuk menangani daftar yang panjang. •  (Opsional) Fitur pencarian dan fifiltering. •  Tombol/Ikon untuk aksi per baris: "Edit", "Hapus". •  Tombol "Tambah Relawan Baru" (mengarahkan ke form input manual atau membuka modal form). •  Bagian atau tombol khusus untuk "Impor Data Relawan" dan "Ekspor Data Relawan". •  Halaman Manajemen Koordinator (/data/koordinator) •  Struktur dan fungsionalitas serupa dengan Halaman Manajemen Relawan (daftar tabel, pagination, edit, hapus, tambah baru, impor, ekspor). •  (Opsional) Halaman Dapil (/data/dapil) •  Jika data Dapil (DPT, jumlah kursi, dll.) perlu dikelola di UI, buat halaman dengan tabel daftar Dapil dan form Edit/ Tambah untuk data non-geografifisnya. Data geografifis (GeoJSON) biasanya diimpor terpisah. •  (Opsional) Halaman Statistik Dapil (/data/statistik-dapil) •  Menampilkan ringkasan statistik per Dapil (jumlah relawan, potensi suara, dll.) dalam tabel atau grafifik. •  Memanggil endpoint API backend untuk mendapatkan data statistik Dapil. •  Implementasi Pagination jika daftar Dapil panjang. •  Tombol "Ekspor Data" untuk mengunduh ringkasan statistik Dapil.

## 4. Formulir Tambah/Edit Data (Relawan/Koordinator)
Bisa berupa halaman terpisah atau modal/dialog yang muncul di atas halaman daftar. •  Field input untuk semua data BNBA yang diperlukan. •  Implementasi Validasi Sisi Klien pada setiap fifield (misal: NIK angka/panjang, format tanggal, fifield wajib). Tampilkan pesan error validasi di bawah fifield. •  Tombol "Simpan". •  Mengirim data ke endpoint API backend (POST /api/relawan untuk tambah, PUT /api/relawan/:iduntuk edit). •  Menampilkan indikator loading saat data sedang dikirim. •  Menampilkan notififikasi sukses atau error setelah respons backend diterima. 

## 5. Antarmuka Impor Data (Relawan/Koordinator)
Bisa berupa halaman atau modal/dialog. •  Tombol "Pilih File" dengan fifilter untuk format CSV dan/atau XLSX. •  (Direkomendasikan) Link untuk mengunduh "Template File Impor". •  Tombol "Unggah & Proses".

## 6. Antarmuka Ekspor Data (Relawan/Koordinator) Tombol atau link "Ekspor Data". •  
## 7. Komunikasi API Backend:
## 8. Routing dan Navigasi:  
## 9. Penanganan Error dan Feedback Pengguna: 
Menangkap error dari panggilan API dan menampilkan pesan yang user-friendly. •  Menggunakan komponen Notififikasi/Toast. 
## 10. UI/UX & Gaya Visual:
Menggunakan Komponen UI yang dipilih untuk konsistensi (warna, tipografifi, layout, kontrol form, tabel, tombol). •  Memastikan tata letak responsif dasar agar dapat diakses di ukuran layar desktop yang berbeda. •  Mengutamakan kejelasan dan fungsionalitas di atas estetika yang rumit. Spesififikasi ini mencakup komponen dan fungsionalitas utama yang perlu diimplementasikan di sisi frontend.

## 12. Database Schema (Prisma)
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Relawan {
  id          String   @id @default(cuid())
  nama        String
  nik         String   @unique
  alamat      String
  kontak      String?
  tps         String?
  dapil       String?
  koordinat   String?  // "lat,lng" format
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Koordinator {
  id          String   @id @default(cuid())
  nama        String
  nik         String   @unique
  alamat      String
  kontak      String?
  wilayah     String?
  koordinat   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Dapil {
  id          String   @id @default(cuid())
  nama        String
  kode        String   @unique
  dpt         Int?
  kursi       Int?
  geojson     Json?    // Store GeoJSON data
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model StatistikDapil {
  id          String   @id @default(cuid())
  dapilId     String
  relawanCount Int
  potensiSuara Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  dapil       Dapil    @relation(fields: [dapilId], references: [id])
}
model Log {
  id          String   @id @default(cuid())
  action      String
  userId      String
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}
model ImportHistory {
  id          String   @id @default(cuid())
  userId      String
  fileName    String
  status      String   // e.g., "success", "failed"
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}
model ExportHistory {
  id          String   @id @default(cuid())
  userId      String
  fileName    String
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}
model GrowthData {
  id          String   @id @default(cuid())
  relawanCount Int
  date        DateTime @default(now())
}
model DashboardSummary {
  id          String   @id @default(cuid())
  totalRelawan Int
  totalPotensiSuara Int
  totalKeterpilihan Int
  createdAt   DateTime @default(now())
}
model MapData {
  id          String   @id @default(cuid())
  dapilId     String
  geojson     Json     // Store GeoJSON data for the map
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  dapil       Dapil    @relation(fields: [dapilId], references: [id])
}
model Notification {
  id          String   @id @default(cuid())
  userId      String
  message     String
  read        Boolean  @default(false)
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}
model Setting {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model AuditLog {
  id          String   @id @default(cuid())
  action      String
  userId      String
  entityType  String
  entityId    String
  changes     Json?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id])
}

## 13 Contoh API route untuk dashboard
import { NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET() {
  try {
    const [relawanCount, koordinatorCount] = await Promise.all([
      db.relawan.count(),
      db.koordinator.count()
    ])
    
    // Calculate other metrics
    const summary = {
      totalRelawan: relawanCount,
      totalKoordinator: koordinatorCount,
      persentasePencapaian: Math.round((relawanCount / 10000) * 100), // Target 10k
      potensiSuara: relawanCount * 5, // Asumsi 1 relawan = 5 suara
    }
    
    return NextResponse.json(summary)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 })
  }
}

## 14. Lain-lain:
API route:
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Validate user from PostgreSQL
    const user = await db.user.findUnique({ where: { email } })
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)
    
    const response = NextResponse.json({ success: true, user })
    response.cookies.set('auth-token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })
    
    return response
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

Database integration:
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}

TechStack:
{
  "name": "manrelbdg-app",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.2.0",
    
    // Database & ORM
    "@prisma/client": "^5.6.0",
    "prisma": "^5.6.0",
    
    // Authentication
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    
    // Maps & Visualization
    "react-leaflet": "^4.2.1",
    "leaflet": "^1.9.4",
    "recharts": "^2.8.0",
    
    // UI & Forms
    "antd": "^5.11.0",
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.0",
    
    // File Processing
    "xlsx": "^0.18.5",
    "csv-parser": "^3.0.0",
    
    // Utilities
    "@tanstack/react-query": "^5.0.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.5",
    "@types/jsonwebtoken": "^9.0.4",
    "@types/leaflet": "^1.9.7",
    "tailwindcss": "^3.3.0"
  }
}
## Deployment plan

- Vercel (Recommended)
  - Deploy langsung dari GitHub
  - PostgreSQL melalui Vercel Postgres atau Supabase
  - Zero configuration
- Self-hosted
  - Docker container tunggal
  - Include PostgreSQL + PostGIS
