import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  message,
  Divider,
  Spin
} from 'antd';
import { 
  SaveOutlined, 
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import api from '../../services/api';

const { Title, Text } = Typography;
const { Option } = Select;

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchRoles();
    fetchUser();
  }, [id]);

  const fetchRoles = async () => {
    try {
      const response = await api.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchUser = async () => {
    setFetchLoading(true);
    try {
      const response = await api.get(`/api/users/${id}`);
      setUser(response.data);
      form.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        practitioner_id: response.data.practitioner_id,
        roles: response.data.roles?.map(r => r.name),
        is_active: response.data.is_active,
      });
    } catch (error) {
      message.error('Gagal memuat data user');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.put(`/api/users/${id}`, values);
      message.success('User berhasil diupdate');
      navigate('/user-management');
    } catch (error) {
      message.error(error.response?.data?.message || 'Gagal mengupdate user');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

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

        <Title level={4} className="mb-1">Edit User</Title>
        <Text type="secondary" className="block mb-6">{user?.email}</Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
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
                  placeholder="Masukkan Practitioner ID"
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

          <Divider orientation="left">Update Password (Opsional)</Divider>

          <Row gutter={[24, 0]}>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Password Baru"
                name="password"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Kosongkan jika tidak ingin mengubah"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Konfirmasi Password"
                name="password_confirmation"
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Konfirmasi password baru"
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
                Simpan Perubahan
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

export default EditUser;
