import React, { useState, useEffect } from 'react';
import { Button, Tag, Typography, Space, Divider } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, BankOutlined, DollarOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { apiGetJob } from '../../apis/job';
import { formatTimeAgo, formatToVND, levelColors } from '../../utils/formatData';
const { Title, Text } = Typography;

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState([])

    const getJob = async (id) => {
        const response = await apiGetJob(id);
        if (response.statusCode === 200) {
            setJob(response.data)
        }
        else {
            message.error(response.message)
        }
    }
    useEffect(() => {
        getJob(id);
    }, [id]);

    const handleApply = () => {
        // Xử lý logic ứng tuyển ở đây
        // console.log('Applying for job:', job?.id);
    };

    return (
        <main className="max-w-8xl mx-auto py-8">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-3/4 p-6 lg:p-8">
                        <Title level={2} className="text-primary mb-4">
                            {job?.name}
                        </Title>
                        <Tag color={levelColors[job?.level] || 'default'}>
                            {job?.level?.charAt(0).toUpperCase() + job?.level?.slice(1)}
                        </Tag>
                        <div className="space-y-3 mt-4 mb-4 text-gray-600">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <BankOutlined className="mr-2" />
                                    <Text>{job?.company?.name}</Text>
                                </div>
                                <div className="flex items-center">
                                    <EnvironmentOutlined className="mr-2" />
                                    <Text>{job?.location}</Text>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <ClockCircleOutlined className="mr-2" />
                                    <Text>Đăng vào {formatTimeAgo(job?.createdAt)}</Text>
                                </div>
                                <div className="flex items-center">
                                    <ClockCircleOutlined className="mr-2" />
                                    <Text>
                                        Thời gian ứng tuyển: {new Date(job?.startDate).toLocaleDateString()} - {new Date(job?.endDate).toLocaleDateString()}
                                    </Text>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <DollarOutlined className="mr-2" />
                                <Text>{formatToVND(job?.salary)}</Text>
                            </div>
                        </div>


                        <Space className="mb-6">
                            <Button type="primary" size="large" onClick={handleApply}>
                                Ứng tuyển ngay
                            </Button>
                        </Space>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {job?.skills?.map((skill, index) => (
                                <Tag key={index} color="blue">{skill?.name}</Tag>
                            ))}
                        </div>

                        <Divider />

                        <div className="space-y-6">
                            <div>
                                <Title level={4}>Mô tả</Title>
                                <div
                                    className="prose"
                                    dangerouslySetInnerHTML={{ __html: job?.description }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/4 p-6 lg:p-8 bg-gray-50">
                        <div className="sticky top-24">
                            <img
                                src={`${import.meta.env.VITE_BACKEND_RESOURCE_URL}/company/${job?.company?.logo}`}
                                alt={job?.company?.name}
                                className="w-full rounded-lg shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JobDetail; 