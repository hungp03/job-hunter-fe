"use client"

import { useState } from "react"
import { Form, Input, Button, Alert, Typography, Space } from "antd"
import { LockOutlined, KeyOutlined, SaveOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

export default function ChangePassword() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const onFinish = (values) => {
    setLoading(true)
    setSuccess(false)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (values.currentPassword === "password123") {
        console.log("Password changed:", values)
        setSuccess(true)
        form.resetFields()
      } else {
        setError("Mật khẩu hiện tại không chính xác!")
      }
      setLoading(false)
    }, 1500)
  }

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"))
    },
  })

  return (
    <div className="change-password">
      <Title level={4} className="mb-4">
        Thay đổi mật khẩu
      </Title>

      <div className="max-w-md mx-auto">
        {success && <Alert message="Thay đổi mật khẩu thành công!" type="success" showIcon className="mb-4" />}

        {error && <Alert message={error} type="error" showIcon className="mb-4" />}

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Mật khẩu phải chứa chữ hoa, chữ thường và số!",
              },
            ]}
          >
            <Input.Password prefix={<KeyOutlined />} placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu mới!" }, validateConfirmPassword]}
          >
            <Input.Password prefix={<KeyOutlined />} placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />} block size="large">
              Cập nhật mật khẩu
            </Button>
          </Form.Item>
        </Form>

        <Space direction="vertical" className="mt-4 text-gray-500">
          <Text type="secondary">Lưu ý về mật khẩu:</Text>
          <ul className="list-disc pl-5">
            <li>Mật khẩu phải có ít nhất 8 ký tự</li>
            <li>Phải chứa ít nhất một chữ hoa, một chữ thường và một số</li>
            <li>Không nên sử dụng thông tin cá nhân dễ đoán</li>
          </ul>
        </Space>
      </div>
    </div>
  )
}
