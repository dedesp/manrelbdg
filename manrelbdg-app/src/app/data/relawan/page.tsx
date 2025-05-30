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
  Tooltip
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Search } = Input;

// Mock data - nanti akan diganti dengan data real dari API
interface RelawanData {
  key: string;
  id: string;
  nama: string;
  nik: string;
  noHp: string;
  alamat: string;
  dapil: string;
  koordinator: string;
  status: 'aktif' | 'tidak_aktif';
  createdAt: string;
}

const mockRelawanData: RelawanData[] = [
  {
    key: '1',
    id: 'REL001',
    nama: 'Ahmad Sudrajat',
    nik: '3273010101850001',
    noHp: '08123456789',
    alamat: 'Jl. Merdeka No. 123, Bandung',
    dapil: 'Dapil 1',
    koordinator: 'Budi Santoso',
    status: 'aktif',
    createdAt: '2024-01-15'
  },
  {
    key: '2',
    id: 'REL002',
    nama: 'Siti Nurhaliza',
    nik: '3273010201900002',
    noHp: '08567891234',
    alamat: 'Jl. Sudirman No. 456, Bandung',
    dapil: 'Dapil 2',
    koordinator: 'Ani Kartika',
    status: 'aktif',
    createdAt: '2024-01-16'
  },
  {
    key: '3',
    id: 'REL003',
    nama: 'Joko Widodo',
    nik: '3273010301880003',
    noHp: '08765432109',
    alamat: 'Jl. Asia Afrika No. 789, Bandung',
    dapil: 'Dapil 1',
    koordinator: 'Budi Santoso',
    status: 'tidak_aktif',
    createdAt: '2024-01-17'
  },
];

export default function RelawanPage() {
  const columns: ColumnsType<RelawanData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      sorter: true,
    },
    {
      title: 'NIK',
      dataIndex: 'nik',
      key: 'nik',
    },
    {
      title: 'No. HP',
      dataIndex: 'noHp',
      key: 'noHp',
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
      title: 'Koordinator',
      dataIndex: 'koordinator',
      key: 'koordinator',
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
    console.log('Edit relawan:', id);
    // Implementasi edit
  };

  const handleDelete = (id: string) => {
    console.log('Delete relawan:', id);
    // Implementasi delete
  };

  const handleAddNew = () => {
    console.log('Add new relawan');
    // Implementasi tambah relawan baru
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
            <Title level={2} className="mb-2">Data Relawan</Title>
            <p className="text-gray-600">
              Kelola data relawan dan informasi pendukung
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
              Tambah Relawan
            </Button>
          </Space>
        </div>

        {/* Filters and Search */}
        <Card size="small">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Search
                placeholder="Cari nama, NIK, atau No. HP..."
                allowClear
                style={{ width: 300 }}
                onSearch={(value) => console.log('Search:', value)}
              />
              <Button icon={<FilterOutlined />}>
                Filter Lanjutan
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Total: {mockRelawanData.length} relawan
            </div>
          </div>
        </Card>

        {/* Data Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={mockRelawanData}
            pagination={{
              total: mockRelawanData.length,
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
