import React, { useState } from 'react';
import {
    Row, Col, Card, Table, Layout, Typography, Select,
} from 'antd';
import { Pie } from 'react-chartjs-2';
import '../styles.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

const { Option } = Select;

const UserDashboard: React.FC = () => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleSelectAll = () => {
        const allUserNames = userData.map(user => user.name);
        setSelectedUsers(allUserNames);
    };

    const handleDeselectAll = () => {
        setSelectedUsers([]);
    };

    const handleUserSelect = (selectedValues: string[]) => {
        if (selectedValues.includes('all')) {
            // "Hepsini Seç/Iptal Et" seçeneği tıklandığında
            if (selectedUsers.length === userData.length) {
                // Eğer tüm kullanıcılar zaten seçili ise iptal et
                handleDeselectAll();
            } else {
                // Değilse hepsini seç
                handleSelectAll();
            }
        } else {
            // Diğer durumlarda seçilen kullanıcıları güncelle
            setSelectedUsers(selectedValues);
        }
    };

    const pieData = {
        labels: ['Group A', 'Group B', 'Group C', 'Group D'],
        datasets: [
            {
                data: [400, 300, 300, 200],
                backgroundColor: ['#35374B', '#344955', '#50727B', '#78A083'],
                hoverBackgroundColor: [
                    '#4B4D6B',
                    '#456371',
                    '#6B8A9D',
                    '#9BB29F',
                ],
            },
        ],
    };

    const userData = [
        {
            key: 1,
            carID: '21',
            name: 'Araç Özeliği Düzenlendi ',
            date: '02/07/2024',
        },
        {
            key: 2,
            carID: '29',
            name: 'Super Code Kullanıldı',
            date: '01/07/2024',
        },
        {
            key: 3,
            carID: '27',
            name: 'Araç Sorgulaması Yapıldı',
            date: '01/07/2024',
        },
        {
            key: 4,
            carID: '5',
            name: 'Super Code Kullanıldı',
            date: '01/07/2024',
        },
        {
            key: 5,
            carID: '61',
            name: 'Super Code Kullanıldı',
            date: '30/06/2024',
        },
        {
            key: 6,
            carID: '161',
            name: 'Araç Fiyatı Güncellendi',
            date: '29/06/2024',
        },
        {
            key: 7,
            carID: '162',
            name: 'Araç Fiyatı Güncellendi',
            date: '27/06/2024',
        },
    ];


    const filteredUserData =
        selectedUsers.length > 0
            ? userData.filter(user => selectedUsers.includes(user.name))
            : userData;

    return (
        <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Typography.Title level={2} style={{ textAlign: 'left' }}>
                USER DASHBOARD
            </Typography.Title>

            <Row gutter={16} style={{ marginTop: 50 }}>
                <Col span={8} style={{ textAlign: 'left' }}>
                    <Card title='Daily Sales'>
                        <div>
                            <Pie data={pieData} width={750} height={750} />
                        </div>
                    </Card>
                </Col>
                <Col span={16} style={{ textAlign: 'left' }}>
                    <Card
                        title='Yapılan İşlemler'
                        extra={
                            <Select
                                mode='multiple'
                                style={{ width: '500px' }}
                                placeholder='İşlem Seç'
                                onChange={handleUserSelect}
                                value={selectedUsers}
                            >
                                <Option value='all'>
                                    Hepsini Seç/Iptal Et
                                </Option>
                                {userData.map(user => (
                                    <Option key={user.key} value={user.name}>
                                        {user.name}
                                    </Option>
                                ))}
                            </Select>
                        }
                    >
                        <Table
                            columns={[
                                {
                                    title: 'Araç ID ',
                                    dataIndex: 'carID',
                                    key: 'carID',
                                },
                                {
                                    title: 'İşlem Adı',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                {
                                    title: 'Tarih',
                                    dataIndex: 'date',
                                    key: 'date',
                                },
                            ]}
                            dataSource={filteredUserData}
                            pagination={{ pageSize: 6 }}
                        />
                    </Card>
                </Col>
            </Row>
        </Layout.Content>
    );
};

export default UserDashboard;
