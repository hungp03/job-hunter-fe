import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const Jobs = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingJob, setEditingJob] = useState(null);

    // Dữ liệu mẫu
    const jobs = [
        {
            id: 1,
            title: 'Frontend Developer',
            company: 'FPT Software',
            location: 'Hà Nội',
            salary: '15-20 triệu',
            type: 'fulltime',
            status: 'active',
            createdAt: '2024-03-20'
        },
        {
            id: 2,
            title: 'Product Marketing Manager',
            company: 'VNG Corporation',
            location: 'TP. Hồ Chí Minh',
            salary: '25-35 triệu',
            type: 'fulltime',
            status: 'active',
            createdAt: '2024-03-19'
        },
        // Thêm dữ liệu mẫu khác
    ];

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Công ty',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Mức lương',
            dataIndex: 'salary',
            key: 'salary',
        },
        {
            title: 'Loại hình',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type === 'fulltime' ? 'blue' : type === 'parttime' ? 'green' : 'orange'}>
                    {type === 'fulltime' ? 'Toàn thời gian' : type === 'parttime' ? 'Bán thời gian' : 'Hợp đồng'}
                </Tag>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status === 'active' ? 'Đang tuyển' : 'Đã đóng'}
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
        setEditingJob(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (job) => {
        setEditingJob(job);
        form.setFieldsValue(job);
        setIsModalVisible(true);
    };

    const handleDelete = (job) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa công việc ${job.title}?`,
            onOk() {
                message.success('Xóa công việc thành công');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (editingJob) {
                message.success('Cập nhật công việc thành công');
            } else {
                message.success('Thêm công việc thành công');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý công việc</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm công việc
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={jobs}
                    rowKey="id"
                    pagination={{
                        total: jobs.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </Card>

            <Modal
                title={editingJob ? 'Sửa công việc' : 'Thêm công việc'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="company"
                        label="Công ty"
                        rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="location"
                        label="Địa điểm"
                        rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="salary"
                        label="Mức lương"
                        rules={[{ required: true, message: 'Vui lòng nhập mức lương!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Loại hình"
                        rules={[{ required: true, message: 'Vui lòng chọn loại hình!' }]}
                    >
                        <Select>
                            <Option value="fulltime">Toàn thời gian</Option>
                            <Option value="parttime">Bán thời gian</Option>
                            <Option value="contract">Hợp đồng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                    >
                        <Select>
                            <Option value="active">Đang tuyển</Option>
                            <Option value="inactive">Đã đóng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="requirements"
                        label="Yêu cầu"
                        rules={[{ required: true, message: 'Vui lòng nhập yêu cầu!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Jobs; 