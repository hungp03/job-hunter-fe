import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Pagination, Card, Select, Button, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import JobCard from '@/components/card/JobCard';
import SearchBar from '@/components/SearchBar';
import { apiGetJobs } from '@/apis/job';
import { EnvironmentOutlined, DollarOutlined, BankOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const Jobs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 9;
    const [filters, setFilters] = useState({
        location: '',
        salary: '',
        level: '',
        keyword: ''
    });
    // control call api
    const [isMounted, setIsMounted] = useState(false);

    // Hàm chuyển đổi giá trị salary từ UI sang API
    const parseSalaryValue = (salaryOption) => {
        if (!salaryOption) return { min: null, max: null, urlValue: '' };
        switch (salaryOption) {
            case '0-10': return { min: 0, max: 10000000, urlValue: '0-10000000' };
            case '10-20': return { min: 10000000, max: 20000000, urlValue: '10000000-20000000' };
            case '20-30': return { min: 20000000, max: 30000000, urlValue: '20000000-30000000' };
            case '30-50': return { min: 30000000, max: 50000000, urlValue: '30000000-50000000' };
            case '50+': return { min: 50000000, max: null, urlValue: '50000000+' };
            default: return { min: null, max: null, urlValue: '' };
        }
    };

    // Hàm chuyển đổi từ URL sang giá trị UI
    const getSalaryOption = (salaryRange) => {
        if (!salaryRange) return '';
        switch (salaryRange) {
            case '0-10000000': return '0-10';
            case '10000000-20000000': return '10-20';
            case '20000000-30000000': return '20-30';
            case '30000000-50000000': return '30-50';
            case '50000000+': return '50+';
            default: return '';
        }
    };

    // Tạo chuỗi filter cho API
    const buildApiFilterString = () => {
        const filterParts = [];
        if (filters.keyword) filterParts.push(`(name~~'${filters.keyword}' or skills.name~~'${filters.keyword}' or company.name~~'${filters.keyword}')`);
        if (filters.location) filterParts.push(`location~~'${filters.location}'`);
        if (filters.level) filterParts.push(`level~~'${filters.level}'`);
        const salaryObj = parseSalaryValue(filters.salary);
        if (salaryObj.min !== null) filterParts.push(`salary >= ${salaryObj.min}`);
        if (salaryObj.max !== null) filterParts.push(`salary < ${salaryObj.max}`);
        return filterParts.join(' and ');
    };

    // Phân tích URL để lấy tham số
    const parseUrlParams = () => {
        const queryParams = new URLSearchParams(location.search);
        return {
            location: queryParams.get('location') || '',
            salary: getSalaryOption(queryParams.get('salary')) || '',
            level: queryParams.get('level') || '',
            keyword: queryParams.get('keyword') || '',
            page: queryParams.get('page') ? parseInt(queryParams.get('page'), 10) : 1
        };
    };

    // Cập nhật URL khi người dùng tương tác
    const updateUrl = (newFilters, newPage) => {
        const params = new URLSearchParams();
        params.set('page', newPage.toString());
        if (newFilters.keyword) params.set('keyword', newFilters.keyword);
        if (newFilters.location) params.set('location', newFilters.location);
        if (newFilters.level) params.set('level', newFilters.level);
        if (newFilters.salary) {
            const salaryObj = parseSalaryValue(newFilters.salary);
            if (salaryObj.urlValue) params.set('salary', salaryObj.urlValue);
        }
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };

    // Fetch dữ liệu từ API
    const fetchJobs = async () => {
        const filterString = buildApiFilterString();
        const params = {
            page: currentPage,
            size: pageSize,
            sort: 'createdAt,desc'
        };
        if (filterString) params.filter = filterString;

        try {
            const response = await apiGetJobs(params);
            if (response.statusCode === 200) {
                setJobs(response.data.result);
                setTotal(response.data.meta.total);
            } else {
                message.error(response.message || 'Có lỗi xảy ra khi tải dữ liệu');
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            message.error('Không thể kết nối đến máy chủ');
        }
    };

    // Khởi tạo state từ URL khi component mount
    useEffect(() => {
        const parsedParams = parseUrlParams();
        setFilters({
            location: parsedParams.location,
            salary: parsedParams.salary,
            level: parsedParams.level,
            keyword: parsedParams.keyword
        });
        setCurrentPage(parsedParams.page);
        setIsMounted(true); // Đánh dấu component đã sẵn sàng
    }, [location.search]);

    // Gọi API khi state đã sẵn sàng
    useEffect(() => {
        if (isMounted) {
            fetchJobs(); // Chỉ gọi API khi isMounted là true
        }
    }, [isMounted, filters, currentPage]);

    // Xử lý thay đổi filter
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value || '' };
        setFilters(newFilters);
        const newPage = 1;
        setCurrentPage(newPage);
        updateUrl(newFilters, newPage);
    };

    // Xử lý tìm kiếm
    const handleSearch = (value) => {
        const newFilters = { ...filters, keyword: value || '' };
        setFilters(newFilters);
        const newPage = 1;
        setCurrentPage(newPage);
        updateUrl(newFilters, newPage);
    };

    // Xử lý reset filters
    const handleResetFilters = () => {
        const newFilters = { location: '', salary: '', level: '', keyword: '' };
        setFilters(newFilters);
        const newPage = 1;
        setCurrentPage(newPage);
        updateUrl(newFilters, newPage);
    };

    // Xử lý thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
        updateUrl(filters, page);
    };

    return (
        <div className="py-8">
            <div className="mt-8">
                <SearchBar onSearch={handleSearch} value={filters.keyword} />
            </div>

            <div className="py-10">
                <div className="flex justify-between items-center mb-4">
                    <Title level={2}>Công việc hot nhất</Title>
                </div>

                <div className="mb-4">
                    <Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <div className="flex items-center mb-2">
                                    <EnvironmentOutlined className="mr-2 text-gray-500" />
                                    <span className="text-gray-600">Địa điểm</span>
                                </div>
                                <Select
                                    className="w-full"
                                    placeholder="Chọn địa điểm"
                                    value={filters.location}
                                    onChange={(value) => handleFilterChange('location', value)}
                                    allowClear
                                >
                                    <Option value="HANOI">Hà Nội</Option>
                                    <Option value="HOCHIMINH">Hồ Chí Minh</Option>
                                    <Option value="DANANG">Đà Nẵng</Option>
                                    <Option value="OTHER">Khác</Option>
                                </Select>
                            </div>

                            <div>
                                <div className="flex items-center mb-2">
                                    <DollarOutlined className="mr-2 text-gray-500" />
                                    <span className="text-gray-600">Mức lương</span>
                                </div>
                                <Select
                                    className="w-full"
                                    placeholder="Chọn mức lương"
                                    value={filters.salary}
                                    onChange={(value) => handleFilterChange('salary', value)}
                                    allowClear
                                >
                                    <Option value="0-10">Dưới 10 triệu</Option>
                                    <Option value="10-20">10-20 triệu</Option>
                                    <Option value="20-30">20-30 triệu</Option>
                                    <Option value="30-50">30-50 triệu</Option>
                                    <Option value="50+">Trên 50 triệu</Option>
                                </Select>
                            </div>

                            <div>
                                <div className="flex items-center mb-2">
                                    <BankOutlined className="mr-2 text-gray-500" />
                                    <span className="text-gray-600">Kinh nghiệm</span>
                                </div>
                                <Select
                                    className="w-full"
                                    placeholder="Chọn kinh nghiệm"
                                    value={filters.level}
                                    onChange={(value) => handleFilterChange('level', value)}
                                    allowClear
                                >
                                    <Option value="INTERN">Thực tập sinh</Option>
                                    <Option value="FRESHER">Fresher</Option>
                                    <Option value="JUNIOR">Junior (1-2 năm)</Option>
                                    <Option value="MIDDLE">Middle (2-5 năm)</Option>
                                    <Option value="SENIOR">Senior (5+ năm)</Option>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button onClick={handleResetFilters}>
                                Xóa bộ lọc
                            </Button>
                        </div>
                    </Card>
                </div>

                <Row gutter={[16, 16]}>
                    {jobs.length === 0 ? (
                        <div className="w-full text-center text-gray-600">Không có việc làm bạn đang tìm</div>
                    ) : (
                        jobs.map((job) => (
                            <Col xs={24} sm={12} md={8} key={job.id}>
                                <Link to={`/job/${job.id}`}>
                                    <JobCard job={job} />
                                </Link>
                            </Col>
                        ))
                    )}
                </Row>

                {jobs.length > 0 && (
                    <div className="flex justify-center items-center mt-8">
                        <Pagination
                            current={currentPage}
                            total={total}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;