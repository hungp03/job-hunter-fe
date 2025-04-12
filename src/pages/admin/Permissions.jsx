import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const Permissions = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingPermission, setEditingPermission] = useState(null);

    // Dữ liệu mẫu
    const permissions = [
        {
            id: 1,
            name: 'post_job',
            displayName: 'Đăng việc làm',
            description: 'Quyền đăng tin tuyển dụng',
            module: 'job',
            createdAt: '2024-03-20'
        },
        {
            id: 2,
            name: 'view_applications',
            displayName: 'Xem đơn ứng tuyển',
            description: 'Quyền xem danh sách đơn ứng tuyển',
            module: 'application',
            createdAt: '2024-03-19'
        },
        {
            id: 3,
            name: 'manage_company',
            displayName: 'Quản lý công ty',
            description: 'Quyền quản lý thông tin công ty',
            module: 'company',
            createdAt: '2024-03-18'
        },
    ];

    const columns = [
        {
            title: 'Tên quyền',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
            render: (module) => (
                <Tag color="blue">
                    {module}
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
        setEditingPermission(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (permission) => {
        setEditingPermission(permission);
        form.setFieldsValue(permission);
        setIsModalVisible(true);
    };

    const handleDelete = (permission) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa quyền ${permission.displayName}?`,
            onOk() {
                message.success('Xóa quyền thành công');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingPermission) {
                message.success('Cập nhật quyền thành công');
            } else {
                message.success('Thêm quyền thành công');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý quyền hạn</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm quyền
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={permissions}
                    rowKey="id"
                    pagination={{
                        total: permissions.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </Card>

            <Modal
                title={editingPermission ? 'Sửa quyền' : 'Thêm quyền'}
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
                        label="Tên quyền"
                        rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="displayName"
                        label="Tên hiển thị"
                        rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
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
                        name="module"
                        label="Module"
                        rules={[{ required: true, message: 'Vui lòng chọn module!' }]}
                    >
                        <Select>
                            <Option value="job">Việc làm</Option>
                            <Option value="application">Đơn ứng tuyển</Option>
                            <Option value="company">Công ty</Option>
                            <Option value="user">Người dùng</Option>
                            <Option value="role">Vai trò</Option>
                            <Option value="permission">Quyền hạn</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Permissions; 