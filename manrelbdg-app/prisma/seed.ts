import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@manrelbdg.com' },
    update: {},
    create: {
      email: 'admin@manrelbdg.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN',
      isActive: true
    }
  })
  
  console.log('👤 Admin user created:', adminUser.email)
  
  // Create sample dapils
  const dapils = [
    {
      kode: 'DAPIL01',
      nama: 'Dapil 1 - Bandung Utara',
      provinsi: 'Jawa Barat',
      kabupaten: 'Kota Bandung',
      kecamatan: ['Coblong', 'Sukasari', 'Cidadap'],
      kelurahan: ['Lebak Siliwangi', 'Sukagalih', 'Cipaganti', 'Sukamulya', 'Gegerkalong'],
      target: 500,
      description: 'Daerah pemilihan kawasan Bandung Utara'
    },
    {
      kode: 'DAPIL02',
      nama: 'Dapil 2 - Bandung Selatan',
      provinsi: 'Jawa Barat',
      kabupaten: 'Kota Bandung',
      kecamatan: ['Kiaracondong', 'Bandung Kidul', 'Batununggal'],
      kelurahan: ['Cikutra', 'Sukapada', 'Sekejati', 'Wates', 'Kebonwaru'],
      target: 450,
      description: 'Daerah pemilihan kawasan Bandung Selatan'
    },
    {
      kode: 'DAPIL03',
      nama: 'Dapil 3 - Bandung Tengah',
      provinsi: 'Jawa Barat',
      kabupaten: 'Kota Bandung',
      kecamatan: ['Bandung Wetan', 'Sumur Bandung', 'Cicendo'],
      kelurahan: ['Braga', 'Kebon Pisang', 'Tamansari', 'Ciroyom', 'Balonggede'],
      target: 600,
      description: 'Daerah pemilihan kawasan Bandung Tengah'
    }
  ]
  
  for (const dapilData of dapils) {
    const dapil = await prisma.dapil.upsert({
      where: { kode: dapilData.kode },
      update: {},
      create: dapilData
    })
    console.log('🗺️  Dapil created:', dapil.nama)
  }
  
  // Get created dapils for relations
  const createdDapils = await prisma.dapil.findMany()
  
  // Create sample koordinators
  const koordinators = [
    {
      nama: 'Budi Santoso',
      nik: '3273010101850001',
      noHp: '08123456789',
      email: 'budi@example.com',
      alamat: 'Jl. Sukajadi No. 123',
      rt: '01',
      rw: '05',
      kelurahan: 'Sukagalih',
      kecamatan: 'Sukasari',
      kabupaten: 'Kota Bandung',
      provinsi: 'Jawa Barat',
      koordinat: '-6.8951,107.6098',
      status: 'AKTIF' as const,
      dapilId: createdDapils[0].id,
      createdById: adminUser.id
    },
    {
      nama: 'Siti Rahayu',
      nik: '3273010201900002',
      noHp: '08234567890',
      email: 'siti@example.com',
      alamat: 'Jl. Cikutra Timur No. 45',
      rt: '03',
      rw: '02',
      kelurahan: 'Cikutra',
      kecamatan: 'Kiaracondong',
      kabupaten: 'Kota Bandung',
      provinsi: 'Jawa Barat',
      koordinat: '-6.9175,107.6504',
      status: 'AKTIF' as const,
      dapilId: createdDapils[1].id,
      createdById: adminUser.id
    }
  ]
  
  for (const koordinatorData of koordinators) {
    // Generate unique code
    const count = await prisma.koordinator.count()
    const kode = `KOR${String(count + 1).padStart(4, '0')}`
    
    const koordinator = await prisma.koordinator.upsert({
      where: { nik: koordinatorData.nik },
      update: {},
      create: {
        ...koordinatorData,
        kode
      }
    })
    console.log('👥 Koordinator created:', koordinator.nama)
  }
  
  // Get created koordinators for relations
  const createdKoordinators = await prisma.koordinator.findMany()
  
  // Create sample relawan
  const relawans = [
    {
      nama: 'Ahmad Wijaya',
      nik: '3273011505920001',
      noHp: '08345678901',
      email: 'ahmad@example.com',
      alamat: 'Jl. Sukabumi No. 67',
      rt: '02',
      rw: '03',
      kelurahan: 'Lebak Siliwangi',
      kecamatan: 'Coblong',
      kabupaten: 'Kota Bandung',
      provinsi: 'Jawa Barat',
      koordinat: '-6.8856,107.6076',
      jenisKelamin: 'LAKI_LAKI' as const,
      tanggalLahir: new Date('1992-05-15'),
      pekerjaan: 'Wiraswasta',
      status: 'AKTIF' as const,
      dapilId: createdDapils[0].id,
      koordinatorId: createdKoordinators[0]?.id,
      createdById: adminUser.id
    },
    {
      nama: 'Dewi Sartika',
      nik: '3273012206880002',
      noHp: '08456789012',
      alamat: 'Jl. Pasteur No. 89',
      rt: '01',
      rw: '04',
      kelurahan: 'Sukagalih',
      kecamatan: 'Sukasari',
      kabupaten: 'Kota Bandung',
      provinsi: 'Jawa Barat',
      koordinat: '-6.8945,107.6102',
      jenisKelamin: 'PEREMPUAN' as const,
      tanggalLahir: new Date('1988-06-22'),
      pekerjaan: 'Guru',
      status: 'AKTIF' as const,
      dapilId: createdDapils[0].id,
      koordinatorId: createdKoordinators[0]?.id,
      createdById: adminUser.id
    },
    {
      nama: 'Rian Pratama',
      nik: '3273013009950003',
      noHp: '08567890123',
      alamat: 'Jl. Kiaracondong No. 12',
      rt: '05',
      rw: '01',
      kelurahan: 'Cikutra',
      kecamatan: 'Kiaracondong',
      kabupaten: 'Kota Bandung',
      provinsi: 'Jawa Barat',
      koordinat: '-6.9180,107.6510',
      jenisKelamin: 'LAKI_LAKI' as const,
      tanggalLahir: new Date('1995-09-30'),
      pekerjaan: 'Mahasiswa',
      status: 'AKTIF' as const,
      dapilId: createdDapils[1].id,
      koordinatorId: createdKoordinators[1]?.id,
      createdById: adminUser.id
    }
  ]
  
  for (const relawanData of relawans) {
    // Generate unique code
    const count = await prisma.relawan.count()
    const kode = `REL${String(count + 1).padStart(4, '0')}`
    
    const relawan = await prisma.relawan.upsert({
      where: { nik: relawanData.nik },
      update: {},
      create: {
        ...relawanData,
        kode
      }
    })
    console.log('🙋 Relawan created:', relawan.nama)
  }
  
  // Create dashboard summary
  const totalRelawan = await prisma.relawan.count()
  const totalKoordinator = await prisma.koordinator.count()
  const totalDapil = await prisma.dapil.count()
  const totalTarget = await prisma.dapil.aggregate({
    _sum: { target: true }
  })
  
  const targetAchievement = totalTarget._sum.target 
    ? (totalRelawan / totalTarget._sum.target) * 100 
    : 0
  
  await prisma.dashboardSummary.create({
    data: {
      totalRelawan,
      totalKoordinator,
      totalDapil,
      targetAchievement: Math.round(targetAchievement)
    }
  })
  
  console.log('📊 Dashboard summary created')
  
  // Create some settings
  const settings = [
    { key: 'app_name', value: 'MANRELBDG', category: 'general' },
    { key: 'app_version', value: '1.0.0', category: 'general' },
    { key: 'max_file_size', value: '10485760', category: 'upload', type: 'number' },
    { key: 'allowed_file_types', value: 'xlsx,xls,csv', category: 'upload' },
    { key: 'backup_enabled', value: 'true', category: 'system', type: 'boolean' }
  ]
  
  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting
    })
  }
  
  console.log('⚙️  Settings created')
  console.log('✅ Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
