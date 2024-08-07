import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Layout } from 'antd';
import logo from '../assets/logo.png';
import '../components/Login.css';

const { Content } = Layout;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        const { email, password } = values;
        const correctEmail = 'cardata@d1-tech.com';
        const correctPassword = 'Aa123456';

        if (email === correctEmail && password === correctPassword) {
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');
            }, 1000);
        } else {
            setLoading(false);
            alert('E-posta veya parola hatalı. Tekrar deneyin.');
        }
    };

    /**
    const onFinish = async (values: any) => {
    setLoading(true);
    const { email, password } = values;

    try {
      const response = await axios.post('https://yourapiurl/api/auth/login', {
        username: email,
        password: password
      });
      
      localStorage.setItem('token', response.data.token);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      alert('Email or password is incorrect. Please try again.');
    }
  };
   */

    return (
        <Layout className='login-layout'>
            <Content className='login-content'>
                <div className='login-form-container'>
                    <div className='logo-container'>
                        <img src={logo} alt='Logo' className='logo' />
                    </div>
                    <Form
                        name='login-form'
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        className='login-form'
                    >
                        <Form.Item
                            name='email'
                            rules={[
                                { required: true, message: 'E-posta giriniz.' },
                            ]}
                        >
                            <Input
                                style={{
                                    backgroundColor: '#17213a',
                                    color: 'white',
                                }}
                                placeholder='E-posta'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[
                                { required: true, message: 'Parola giriniz.!' },
                            ]}
                        >
                            <Input.Password
                                style={{
                                    backgroundColor: '#17213a',
                                    color: 'white',
                                }}
                                placeholder='Parola'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={loading}
                                className='login-form-button'
                            >
                                Giriş Yap
                            </Button>
                        </Form.Item>
                        <Form.Item className='login-form-forgot'>
                            <a href='/forgot-password'>Şifremi Unuttum</a>
                        </Form.Item>
                        <Form.Item></Form.Item>
                        <div className='login-footer'>
                            CARDATA ©2024 Created by D1-Tech
                        </div>
                    </Form>
                </div>
                <div className='image-container' />
            </Content>
        </Layout>
    );
};

export default Login;
