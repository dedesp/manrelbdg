'use client';

import MainLayout from '@/components/layout/MainLayout';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Input, 
  Tag,
  Typography,
  Tooltip,
  Avatar
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Search } = Input;

// Mock data - nanti akan diganti dengan data real dari API
interface KoordinatorData {
  key: string;
  id: string;
  nama: string;
  nik: string;
  noHp: string;
  email: string;
  alamat: string;
  dapil: string;
  jumlahRelawan: number;
  status: 'aktif' | 'tidak_aktif';
  createdAt: string;
}

const mockKoordinatorData: KoordinatorData[] = [
  {
    key: '1',
    id: 'KOR001',
    nama: 'Budi Santoso',
    nik: '3273010101800001',
    noHp: '08123456789',
    email: 'budi.santoso@email.com',
    alamat: 'Jl. Merdeka No. 123, Bandung',
    dapil: 'Dapil 1',
    jumlahRelawan: 25,
    status: 'aktif',
    createdAt: '2024-01-10'
  },
  {
    key: '2',
    id: 'KOR002',
    nama: 'Ani Kartika',
    nik: '3273010201850002',
    noHp: '08567891234',
    email: 'ani.kartika@email.com',
    alamat: 'Jl. Sudirman No. 456, Bandung',
    dapil: 'Dapil 2',
    jumlahRelawan: 18,
    status: 'aktif',
    createdAt: '2024-01-11'
  },
  {
    key: '3',
    id: 'KOR003',
    nama: 'Dedi Mulyadi',
    nik: '3273010301820003',
    noHp: '08765432109',
    email: 'dedi.mulyadi@email.com',
    alamat: 'Jl. Asia Afrika No. 789, Bandung',
    dapil: 'Dapil 3',
    jumlahRelawan: 32,
    status: 'aktif',
    createdAt: '2024-01-12'
  },
];

export default function KoordinatorPage() {
  const columns: ColumnsType<KoordinatorData> = [
    {
      title: 'Koordinator',
      key: 'koordinator',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.nama}</div>
            <div className="text-sm text-gray-500">{record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Kontak',
      key: 'kontak',
      render: (_, record) => (
        <div>
          <div className="text-sm">{record.noHp}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'NIK',
      dataIndex: 'nik',
      key: 'nik',
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
      ellipsis: true,
    },
    {
      title: 'Dapil',
      dataIndex: 'dapil',
      key: 'dapil',
      filters: [
        { text: 'Dapil 1', value: 'Dapil 1' },
        { text: 'Dapil 2', value: 'Dapil 2' },
        { text: 'Dapil 3', value: 'Dapil 3' },
      ],
    },
    {
      title: 'Jumlah Relawan',
      key: 'jumlahRelawan',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <TeamOutlined className="text-blue-500" />
          <span className="font-medium">{record.jumlahRelawan}</span>
        </div>
      ),
      sorter: (a, b) => a.jumlahRelawan - b.jumlahRelawan,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'aktif' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Aktif', value: 'aktif' },
        { text: 'Tidak Aktif', value: 'tidak_aktif' },
      ],
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEdit(record.id)}
            />
          </Tooltip>
          <Tooltip title="Hapus">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = (id: string) => {
    console.log('Edit koordinator:', id);
    // Implementasi edit
  };

  const handleDelete = (id: string) => {
    console.log('Delete koordinator:', id);
    // Implementasi delete
  };

  const handleAddNew = () => {
    console.log('Add new koordinator');
    // Implementasi tambah koordinator baru
  };

  const handleExport = () => {
    console.log('Export data');
    // Implementasi export
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <Title level={2} className="mb-2">Data Koordinator</Title>
            <p className="text-gray-600">
              Kelola data koordinator dan supervisi relawan
            </p>
          </div>
          <Space>
            <Button 
              icon={<ExportOutlined />}
              onClick={handleExport}
            >
              Export
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddNew}
            >
              Tambah Koordinator
            </Button>
          </Space>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card size="small">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Koordinator</p>
                <p className="text-2xl font-bold text-blue-500">
                  {mockKoordinatorData.length}
                </p>
              </div>
              <UserOutlined className="text-2xl text-blue-500" />
            </div>
          </Card>
          <Card size="small">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Relawan Dibawahi</p>
                <p className="text-2xl font-bold text-green-500">
                  {mockKoordinatorData.reduce((sum, k) => sum + k.jumlahRelawan, 0)}
                </p>
              </div>
              <TeamOutlined className="text-2xl text-green-500" />
            </div>
          </Card>
          <Card size="small">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rata-rata per Koordinator</p>
                <p className="text-2xl font-bold text-orange-500">
                  {Math.round(
                    mockKoordinatorData.reduce((sum, k) => sum + k.jumlahRelawan, 0) / 
                    mockKoordinatorData.length
                  )}
                </p>
              </div>
              <TeamOutlined className="text-2xl text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card size="small">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Search
              placeholder="Cari nama, email, atau NIK..."
              allowClear
              style={{ width: 300 }}
              onSearch={(value) => console.log('Search:', value)}
            />
            <div className="text-sm text-gray-500">
              Total: {mockKoordinatorData.length} koordinator
            </div>
          </div>
        </Card>

        {/* Data Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={mockKoordinatorData}
            pagination={{
              total: mockKoordinatorData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} dari ${total} items`,
            }}
            scroll={{ x: 1200 }}
            size="small"
          />
        </Card>
      </div>
    </MainLayout>
  );
}
