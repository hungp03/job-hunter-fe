import React, { useEffect, useState } from 'react';
import { Typography, Divider, Image, message } from 'antd';
import { EnvironmentOutlined, GlobalOutlined, TeamOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { apiGetCompanyDetail } from '@/apis/company';
const { Title, Paragraph, Text } = Typography;

const CompanyDetail = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null)
    const fetchCompanyData = async (id) => {
        const response = await apiGetCompanyDetail(id);
        if (response.statusCode === 200) {
            setCompany(response.data)
        }
        else {
            message.error(response.message)
        }
    }

    useEffect(() => {
        fetchCompanyData(id);
    }, [id]);
    return (
        <main className="max-w-8xl mx-auto py-8">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-3/4 p-6 lg:p-8">
                        <Title level={2} className="text-primary mb-4">
                            {company?.name}
                        </Title>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center text-gray-600">
                                <EnvironmentOutlined className="mr-2" />
                                <Text>{company?.address}</Text>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <GlobalOutlined className="mr-2" />
                                {/* <Text>{company.website}</Text> */}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <TeamOutlined className="mr-2" />
                                {/* <Text>{company.employeeCount} nhân viên</Text> */}
                            </div>
                        </div>

                        <Divider />

                        <div className="space-y-6">
                            <div>
                                <Title level={4}>Giới thiệu công ty</Title>
                                <div
                                    className="text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: company?.description }}
                                ></div>
                            

                            </div>   
                        </div>
                    </div>

                    <div className="lg:w-1/4 p-6 lg:p-8 bg-gray-50">
                        <div className="sticky top-24">
                            <Image
                                src={`${import.meta.env.VITE_BACKEND_RESOURCE_URL}/company/${company?.logo}`}
                                alt={company?.name}
                                className="w-full rounded-lg shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CompanyDetail;