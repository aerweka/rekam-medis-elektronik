import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, SaveOutlined } from '@ant-design/icons';
import api from '../../services/api';

const UpdatePasswordForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.put('/api/password', values);
      message.success('Password berhasil diupdate');
      form.resetFields();
    } catch (error) {
      message.error(error.response?.data?.message || 'Gagal mengupdate password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <header>
        <h3 className="text-lg font-medium text-gray-900">Update Password</h3>
        <p className="mt-1 text-sm text-gray-600">
          Pastikan akun Anda menggunakan password yang panjang dan acak untuk tetap aman.
        </p>
      </header>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-6 space-y-6"
      >
        <Form.Item
          label="Password Saat Ini"
          name="current_password"
          rules={[{ required: true, message: 'Password saat ini wajib diisi' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password saat ini"
          />
        </Form.Item>

        <Form.Item
          label="Password Baru"
          name="password"
          rules={[{ required: true, message: 'Password baru wajib diisi' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password baru"
          />
        </Form.Item>

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

export default UpdatePasswordForm;
