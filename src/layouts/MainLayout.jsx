import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 w-full mx-auto" style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}>
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout; 