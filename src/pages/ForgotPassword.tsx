import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Layout } from 'antd';
import logo from '../assets/logo.png';
import '../components/ForgotPassword.css';

const { Content } = Layout;

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        const { email } = values;

        // Simulate password reset process
        setTimeout(() => {
            setLoading(false);
            alert(`Parola yenileme bağlantısı ${email}'a gönderildi.`);
            navigate('/login');
        }, 1000);
    };

    return (
        <Layout className='forgot-password-layout'>
            <Content className='forgot-password-content'>
                <div className='forgot-password-form-container'>
                    <div className='logo-container'>
                        <img src={logo} alt='Logo' className='logo' />
                    </div>
                    <Form
                        name='forgot-password-form'
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        className='forgot-password-form'
                    >
                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    backgroundColor: '#17213a',
                                    color: '#ffffff',
                                }}
                                className='custom-input'
                                placeholder='Email'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={loading}
                                className='forgot-password-form-button'
                            >
                                Gönder
                            </Button>
                            <Form.Item className='login-form-forgot'>
                                <a
                                    style={{
                                        marginTop: 30,
                                        color: '#ffff',
                                        textAlign: 'left',
                                    }}
                                    href='/login'
                                >
                                    Geri Dön
                                </a>
                            </Form.Item>
                        </Form.Item>
                        <div className='forgot-password-footer'>
                            CARDATA ©2024 Created by D1-Tech
                        </div>
                    </Form>
                </div>
                <div className='image-container' />
            </Content>
        </Layout>
    );
};

export default ForgotPassword;
