import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Typography, Spin } from 'antd';
import { 
  UserOutlined, 
  UserAddOutlined, 
  TeamOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import { Column, Pie } from '@ant-design/charts';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pasienAktifHariIni: 0,
    pasienBaruBulanIni: 0,
    totalPasienTerdaftar: 0,
  });
  const [pasienPerBulan, setPasienPerBulan] = useState([]);
  const [persebaranPasien, setPersebaranPasien] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [pasienAktif, pasienBaru, totalPasien, perBulan, sebaran] = await Promise.all([
        api.get('/api/analytics/pasien-dirawat'),
        api.get('/api/analytics/pasien-baru-bulan-ini'),
        api.get('/api/analytics/jumlah-pasien'),
        api.get('/api/analytics/pasien-per-bulan'),
        api.get('/api/analytics/sebaran-usia-pasien'),
      ]);

      setStats({
        pasienAktifHariIni: pasienAktif.data,
        pasienBaruBulanIni: pasienBaru.data,
        totalPasienTerdaftar: totalPasien.data,
      });

      const monthlyData = processMonthlyData(perBulan.data);
      setPasienPerBulan(monthlyData);

      const ageData = processAgeData(sebaran.data);
      setPersebaranPasien(ageData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyData = (data) => {
    if (!Array.isArray(data)) return [];
    
    const uniqueMonths = [...new Set(data.map(item => item.month))];
    const result = [];

    uniqueMonths.forEach(month => {
      const monthData = data.filter(item => item.month === month);
      const monthLabel = new Date(month + '-01').toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });
      
      result.push({
        month: monthLabel,
        type: 'Rawat Jalan',
        value: monthData.find(item => item.class === 'AMB')?.count || 0,
      });
      result.push({
        month: monthLabel,
        type: 'Rawat Inap',
        value: monthData.find(item => item.class === 'IMP')?.count || 0,
      });
      result.push({
        month: monthLabel,
        type: 'IGD',
        value: monthData.find(item => item.class === 'EMER')?.count || 0,
      });
    });

    return result;
  };

  const processAgeData = (data) => {
    if (!Array.isArray(data)) return [];
    
    const labels = {
      'balita': 'Balita (0-5 Tahun)',
      'kanak': 'Kanak-kanak (6-12 Tahun)',
      'remaja': 'Remaja (12-25 Tahun)',
      'dewasa': 'Dewasa (26-45 Tahun)',
      'lansia': 'Lansia (46-65 Tahun)',
      'manula': 'Manula (>65 Tahun)',
    };

    return data.map(item => ({
      type: labels[item.age_group] || item.age_group,
      value: item.count,
    }));
  };

  const columnConfig = {
    data: pasienPerBulan,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    color: ['#6f52ed', '#f6896d', '#58c5a5'],
    legend: {
      position: 'top',
    },
    xAxis: {
      title: {
        text: 'Periode',
      },
    },
    yAxis: {
      title: {
        text: 'Jumlah Pasien',
      },
    },
  };

  const pieConfig = {
    data: persebaranPasien,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div>
      <div className="mb-8">
        <Card className="dashboard-card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <Title level={2} className="!text-white !mb-1">
                Hai, {user?.name}!
              </Title>
              <Text className="text-blue-100">
                Selamat datang di Sistem Rekam Medis Elektronik RS Unipdu Medika
              </Text>
            </div>
            <div className="hidden md:block">
              <MedicineBoxOutlined className="text-6xl text-blue-200 opacity-50" />
            </div>
          </div>
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={8}>
              <Card className="dashboard-card hover:shadow-lg transition-shadow">
                <Statistic
                  title="Pasien Aktif Hari Ini"
                  value={stats.pasienAktifHariIni}
                  suffix="Pasien"
                  prefix={<UserOutlined className="text-green-500 mr-2" />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="dashboard-card hover:shadow-lg transition-shadow">
                <Statistic
                  title="Pasien Baru Bulan Ini"
                  value={stats.pasienBaruBulanIni}
                  suffix="Pasien"
                  prefix={<UserAddOutlined className="text-blue-500 mr-2" />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="dashboard-card hover:shadow-lg transition-shadow">
                <Statistic
                  title="Total Pasien Terdaftar"
                  value={stats.totalPasienTerdaftar}
                  suffix="Pasien"
                  prefix={<TeamOutlined className="text-purple-500 mr-2" />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card 
                title="Jumlah Pasien Per Bulan" 
                className="dashboard-card"
                bodyStyle={{ padding: '24px' }}
              >
                <Column {...columnConfig} height={320} />
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card 
                title="Persebaran Pasien" 
                className="dashboard-card"
                bodyStyle={{ padding: '24px' }}
              >
                <Pie {...pieConfig} height={320} />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Dashboard;
