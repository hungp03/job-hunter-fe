import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BankOutlined,
    UserOutlined,
    FileTextOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    DashboardOutlined,
    HomeOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: <Link to="/admin">Dashboard</Link>,
        },
        {
            key: '/admin/companies',
            icon: <BankOutlined />,
            label: <Link to="/admin/companies">Công ty</Link>,
        },
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: <Link to="/admin/users">User</Link>,
        },
        {
            key: '/admin/jobs',
            icon: <BankOutlined />,
            label: <Link to="/admin/jobs">Job</Link>,
        },
        {
            key: '/admin/resumes',
            icon: <FileTextOutlined />,
            label: <Link to="/admin/resumes">Resume</Link>,
        },
        {
            key: '/admin/roles',
            icon: <TeamOutlined />,
            label: <Link to="/admin/roles">Role</Link>,
        },
        {
            key: '/admin/permissions',
            icon: <SafetyCertificateOutlined />,
            label: <Link to="/admin/permissions">Permission</Link>,
        },
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical p-4 text-white text-center text-lg font-bold">
                    {!collapsed ? 'ADMIN PANEL' : 'AP'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout; 