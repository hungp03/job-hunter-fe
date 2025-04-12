import { useState } from "react"
import { Tabs, Layout, Typography } from "antd"
import { UserOutlined, FileOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"
import PersonalInfo from "./PersonalInfo"
import ChangePassword from "./ChangePassword"
import EmailPreferences from "./EmailPreferences"
import SubmittedCV from "./SubmittedCv"
const { Content } = Layout
const { Title } = Typography

export default function PersonalProfile() {
  const [activeTab, setActiveTab] = useState("1")

  const handleTabChange = (key) => {
    setActiveTab(key)
  }

  return (
    <Layout className="min-h-screen">
      <Content className="p-6">
        <div className="max-w-6xl mx-auto rounded-lg p-6">
          <Title level={2} className="mb-6 text-center">
            Quản lý thông tin cá nhân
          </Title>

          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            type="card"
            className="profile-tabs"
            items={[
              {
                key: "1",
                label: (
                  <span>
                    <FileOutlined />
                    Các CV đã rải
                  </span>
                ),
                children: <SubmittedCV/>,
              },
              {
                key: "2",
                label: (
                  <span>
                    <UserOutlined />
                    Cập nhật thông tin cá nhân
                  </span>
                ),
                children: <PersonalInfo />,
              },
              {
                key: "3",
                label: (
                  <span>
                    <LockOutlined />
                    Thay đổi mật khẩu
                  </span>
                ),
                children: <ChangePassword />,
              },
              {
                key: "4",
                label: (
                  <span>
                    <MailOutlined />
                    Nhận thông tin job qua email
                  </span>
                ),
                children: <EmailPreferences />,
              },
            ]}
          />
        </div>
      </Content>
    </Layout>
  )
}
