import React from 'react';
import { Form, Input, Button, Card, Typography, Divider, Radio, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Register = () => {
    const onFinish = (values) => {
        console.log('Register values:', values);
        // Xử lý đăng ký ở đây
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 flex items-center justify-center py-12 px-4">
                <Row className="w-full">
                    <Col xs={24} sm={20} md={16} lg={14} xl={12} className="mx-auto">
                        <Card className="shadow-md">
                            <div className="text-center mb-6">
                                <Title level={2}>Đăng ký tài khoản</Title>
                                <Text type="secondary">Tạo tài khoản để bắt đầu tìm kiếm việc làm</Text>
                            </div>

                            <Form
                                name="register"
                                onFinish={onFinish}
                                layout="vertical"
                            >
                                <Form.Item
                                    name="fullName"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="text-gray-400" />}
                                        placeholder="Họ và tên"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input
                                        prefix={<MailOutlined className="text-gray-400" />}
                                        placeholder="Email"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-gray-400" />}
                                        placeholder="Mật khẩu"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-gray-400" />}
                                        placeholder="Xác nhận mật khẩu"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" size="large" block>
                                        Đăng ký
                                    </Button>
                                </Form.Item>
                            </Form>

                            <div className="text-center space-y-4">
                                <div>
                                    <Text type="secondary">
                                        Đã có tài khoản?{' '}
                                        <Link to="/login" className="text-primary hover:underline">
                                            Đăng nhập
                                        </Link>
                                    </Text>
                                </div>
                                <Divider>hoặc</Divider>
                                <div>
                                    <Link to="/" className="text-gray-600 hover:text-primary flex items-center justify-center">
                                        <HomeOutlined className="mr-2" />
                                        Quay về trang chủ
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Register; 