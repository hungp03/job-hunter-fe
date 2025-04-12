import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { UserOutlined, BankOutlined,  FileTextOutlined } from '@ant-design/icons';

const Dashboard = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng số User"
                            value={1128}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng số Công ty"
                            value={93}
                            prefix={<BankOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng số Job"
                            value={256}
                            prefix={<BankOutlined   />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng số Resume"
                            value={456}
                            prefix={<FileTextOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24} lg={12}>
                    <Card title="Job mới nhất">
                        {/* Thêm bảng job mới nhất ở đây */}
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="User mới nhất">
                        {/* Thêm bảng user mới nhất ở đây */}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard; 