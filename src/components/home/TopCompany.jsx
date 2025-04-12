import React , {useEffect, useState} from 'react';
import { Typography, Row, Col} from 'antd';
import { Link } from 'react-router-dom';
import CompanyCard from '@/components/card/CompanyCard';
import { apiGetCompanies } from '../../apis/company';
const { Title } = Typography;

const TopCompany = () => {
    const [companies, setCompanies] = useState([])

    const fetchCompanies = async () => {
        const response = await apiGetCompanies({ page: 1, size: 5, sort: 'createdAt,desc' });
        if (response.statusCode === 200) {
            setCompanies(response.data.result)
        }
        else {
            message.error(response.message)
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <div className="py-10">
            <Title level={2} className="text-center mb-8">Nhà tuyển dụng hàng đầu</Title>

            <Row gutter={[16, 16]} justify="center">
                {companies.map((employer) => (
                    <Col key={employer.id} xs={12} sm={8} md={4}>
                        
                            <CompanyCard company={employer} />
                       
                    </Col>
                ))}
            </Row>
            <div className="text-center mt-8">
                <Link to="/companies" className="text-main hover:underline">
                    Xem thêm các nhà tuyển dụng khác
                </Link>
            </div>
        </div>
    );
};

export default TopCompany; 