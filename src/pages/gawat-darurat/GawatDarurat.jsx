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
  ImportOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import api from '../../services/api';
import dayjs from 'dayjs';

const { Text } = Typography;

const GawatDarurat = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalHariIni: 0,
    sedangDitangani: 0,
    selesai: 0,
  });

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [pagination.current, pagination.pageSize, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/gawat-darurat', {
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
      console.error('Error fetching gawat darurat:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/analytics/gawat-darurat-stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getTriaseColor = (triase) => {
    const colors = {
      'gawat-darurat': 'red',
      'urgent': 'orange',
      'semi-urgent': 'yellow',
      'non-urgent': 'green',
    };
    return colors[triase] || 'default';
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'in-progress': { color: 'processing', text: 'Sedang Ditangani' },
      'finished': { color: 'success', text: 'Selesai' },
      'triaged': { color: 'warning', text: 'Menunggu' },
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
      render: (text) => <Tag color="red">{text}</Tag>,
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
      title: 'Triase',
      dataIndex: 'triase',
      key: 'triase',
      width: 120,
      render: (triase) => (
        <Tag color={getTriaseColor(triase)} className="uppercase">
          {triase}
        </Tag>
      ),
    },
    {
      title: 'Dokter',
      dataIndex: 'dokter',
      key: 'dokter',
      width: 150,
    },
    {
      title: 'Waktu Masuk',
      dataIndex: 'waktu_masuk',
      key: 'waktu_masuk',
      width: 150,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
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
            <Link to={`/gawat-darurat/${record.id}`}>
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
              title="Kunjungan Hari Ini"
              value={stats.totalHariIni}
              prefix={<ImportOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Sedang Ditangani"
              value={stats.sedangDitangani}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Selesai"
              value={stats.selesai}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Daftar Pasien Gawat Darurat"
        extra={
          <Link to="/gawat-darurat/create">
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              className="bg-red-600"
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

export default GawatDarurat;
