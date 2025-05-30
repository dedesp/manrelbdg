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

---

## **1. Project Structure**

```
manrelbdg-app/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts               # Database seeding
├── src/
│   ├── app/
│   │   ├── api/               # Backend API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── summary/route.ts
│   │   │   │   ├── growth/route.ts
│   │   │   │   └── map-data/route.ts
│   │   │   ├── relawan/
│   │   │   │   ├── route.ts       # GET, POST
│   │   │   │   ├── [id]/route.ts  # PUT, DELETE
│   │   │   │   ├── import/route.ts
│   │   │   │   └── export/route.ts
│   │   │   ├── koordinator/
│   │   │   │   └── ...similar structure
│   │   │   ├── dapil/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   └── upload/
│   │   │       └── route.ts      # File upload handler
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── layout.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── data/
│   │   │   ├── relawan/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   ├── koordinator/
│   │   │   │   └── ...similar structure
│   │   │   └── dapil/page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── toast.tsx
│   │   │   └── loading.tsx
│   │   ├── forms/
│   │   │   ├── relawan-form.tsx
│   │   │   ├── koordinator-form.tsx
│   │   │   └── validation-schemas.ts
│   │   ├── maps/
│   │   │   ├── dashboard-map.tsx
│   │   │   ├── map-legend.tsx
│   │   │   └── map-controls.tsx
│   │   ├── charts/
│   │   │   ├── growth-chart.tsx
│   │   │   ├── stats-card.tsx
│   │   │   └── pie-chart.tsx
│   │   ├── tables/
│   │   │   ├── data-table.tsx
│   │   │   ├── pagination.tsx
│   │   │   └── table-filters.tsx
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── breadcrumb.tsx
│   │   └── import-export/
│   │       ├── file-upload.tsx
│   │       ├── import-modal.tsx
│   │       └── export-modal.tsx
│   ├── lib/
│   │   ├── database.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   ├── validations.ts
│   │   ├── file-processor.ts
│   │   └── api-client.ts
│   ├── types/
│   │   ├── index.ts           # Shared types
│   │   ├── api.ts            # API response types
│   │   └── database.ts       # Database types
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-api.ts
│   │   └── use-local-storage.ts
│   └── stores/
│       ├── auth-store.ts
│       ├── ui-store.ts
│       └── data-store.ts
├── public/
│   ├── icons/
│   ├── images/
│   └── templates/
│       ├── relawan-template.csv
│       └── koordinator-template.csv
├── tests/
│   ├── api/
│   ├── components/
│   └── utils/
├── docs/
│   ├── api.md
│   ├── deployment.md
│   └── user-guide.md
├── .env.example
├── .gitignore
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── package.json
├── README.md
└── docker-compose.yml
```

---

## **2. Environment Variables**

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/manrelbdg"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_DIR="/tmp/uploads"

# API Configuration
API_RATE_LIMIT=100
RATE_LIMIT_WINDOW=900000  # 15 minutes

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Logging
LOG_LEVEL="info"
LOG_FILE="./logs/app.log"

# Cache (Optional - Redis)
REDIS_URL="redis://localhost:6379"

# External APIs (Optional)
MAPS_API_KEY="your-maps-api-key"
```

---

## **3. Database Schema (Prisma)**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String          @id @default(cuid())
  email         String          @unique
  password      String
  name          String
  role          String          @default("admin")
  isActive      Boolean         @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  
  // Relations
  logs          Log[]
  importHistory ImportHistory[]
  exportHistory ExportHistory[]
  notifications Notification[]
  auditLogs     AuditLog[]

  @@map("users")
}

model Relawan {
  id        String   @id @default(cuid())
  nama      String
  nik       String   @unique
  alamat    String
  kelurahan String?
  kecamatan String?
  kabupaten String?
  provinsi  String?
  kontak    String?
  email     String?
  tps       String?
  dapil     String?
  koordinat String?  // "lat,lng" format
  status    String   @default("active") // active, inactive
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("relawan")
  @@index([nik])
  @@index([dapil])
  @@index([status])
}

model Koordinator {
  id          String   @id @default(cuid())
  nama        String
  nik         String   @unique
  alamat      String
  kelurahan   String?
  kecamatan   String?
  kabupaten   String?
  provinsi    String?
  kontak      String?
  email       String?
  wilayah     String?
  tingkat     String?  // "kecamatan", "kelurahan", "rw", "rt"
  koordinat   String?
  status      String   @default("active")
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("koordinator")
  @@index([nik])
  @@index([wilayah])
  @@index([status])
}

model Dapil {
  id              String           @id @default(cuid())
  nama            String
  kode            String           @unique
  tingkat         String           // "pusat", "provinsi", "kabupaten"
  dpt             Int?
  kursi           Int?
  targetRelawan   Int?
  geojson         Json?            // Store GeoJSON data
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  
  // Relations
  statistikDapil  StatistikDapil[]
  mapData         MapData[]

  @@map("dapil")
  @@index([kode])
  @@index([tingkat])
}

model StatistikDapil {
  id              String   @id @default(cuid())
  dapilId         String
  relawanCount    Int      @default(0)
  koordinatorCount Int     @default(0)
  potensiSuara    Int      @default(0)
  targetPencapaian Float?
  periode         String   // "2024-01", "2024-02", etc.
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  dapil           Dapil    @relation(fields: [dapilId], references: [id], onDelete: Cascade)

  @@map("statistik_dapil")
  @@unique([dapilId, periode])
}

model Log {
  id        String   @id @default(cuid())
  action    String   // "LOGIN", "LOGOUT", "CREATE", "UPDATE", "DELETE"
  userId    String
  details   String?
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("logs")
  @@index([userId])
  @@index([action])
  @@index([createdAt])
}

model ImportHistory {
  id           String   @id @default(cuid())
  userId       String
  fileName     String
  fileType     String   // "csv", "xlsx"
  entityType   String   // "relawan", "koordinator", "dapil"
  status       String   // "success", "failed", "pending", "processing"
  recordsTotal Int?
  recordsSuccess Int?
  recordsFailed Int?
  errorDetails Json?
  filePath     String?
  createdAt    DateTime @default(now())

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("import_history")
  @@index([userId])
  @@index([status])
  @@index([entityType])
}

model ExportHistory {
  id         String   @id @default(cuid())
  userId     String
  fileName   String
  fileType   String   // "csv", "xlsx", "pdf"
  entityType String   // "relawan", "koordinator", "statistik"
  filters    Json?    // Store export filters
  recordsCount Int?
  filePath   String?
  createdAt  DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("export_history")
  @@index([userId])
  @@index([entityType])
}

model GrowthData {
  id               String   @id @default(cuid())
  relawanCount     Int
  koordinatorCount Int?
  totalPotensiSuara Int?
  dapil            String?  // Optional: track per dapil
  periode          String   // "2024-01-01", "2024-01-02", etc.
  createdAt        DateTime @default(now())

  @@map("growth_data")
  @@unique([periode, dapil])
  @@index([periode])
  @@index([dapil])
}

model DashboardSummary {
  id                   String   @id @default(cuid())
  totalRelawan         Int
  totalKoordinator     Int
  totalPotensiSuara    Int
  totalKeterpilihan    Float?
  persentasePencapaian Float?
  periode              String   // "2024-01", "2024-02", etc.
  createdAt            DateTime @default(now())

  @@map("dashboard_summary")
  @@unique([periode])
}

model MapData {
  id        String   @id @default(cuid())
  dapilId   String
  geojson   Json     // Store GeoJSON data for the map
  layerType String   // "dapil", "koordinator", "relawan"
  properties Json?   // Additional map properties
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  dapil     Dapil    @relation(fields: [dapilId], references: [id], onDelete: Cascade)

  @@map("map_data")
  @@index([layerType])
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  title     String
  message   String
  type      String   @default("info") // "success", "error", "warning", "info"
  priority  String   @default("normal") // "low", "normal", "high"
  read      Boolean  @default(false)
  readAt    DateTime?
  expiresAt DateTime?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("notifications")
  @@index([userId, read])
  @@index([type])
  @@index([priority])
}

model Setting {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String
  category    String?  // "general", "security", "notification", "import"
  description String?
  dataType    String   @default("string") // "string", "number", "boolean", "json"
  isPublic    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("settings")
  @@index([category])
  @@index([isPublic])
}

model AuditLog {
  id         String   @id @default(cuid())
  action     String   // "CREATE", "UPDATE", "DELETE", "IMPORT", "EXPORT"
  userId     String
  entityType String   // "Relawan", "Koordinator", "Dapil", "User"
  entityId   String
  changes    Json?    // Store before/after values
  metadata   Json?    // Additional context
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("audit_logs")
  @@index([userId])
  @@index([action])
  @@index([entityType])
  @@index([createdAt])
}

model SystemHealth {
  id              String   @id @default(cuid())
  cpuUsage        Float?
  memoryUsage     Float?
  diskUsage       Float?
  databaseSize    BigInt?
  activeUsers     Int?
  apiResponseTime Float?
  errorRate       Float?
  createdAt       DateTime @default(now())

  @@map("system_health")
  @@index([createdAt])
}
```

---

## **4. Complete Package.json**

```json
{
  "name": "manrelbdg-app",
  "version": "1.0.0",
  "description": "Aplikasi Manajemen Pendukung Kampanye",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:reset": "prisma migrate reset",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "docker:build": "docker build -t manrelbdg-app .",
    "docker:run": "docker-compose up -d"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    
    "@prisma/client": "^5.14.0",
    "prisma": "^5.14.0",
    
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "next-auth": "^4.24.0",
    
    "react-leaflet": "^4.2.1",
    "leaflet": "^1.9.4",
    "recharts": "^2.12.0",
    
    "antd": "^5.17.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.23.0",
    
    "xlsx": "^0.18.5",
    "csv-parser": "^3.0.0",
    "papaparse": "^5.4.0",
    
    "@tanstack/react-query": "^5.40.0",
    "@tanstack/react-query-devtools": "^5.40.0",
    "zustand": "^4.5.0",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    
    "axios": "^1.7.0",
    "js-cookie": "^3.0.5",
    "react-hot-toast": "^2.4.0",
    "react-dropzone": "^14.2.0",
    
    "@types/geojson": "^7946.0.14",
    "geojson": "^0.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/leaflet": "^1.9.12",
    "@types/js-cookie": "^3.0.6",
    "@types/papaparse": "^5.3.14",
    
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    
    "jest": "^29.7.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "jest-environment-jsdom": "^29.7.0",
    
    "tsx": "^4.10.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.2.0"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## **5. API Documentation**

### **Authentication Routes**

#### POST `/api/auth/login`
```typescript
// Request
{
  "email": "admin@example.com",
  "password": "password123"
}

// Response - Success (200)
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "admin@example.com",
    "name": "Admin",
    "role": "admin"
  },
  "token": "jwt_token"
}

// Response - Error (401)
{
  "error": "Invalid credentials"
}
```

#### POST `/api/auth/logout`
```typescript
// Response (200)
{
  "success": true,
  "message": "Logged out successfully"
}
```

### **Dashboard Routes**

#### GET `/api/dashboard/summary`
```typescript
// Response (200)
{
  "totalRelawan": 1250,
  "totalKoordinator": 45,
  "totalPotensiSuara": 6250,
  "persentasePencapaian": 62.5,
  "targetRelawan": 2000,
  "growthRate": {
    "relawan": 15.2,
    "koordinator": 8.7
  }
}
```

#### GET `/api/dashboard/growth?period=30d&dapil=optional`
```typescript
// Response (200)
{
  "data": [
    {
      "date": "2024-01-01",
      "relawanCount": 1200,
      "koordinatorCount": 40,
      "potensiSuara": 6000
    }
  ],
  "summary": {
    "totalGrowth": 250,
    "averageDaily": 8.3
  }
}
```

### **Relawan Routes**

#### GET `/api/relawan?page=1&limit=10&search=&dapil=&status=`
```typescript
// Response (200)
{
  "data": [
    {
      "id": "rel_123",
      "nama": "John Doe",
      "nik": "1234567890123456",
      "alamat": "Jl. Contoh No. 123",
      "kontak": "08123456789",
      "dapil": "DAPIL_1",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 1250,
    "page": 1,
    "limit": 10,
    "totalPages": 125
  }
}
```

#### POST `/api/relawan`
```typescript
// Request
{
  "nama": "Jane Doe",
  "nik": "1234567890123457",
  "alamat": "Jl. Contoh No. 124",
  "kontak": "08123456790",
  "dapil": "DAPIL_1"
}

// Response - Success (201)
{
  "success": true,
  "data": {
    "id": "rel_124",
    "nama": "Jane Doe",
    "nik": "1234567890123457",
    // ... other fields
  }
}

// Response - Error (400)
{
  "error": "NIK already exists",
  "details": {
    "field": "nik",
    "code": "DUPLICATE"
  }
}
```

### **Import/Export Routes**

#### POST `/api/relawan/import`
```typescript
// Form Data
// file: CSV/Excel file
// options: { skipDuplicates: boolean, validateAll: boolean }

// Response (200)
{
  "success": true,
  "importId": "imp_123",
  "summary": {
    "total": 100,
    "success": 95,
    "failed": 5,
    "duplicates": 3
  },
  "errors": [
    {
      "row": 12,
      "field": "nik",
      "message": "Invalid NIK format"
    }
  ]
}
```

#### GET `/api/relawan/export?format=csv&filters={}`
```typescript
// Response - File download with headers:
// Content-Type: text/csv
// Content-Disposition: attachment; filename=relawan_export_2024-01-01.csv
```

---

## **6. Security Features**

### **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin, User, Viewer)
- Session timeout management
- Password hashing with bcrypt

### **Input Validation**
- Server-side validation with Zod schemas
- Client-side validation with React Hook Form
- SQL injection prevention with Prisma
- XSS protection with input sanitization

### **Rate Limiting**
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimit = new Map()

export function middleware(request: NextRequest) {
  const ip = request.ip ?? 'unknown'
  const limit = 100 // requests per window
  const windowMs = 15 * 60 * 1000 // 15 minutes
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 0, resetTime: Date.now() + windowMs })
  }
  
  const record = rateLimit.get(ip)
  
  if (Date.now() > record.resetTime) {
    record.count = 0
    record.resetTime = Date.now() + windowMs
  }
  
  if (record.count >= limit) {
    return NextResponse.json(
      { error: 'Too many requests' }, 
      { status: 429 }
    )
  }
  
  record.count++
  
  return NextResponse.next()
}
```

### **Data Protection**
- HTTPS enforcement in production
- Secure cookie settings
- Environment variables for sensitive data
- Database connection encryption

---

## **7. Performance Optimization**

### **Caching Strategy**
```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache'

export const getCachedDashboardSummary = unstable_cache(
  async () => {
    return await db.dashboardSummary.findFirst({
      orderBy: { createdAt: 'desc' }
    })
  },
  ['dashboard-summary'],
  { revalidate: 300 } // 5 minutes
)
```

### **Database Optimization**
- Proper indexing on frequently queried fields
- Connection pooling
- Query optimization with Prisma
- Pagination for large datasets

### **Frontend Optimization**
- React Query for server state management
- Code splitting with Next.js
- Image optimization
- Lazy loading for components

---

## **8. Testing Strategy**

### **Unit Tests**
```typescript
// __tests__/api/relawan.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/relawan/route'

describe('/api/relawan', () => {
  it('should create a new relawan', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        nama: 'Test User',
        nik: '1234567890123456',
        alamat: 'Test Address'
      }
    })

    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toMatchObject({
      success: true,
      data: expect.objectContaining({
        nama: 'Test User'
      })
    })
  })
})
```

### **Integration Tests**
- API endpoint testing
- Database integration testing
- Authentication flow testing

### **E2E Tests**
- User journey testing with Playwright
- Critical path testing
- Cross-browser compatibility

---

## **9. Deployment Configuration**

### **Docker Setup**
```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

### **Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/manrelbdg
      - JWT_SECRET=your-secret-key
    depends_on:
      - db
    
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=manrelbdg
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
      
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### **Vercel Deployment**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "env": {
    "DATABASE_URL": "@database-url",
    "JWT_SECRET": "@jwt-secret",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  },
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

---

## **10. Monitoring & Logging**

### **Error Tracking**
```typescript
// lib/logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
})
```

### **Health Checks**
```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET() {
  try {
    // Check database connection
    await db.$queryRaw`SELECT 1`
    
    // Check memory usage
    const memUsage = process.memoryUsage()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        memory: {
          used: Math.round(memUsage.heapUsed / 1024 / 1024),
          total: Math.round(memUsage.heapTotal / 1024 / 1024)
        }
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: error.message 
      },
      { status: 503 }
    )
  }
}
```

---

## **11. User Roles & Permissions**

### **Role Definitions**
```typescript
// types/auth.ts
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer'
}

export const PERMISSIONS = {
  // Data Management
  'relawan:create': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  'relawan:read': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.VIEWER],
  'relawan:update': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  'relawan:delete': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  
  // Import/Export
  'data:import': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER],
  'data:export': [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
  
  // System Management
  'users:manage': [UserRole.SUPER_ADMIN],
  'settings:manage': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  'logs:view': [UserRole.SUPER_ADMIN, UserRole.ADMIN],
} as const
```

---

## **12. Backup & Recovery**

### **Database Backup Strategy**
```bash
#!/bin/bash
# scripts/backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="manrelbdg"

# Create backup
pg_dump $DATABASE_URL > "$BACKUP_DIR/backup_$DATE.sql"

# Compress backup
gzip "$BACKUP_DIR/backup_$DATE.sql"

# Remove backups older than 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

### **Automated Backup Schedule**
```yaml
# .github/workflows/backup.yml
name: Database Backup

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Backup Database
        run: |
          pg_dump ${{ secrets.DATABASE_URL }} | gzip > backup_$(date +%Y%m%d).sql.gz
      
      - name: Upload to Storage
        uses: actions/upload-artifact@v3
        with:
          name: database-backup
          path: backup_*.sql.gz
```

---

Ini adalah PRD yang lengkap dan komprehensif untuk aplikasi Next.js fullstack Anda. PRD ini mencakup semua aspek teknis yang diperlukan untuk membangun aplikasi yang robust, secure, dan scalable.
