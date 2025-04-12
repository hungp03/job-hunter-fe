import React from 'react'
import { Card, Avatar, Typography, Space, Tag } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { formatTimeAgo, formatToVND, levelColors } from '@/utils/formatData';
const { Text } = Typography;




const JobCard = ({ job }) => {
    return (
        <Card
            hoverable
            className="h-full"
        >
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '30px', alignItems: 'start' }}>
                <Avatar src={`${import.meta.env.VITE_BACKEND_RESOURCE_URL}/company/${job.company.logo
                    }`} size={70} style={{ display: 'block' }} />
                <div>
                    <Text className="block mb-2 font-bold hover:underline">{job.name}</Text>
                    <Tag color={levelColors[job.level] || 'default'}>
                        {job.level.charAt(0).toUpperCase() + job.level.slice(1)}
                    </Tag>

                    <Text className="block mb-2">{job.company.name}</Text>
                    <Space direction="vertical" size={2} className="w-full">
                        <Space>
                            <EnvironmentOutlined className="text-gray-500" />
                            <Text className="text-gray-500">{job.location}</Text>
                        </Space>
                        <Space>
                            <DollarOutlined className="text-gray-500" />
                            <Text className="text-gray-500">{formatToVND(job.salary)}</Text>
                        </Space>
                        <Space>
                            <ClockCircleOutlined className="text-gray-500" />
                            <Text className="text-gray-500">{formatTimeAgo(job.createdAt)}</Text>
                        </Space>
                    </Space>
                </div>
            </div>
        </Card>
    )
}

export default JobCard