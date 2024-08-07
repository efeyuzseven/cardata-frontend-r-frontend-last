import {
    CarOutlined,
    SunOutlined,
    DashboardOutlined,
    CopyOutlined,
    SearchOutlined,
    LogoutOutlined,
    MenuOutlined,
    UserAddOutlined,
    MoneyCollectOutlined,
    EuroOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme, Modal } from 'antd';
import { useState } from 'react';
import { toggleLightDarkTheme } from '../redux/features/themeSlice';
import { useAppDispatch } from '../redux/hooks';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
    
        { key: 'dashboard', icon: <DashboardOutlined />, label: <Link to="/dashboard">Yönetim Paneli</Link> },
    { key: 'arac-girisi', icon: <CarOutlined />, label: <Link to="/arac-girisi">Araç Girişi</Link> },
    { key: 'fiyat-girisi', icon: <MoneyCollectOutlined />, label: <Link to="/fiyat-girisi">Fiyat Girişi</Link> },
    { key: 'fiyat-guncelle', icon: <EuroOutlined />, label: <Link to="/fiyat-guncelle">Fiyat Güncelle</Link> },
    { key: 'donanim:ekle-kopyala', icon: <CopyOutlined />, label: <Link to="/ekle-kopyala">Ekle/Kopyala</Link> },
    { key: 'sorgulama', icon: <SearchOutlined />, label: <Link to="/sorgulama">Sorgulama</Link> },
    { key: 'adminpage', icon: <UserAddOutlined />, label: <Link to="/adminpage">Yetki Dağıtım İşlemleri</Link> },
    { key: 'log-out', icon: <LogoutOutlined />, label: 'Çıkış Yap' },
];

const MainLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const toggleLightDarkMode = () => {
        dispatch(toggleLightDarkTheme());
    };

    const showLogoutConfirm = () => {
        Modal.confirm({
            title: 'Çıkış Yap',
            content: 'Sistemden çıkmak istediğinize emin misiniz?',
            okText: 'Evet', 
            okButtonProps: { danger: true },
            cancelText: 'Hayır',
            onOk() {
                navigate('/login');
            },
        });
    };

    const onMenuClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'log-out') {
            showLogoutConfirm();
        }
    };

    return (
        <Layout hasSider style={{ minHeight: '100dvh' }}>
            <Sider
                trigger={null}
                collapsed={collapsed}
                collapsedWidth={0}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    background: colorBgContainer,
                }}
            >
                <div className='demo-logo-vertical' style={{ height: 20 }} />
                <Menu mode='inline' items={items} onClick={onMenuClick} />
            </Sider>
            <Layout
                style={{
                    marginLeft: collapsed ? 0 : 200,
                    marginBottom: 0,
                    transition: '150ms',
                }}
            >
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        height: 65,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ marginLeft: 10, height: 45, width: 45 }}
                        >
                            {collapsed ? (
                                <MenuOutlined style={{ fontSize: 10 }} />
                            ) : (
                                <MenuOutlined style={{ fontSize: 20 }} />
                            )}
                        </Button>
                        <h1 style={{ marginBlock: 0, marginInline: 20 }}>
                            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>CARDATA</Link>
                        </h1>
                    </div>
                    <button onClick={toggleLightDarkMode} style={{ marginRight: 30, height: 30, width: 40 }}>
                        <SunOutlined />
                    </button>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', height: 60 }}>
                    CARDATA ©2024 Created by D1-Tech
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
