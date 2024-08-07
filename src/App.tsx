// src/App.tsx
import './App.css';
import MainLayout from './layouts/MainLayout';
import { ConfigProvider, theme } from 'antd';
import { useAppSelector } from './redux/hooks';
import locale from 'antd/locale/tr_TR';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
dayjs.locale('tr-tr');
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import EkleKopyala from './pages/EkleKopyala';
import DonanımTipi from './pages/DonanımTipi';
import Sorgulama from './pages/Sorgulama';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import FiyatGirisi from './pages/FiyatGirisi';
import FiyatGüncelle from './pages/FiyatGuncelle';
import AracGirisi from './pages/AracGirisi';
import AdminPage from './pages/AdminPage';
import UserDashboard from './pages/UserDashboard';
import Donanım from './components/Donanım';
import FiyatTarihce from './components/FiyatTarihce';

const App = () => {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const isDarkMode = useAppSelector(state => state.theme.isDarkMode);

    return (
        <ConfigProvider locale={locale}
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                token: {},
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate to='/login' replace />}
                    />
                    <Route 
                        path='/login' 
                        element={<Login />} 
                    />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                    <Route path='/*' element={<MainLayout />}>
                    <Route path='adminpage' element={<AdminPage />} />
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='user-dashboard' element={<UserDashboard />} />
                        <Route path='fiyat-tarihce' element={<FiyatTarihce />} />
                        <Route path='arac-girisi' element={<AracGirisi />} />
                        <Route path='donanim' element={<Donanım copyChecked={true} />} />
                        <Route path='fiyat-girisi' element={<FiyatGirisi />} />
                        <Route path='ekle-kopyala' element={<EkleKopyala />} />
                        <Route path='fiyat-guncelle' element={<FiyatGüncelle />}/>
                        <Route path='donanım-tipi' element={<DonanımTipi />} />
                        <Route path='sorgulama' element={<Sorgulama />} />
                        <Route path='dashboard' element={<Dashboard />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;