import React from 'react';
import { Form, Input, Button, Card, Typography, Divider, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { apiLogin } from '@/apis/user';

const { Title, Text } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const onFinish = async (values) => {
        const response = await apiLogin(values);
        // console.log('Login response:', response);
        if (response.statusCode === 200) {
            const { user, access_token } = response.data;
            setUser(user, access_token);
            message.success('Đăng nhập thành công!');
            navigate('/');
        } else {
            message.error(response?.message || 'Đăng nhập thất bại!');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 flex items-center justify-center py-12 px-4">
                <Row className="w-full">
                    <Col xs={24} sm={20} md={16} lg={14} xl={12} className="mx-auto">
                        <Card className="shadow-md">
                            <div className="text-center mb-6">
                                <Title level={2}>Đăng nhập</Title>
                                <Text type="secondary">Chào mừng bạn quay trở lại!</Text>
                            </div>

                            <Form
                                name="login"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                layout="vertical"
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="text-gray-400" />}
                                        placeholder="Email"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-gray-400" />}
                                        placeholder="Mật khẩu"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" size="large" block>
                                        Đăng nhập
                                    </Button>
                                </Form.Item>

                                <Form.Item>
                                    <div className="flex justify-end">
                                        <Link to="/forgot-password" className="text-primary">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                </Form.Item>

                                <div className="text-center mb-4">
                                    <Text type="secondary">
                                        Chưa có tài khoản? <Link to="/register" className="text-primary">Đăng ký ngay</Link>
                                    </Text>
                                </div>

                                <Divider plain>Hoặc đăng nhập với</Divider>

                                <div className="flex justify-center space-x-4">
                                    <Button
                                        icon={<GoogleOutlined />}
                                        size="large"
                                        className="flex items-center"
                                    >
                                        Google
                                    </Button>
                                </div>
                            </Form>
                            <div className="mt-4">
                                <Link to="/" className="text-gray-600 hover:text-primary flex items-center justify-center">
                                    <HomeOutlined className="mr-2" />
                                    Quay về trang chủ
                                </Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Login; 