'use client';

import MainLayout from '@/components/layout/MainLayout';
import { 
  Card, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Select,
  DatePicker,
  Space,
  Table,
  Tag
} from 'antd';
import {
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useContent, useBranding, useTerminology } from '@/hooks/useClientConfig';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface ExportData {
  key: string;
  nama: string;
  nik: string;
  noHp: string;
  dapil: string;
  tanggalDaftar: string;
  status: 'Aktif' | 'Tidak Aktif';
}

const mockExportData: ExportData[] = [
  {
    key: '1',
    nama: 'John Doe',
    nik: '1234567890123456',
    noHp: '081234567890',
    dapil: 'Dapil 1',
    tanggalDaftar: '2024-01-15',
    status: 'Aktif'
  },
  {
    key: '2',
    nama: 'Jane Smith',
    nik: '9876543210987654',
    noHp: '087654321098',
    dapil: 'Dapil 2',
    tanggalDaftar: '2024-01-20',
    status: 'Aktif'
  },
  {
    key: '3',
    nama: 'Bob Johnson',
    nik: '5555666677778888',
    noHp: '081987654321',
    dapil: 'Dapil 1',
    tanggalDaftar: '2024-02-01',
    status: 'Tidak Aktif'
  }
];

export default function ExportPage() {
  const content = useContent();
  const branding = useBranding();
  const terminology = useTerminology();
  const [dataType, setDataType] = useState('relawan');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dateRange, setDateRange] = useState<any>(null);
  const [selectedDapil, setSelectedDapil] = useState<string>('all');
  const [selectedData] = useState<ExportData[]>(mockExportData);
  const [exporting, setExporting] = useState(false);

  const getColumns = (): ColumnsType<ExportData> => [
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
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
      title: terminology.dapil,
      dataIndex: 'dapil',
      key: 'dapil',
    },
    {
      title: 'Tanggal Daftar',
      dataIndex: 'tanggalDaftar',
      key: 'tanggalDaftar',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Aktif' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
  ];

  const handleExport = (format: 'excel' | 'pdf') => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      setExporting(false);
      // In real implementation, this would trigger file download
      console.log(`Exporting ${selectedData.length} records as ${format}`);
    }, 2000);
  };

  const exportStats = {
    total: selectedData.length,
    aktif: selectedData.filter(item => item.status === 'Aktif').length,
    tidakAktif: selectedData.filter(item => item.status === 'Tidak Aktif').length,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <Title level={2} className="mb-2" style={{ color: branding.colors.primary }}>
            {content.pages.export.title}
          </Title>
          <Paragraph className="text-gray-600">
            {content.pages.export.description}
          </Paragraph>
        </div>

        {/* Filter Section */}
        <Card title={<><FilterOutlined className="mr-2" />Filter Data Export</>}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8} md={6}>
              <label className="block text-sm font-medium mb-1">Jenis Data</label>
              <Select
                value={dataType}
                onChange={setDataType}
                className="w-full"
              >
                <Option value="relawan">{terminology.relawanPlural}</Option>
                <Option value="koordinator">{terminology.koordinatorPlural}</Option>
                <Option value="dapil">{terminology.dapilPlural}</Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={8} md={6}>
              <label className="block text-sm font-medium mb-1">Dapil</label>
              <Select
                value={selectedDapil}
                onChange={setSelectedDapil}
                className="w-full"
              >
                <Option value="all">Semua Dapil</Option>
                <Option value="dapil1">Dapil 1</Option>
                <Option value="dapil2">Dapil 2</Option>
                <Option value="dapil3">Dapil 3</Option>
              </Select>
            </Col>
            
            <Col xs={24} sm={12} md={8}>
              <label className="block text-sm font-medium mb-1">Periode</label>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                className="w-full"
                placeholder={['Tanggal Mulai', 'Tanggal Akhir']}
              />
            </Col>
            
            <Col xs={24} md={4}>
              <label className="block text-sm font-medium mb-1">&nbsp;</label>
              <Button 
                type="primary" 
                className="w-full"
                icon={<FilterOutlined />}
              >
                Terapkan Filter
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Export Statistics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{exportStats.total}</div>
                <div className="text-gray-600">Total Data</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{exportStats.aktif}</div>
                <div className="text-gray-600">Data Aktif</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{exportStats.tidakAktif}</div>
                <div className="text-gray-600">Data Tidak Aktif</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Export Actions */}
        <Card title="Export Options">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                <div className="flex items-center mb-3">
                  <FileExcelOutlined className="text-2xl text-green-600 mr-3" />
                  <div>
                    <div className="font-medium">Export ke Excel</div>
                    <div className="text-sm text-gray-500">Format .xlsx dengan semua kolom data</div>
                  </div>
                </div>
                <Button 
                  type="primary" 
                  block 
                  loading={exporting}
                  onClick={() => handleExport('excel')}
                  icon={<DownloadOutlined />}
                >
                  Download Excel
                </Button>
              </div>
            </Col>
            
            <Col xs={24} md={12}>
              <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                <div className="flex items-center mb-3">
                  <FilePdfOutlined className="text-2xl text-red-600 mr-3" />
                  <div>
                    <div className="font-medium">Export ke PDF</div>
                    <div className="text-sm text-gray-500">Format PDF untuk laporan</div>
                  </div>
                </div>
                <Button 
                  type="primary" 
                  block 
                  loading={exporting}
                  onClick={() => handleExport('pdf')}
                  icon={<DownloadOutlined />}
                >
                  Download PDF
                </Button>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Data Preview */}
        <Card 
          title="Preview Data Export"
          extra={
            <Space>
              <Button icon={<PrinterOutlined />}>Print</Button>
              <Button type="primary" icon={<DownloadOutlined />}>
                Quick Download
              </Button>
            </Space>
          }
        >
          <Table
            columns={getColumns()}
            dataSource={selectedData}
            pagination={{ 
              pageSize: 10,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} dari ${total} data`
            }}
            scroll={{ x: 800 }}
          />
        </Card>
      </div>
    </MainLayout>
  );
}
