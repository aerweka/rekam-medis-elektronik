import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  Table, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Tooltip,
  Typography,
  Badge,
  Row,
  Col,
  Statistic
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EyeOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import api from '../../services/api';
import dayjs from 'dayjs';

const { Text } = Typography;

const RawatInap = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalDirawat: 0,
    masihDirawat: 0,
    pulangHariIni: 0,
  });

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [pagination.current, pagination.pageSize, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/rawat-inap', {
        params: {
          page: pagination.current,
          per_page: pagination.pageSize,
          search: searchQuery,
        },
      });
      setData(response.data.data || []);
      setPagination({
        ...pagination,
        total: response.data.total || 0,
      });
    } catch (error) {
      console.error('Error fetching rawat inap:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/analytics/rawat-inap-stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'in-progress': { color: 'processing', text: 'Sedang Dirawat' },
      'finished': { color: 'success', text: 'Sudah Pulang' },
      'cancelled': { color: 'error', text: 'Dibatalkan' },
    };
    const statusInfo = statusMap[status] || { color: 'default', text: status };
    return <Badge status={statusInfo.color} text={statusInfo.text} />;
  };

  const columns = [
    {
      title: 'No. Registrasi',
      dataIndex: 'no_registrasi',
      key: 'no_registrasi',
      width: 140,
      render: (text) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: 'Pasien',
      dataIndex: 'pasien',
      key: 'pasien',
      render: (text, record) => (
        <div>
          <Text strong>{record.pasien_nama}</Text>
          <br />
          <Text type="secondary" className="text-xs">{record.no_rm}</Text>
        </div>
      ),
    },
    {
      title: 'Kamar',
      dataIndex: 'kamar',
      key: 'kamar',
      width: 120,
    },
    {
      title: 'Dokter',
      dataIndex: 'dokter',
      key: 'dokter',
      width: 150,
    },
    {
      title: 'Masuk',
      dataIndex: 'tanggal_masuk',
      key: 'tanggal_masuk',
      width: 120,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status) => getStatusBadge(status),
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Lihat Detail">
            <Link to={`/rawat-inap/${record.id}`}>
              <Button 
                type="primary" 
                icon={<EyeOutlined />} 
                size="small"
              />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Pasien Rawat Inap"
              value={stats.totalDirawat}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Masih Dirawat"
              value={stats.masihDirawat}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Pulang Hari Ini"
              value={stats.pulangHariIni}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Daftar Pasien Rawat Inap"
        extra={
          <Link to="/rawat-inap/create">
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              className="bg-blue-600"
            >
              Tambah Pasien
            </Button>
          </Link>
        }
      >
        <div className="mb-4">
          <Input
            placeholder="Cari pasien..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1100 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default RawatInap;
