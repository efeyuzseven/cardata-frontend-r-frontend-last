import React, { useState,useMemo } from 'react';
import { Row, Col, Card, Statistic, Table, Layout, Typography, Select,Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Line, Bar, Pie } from 'react-chartjs-2';
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
import { Link } from 'react-router-dom';

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

const Dashboard: React.FC = () => {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [selectedSubModels, setSelectedSubModels] = useState<string[]>([]);
    const [modelDisabled, setModelDisabled] = useState<boolean>(true);
    const [subModelDisabled, setSubModelDisabled] = useState<boolean>(true);
    const [selectedPage, setSelectedPage] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedActions, setSelectedActions] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    const handleSelectAll = () => {
        const allUserNames = userData.map((user) => user.name);
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

    const handleSelectChange = (value: string[]) => {
        setSelectedBrands(value);
        setSelectedModels([]);
        setSelectedSubModels([]);
        setModelDisabled(false);
        setSubModelDisabled(true);
    };

    const handleModelSelect = (value: string[]) => {
        setSelectedModels(value);
        setSelectedSubModels([]);
        setSubModelDisabled(false);
    };

    const handleSubModelSelect = (value: string[]) => {
        setSelectedSubModels(value);
    };

    const handleActionSelect = (value: string[]) => {
    setSelectedActions(value);
};



    const data = {
        labels: [
            'Page A',
            'Page B',
            'Page C',
            'Page D',
            'Page E',
            'Page F',
            'Page G',
        ],
        datasets: [
            {
                label: 'Previous Page',
                data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
                borderColor: '#435585',
                backgroundColor: '#435585',
            },
            {
                label: 'Current Page',
                data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
                borderColor: '#818FB4',
                backgroundColor: '#818FB4',
            },
        ],
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

    const filteredData  = {
        labels: selectedSubModels,
        datasets: [
            {
                label: 'Önceki Ay',
                data: [1200000, 1400000, 1850000, 1500000, 1340000, 1680000, 1450000, 1200000, 1400000, 1850000, 1500000, 1340000, 1680000, 1450000, 1340000],
                backgroundColor: '#395B64',
                borderColor: '#2C3333',
                borderWidth: 1,
            },
            {
                label: 'Bu Ay',
                data: [1500000, 1470000, 1890000, 1400000, 1389000, 1690000, 1450000, 1500000, 1470000, 1890000, 1400000, 1389000, 1690000, 1450000, 1890000],
                backgroundColor: '#9EC8B9',
                borderColor: '#5C8374',
                borderWidth: 1,
            },
        ],
    };

    
    const carBrands = [
        {
            brand: 'Audi',
            models: [
                { name: 'A4', submodels: ['Sedan', 'Avant', 'Cabriolet'] },
                { name: 'Q7', submodels: ['Premium', 'Sport', 'Luxury'] },
                { name: 'R8', submodels: ['Coupe', 'Spyder'] }
            ]
        },
        {
            brand: 'BMW',
            models: [
                { name: 'X5', submodels: ['xDrive40i', 'M50i', 'xDrive45e'] },
                { name: 'M5', submodels: ['Sedan', 'Competition'] },
                { name: 'Z4', submodels: ['Roadster', 'M40i'] }
            ]
        },
        // Add more brands and models as needed
    ];



    const pageData= [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    const userData = [
    {
        key: 1,
        name: 'Arif Şahin',
        workthing: 'Araç Düzenleme',
        date: '27/06/2024',
    },
    {
        key: 2,
        name: 'Selim Önlü',
        workthing: 'Araç Düzenleme Yapıldı',
        date: '29/06/2024',
    },
    {
        key: 3,
        name: 'İbrahim Şişman',
        workthing: 'Donanım Kopyalama Yapıldı',
        date: '27/06/2024',
    },
    {
        key: 4,
        name: 'İhsan Efe Yuzseven',
        workthing: 'Araç Düzenleme Yapıldı',
        date: '27/06/2024',
    },
    {
        key: 5,
        name: 'Naci Eren Kılıc',
        workthing: 'Donanım Kopyalama Yapıldı',
        date: '27/06/2024',
    },
    {
        key: 6,
        name: 'Bilal Altan',
        workthing: 'Super Code Kullanıldı',
        date: '29/06/2024',
    },
    {
        key: 7,
        name: 'Burhan Numar',
        workthing: 'Araç Fiyatı Güncellendi',
        date: '27/06/2024',
    },
    {
        key: 8,
        name: 'Deniz Uyaroğlu',
        workthing: 'Araç Fiyatı Güncellendi',
        date: '27/06/2024',
    },
];


    const handleSelectPage= (value: string[]) => {
        setSelectedPage(value);
    };

    const handleDateSelect = (value: string[]) => {
        setSelectedDates(value);
    };

    const filteredUserData = userData.filter((user) => {
        const matchName = selectedUsers.length === 0 || selectedUsers.includes(user.name);
        const matchAction = selectedActions.length === 0 || selectedActions.includes(user.workthing);
        const matchDate = selectedDates.length === 0 || selectedDates.includes(user.date);
        return matchName && matchAction && matchDate;
    });


    const filteredPage = {
        labels: data.labels.filter((label) =>
            selectedPage.includes(label)
        ),
        datasets: data.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data.filter((_, index) =>
                selectedPage.includes(data.labels[index])
            ),
        })),
    };

    const uniqueActions = useMemo(() => {
        return Array.from(new Set(userData.map(user => user.workthing)));
    }, [userData]);

    const uniqueDates = useMemo(() => {
        return Array.from(new Set(userData.map(user => user.date)));
    }, [userData]);

    const uniqueUsers = useMemo(() => {
        return Array.from(new Set(userData.map(user => user.name)));
    }, [userData]);


    return (
        <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Typography.Title level={2} style={{ textAlign: 'left' }}>
                Yönetim Paneli

                <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <Link to="/user-dashboard">
                        <Button type="primary" style={{ background: '#ea3f20'}}>
                            Kullanıcı Paneli
                        </Button>
                    </Link>
                </div>
            </Typography.Title>

            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title='Stats'
                            value={34578}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix='Last 30d'
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title='Stats'
                            value={895}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix='Last 7d'
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title='Stats'
                            value={52410}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix='Last 30d'
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16,textAlign:'left' }}>

            <Col span={12}>
                    <Card
                        title='Araç Fiyatları (₺)'
                        extra={
                            <div>
                                <Select
                                    mode="multiple"
                                    style={{ width: '150px', marginRight: '10px' }}
                                    placeholder="Marka Seçin"
                                    onChange={handleSelectChange}
                                >
                                    {carBrands.map((brand) => (
                                        <Option key={brand.brand} value={brand.brand}>
                                            {brand.brand}
                                        </Option>
                                    ))}
                                </Select>
                                <Select
                                    mode="multiple"
                                    style={{ width: '150px', marginRight: '10px' }}
                                    placeholder="Model Seçin"
                                    onChange={handleModelSelect}
                                    value={selectedModels}
                                    disabled={modelDisabled}
                                >
                                    {carBrands
                                        .find((b) => b.brand === selectedBrands[0])
                                        ?.models.map((model) => (
                                            <Option key={model.name} value={model.name}>
                                                {model.name}
                                            </Option>
                                        ))}
                                </Select>
                                <Select
                                    mode="multiple"
                                    style={{ width: '150px' }}
                                    placeholder="Alt Model Seçin"
                                    onChange={handleSubModelSelect}
                                    value={selectedSubModels}
                                    disabled={subModelDisabled}
                                >
                                    {carBrands
                                        .find((b) => b.brand === selectedBrands[0])
                                        ?.models.find((m) => m.name === selectedModels[0])
                                        ?.submodels.map((submodel) => (
                                            <Option key={submodel} value={submodel}>
                                                {submodel}
                                            </Option>
                                        ))}
                                </Select>
                            </div>
                        }
                    >
                        <div style={{ marginTop: 16 }}>
                            <Bar data={filteredData} />
                        </div>
                    </Card>
                </Col>

                <Col span={12} style={{textAlign:'left'}}>
                        <Card
                            title='Page Data'
                            extra={
                                <Select
                                    mode="multiple"
                                    style={{ width: '500px' }}
                                    placeholder="Select Page"
                                    onChange={handleSelectPage}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option && option.children ? option.children.toString().toLowerCase().includes(input.toLowerCase()) : false
                                    }
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                >
                                    {pageData.map((brand) => (
                                        <Option key={brand} value={brand}>
                                            {brand}
                                        </Option>
                                    ))}
                                </Select>
                            }
                        >
                            <div style={{ marginTop: 16 }}>
                                <Line data={filteredPage} />
                            </div>
                        </Card>
                </Col>
                
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={8} style={{textAlign:'left'}}>
                    <Card title='Daily Sales'>
                        <div>
                            <Pie data={pieData} width={750} height={750} />
                        </div>
                    </Card>
                </Col>
                <Col span={16} style={{textAlign:'left'}}>
                    <Card title="Kullanıcı Takibi" extra={
                        <div>
                            <Select
                                mode="multiple"
                                style={{ width: '200px', marginRight: '10px' }}
                                placeholder="Yapılan İşlem Seç"
                                onChange={handleActionSelect}
                                value={selectedActions}
                            >
                                {uniqueActions.map((action) => (
                                    <Option key={action} value={action}>
                                        {action}
                                    </Option>
                                ))}
                            </Select>
                            <Select
                                mode="multiple"
                                style={{ width: '200px', marginRight: '10px' }}
                                placeholder="Tarih Seç"
                                onChange={handleDateSelect}
                                value={selectedDates}
                            >
                                {uniqueDates.map((date) => (
                                    <Option key={date} value={date}>
                                        {date}
                                    </Option>
                                ))}
                            </Select>
                            <Select
                                mode="multiple"
                                style={{ width: '200px' }}
                                placeholder="Kullanıcı Seç"
                                onChange={handleUserSelect}
                                value={selectedUsers}
                            >
                                <Option value="all">Hepsini Seç/İptal Et</Option>
                                {uniqueUsers.map((user) => (
                                    <Option key={user} value={user}>
                                        {user}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    }>
                        <Table
                            columns={[
                                {
                                    title: 'Kullanıcı Adı',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                {
                                    title: 'Yapılan İşlem',
                                    dataIndex: 'workthing',
                                    key: 'workthing',
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

export default Dashboard;
