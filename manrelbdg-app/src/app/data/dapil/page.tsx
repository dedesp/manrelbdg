import { MainLayout } from '@/components/layout';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Input, 
  Typography,
  Tooltip,
  Progress,
  Statistic
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Search } = Input;

// Mock data - nanti akan diganti dengan data real dari API
interface DapilData {
  key: string;
  id: string;
  nama: string;
  kecamatan: string[];
  kelurahan: string[];
  koordinator: number;
  relawan: number;
  target: number;
  achievement: number;
  createdAt: string;
}

const mockDapilData: DapilData[] = [
  {
    key: '1',
    id: 'DAPIL001',
    nama: 'Dapil 1',
    kecamatan: ['Bandung Wetan', 'Bandung Kulon'],
    kelurahan: ['Cibeunying Kaler', 'Cibeunying Kidul', 'Babakan Ciamis'],
    koordinator: 8,
    relawan: 120,
    target: 150,
    achievement: 80,
    createdAt: '2024-01-01'
  },
  {
    key: '2',
    id: 'DAPIL002',
    nama: 'Dapil 2',
    kecamatan: ['Coblong', 'Sukasari'],
    kelurahan: ['Dago', 'Lebak Siliwangi', 'Cipaganti'],
    koordinator: 6,
    relawan: 98,
    target: 120,
    achievement: 82,
    createdAt: '2024-01-01'
  },
  {
    key: '3',
    id: 'DAPIL003',
    nama: 'Dapil 3',
    kecamatan: ['Cicendo', 'Sukajadi'],
    kelurahan: ['Arjuna', 'Husein Sastranegara', 'Sukajadi'],
    koordinator: 10,
    relawan: 156,
    target: 180,
    achievement: 87,
    createdAt: '2024-01-01'
  },
];

export default function DapilPage() {
  const columns: ColumnsType<DapilData> = [
    {
      title: 'Dapil',
      key: 'dapil',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <EnvironmentOutlined className="text-blue-500" />
          </div>
          <div>
            <div className="font-medium">{record.nama}</div>
            <div className="text-sm text-gray-500">{record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Kecamatan',
      key: 'kecamatan',
      render: (_, record) => (
        <div>
          {record.kecamatan.map((kec, index) => (
            <div key={index} className="text-sm">{kec}</div>
          ))}
        </div>
      ),
    },
    {
      title: 'Jumlah Kelurahan',
      key: 'kelurahan',
      render: (_, record) => (
        <div className="text-center">
          <div className="text-lg font-bold">{record.kelurahan.length}</div>
          <div className="text-xs text-gray-500">kelurahan</div>
        </div>
      ),
    },
    {
      title: 'Koordinator',
      key: 'koordinator',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <TeamOutlined className="text-green-500" />
          <span className="font-medium">{record.koordinator}</span>
        </div>
      ),
      sorter: (a, b) => a.koordinator - b.koordinator,
    },
    {
      title: 'Relawan',
      key: 'relawan',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-blue-500" />
          <span className="font-medium">{record.relawan}</span>
        </div>
      ),
      sorter: (a, b) => a.relawan - b.relawan,
    },
    {
      title: 'Progress Target',
      key: 'progress',
      render: (_, record) => (
        <div className="min-w-[120px]">
          <div className="flex justify-between text-sm mb-1">
            <span>{record.relawan}</span>
            <span>{record.target}</span>
          </div>
          <Progress 
            percent={record.achievement} 
            size="small"
            strokeColor={record.achievement >= 80 ? '#52c41a' : record.achievement >= 60 ? '#faad14' : '#ff4d4f'}
          />
        </div>
      ),
      sorter: (a, b) => a.achievement - b.achievement,
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
    console.log('Edit dapil:', id);
    // Implementasi edit
  };

  const handleDelete = (id: string) => {
    console.log('Delete dapil:', id);
    // Implementasi delete
  };

  const handleAddNew = () => {
    console.log('Add new dapil');
    // Implementasi tambah dapil baru
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <Title level={2} className="mb-2">Data Dapil</Title>
            <p className="text-gray-600">
              Kelola daerah pemilihan dan pembagian wilayah koordinasi
            </p>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAddNew}
          >
            Tambah Dapil
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card size="small">
            <Statistic
              title="Total Dapil"
              value={mockDapilData.length}
              prefix={<EnvironmentOutlined className="text-blue-500" />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
          <Card size="small">
            <Statistic
              title="Total Koordinator"
              value={mockDapilData.reduce((sum, d) => sum + d.koordinator, 0)}
              prefix={<TeamOutlined className="text-green-500" />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
          <Card size="small">
            <Statistic
              title="Total Relawan"
              value={mockDapilData.reduce((sum, d) => sum + d.relawan, 0)}
              prefix={<UserOutlined className="text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
          <Card size="small">
            <Statistic
              title="Target Keseluruhan"
              value={mockDapilData.reduce((sum, d) => sum + d.target, 0)}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </div>

        {/* Search */}
        <Card size="small">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Search
              placeholder="Cari nama dapil atau kecamatan..."
              allowClear
              style={{ width: 300 }}
              onSearch={(value) => console.log('Search:', value)}
            />
            <div className="text-sm text-gray-500">
              Total: {mockDapilData.length} dapil
            </div>
          </div>
        </Card>

        {/* Data Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={mockDapilData}
            pagination={{
              total: mockDapilData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} dari ${total} items`,
            }}
            scroll={{ x: 1000 }}
            size="small"
          />
        </Card>
      </div>
    </MainLayout>
  );
}
