import React, { useState } from 'react';
import { Card, Tabs, Typography, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import UpdateProfileInformation from './UpdateProfileInformation';
import UpdatePasswordForm from './UpdatePasswordForm';

const { Title } = Typography;

const Profile = () => {
  const [activeKey, setActiveKey] = useState('profile');

  const items = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          Informasi Profil
        </span>
      ),
      children: <UpdateProfileInformation />,
    },
    {
      key: 'password',
      label: (
        <span>
          <LockOutlined />
          Update Password
        </span>
      ),
      children: <UpdatePasswordForm />,
    },
  ];

  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <Title level={4} className="mb-6">
          <ProfileOutlined className="mr-2" />
          Pengaturan Profile
        </Title>
        <Tabs 
          activeKey={activeKey}
          onChange={setActiveKey}
          items={items}
          type="card"
        />
      </Card>
    </div>
  );
};

export default Profile;
