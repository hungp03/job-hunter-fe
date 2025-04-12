"use client"

import { useState } from "react"
import { Form, Switch, Select, Button, Checkbox, Card, Typography, Row, Col, Divider, message } from "antd"
import { SaveOutlined, BellOutlined, ClockCircleOutlined, EnvironmentOutlined, DollarOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select

export default function EmailPreferences() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Mock initial values
  const initialValues = {
    receiveJobAlerts: true,
    emailFrequency: "daily",
    jobTypes: ["full-time", "remote"],
    locations: ["ho-chi-minh", "ha-noi"],
    salaryRange: "10-20",
    categories: ["it", "design"],
    receiveCompanyUpdates: true,
    receiveApplicationUpdates: true,
  }

  const onFinish = (values) => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Email preferences:", values)
      message.success("Cập nhật thành công!")
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="email-preferences">
      <Title level={4} className="mb-4">
        Nhận thông tin job qua email
      </Title>

      <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
        <Card className="mb-4">
          <Form.Item name="receiveJobAlerts" valuePropName="checked" className="mb-2">
            <div className="flex items-center justify-between">
              <div>
                <Text strong>Nhận thông báo về việc làm</Text>
                <div className="text-gray-500">Nhận email khi có việc làm phù hợp với tiêu chí của bạn</div>
              </div>
              <Switch />
            </div>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.receiveJobAlerts !== currentValues.receiveJobAlerts}
          >
            {({ getFieldValue }) =>
              getFieldValue("receiveJobAlerts") && (
                <>
                  <Divider />
                  <Form.Item
                    name="categories"
                    label={
                      <span>
                        <BellOutlined className="mr-1" />
                        Danh mục công việc
                      </span>
                    }
                  >
                    <Select mode="multiple" placeholder="Chọn danh mục">
                      <Option value="it">Công nghệ thông tin</Option>
                      <Option value="design">Thiết kế</Option>
                      <Option value="marketing">Marketing</Option>
                      <Option value="sales">Kinh doanh</Option>
                      <Option value="finance">Tài chính - Kế toán</Option>
                      <Option value="hr">Nhân sự</Option>
                      <Option value="other">Khác</Option>
                    </Select>
                  </Form.Item>
                </>
              )
            }
          </Form.Item>
        </Card>

        <Card className="mb-4">
          <Title level={5} className="mb-4">
            Các thông báo khác
          </Title>

          <Form.Item name="receiveApplicationUpdates" valuePropName="checked">
            <div className="flex items-center justify-between">
              <div>
                <Text strong>Cập nhật đơn ứng tuyển</Text>
                <div className="text-gray-500">Nhận thông báo khi có cập nhật về đơn ứng tuyển của bạn</div>
              </div>
              <Switch />
            </div>
          </Form.Item>
        </Card>

        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading} size="large">
            Lưu cài đặt
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
