import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Menu, 
  Dropdown, 
  Avatar, 
  Typography, 
  Space,
  Button,
  theme
} from 'antd';
import {
  UserOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  TeamOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined,
  ImportOutlined,
  DownOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AuthenticatedLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/rekam-medis')) return 'rekam-medis';
    if (path.startsWith('/rawat-jalan')) return 'rawat-jalan';
    if (path.startsWith('/rawat-inap')) return 'rawat-inap';
    if (path.startsWith('/gawat-darurat')) return 'gawat-darurat';
    if (path.startsWith('/user-management')) return 'user-management';
    return 'dashboard';
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <span onClick={logout} style={{ cursor: 'pointer' }}>Log Out</span>,
    },
  ];

  const mainMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: 'rekam-medis',
      icon: <FileTextOutlined />,
      label: <Link to="/rekam-medis">Rekam Medis</Link>,
    },
    {
      key: 'rawat-jalan',
      icon: <MedicineBoxOutlined />,
      label: <Link to="/rawat-jalan">Rawat Jalan</Link>,
    },
    {
      key: 'rawat-inap',
      icon: <HomeOutlined />,
      label: <Link to="/rawat-inap">Rawat Inap</Link>,
    },
    {
      key: 'gawat-darurat',
      icon: <ImportOutlined />,
      label: <Link to="/gawat-darurat">Gawat Darurat</Link>,
    },
    {
      key: 'user-management',
      icon: <TeamOutlined />,
      label: <Link to="/user-management">User Management</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          background: colorBgContainer,
        }}
        className="hidden lg:block"
      >
        <div className="p-4 flex items-center justify-center border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MedicineBoxOutlined className="text-white text-xl" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <Text strong className="text-sm leading-tight">Rumah Sakit</Text>
                <Text strong className="text-sm leading-tight text-blue-600">Unipdu Medika</Text>
              </div>
            )}
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={mainMenuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          zIndex: 1
        }}>
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex"
            />
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            />
          </div>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">
              <Avatar icon={<UserOutlined />} />
              <span className="hidden md:inline">{user?.name}</span>
              <DownOutlined className="text-xs" />
            </Space>
          </Dropdown>
        </Header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200">
            <Menu
              mode="vertical"
              selectedKeys={[getSelectedKey()]}
              items={mainMenuItems}
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}

        <Content style={{ 
          margin: '24px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
