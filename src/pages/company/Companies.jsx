import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Pagination, message } from "antd";
import { apiGetCompanies } from "@/apis/company";
import CompanyCard from "@/components/card/CompanyCard";

const { Title } = Typography;

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [total, setTotal] = useState(0);

  const fetchCompanies = async (page) => {
    try {
      const response = await apiGetCompanies({ page, size: pageSize });
      if (response.statusCode === 200) {
        setCompanies(response.data.result);
        setTotal(response.data.meta.total);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Lỗi khi tải danh sách công ty");
    }
  };

  useEffect(() => {
    fetchCompanies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Title level={3} className="text-center mb-8">
        Các nhà tuyển dụng nổi bật
      </Title>

      <Row gutter={[24, 24]}>
        {companies.map((company) => (
          <Col key={company.id} xs={24} sm={12} md={6}>
            <CompanyCard company={company} />
          </Col>
        ))}
      </Row>

      <div className="flex justify-center items-center mt-8">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Companies;
