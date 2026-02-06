import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Row, Col, Card, Space, Divider } from 'antd';
import { 
  MedicineBoxOutlined, 
  LoginOutlined,
  FileTextOutlined,
  SafetyOutlined,
  TeamOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;

const Welcome = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <MedicineBoxOutlined className="text-white text-xl" />
              </div>
              <div>
                <Text strong className="text-lg">RS Unipdu Medika</Text>
              </div>
            </div>
            <div>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button type="primary" className="bg-blue-600">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button type="primary" icon={<LoginOutlined />} className="bg-blue-600">
                    Masuk
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="space-y-6">
              <Title level={1} className="!text-4xl !font-bold !text-gray-900">
                Sistem Rekam Medis Elektronik
              </Title>
              <Paragraph className="text-lg text-gray-600">
                Solusi digital terintegrasi untuk manajemen rekam medis pasien 
                di RS Unipdu Medika. Mendukung pelayanan Rawat Jalan, Rawat Inap, 
                dan Gawat Darurat dengan standar FHIR (Fast Healthcare Interoperability Resources).
              </Paragraph>
              <Space size="middle">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button type="primary" size="large" className="bg-blue-600">
                      Ke Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button type="primary" size="large" icon={<LoginOutlined />} className="bg-blue-600">
                      Masuk ke Sistem
                    </Button>
                  </Link>
                )}
              </Space>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-20 blur-2xl"></div>
              <Card className="relative shadow-2xl">
                <div className="p-6 text-center">
                  <MedicineBoxOutlined className="text-8xl text-blue-600 mb-6" />
                  <Title level={3}>RME RS Unipdu Medika</Title>
                  <Text type="secondary">Electronic Health Record System</Text>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="!mb-4">Fitur Unggulan</Title>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              Sistem lengkap untuk manajemen layanan kesehatan dengan teknologi modern
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <FileTextOutlined className="text-4xl text-blue-600 mb-4" />
                <Title level={4}>Rekam Medis Digital</Title>
                <Text type="secondary">
                  Pengelolaan rekam medis pasien secara digital dan terintegrasi
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <TeamOutlined className="text-4xl text-green-600 mb-4" />
                <Title level={4}>Manajemen Pasien</Title>
                <Text type="secondary">
                  Rawat Jalan, Rawat Inap, dan Gawat Darurat dalam satu sistem
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <SafetyOutlined className="text-4xl text-purple-600 mb-4" />
                <Title level={4}>Standar FHIR</Title>
                <Text type="secondary">
                  Menggunakan standar interoperabilitas kesehatan internasional
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <BarChartOutlined className="text-4xl text-orange-600 mb-4" />
                <Title level={4}>Analytics</Title>
                <Text type="secondary">
                  Dashboard analytics untuk monitoring dan laporan
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Divider className="border-gray-700" />
          <div className="text-center">
            <Text className="text-gray-400">
              &copy; {new Date().getFullYear()} RS Unipdu Medika. All rights reserved.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
