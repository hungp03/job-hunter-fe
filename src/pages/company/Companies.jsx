import React, { useState } from 'react';
import { Typography, Row, Col, Card, Avatar, Pagination } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

// Mock data cho danh sách công ty (có thể thay thế bằng API call)
const allCompanies = [
    // Giữ lại 5 công ty từ TopEmployers
    {
        id: 1,
        name: 'FPT Software',
        logo: 'https://placehold.co/100/2563eb/fff?text=FPT',
        link: '/company/fpt-software'
    },

    {
        id: 10,
        name: 'Company 10',
        logo: 'https://placehold.co/100/666666/fff?text=C10',
        link: '/company/company-10'
    },
    {
        id: 12,
        name: 'FPT Software',
        logo: 'https://placehold.co/100/2563eb/fff?text=FPT',
        link: '/company/fpt-software'
    },

    {
        id: 120,
        name: 'Company 10',
        logo: 'https://placehold.co/100/666666/fff?text=C10',
        link: '/company/company-10'
    },
    {
        id: 11,
        name: 'FPT Software',
        logo: 'https://placehold.co/100/2563eb/fff?text=FPT',
        link: '/company/fpt-software'
    },

    {
        id: 110,
        name: 'Company 10',
        logo: 'https://placehold.co/100/666666/fff?text=C10',
        link: '/company/company-10'
    },
    {
        id: 13,
        name: 'FPT Software',
        logo: 'https://placehold.co/100/2563eb/fff?text=FPT',
        link: '/company/fpt-software'
    },

    {
        id: 133,
        name: 'Company 10',
        logo: 'https://placehold.co/100/666666/fff?text=C10',
        link: '/company/company-10'
    },
    {
        id: 132,
        name: 'FPT Software',
        logo: 'https://placehold.co/100/2563eb/fff?text=FPT',
        link: '/company/fpt-software'
    },

    {
        id: 102,
        name: 'Company 1ad0',
        logo: 'https://placehold.co/100/666666/fff?text=C10',
        link: '/company/company-10'
    },
    {
        id: 112,
        name: 'FPT Software',
        logo: 'https://placehold.co/100/2563eb/fff?text=FPT',
        link: '/company/fpt-software'
    },

    {
        id: 105,
        name: 'Company 10',
        logo: 'https://placehold.co/100/666666/fff?text=C10',
        link: '/company/company-10'
    },
];

const Companies = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Tính toán companies cho trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const currentCompanies = allCompanies.slice(startIndex, startIndex + pageSize);

    return (
        <div className="container mx-auto py-10 px-4">
            <Title level={3} className="text-center mb-8">
                Các nhà tuyển dụng nổi bật
            </Title>

            <Row gutter={[24, 24]}>
                {currentCompanies.map((company) => (
                    <Col key={company.id} xs={24} sm={12} md={6}>
                        <Link to={company.link}>
                            <Card hoverable className="text-center">
                                <div className="p-4 mb-4">
                                    <Avatar src={company.logo} size={80} />
                                </div>
                                <div className="font-medium truncate">
                                    {company.name}
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

            <div className="flex justify-center items-center mt-8">
                <Pagination
                    current={currentPage}
                    total={allCompanies.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Companies; 