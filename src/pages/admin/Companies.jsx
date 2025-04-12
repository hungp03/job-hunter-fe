import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Companies = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingCompany, setEditingCompany] = useState(null);

    // Dữ liệu mẫu
    const companies = [
        {
            id: 1,
            name: 'FPT Software',
            email: 'hr@fpt.com',
            phone: '0123456789',
            address: 'Hà Nội',
            status: 'active',
            createdAt: '2024-03-20'
        },
        {
            id: 2,
            name: 'VNG Corporation',
            email: 'hr@vng.com',
            phone: '0987654321',
            address: 'TP. Hồ Chí Minh',
            status: 'active',
            createdAt: '2024-03-19'
        },
        // Thêm dữ liệu mẫu khác
    ];

    const columns = [
        {
            title: 'Tên công ty',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const handleAdd = () => {
        setEditingCompany(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (company) => {
        setEditingCompany(company);
        form.setFieldsValue(company);
        setIsModalVisible(true);
    };

    const handleDelete = (company) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa công ty ${company.name}?`,
            onOk() {
                message.success('Xóa công ty thành công');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingCompany) {
                message.success('Cập nhật công ty thành công');
            } else {
                message.success('Thêm công ty thành công');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý công ty</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm công ty
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={companies}
                    rowKey="id"
                    pagination={{
                        total: companies.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </Card>

            <Modal
                title={editingCompany ? 'Sửa công ty' : 'Thêm công ty'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Tên công ty"
                        rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Companies; 