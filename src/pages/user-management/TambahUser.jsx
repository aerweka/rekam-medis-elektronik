import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Select, 
  Row,
  Col,
  Typography,
  Space,
  Switch,
  message
} from 'antd';
import { 
  SaveOutlined, 
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  TeamOutlined
} from '@ant-design/icons';
import api from '../../services/api';

const { Title } = Typography;
const { Option } = Select;

const TambahUser = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const role = [
    {
      id: 1,
      name: 'admin'
    }
  ]

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      // const response = await api.get('/api/roles');
      // setRoles(response.data);
      setRoles(role);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post('/api/users', values);
      message.success('User berhasil ditambahkan');
      navigate('/user-management');
    } catch (error) {
      message.error(error.response?.data?.message || 'Gagal menambahkan user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <div className="mb-6">
          <Link to="/user-management">
            <Button icon={<ArrowLeftOutlined />}>
              Kembali
            </Button>
          </Link>
        </div>

        <Title level={4} className="mb-6">Formulir Tambah User Baru</Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          initialValues={{ is_active: true }}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Nama Lengkap"
                name="name"
                rules={[{ required: true, message: 'Nama wajib diisi' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Masukkan nama lengkap"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Email wajib diisi' },
                  { type: 'email', message: 'Email tidak valid' }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="Masukkan email"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password wajib diisi' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Masukkan password"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Konfirmasi Password"
                name="password_confirmation"
                rules={[{ required: true, message: 'Konfirmasi password wajib diisi' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Konfirmasi password"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Role"
                name="roles"
                rules={[{ required: true, message: 'Role wajib dipilih' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Pilih role"
                  allowClear
                >
                  {roles.map(role => (
                    <Option key={role.id} value={role.name}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Practitioner ID"
                name="practitioner_id"
              >
                <Input
                  prefix={<IdcardOutlined />}
                  placeholder="Masukkan Practitioner ID (opsional)"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Status Aktif"
                name="is_active"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Aktif"
                  unCheckedChildren="Nonaktif"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-6">
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
                className="bg-blue-600"
              >
                Simpan User
              </Button>
              <Link to="/user-management">
                <Button size="large">
                  Batal
                </Button>
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TambahUser;
