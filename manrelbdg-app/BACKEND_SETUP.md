# MANRELBDG Backend Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database

#### Option A: Using existing PostgreSQL on macOS
1. Make sure PostgreSQL is running:
   ```bash
   brew services start postgresql
   ```

2. Create database:
   ```bash
   createdb manrelbdg_db
   ```

3. Create user (optional):
   ```bash
   psql postgres
   CREATE USER manrelbdg_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE manrelbdg_db TO manrelbdg_user;
   \q
   ```

#### Option B: Using PostgreSQL.app
1. Start PostgreSQL.app
2. Create database through the app interface
3. Note the connection details

### 3. Environment Variables
Copy `.env.example` to `.env.local` and update the database connection:

```env
# Update this with your PostgreSQL connection details
DATABASE_URL="postgresql://username:password@localhost:5432/manrelbdg_db?schema=public"

# Generate strong secrets
NEXTAUTH_SECRET="your-nextauth-secret-key"
JWT_SECRET="your-jwt-secret-key"
```

**Generate strong secrets:**
```bash
# For JWT_SECRET
openssl rand -base64 32

# For NEXTAUTH_SECRET  
openssl rand -base64 32
```

### 4. Database Setup

1. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```

2. **Push schema to database:**
   ```bash
   npm run db:push
   ```

3. **Seed initial data:**
   ```bash
   npm run db:seed
   ```

### 5. Start Development Server
```bash
npm run dev
```

## 🔍 Testing the API

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Login (get auth token)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@manrelbdg.com", "password": "admin123"}'
```

### Test Protected Route
```bash
# Use token from login response
curl http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📊 Database Management

### View Data
```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555

### Reset Database
```bash
npm run db:reset
```

### Create Migration
```bash
npm run db:migrate
```

## 🔐 Default Login Credentials

**Admin User:**
- Email: `admin@manrelbdg.com`
- Password: `admin123`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user  
- `POST /api/auth/register` - Register new user (admin only)
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Relawan
- `GET /api/relawan` - List relawan (with pagination)
- `POST /api/relawan` - Create relawan
- `GET /api/relawan/[id]` - Get relawan by ID
- `PUT /api/relawan/[id]` - Update relawan
- `DELETE /api/relawan/[id]` - Delete relawan

### Koordinator
- `GET /api/koordinator` - List koordinator (with pagination)
- `POST /api/koordinator` - Create koordinator
- `GET /api/koordinator/[id]` - Get koordinator by ID
- `PUT /api/koordinator/[id]` - Update koordinator
- `DELETE /api/koordinator/[id]` - Delete koordinator

### Dapil
- `GET /api/dapil` - List dapil (with pagination)
- `POST /api/dapil` - Create dapil
- `GET /api/dapil/[id]` - Get dapil by ID
- `PUT /api/dapil/[id]` - Update dapil
- `DELETE /api/dapil/[id]` - Delete dapil

### System
- `GET /api/health` - Health check

## 🔧 Troubleshooting

### Database Connection Issues
1. Check if PostgreSQL is running:
   ```bash
   brew services list | grep postgresql
   ```

2. Test connection:
   ```bash
   psql "postgresql://username:password@localhost:5432/manrelbdg_db"
   ```

3. Check DATABASE_URL in `.env.local`

### Permission Errors
- Make sure user has correct permissions on database
- Try running seed script again

### Port Conflicts
- Default port is 3000
- Change with: `npm run dev -- -p 3001`

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables for Production
Make sure to set these in your production environment:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `NEXTAUTH_URL`
