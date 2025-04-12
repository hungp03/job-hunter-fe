import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Steps, message, Row, Col } from 'antd';
import { MailOutlined, LockOutlined, KeyOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const ForgotPassword = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState('');
    const [form] = Form.useForm();

    // Xử lý gửi email
    const handleEmailSubmit = (values) => {
        setEmail(values.email);
        message.success('Mã OTP đã được gửi đến email của bạn!');
        setCurrentStep(1);
    };

    // Xử lý xác thực OTP
    const handleOtpSubmit = () => {
        message.success('Xác thực OTP thành công!');
        setCurrentStep(2);
    };

    // Xử lý đặt lại mật khẩu
    const handleResetPassword = () => {
        message.success('Đặt lại mật khẩu thành công!');
        // Chuyển hướng đến trang đăng nhập sau khi đặt lại mật khẩu
        setTimeout(() => {
            window.location.href = '/login';
        }, 1500);
    };

    // Nội dung các bước
    const steps = [
        {
            title: 'Nhập Email',
            content: (
                <Form
                    name="forgot_password_email"
                    onFinish={handleEmailSubmit}
                    layout="vertical"
                >
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Gửi mã xác thực
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Xác thực OTP',
            content: (
                <Form
                    name="forgot_password_otp"
                    onFinish={handleOtpSubmit}
                    layout="vertical"
                >
                    <Paragraph className="mb-4">
                        Chúng tôi đã gửi mã OTP 6 chữ số đến email <Text strong>{email}</Text>.
                        Vui lòng kiểm tra hộp thư đến và nhập mã OTP để tiếp tục.
                    </Paragraph>

                    <Form.Item
                        name="otp"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã OTP!' },
                            {
                                pattern: /^\d{6}$/,
                                message: 'Mã OTP phải là 6 chữ số!'
                            }
                        ]}
                    >
                        <Input
                            prefix={<KeyOutlined className="text-gray-400" />}
                            placeholder="Nhập mã OTP 6 chữ số"
                            size="large"
                            maxLength={6}
                        />
                    </Form.Item>

                    <div className="flex justify-between mb-4">
                        <Button type="link" onClick={() => setCurrentStep(0)} className="p-0">
                            Thay đổi email
                        </Button>
                        <Button type="link" onClick={() => message.info('Đã gửi lại mã OTP!')} className="p-0">
                            Gửi lại mã OTP
                        </Button>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Xác thực
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Đặt lại mật khẩu',
            content: (
                <Form
                    name="reset_password"
                    onFinish={handleResetPassword}
                    layout="vertical"
                    form={form}
                >
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Mật khẩu mới"
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
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Xác nhận mật khẩu mới"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Đặt lại mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 flex items-center justify-center py-12 px-4">
                <Row className="w-full">
                    <Col xs={24} sm={20} md={16} lg={14} xl={12} className="mx-auto">
                        <Card className="shadow-md">
                            <div className="text-center mb-6">
                                <Title level={2}>Quên mật khẩu</Title>
                                <Text type="secondary">Đặt lại mật khẩu của bạn</Text>
                            </div>

                            <Steps current={currentStep} className="mb-8">
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>

                            <div>{steps[currentStep].content}</div>

                            <div className="text-center mt-6 space-y-4">
                                <Text type="secondary">
                                    Đã nhớ mật khẩu? <Link to="/login" className="text-primary hover:underline">Đăng nhập</Link>
                                </Text>
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

export default ForgotPassword; 