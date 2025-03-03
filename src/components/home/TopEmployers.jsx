import React from 'react';
import { Typography, Row, Col, Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

// Mock data cho nhà tuyển dụng hàng đầu
const topEmployers = [
    {
        id: 1,
        name: 'FPT Software',
        logo: 'https://placehold.co/100/2563eb/fff?text=FPT',
        link: '/company/fpt-software'
    },
    {
        id: 2,
        name: 'VNG Corporation',
        logo: 'https://placehold.co/100/16a34a/fff?text=VNG',
        link: '/company/vng-corporation'
    },
    {
        id: 3,
        name: 'Viettel Group',
        logo: 'https://placehold.co/100/9333ea/fff?text=VT',
        link: '/company/viettel-group'
    },
    {
        id: 4,
        name: 'Momo',
        logo: 'https://placehold.co/100/ca8a04/fff?text=MM',
        link: '/company/momo'
    },
    {
        id: 5,
        name: 'Tiki',
        logo: 'https://placehold.co/100/dc2626/fff?text=TK',
        link: '/company/tiki'
    }
];

const TopEmployers = () => {
    return (
        <div className="py-10">
            <Title level={2} className="text-center mb-8">Nhà tuyển dụng hàng đầu</Title>

            <Row gutter={[16, 16]} justify="center">
                {topEmployers.map((employer) => (
                    <Col key={employer.id} xs={12} sm={8} md={4}>
                        <Link to={employer.link}>
                            <Card
                                hoverable
                                className="text-center"
                            >
                                <div className="p-4 mb-4">
                                    <Avatar
                                        src={employer.logo}
                                        size={64}

                                    /></div>
                                <div className="font-medium truncate">{employer.name}</div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <div className="text-center mt-8">
                <Link to="/companies" className="text-main hover:underline">
                    Xem thêm
                </Link>
            </div>
        </div>
    );
};

export default TopEmployers; 