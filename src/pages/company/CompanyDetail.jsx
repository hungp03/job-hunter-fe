import React from 'react';
import { Typography, Divider, Image } from 'antd';
import { EnvironmentOutlined, GlobalOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const CompanyDetail = () => {
    // Mock data - sau này sẽ được thay thế bằng dữ liệu thật từ API
    const company = {
        name: 'Công ty TNHH Tech Solutions',
        logo: 'https://cdn-icons-png.flaticon.com/512/2936/2936630.png', // Thay thế bằng URL logo thật
        address: '123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM',
        website: 'www.techsolutions.com',
        employeeCount: '500-1000',
        description: `Tech Solutions là một trong những công ty công nghệ hàng đầu tại Việt Nam, 
        chuyên cung cấp các giải pháp phần mềm cho doanh nghiệp. Với hơn 10 năm kinh nghiệm trong 
        ngành, chúng tôi tự hào là đối tác tin cậy của nhiều tập đoàn lớn trong và ngoài nước.`,
        culture: `Chúng tôi xây dựng một môi trường làm việc năng động, sáng tạo và chuyên nghiệp. 
        Tại Tech Solutions, mỗi nhân viên đều được tạo điều kiện để phát triển tối đa tiềm năng của 
        mình thông qua các chương trình đào tạo và cơ hội thăng tiến rõ ràng.`,
        benefits: [
            'Lương thưởng cạnh tranh',
            'Bảo hiểm sức khỏe cho nhân viên và người thân',
            'Chế độ nghỉ phép linh hoạt',
            '13 tháng lương + thưởng theo hiệu suất',
            'Các hoạt động team building hàng quý'
        ]
    };

    return (
            <main className="max-w-8xl mx-auto py-8">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-3/4 p-6 lg:p-8">
                            <Title level={2} className="text-primary mb-4">
                                {company.name}
                            </Title>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center text-gray-600">
                                    <EnvironmentOutlined className="mr-2" />
                                    <Text>{company.address}</Text>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <GlobalOutlined className="mr-2" />
                                    <Text>{company.website}</Text>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <TeamOutlined className="mr-2" />
                                    <Text>{company.employeeCount} nhân viên</Text>
                                </div>
                            </div>

                            <Divider />

                            <div className="space-y-6">
                                <div>
                                    <Title level={4}>Giới thiệu công ty</Title>
                                    <Paragraph className="text-gray-600">
                                        {company.description}
                                    </Paragraph>
                                </div>

                                <div>
                                    <Title level={4}>Văn hóa công ty</Title>
                                    <Paragraph className="text-gray-600">
                                        {company.culture}
                                    </Paragraph>
                                </div>

                                <div>
                                    <Title level={4}>Phúc lợi</Title>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        {company.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/4 p-6 lg:p-8 bg-gray-50">
                            <div className="sticky top-24">
                                <Image
                                    src={company.logo}
                                    alt={company.name}
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