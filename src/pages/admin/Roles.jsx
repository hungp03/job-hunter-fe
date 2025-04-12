import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const Roles = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingRole, setEditingRole] = useState(null);

    // Dữ liệu mẫu
    const roles = [
        {
            id: 1,
            name: 'Admin',
            description: 'Quản trị viên hệ thống',
            permissions: ['all'],
            createdAt: '2024-03-20'
        },
        {
            id: 2,
            name: 'Employer',
            description: 'Nhà tuyển dụng',
            permissions: ['post_job', 'view_applications', 'manage_company'],
            createdAt: '2024-03-19'
        },
        {
            id: 3,
            name: 'User',
            description: 'Người dùng thông thường',
            permissions: ['view_jobs', 'apply_job', 'manage_profile'],
            createdAt: '2024-03-18'
        },
    ];

    const columns = [
        {
            title: 'Tên vai trò',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Quyền hạn',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions) => (
                <Space wrap>
                    {permissions.map((permission, index) => (
                        <Tag key={index} color="blue">
                            {permission === 'all' ? 'Tất cả quyền' : permission}
                        </Tag>
                    ))}
                </Space>
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
        setEditingRole(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (role) => {
        setEditingRole(role);
        form.setFieldsValue(role);
        setIsModalVisible(true);
    };

    const handleDelete = (role) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa vai trò ${role.name}?`,
            onOk() {
                message.success('Xóa vai trò thành công');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingRole) {
                message.success('Cập nhật vai trò thành công');
            } else {
                message.success('Thêm vai trò thành công');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý vai trò</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm vai trò
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={roles}
                    rowKey="id"
                    pagination={{
                        total: roles.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </Card>

            <Modal
                title={editingRole ? 'Sửa vai trò' : 'Thêm vai trò'}
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
                        label="Tên vai trò"
                        rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="permissions"
                        label="Quyền hạn"
                        rules={[{ required: true, message: 'Vui lòng chọn quyền hạn!' }]}
                    >
                        <Select mode="multiple">
                            <Option value="all">Tất cả quyền</Option>
                            <Option value="post_job">Đăng việc làm</Option>
                            <Option value="view_applications">Xem đơn ứng tuyển</Option>
                            <Option value="manage_company">Quản lý công ty</Option>
                            <Option value="view_jobs">Xem việc làm</Option>
                            <Option value="apply_job">Ứng tuyển việc làm</Option>
                            <Option value="manage_profile">Quản lý hồ sơ</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Roles; 