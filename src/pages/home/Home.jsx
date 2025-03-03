import React from 'react';
import SearchBar from '../../components/home/SearchBar';
import TopEmployers from '../../components/home/TopEmployers';
import LatestJobs from '../../components/home/LatestJobs';

const Home = () => {
    return (
        <div className="py-8">
            {/* Khoảng cách lớn giữa header và SearchBar */}
            <div className="mt-8">
                <SearchBar />
            </div>

            {/* Phần TopEmployers */}
            <div className="mt-8">
                <TopEmployers />
            </div>

            {/* Phần LatestJobs */}
            <div className="mt-8">
                <LatestJobs />
            </div>
        </div>
    );
};

export default Home; 