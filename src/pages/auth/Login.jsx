import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Typography, 
  Alert,
  Space,
  Divider
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined,
  MedicineBoxOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    
    const result = await login(values.email, values.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
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
          <Title level={3} className="!mb-1">RS Unipdu Medika</Title>
          <Text type="secondary">Sistem Rekam Medis Elektronik</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-6"
            closable
            onClose={() => setError('')}
          />
        )}

        <Form
          name="login"
          initialValues={{ remember: true }}
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
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Masukkan email Anda"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Mohon masukkan password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Masukkan password Anda"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-between">
              <Checkbox name="remember">Ingat saya</Checkbox>
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">
                Lupa password?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<LoginOutlined />}
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Masuk
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>
          <Text type="secondary" className="text-xs">
            &copy; {new Date().getFullYear()} RS Unipdu Medika. All rights reserved.
          </Text>
        </Divider>
      </Card>
    </div>
  );
};

export default Login;
