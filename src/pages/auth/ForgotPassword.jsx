import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Typography, 
  Alert,
  Space,
  message
} from 'antd';
import { 
  MailOutlined,
  ArrowLeftOutlined,
  SendOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import api from '../../services/api';

const { Title, Text, Paragraph } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post('/api/forgot-password', { email: values.email });
      setSuccess(true);
      message.success('Link reset password telah dikirim ke email Anda');
    } catch (error) {
      message.error(error.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card 
        className="w-full max-w-md shadow-2xl"
        bodyStyle={{ padding: '40px' }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <MedicineBoxOutlined className="text-white text-3xl" />
          </div>
          <Title level={3} className="!mb-1">Lupa Password?</Title>
          <Text type="secondary">
            Masukkan email Anda untuk reset password
          </Text>
        </div>

        {success && (
          <Alert
            message="Link reset password telah dikirim ke email Anda"
            type="success"
            showIcon
            className="mb-6"
            closable
          />
        )}

        <Paragraph className="text-gray-600 mb-6">
          Tidak masalah. Beritahu kami alamat email Anda dan kami akan mengirimkan 
          link reset password yang memungkinkan Anda membuat password baru.
        </Paragraph>

        <Form
          name="forgot-password"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Mohon masukkan email!' },
              { type: 'email', message: 'Email tidak valid!' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Masukkan email Anda"
            />
          </Form.Item>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<SendOutlined />}
              size="large"
              className="bg-blue-600"
            >
              Kirim Link Reset Password
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              <Space>
                <ArrowLeftOutlined />
                Kembali ke Login
              </Space>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
