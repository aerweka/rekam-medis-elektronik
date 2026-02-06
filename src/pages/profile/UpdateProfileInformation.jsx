import React, { useState } from 'react';
import { Form, Input, Button, Alert, message } from 'antd';
import { SaveOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const UpdateProfileInformation = () => {
  const { user, setUser } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.put('/api/profile', values);
      setUser(response.data.user);
      message.success('Profile berhasil diupdate');
    } catch (error) {
      message.error(error.response?.data?.message || 'Gagal mengupdate profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <header>
        <h3 className="text-lg font-medium text-gray-900">Informasi Profil</h3>
        <p className="mt-1 text-sm text-gray-600">
          Update informasi profil dan alamat email Anda.
        </p>
      </header>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-6 space-y-6"
        initialValues={{
          name: user?.name,
          email: user?.email,
        }}
      >
        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: 'Nama wajib diisi' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Nama lengkap"
          />
        </Form.Item>

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
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
          >
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default UpdateProfileInformation;
