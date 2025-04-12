import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 w-full mx-auto" style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout; 