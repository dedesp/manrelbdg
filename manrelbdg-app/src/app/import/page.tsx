'use client';

import MainLayout from '@/components/layout/MainLayout';
import { 
  Card, 
  Upload, 
  Button, 
  Typography, 
  Steps, 
  Row, 
  Col, 
  Alert,
  Table,
  Space,
  Divider
} from 'antd';
import {
  UploadOutlined,
  FileExcelOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

interface PreviewData {
  key: string;
  nama: string;
  nik: string;
  noHp: string;
  alamat: string;
  status: string;
}

const mockPreviewData: PreviewData[] = [
  {
    key: '1',
    nama: 'John Doe',
    nik: '1234567890123456',
    noHp: '081234567890',
    alamat: 'Jl. Contoh No. 123',
    status: 'Valid'
  },
  {
    key: '2',
    nama: 'Jane Smith',
    nik: '9876543210987654',
    noHp: '087654321098',
    alamat: 'Jl. Sample No. 456',
    status: 'Valid'
  }
];

const columns: ColumnsType<PreviewData> = [
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
    title: 'Alamat',
    dataIndex: 'alamat',
    key: 'alamat',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <span className={status === 'Valid' ? 'text-green-600' : 'text-red-600'}>
        {status}
      </span>
    ),
  },
];

export default function ImportPage() {
  const [currentStep, setCurrentStep] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.xlsx,.xls,.csv',
    fileList,
    beforeUpload: (file: File) => {
      setFileList([file]);
      return false; // Prevent auto upload
    },
    onRemove: () => {
      setFileList([]);
      setCurrentStep(0);
    },
  };

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setCurrentStep(1);
    }, 2000);
  };

  const handleImport = () => {
    setUploading(true);
    // Simulate import process
    setTimeout(() => {
      setUploading(false);
      setCurrentStep(2);
    }, 3000);
  };

  const steps = [
    {
      title: 'Upload File',
      description: 'Pilih file Excel atau CSV',
    },
    {
      title: 'Preview Data',
      description: 'Periksa data yang akan diimport',
    },
    {
      title: 'Import Complete',
      description: 'Data berhasil diimport',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <Title level={2} className="mb-2">Import Data</Title>
          <Paragraph className="text-gray-600">
            Import data relawan, koordinator, atau dapil dari file Excel/CSV
          </Paragraph>
        </div>

        {/* Progress Steps */}
        <Card>
          <Steps current={currentStep} items={steps} />
        </Card>

        {/* Step Content */}
        {currentStep === 0 && (
          <Card title="Upload File Data">
            <Row gutter={24}>
              <Col span={16}>
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <FileExcelOutlined className="text-4xl text-blue-500" />
                  </p>
                  <p className="ant-upload-text">
                    Klik atau drag file ke area ini untuk upload
                  </p>
                  <p className="ant-upload-hint">
                    Support untuk file Excel (.xlsx, .xls) dan CSV (.csv)
                  </p>
                </Dragger>
                
                {fileList.length > 0 && (
                  <div className="mt-4">
                    <Button 
                      type="primary" 
                      onClick={handleUpload}
                      loading={uploading}
                      disabled={!fileList.length}
                      icon={<UploadOutlined />}
                    >
                      {uploading ? 'Processing...' : 'Process File'}
                    </Button>
                  </div>
                )}
              </Col>
              
              <Col span={8}>
                <Alert
                  message="Format File"
                  description={
                    <div className="space-y-2">
                      <p><strong>Kolom yang diperlukan:</strong></p>
                      <ul className="list-disc list-inside text-sm">
                        <li>Nama (wajib)</li>
                        <li>NIK (wajib)</li>
                        <li>No. HP (wajib)</li>
                        <li>Alamat</li>
                        <li>Dapil (opsional)</li>
                      </ul>
                      <p className="text-xs text-gray-500 mt-2">
                        Pastikan header sesuai dengan format yang ditentukan
                      </p>
                    </div>
                  }
                  type="info"
                  showIcon
                />
              </Col>
            </Row>
          </Card>
        )}

        {currentStep === 1 && (
          <Card title="Preview Data Import">
            <Alert
              message="Data Preview"
              description="Periksa data di bawah ini sebelum melakukan import. Pastikan semua data sudah benar."
              type="warning"
              showIcon
              className="mb-4"
            />
            
            <Table
              columns={columns}
              dataSource={mockPreviewData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }}
            />
            
            <Divider />
            
            <Space>
              <Button onClick={() => setCurrentStep(0)}>
                Back
              </Button>
              <Button 
                type="primary" 
                onClick={handleImport}
                loading={uploading}
                icon={uploading ? <LoadingOutlined /> : <CheckCircleOutlined />}
              >
                {uploading ? 'Importing...' : 'Import Data'}
              </Button>
            </Space>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <div className="text-center py-8">
              <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
              <Title level={3} className="text-green-600">Import Berhasil!</Title>
              <Paragraph className="text-gray-600 mb-6">
                Data telah berhasil diimport ke sistem. Total 2 record berhasil ditambahkan.
              </Paragraph>
              
              <Space>
                <Button onClick={() => {
                  setCurrentStep(0);
                  setFileList([]);
                }}>
                  Import Lagi
                </Button>
                <Button type="primary" href="/data/relawan">
                  Lihat Data
                </Button>
              </Space>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
