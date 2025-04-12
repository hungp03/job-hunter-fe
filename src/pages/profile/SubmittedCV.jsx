import React, { useState, useEffect } from "react"
import { Table, Tag, Space, Button, Typography, Empty, message } from "antd"
import {
  DownloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons"
import { apiGetResumeByCurrentUser } from "@/apis/user"
const { Title } = Typography
const PAGE_SIZE = 5
export default function SubmittedCV() {
  const [CVs, setCVs] = useState([])

  const fetchResumeByUser = async () => {
    const response = await apiGetResumeByCurrentUser()
    if (response.statusCode === 200) {
      const dataWithKey = response.data.result.map((item) => ({
        ...item,
        key: item.id,
      }))
      setCVs(dataWithKey)
    } else {
      message.error(response.message)
    }
  }

  useEffect(() => {
    fetchResumeByUser()
  }, [])

  const getStatusTag = (status) => {
    switch (status) {
      case "REVIEWING":
        return <Tag icon={<ClockCircleOutlined />} color="processing">Đang xem xét</Tag>
      case "PENDING":
        return <Tag icon={<ClockCircleOutlined />} color="warning">Chờ xác nhận</Tag>
      case "REJECTED":
        return <Tag icon={<CloseCircleOutlined />} color="error">Từ chối</Tag>
      case "APPROVED":
        return <Tag icon={<CheckCircleOutlined />} color="success">Đã chấp nhận</Tag>
      default:
        return <Tag color="default">{status}</Tag>
    }
  }

  const columns = [
    {
      title: "Vị trí công việc",
      dataIndex: ["job", "name"],
      key: "jobTitle",
    },
    {
      title: "Công ty",
      dataIndex: "companyName",
      key: "company",
    },
    {
      title: "Ngày nộp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString("vi-VN"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
      filters: [
        { text: "Đang xem xét", value: "REVIEWING" },
        { text: "Chờ xác nhận", value: "PENDING" },
        { text: "Từ chối", value: "REJECTED" },
        { text: "Đã chấp nhận", value: "APPROVED" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<DownloadOutlined />}
            size="small"
            onClick={() => {
              const link = document.createElement("a")
              link.href = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${record.url}`
              link.download = record.url
              link.click()
            }}
          >
            Tải CV
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="submitted-cvs">
      <Title level={4} className="mb-4">
        Các CV đã gửi
      </Title>

      {CVs.length > 0 ? (
        <Table
          columns={columns}
          dataSource={CVs}
          pagination={{ pageSize: 5 }}
          rowClassName="hover:bg-gray-50"
        />
      ) : (
        <Empty description="Bạn chưa gửi CV nào" className="my-8" />
      )}
    </div>
  )
}
