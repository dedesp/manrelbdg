import { MainLayout } from '@/components/layout';
import { DapilChart, ProgressChart } from '@/components/charts';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography,
  DatePicker,
  Select,
  Button,
  Space,
  Table
} from 'antd';
import {
  DownloadOutlined,
  PrinterOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock data untuk laporan
interface ReportData {
  key: string;
  dapil: string;
  koordinator: number;
  relawan: number;
  target: number;
  achievement: number;
  growth: number;
}

const mockReportData: ReportData[] = [
  {
    key: '1',
    dapil: 'Dapil 1',
    koordinator: 8,
    relawan: 120,
    target: 150,
    achievement: 80,
    growth: 15
  },
  {
    key: '2',
    dapil: 'Dapil 2',
    koordinator: 6,
    relawan: 98,
    target: 120,
    achievement: 82,
    growth: 8
  },
  {
    key: '3',
    dapil: 'Dapil 3',
    koordinator: 10,
    relawan: 156,
    target: 180,
    achievement: 87,
    growth: 22
  },
];

export default function ReportsPage() {
  const columns: ColumnsType<ReportData> = [
    {
      title: 'Dapil',
      dataIndex: 'dapil',
      key: 'dapil',
    },
    {
      title: 'Koordinator',
      dataIndex: 'koordinator',
      key: 'koordinator',
      align: 'center',
    },
    {
      title: 'Relawan',
      dataIndex: 'relawan',
      key: 'relawan',
      align: 'center',
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
      align: 'center',
    },
    {
      title: 'Achievement (%)',
      dataIndex: 'achievement',
      key: 'achievement',
      align: 'center',
      render: (value: number) => (
        <span className={value >= 80 ? 'text-green-600 font-medium' : value >= 60 ? 'text-yellow-600 font-medium' : 'text-red-600 font-medium'}>
          {value}%
        </span>
      ),
    },
    {
      title: 'Growth (%)',
      dataIndex: 'growth',
      key: 'growth',
      align: 'center',
      render: (value: number) => (
        <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
          {value > 0 ? '+' : ''}{value}%
        </span>
      ),
    },
  ];

  const handleExport = (format: string) => {
    console.log(`Export as ${format}`);
    // Implementasi export
  };

  const handlePrint = () => {
    console.log('Print report');
    // Implementasi print
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <Title level={2} className="mb-2">Reports & Analytics</Title>
            <p className="text-gray-600">
              Analisis dan laporan data relawan serta koordinator
            </p>
          </div>
          <Space>
            <Button 
              icon={<PrinterOutlined />}
              onClick={handlePrint}
            >
              Print
            </Button>
            <Button 
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => handleExport('pdf')}
            >
              Export PDF
            </Button>
          </Space>
        </div>

        {/* Filter Controls */}
        <Card size="small">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Periode:</span>
              <RangePicker />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Dapil:</span>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Option value="all">Semua</Option>
                <Option value="dapil1">Dapil 1</Option>
                <Option value="dapil2">Dapil 2</Option>
                <Option value="dapil3">Dapil 3</Option>
              </Select>
            </div>
            <Button type="primary">
              Generate Report
            </Button>
          </div>
        </Card>

        {/* Summary Statistics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Relawan"
                value={mockReportData.reduce((sum, item) => sum + item.relawan, 0)}
                suffix="orang"
                valueStyle={{ color: '#1677ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Koordinator"
                value={mockReportData.reduce((sum, item) => sum + item.koordinator, 0)}
                suffix="orang"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Average Achievement"
                value={Math.round(mockReportData.reduce((sum, item) => sum + item.achievement, 0) / mockReportData.length)}
                suffix="%"
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Average Growth"
                value={Math.round(mockReportData.reduce((sum, item) => sum + item.growth, 0) / mockReportData.length)}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <Card 
              title={
                <div className="flex items-center">
                  <BarChartOutlined className="mr-2" />
                  Distribusi per Dapil
                </div>
              }
              size="small"
            >
              <DapilChart />
            </Card>
          </Col>
          <Col xs={24} lg={10}>
            <Card 
              title={
                <div className="flex items-center">
                  <PieChartOutlined className="mr-2" />
                  Progress Trend
                </div>
              }
              size="small"
            >
              <ProgressChart />
            </Card>
          </Col>
        </Row>

        {/* Detail Table */}
        <Card title="Detail Report per Dapil">
          <Table
            columns={columns}
            dataSource={mockReportData}
            pagination={false}
            size="small"
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <strong>Total</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align="center">
                    <strong>{mockReportData.reduce((sum, item) => sum + item.koordinator, 0)}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="center">
                    <strong>{mockReportData.reduce((sum, item) => sum + item.relawan, 0)}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} align="center">
                    <strong>{mockReportData.reduce((sum, item) => sum + item.target, 0)}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} align="center">
                    <strong>
                      {Math.round(mockReportData.reduce((sum, item) => sum + item.achievement, 0) / mockReportData.length)}%
                    </strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5} align="center">
                    <strong>
                      {Math.round(mockReportData.reduce((sum, item) => sum + item.growth, 0) / mockReportData.length)}%
                    </strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </Card>

        {/* Export Options */}
        <Card title="Export Options" size="small">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              block 
              onClick={() => handleExport('excel')}
              className="h-16 flex flex-col items-center justify-center"
            >
              <DownloadOutlined className="text-xl mb-1" />
              <span className="text-sm">Excel</span>
            </Button>
            <Button 
              block 
              onClick={() => handleExport('pdf')}
              className="h-16 flex flex-col items-center justify-center"
            >
              <DownloadOutlined className="text-xl mb-1" />
              <span className="text-sm">PDF</span>
            </Button>
            <Button 
              block 
              onClick={() => handleExport('csv')}
              className="h-16 flex flex-col items-center justify-center"
            >
              <DownloadOutlined className="text-xl mb-1" />
              <span className="text-sm">CSV</span>
            </Button>
            <Button 
              block 
              onClick={handlePrint}
              className="h-16 flex flex-col items-center justify-center"
            >
              <PrinterOutlined className="text-xl mb-1" />
              <span className="text-sm">Print</span>
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
