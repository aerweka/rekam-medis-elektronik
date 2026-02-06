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
  Avatar,
  Popconfirm,
  message
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  TeamOutlined
} from '@ant-design/icons';
import api from '../../services/api';
import dayjs from 'dayjs';

const { Text } = Typography;

const UserManagement = () => {
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
      const response = await api.get('/api/users', {
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
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      message.success('User berhasil dihapus');
      fetchData();
    } catch (error) {
      message.error('Gagal menghapus user');
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" className="text-xs">{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => (
        <Space wrap>
          {roles?.map(role => (
            <Tag color="blue" key={role.id}>{role.name}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Dibuat',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '-',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      width: 100,
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Aktif' : 'Nonaktif'}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Lihat Detail">
            <Link to={`/user-management/${record.id}`}>
              <Button 
                type="default" 
                icon={<EyeOutlined />} 
                size="small"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/user-management/${record.id}/edit`}>
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                size="small"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Hapus">
            <Popconfirm
              title="Hapus User"
              description="Apakah Anda yakin ingin menghapus user ini?"
              onConfirm={() => handleDelete(record.id)}
              okText="Ya"
              cancelText="Tidak"
            >
              <Button 
                type="primary" 
                danger
                icon={<DeleteOutlined />} 
                size="small"
              />
            </Popconfirm>
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
        title={
          <Space>
            <TeamOutlined />
            <span>Daftar User</span>
          </Space>
        }
        extra={
          <Link to="/user-management/create">
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              className="bg-blue-600"
            >
              Tambah User
            </Button>
          </Link>
        }
      >
        <div className="mb-4">
          <Input
            placeholder="Cari user berdasarkan nama atau email..."
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
          scroll={{ x: 900 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default UserManagement;
