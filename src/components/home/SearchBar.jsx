import React from 'react';
import { Input, Button, Form, Row, Col, Select} from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Option } = Select;

const SearchBar = () => {
    const onFinish = (values) => {
        console.log('Search values:', values);
        // Xử lý tìm kiếm ở đây
    };

    return (
            <div className="max-w-3xl mx-auto">
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    className="p-6 rounded-lg"
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="keyword" className="mb-0">
                                <Input
                                    size="large"
                                    placeholder="Tìm kiếm kỹ năng, việc làm, công ty..."
                                    prefix={<SearchOutlined className="text-gray-400" />}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item name="location" className="mb-0">
                                <Select
                                    size="large"
                                    placeholder="Địa điểm"
                                    className="w-full"
                                    suffixIcon={<EnvironmentOutlined className="text-gray-400" />}
                                >
                                    <Option value="all">Tất cả địa điểm</Option>
                                    <Option value="hanoi">Hà Nội</Option>
                                    <Option value="hcm">TP. Hồ Chí Minh</Option>
                                    <Option value="danang">Đà Nẵng</Option>
                                    <Option value="remote">Làm việc từ xa</Option>
                                </Select>
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