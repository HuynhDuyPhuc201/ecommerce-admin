import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, LineChartOutlined, UserOutlined } from '@ant-design/icons';
import AdminUser from './AdminUser';
import AdminProduct from './AdminProduct';
import DashboardChart from './DashboardChart';
import './admin.css';
import Header from '~/components/Header';
import { Navigate } from 'react-router-dom';
import { getUser } from '~/config/token';

const Admin = () => {
    const [renderComponent, setRenderComponent] = useState('user');

    const user = getUser();
    console.log(user, 'user');

    const items = [
        {
            id: 1,
            key: 'user',
            label: 'Người dùng',
            icon: <UserOutlined />,
            component: <AdminUser />,
        },
        {
            id: 2,
            key: 'product',
            label: 'Sản Phẩm',
            icon: <AppstoreOutlined />,
            component: <AdminProduct />,
        },
        {
            id: 3,
            key: 'chart',
            label: 'Doanh thu',
            icon: <LineChartOutlined />,
            component: <DashboardChart />,
        },
    ];
    const onClick = ({ key }) => {
        setRenderComponent(key);
    };
    if (!user?.isAdmin) return <Navigate to="/" />;
    return (
        <>
            <Header />
            <Row>
                <Col sm={24} xs={24} md={4}>
                    <Menu
                        onClick={onClick}
                        className="custom-menu"
                        defaultSelectedKeys={['user']}
                        mode="inline"
                        items={items}
                    />
                </Col>
                <Col sm={24} md={20} style={{ width: '100%' }}>
                    {items
                        ?.filter((item, i) => renderComponent === item.key)
                        .map((item, i) => (
                            <div className="" key={i}>
                                {item.component}
                            </div>
                        ))}
                </Col>
            </Row>
        </>
    );
};

export default Admin;
