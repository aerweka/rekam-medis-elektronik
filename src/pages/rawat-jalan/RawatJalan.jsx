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
  Badge
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EyeOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import api from '../../services/api';
import dayjs from 'dayjs';

const { Text } = Typography;

const RawatJalan = () => {
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
      const response = await api.get('/api/rawat-jalan', {
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
      console.error('Error fetching rawat jalan:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'planned': { color: 'blue', text: 'Direncanakan' },
      'in-progress': { color: 'processing', text: 'Sedang Berlangsung' },
      'finished': { color: 'success', text: 'Selesai' },
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
      render: (text) => <Tag color="blue">{text}</Tag>,
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
      title: 'Poliklinik',
      dataIndex: 'poliklinik',
      key: 'poliklinik',
      width: 150,
    },
    {
      title: 'Dokter',
      dataIndex: 'dokter',
      key: 'dokter',
      width: 150,
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal_kunjungan',
      key: 'tanggal_kunjungan',
      width: 120,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '-',
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
            <Link to={`/rawat-jalan/${record.id}`}>
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
      <Card
        title="Daftar Pasien Rawat Jalan"
        extra={
          <Link to="/rawat-jalan/create">
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              className="bg-blue-600"
            >
              Tambah Kunjungan
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

export default RawatJalan;
