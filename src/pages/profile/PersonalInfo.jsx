import { useState } from "react"
import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Row,
    Col,
    message,
    Typography,
} from "antd"
import {
    SaveOutlined,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    HomeOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"

const { Option } = Select
const { Title } = Typography

export default function PersonalInfo() {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const initialValues = {
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0912345678",
        dateOfBirth: dayjs("1990-01-01"),
        gender: "male",
        address: "Số 123, Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
        education: "Đại học",
        major: "Công nghệ thông tin",
        experience: "3 năm",
        skills: "React, JavaScript, HTML, CSS",
        introduction: "Tôi là một lập trình viên Frontend với 3 năm kinh nghiệm...",
    }

    const onFinish = (values) => {
        setLoading(true)
        setTimeout(() => {
            console.log("Form values:", values)
            message.success("Cập nhật thông tin thành công!")
            setLoading(false)
        }, 1500)
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
        return e?.fileList
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-6 rounded-xl">
            <Title level={3} className="mb-6 text-center">
                Cập nhật thông tin cá nhân
            </Title>

            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="fullName"
                            label="Họ và tên"
                            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "Vui lòng nhập email!" },
                                { type: "email", message: "Email không hợp lệ!" },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="dateOfBirth"
                            label="Ngày sinh"
                            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
                        >
                            <DatePicker className="w-full" format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col xs={24} md={12}>
                        <Form.Item name="gender" label="Giới tính">
                            <Select placeholder="Chọn giới tính">
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                                <Option value="other">Khác</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="address" label="Địa chỉ">
                            <Input prefix={<HomeOutlined />} placeholder="Địa chỉ" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className="text-right">
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SaveOutlined />}
                        loading={loading}
                        size="large"
                    >
                        Lưu thông tin
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
