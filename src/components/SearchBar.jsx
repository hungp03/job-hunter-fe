import React from 'react';
import { Input, Button, Form, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const SearchBar = ({ onSearch, value }) => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        const keyword = values.keyword?.trim();
        if (keyword) {
            navigate(`/jobs?keyword=${encodeURIComponent(keyword)}`);
        } else {
            navigate(`/jobs`);
        }

        // Truyền vào component cha (optional)
        onSearch?.(keyword);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <Form
                onFinish={onFinish}
                layout="vertical"
                className="p-6 rounded-lg"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={20}>
                        <Form.Item name="keyword" className="mb-0">
                            <Input
                                size="large"
                                placeholder="Tìm kiếm kỹ năng, việc làm, công ty..."
                                prefix={<SearchOutlined className="text-gray-400" />}
                                value={value}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={4}>
                        <Form.Item className="mb-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                icon={<SearchOutlined />}
                            >
                                Tìm
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default SearchBar;
