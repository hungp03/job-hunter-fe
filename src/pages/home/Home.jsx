import React from 'react';
import SearchBar from '@/components/SearchBar';
import TopCompany from '@/components/home/TopCompany';
import LatestJobs from '@/components/home/LatestJobs';

const Home = () => {
    return (
        <div className="py-8">
            {/* Khoảng cách lớn giữa header và SearchBar */}
            <div className="mt-8">
                <SearchBar />
            </div>

            {/* Phần TopEmployers */}
            <div className="mt-8">
                <TopCompany />
            </div>

            {/* Phần LatestJobs */}
            <div className="mt-8">
                <LatestJobs />
            </div>
        </div>
    );
};

export default Home; 