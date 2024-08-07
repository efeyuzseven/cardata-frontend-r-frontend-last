
import React, { useState } from 'react';
import { Card, Checkbox, Input, Button, Row, Col, Typography, Space, Modal } from 'antd';
import '../styles.css';
import DonanımEkleme from '../components/Donanım';
import { ToolOutlined} from '@ant-design/icons';



const EkleKopyala: React.FC = () => {
       const initialData = {
        marka: '',
        model: '',
        altModel: '',
        tip: '',
        donanim: '',
        sanziman: '',
    };

    const [copy, setCopy] = useState<'canCopy' | 'cantCopy'>('cantCopy');
    const [supercode1, setSupercode1] = useState('');
    const [supercode2, setSupercode2] = useState('');
    const [supercode1Data, setSupercode1Data] = useState(initialData);
    const [supercode2Data, setSupercode2Data] = useState(initialData);
    const [selectedFields, setSelectedFields] = useState<Set<keyof typeof initialData>>(new Set());
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSupercode1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSupercode1(value);
        if (value === 'ABC123') {
            setSupercode1Data({
                marka: 'BMW',
                model: 'X5',
                altModel: '2019-2022 // Coupe',
                tip: 'Standart',
                donanim: 'Full',
                sanziman: 'Otomatik',
            });
        } else {
            setSupercode1Data(initialData);
        }
    };

    const handleSupercode2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSupercode2(e.target.value);
    };

    const handleCheckboxChange = (field: keyof typeof initialData) => {
        setSelectedFields(prevSelectedFields => {
            const updatedSelectedFields = new Set(prevSelectedFields);
            if (updatedSelectedFields.has(field)) {
                updatedSelectedFields.delete(field);
            } else {
                updatedSelectedFields.add(field);
            }
            return updatedSelectedFields;
        });
    };

    const handleCopy = () => {
        setSupercode2Data(prevData => {
            const updatedData = { ...prevData };
            selectedFields.forEach(field => {
                updatedData[field] = supercode1Data[field];
            });
            return updatedData;
        });
        setIsModalVisible(true);
    };

    const handleCanCopy = () => {
        setIsModalVisible(true);
        setCopy('canCopy')
    }

    const handleCantCopy = () => {
        setIsModalVisible(true);
        setCopy('cantCopy')
    }

    const handleClear = () => {
        setSupercode2('');
        setSupercode2Data(initialData);
        setSelectedFields(new Set());
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{ padding: '20px', overflow:'auto'}}>
            <h1 style={{ textAlign: 'left', }}>Donanım / Kopyala</h1>
            <Card style={{ width: '50%', margin: '0 auto', padding: '20px' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ padding: '10px', textAlign: 'left' }}>
                        <label>Supercode - 1</label>
                        <Input value={supercode1} onChange={handleSupercode1Change} />
                    </div>
                    <div style={{ padding: '10px', textAlign: 'left' }}>
                        <label>Supercode - 2</label>
                        <Input value={supercode2} onChange={handleSupercode2Change} />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleCopy} type="primary" style={{ marginRight: 10,backgroundColor:'#ea3f20' }}>Kopyala</Button>
                        <Button onClick={handleClear} type="default">Temizle</Button>
                    </div>
                </Space>
            </Card>
            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col style={{ textAlign: 'left'}} span={12}>
                    <Card title={<span>Supercode 1 - Araç Bilgileri <Button onClick={handleCanCopy} type="primary" style={{ marginRight: 10 , float:'right',backgroundColor:'#ea3f20' }} icon={<ToolOutlined />}></Button> </span>} bordered={false}>
                        {Object.keys(supercode1Data).map(key => (
                            <div key={key} style={{ marginBottom: '20px' }}>
                                <Checkbox
                                    checked={selectedFields.has(key as keyof typeof initialData)}
                                    onChange={() => handleCheckboxChange(key as keyof typeof initialData)}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}: {supercode1Data[key as keyof typeof supercode1Data]}
                                </Checkbox>
                            </div>
                        ))}
                    </Card>
                </Col>
                <Col style={{ textAlign: 'left' }} span={12}>
                    <Card title={<span>Supercode 2 - Araç Bilgileri <Button onClick={handleCantCopy} type="primary" style={{ marginRight: 10 , float:'right', backgroundColor:'#ea3f20' }} icon={<ToolOutlined />}></Button></span>} bordered={false}>
                        {Object.keys(supercode2Data).map(key => (
                            <div key={key} style={{ marginBottom: '20px' }}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}: {supercode2Data[key as keyof typeof supercode2Data]}
                            </div>
                        ))}
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Donanım Ekleme"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width="80%"
                style={{ top: 0 , overflow:'auto'}}
                
            >
                {copy === 'canCopy' && <DonanımEkleme copyChecked={true} />}
                {copy === 'cantCopy' && <DonanımEkleme copyChecked={false} />}
            </Modal>
        </div>
    );
};

export default EkleKopyala;
