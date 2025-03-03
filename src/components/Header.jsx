import React, { useState } from 'react';
import { Button, Dropdown, Avatar, Divider, Drawer } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user] = useState({ name: 'Nguyễn Văn A' });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { key: '/jobs', label: 'Việc làm' },
        { key: '/top-companies', label: 'Top công ty' },
    ];

    const userMenuItems = [
        { key: 'profile', label: <Link to="/profile">Hồ sơ cá nhân</Link> },
        { key: 'settings', label: <Link to="/settings">Cài đặt</Link> },
        {
            key: 'logout',
            label: (
                <div onClick={() => setIsLoggedIn(false)}>
                    <LogoutOutlined className="mr-2" />
                    Đăng xuất
                </div>
            ),
        },
    ];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="sticky top-0 z-10 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <div className="flex-shrink-0 bg-white px-2 py-2 rounded-md">
                        <Link to="/" className="text-xl font-bold text-primary">
                            JobHunter
                        </Link>
                    </div>

                    <Divider type="vertical" className="h-10 mx-2 bg-gray-300 hidden md:block" />

                    {/* Desktop Navigation */}
                    <div className="flex-1 hidden md:block">
                        <nav className="flex space-x-8 px-4">
                            {navItems.map(item => (
                                <Link
                                    key={item.key}
                                    to={item.key}
                                    className={`text-lg font-medium hover:text-primary transition-colors py-2 border-b-2 ${location.pathname === item.key
                                        ? 'text-primary border-primary'
                                        : 'text-gray-600 border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none"
                        >
                            <MenuOutlined className="text-xl" />
                        </button>
                    </div>

                    {/* User section */}
                    <div className="flex items-center bg-gray-50 px-3 sm:px-5 py-2 rounded-md">
                        {isLoggedIn ? (
                            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                                <div className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md border border-gray-200">
                                    <Avatar icon={<UserOutlined />} className="mr-2" />
                                    <span className="mr-2 font-medium hidden sm:inline">{user.name}</span>
                                    <DownOutlined />
                                </div>
                            </Dropdown>
                        ) : (
                            <Link to="/login">
                                <Button size="middle" className="px-4 sm:px-6 font-medium" type="primary">
                                    Đăng nhập
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <Drawer
                title="Menu"
                placement="left"
                onClose={toggleMobileMenu}
                open={mobileMenuOpen}
                width={250}
            >
                <div className="flex flex-col py-2">
                    {navItems.map(item => (
                        <Link
                            key={item.key}
                            to={item.key}
                            className={`px-4 py-3 text-lg font-medium hover:bg-gray-100 ${location.pathname === item.key ? 'text-primary' : 'text-gray-600'
                                }`}
                            onClick={toggleMobileMenu}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </Drawer>
        </header>
    );
};

export default Header;
