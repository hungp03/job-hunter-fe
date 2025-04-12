import React from 'react'
import { Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';
const CompanyCard = ({ company }) => {
  return (

    <Card
      hoverable
      className="text-center"
    > <Link to={`/company/${company.id}`}>

        <div className="p-4 mb-4">
          <Avatar
            src={`${import.meta.env.VITE_BACKEND_RESOURCE_URL}/company/${company.logo}`}
            size={64}

          /></div>

        <div className="font-medium truncate text-black">{company.name}</div>
      </Link>
    </Card>

  )
}

export default CompanyCard