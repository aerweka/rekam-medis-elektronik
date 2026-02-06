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
  Row,
  Col,
  Statistic
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EyeOutlined,
  FileTextOutlined,
  UserOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import api from '../../services/api';
import dayjs from 'dayjs';

const { Text } = Typography;

const RekamMedis = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/rekam-medis', {
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
      console.error('Error fetching rekam medis:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'No. RM',
      dataIndex: 'no_rm',
      key: 'no_rm',
      width: 120,
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Nama Pasien',
      dataIndex: 'nama',
      key: 'nama',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" className="text-xs">
            {record.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}, {record.umur} tahun
          </Text>
        </div>
      ),
    },
    {
      title: 'NIK',
      dataIndex: 'nik',
      key: 'nik',
      width: 150,
    },
    {
      title: 'Tanggal Lahir',
      dataIndex: 'tanggal_lahir',
      key: 'tanggal_lahir',
      width: 120,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '-',
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (_, record) => (
        <Tag color={record.is_active ? 'green' : 'red'}>
          {record.is_active ? 'Aktif' : 'Tidak Aktif'}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Lihat Detail">
            <Link to={`/rekam-medis/${record.id}`}>
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
              title="Total Pasien"
              value={pagination.total}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Pasien Aktif Hari Ini"
              value={data.filter(p => p.is_active).length}
              prefix={<MedicineBoxOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Rekam Medis"
              value={pagination.total}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Daftar Rekam Medis"
        extra={
          <Link to="/rekam-medis/create">
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
            placeholder="Cari berdasarkan nama, NIK, atau No. RM..."
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
          scroll={{ x: 1200 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default RekamMedis;
