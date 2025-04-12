import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const Resumes = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingResume, setEditingResume] = useState(null);

    // Dữ liệu mẫu
    const resumes = [
        {
            id: 1,
            fullName: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '0123456789',
            position: 'Frontend Developer',
            experience: '3 năm',
            status: 'pending',
            createdAt: '2024-03-20'
        },
        {
            id: 2,
            fullName: 'Trần Thị B',
            email: 'tranthib@gmail.com',
            phone: '0987654321',
            position: 'Product Marketing Manager',
            experience: '5 năm',
            status: 'reviewed',
            createdAt: '2024-03-19'
        },
        // Thêm dữ liệu mẫu khác
    ];

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
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
            title: 'Vị trí ứng tuyển',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={
                    status === 'pending' ? 'orange' :
                        status === 'reviewed' ? 'blue' :
                            status === 'accepted' ? 'green' :
                                'red'
                }>
                    {status === 'pending' ? 'Chờ xem xét' :
                        status === 'reviewed' ? 'Đã xem xét' :
                            status === 'accepted' ? 'Đã chấp nhận' :
                                'Từ chối'}
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
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(record)}
                    >
                        Tải xuống
                    </Button>
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
        setEditingResume(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (resume) => {
        setEditingResume(resume);
        form.setFieldsValue(resume);
        setIsModalVisible(true);
    };

    const handleDelete = (resume) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa hồ sơ của ${resume.fullName}?`,
            onOk() {
                message.success('Xóa hồ sơ thành công');
            },
        });
    };

    const handleDownload = (resume) => {
        message.success('Đang tải xuống hồ sơ...');
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingResume) {
                message.success('Cập nhật hồ sơ thành công');
            } else {
                message.success('Thêm hồ sơ thành công');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý hồ sơ</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm hồ sơ
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={resumes}
                    rowKey="id"
                    pagination={{
                        total: resumes.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </Card>

            <Modal
                title={editingResume ? 'Sửa hồ sơ' : 'Thêm hồ sơ'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
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
                        name="position"
                        label="Vị trí ứng tuyển"
                        rules={[{ required: true, message: 'Vui lòng nhập vị trí ứng tuyển!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="experience"
                        label="Kinh nghiệm"
                        rules={[{ required: true, message: 'Vui lòng nhập kinh nghiệm!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                    >
                        <Select>
                            <Option value="pending">Chờ xem xét</Option>
                            <Option value="reviewed">Đã xem xét</Option>
                            <Option value="accepted">Đã chấp nhận</Option>
                            <Option value="rejected">Từ chối</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Resumes; 