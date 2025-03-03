import React from 'react';
import { Typography, Card, Avatar, Space, Button, Row, Col } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

// Mock data cho công việc mới nhất
const latestJobs = [
    {
        id: 1,
        title: 'Frontend Developer',
        company: 'FPT Software',
        logo: 'https://placehold.co/100/2563eb/fff?text=FPT',
        location: 'Hà Nội',
        salary: '15-20 triệu',
        postedTime: '2 ngày trước'
    },
    {
        id: 2,
        title: 'Product Marketing Manager',
        company: 'VNG Corporation',
        logo: 'https://placehold.co/100/16a34a/fff?text=VNG',
        location: 'TP. Hồ Chí Minh',
        salary: '25-35 triệu',
        postedTime: '1 ngày trước'
    },
    {
        id: 3,
        title: 'UX/UI Designer',
        company: 'Momo',
        logo: 'https://placehold.co/100/ca8a04/fff?text=MM',
        location: 'Đà Nẵng',
        salary: '18-25 triệu',
        postedTime: '3 ngày trước'
    },
    {
        id: 4,
        title: 'Backend Developer',
        company: 'Tiki',
        logo: 'https://placehold.co/100/dc2626/fff?text=TK',
        location: 'TP. Hồ Chí Minh',
        salary: '20-30 triệu',
        postedTime: '1 tuần trước'
    },
    {
        id: 5,
        title: 'Data Analyst',
        company: 'Viettel Group',
        logo: 'https://placehold.co/100/9333ea/fff?text=VT',
        location: 'Hà Nội',
        salary: '18-25 triệu',
        postedTime: '3 ngày trước'
    },
    {
        id: 6,
        title: 'Golang Backend Developer',
        company: 'Viettel Group',
        logo: 'https://placehold.co/100/9333ea/fff?text=VT',
        location: 'Hà Nội',
        salary: '18-28 triệu',
        postedTime: '3 ngày trước'
    }
];

const LatestJobs = () => {
    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-6">
                <Title level={2}>Công việc mới nhất</Title>
                <Link to="/jobs" className="text-main hover:underline">
                    Xem tất cả
                </Link>
            </div>

            <Row gutter={[16, 16]}>
                {latestJobs.map((job) => (
                    <Col xs={24} sm={12} md={8} key={job.id}>
                        <Card
                            hoverable
                            className="h-full"
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '30px', alignItems: 'start' }}>
                                <Avatar src={job.logo} size={70} style={{ display: 'block' }} />
                                <div>
                                    <Link to={`/jobs/${job.id}`} className="text-lg font-medium block truncate">
                                        {job.title}
                                    </Link>
                                    <Text className="block mb-2">{job.company}</Text>
                                    <Space direction="vertical" size={2} className="w-full">
                                        <Space>
                                            <EnvironmentOutlined className="text-gray-500" />
                                            <Text className="text-gray-500">{job.location}</Text>
                                        </Space>
                                        <Space>
                                            <DollarOutlined className="text-gray-500" />
                                            <Text className="text-gray-500">{job.salary}</Text>
                                        </Space>
                                        <Space>
                                            <ClockCircleOutlined className="text-gray-500" />
                                            <Text className="text-gray-500">{job.postedTime}</Text>
                                        </Space>
                                    </Space>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default LatestJobs; 