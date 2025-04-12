import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import JobCard from '../card/JobCard';
import { apiGetJobs } from '@/apis/job';
const { Title } = Typography;

const LatestJobs = () => {
    const [jobs, setJobs] = useState([]);
    const fetchJobs = async () => {
        const response = await apiGetJobs({ page: 1, size: 6, sort: 'createdAt,desc' });
        if (response.statusCode === 200) {
            setJobs(response.data.result)
        }
        else {
            message.error(response.message)
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-6">
                <Title level={2}>Công việc mới nhất</Title>
                <Link to="/jobs" className="text-main hover:underline">
                    Xem tất cả
                </Link>
            </div>

            <Row gutter={[16, 16]}>
                {jobs.map((job) => (
                    <Col xs={24} sm={12} md={8} key={job.id}>
                        <Link to={`/job/${job.id}`}>
                            <JobCard job={job} />
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default LatestJobs; 