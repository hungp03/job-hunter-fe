import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6">
            <div className="max-w-6xl mx-auto text-center">
                <Text className="text-gray-500">
                    © {new Date().getFullYear()} JobHunter.
                </Text>
            </div>
        </footer>
    );
};

export default Footer; 