import  { useState } from 'react';
import { Collapse, Form, Row, Col, DatePicker, Input, Checkbox, Button, Table } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface FiyatTarihceProps {
    rowData?: any;
    setCopyChecked?: boolean;
  }

const FiyatTarihce: React.FC<FiyatTarihceProps> = ({ }) => {
    const [,setModalVisible] = useState(true);
    const [modalStockInputsVisible, setModalStockInputsVisible] = useState(false);
    const [modalTescilChecked, setModalTescilChecked] = useState(false);
    const [selectedStock, setSelectedStock] = useState<boolean>(false); 
    const [stockColumnsVisible, setStockColumnsVisible] = useState<boolean>(false);
    const [, setShowAdditionalColumns] = useState(false);


    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleModalStockCheckboxChange = (e: CheckboxChangeEvent) => {
        setModalStockInputsVisible(e.target.checked);
    };

    const handleModalTescilCheckboxChange = (e: CheckboxChangeEvent) => {
        setModalTescilChecked(e.target.checked);
    };

    const handleStockCheckboxChange = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked;
        setSelectedStock(checked);
        setStockColumnsVisible(checked);
        setShowAdditionalColumns(false); // Ekstra sütunlar her zaman kapatılsın
    };
    

    const baseColumns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Giriş Tarihi',
            dataIndex: 'entryDate',
            key: 'entryDate',
        },
        {
            title: 'Marka',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Yayın Tarihi',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        },
        {
            title: 'Kur',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Liste TRL',
            dataIndex: 'listTRL',
            key: 'listTRL',
        },
        {
            title: 'Kamp. TRL',
            dataIndex: 'campTRL',
            key: 'campTRL',
        },
        {
            title: 'Liste EUR',
            dataIndex: 'listEUR',
            key: 'listEUR',
        },
        {
            title: (
                <Checkbox
                checked={selectedStock}
                onChange={handleStockCheckboxChange}
            >
                {selectedStock ? 'Stok Liste TRL' : 'Stok'}
            </Checkbox>
            ),
            dataIndex: 'stock',
            key: 'stock',
            render: (text: string) => (stockColumnsVisible ? text : ''),
        },
    ];
    const additionalColumns = stockColumnsVisible? [
        {
            title: 'Stok Kampanya TRL',
            dataIndex: 'modalStokKampanya',
            key: 'modalStokKampanya',
        },
        {
            title: 'Stok Liste EUR',
            dataIndex: 'modalStokListeEur',
            key: 'modalStokListeEur',
        },
    ]: [];

const columns = [...baseColumns, ...additionalColumns];


    const dataSource = [
        {
            key: '1',
            no: '1',
            entryDate: '01/07/2024',
            brand: 'Toyota',
            releaseDate: '05/07/2024',
            currency: 'TRL',
            listTRL: '100000',
            campTRL: '95000',
            listEUR: '12000',
            registration: '0',
            stock: '0',
            GeçenAy: '0',
            modalStokListeEur: '0',
        },
        {
            key: '2',
            no: '2',
            entryDate: '02/07/2024',
            brand: 'Honda',
            releaseDate: '06/07/2024',
            currency: 'TRL',
            listTRL: '95000',
            campTRL: '90000',
            listEUR: '11500',
            registration: '0',
            stock: '0',
            modalStokKampanya: '0',
            modalStokListeEur: '0',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Collapse defaultActiveKey={['0']}>
                <Collapse.Panel
                    header="Fiyat Girişi İçin Tıklayınız"
                    key="1"
                    style={{ border: '1px solid #e9e9e9', borderRadius: '4px', marginTop: 1 }}
                >
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="Giriş Tarihi">
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="Giriş Tarihi Seçin" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Yayın Tarihi">
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="Yayın Tarihi Seçin" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Kur">
                                    <Input placeholder="Kur girin" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Kur">
                                    <Input placeholder="Kur girin" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={2}>
                                <Form.Item label="Stok Arabaları">
                                    <Checkbox checked={modalStockInputsVisible} onChange={handleModalStockCheckboxChange} style={{float:'left'}} />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item label="Tescil">
                                    <Checkbox checked={modalTescilChecked} onChange={handleModalTescilCheckboxChange} style={{float:'left'}}/>
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item label="Liste TRL">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item label="Kamp. TRL">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item label="Liste EURO">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Tescil TRL" style={{ display: modalTescilChecked ? 'block' : 'none' }}>
                                    <Input placeholder="Tescil TRL" />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Stok Liste TRL" style={{ display: modalStockInputsVisible ? 'block' : 'none' }}>
                                    <Input placeholder="Stok Liste TRL" />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Stok Kmp. TRL" style={{ display: modalStockInputsVisible ? 'block' : 'none' }}>
                                    <Input placeholder="Stok Kmp. TRL" />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item label="Stok Liste EUR" style={{ display: modalStockInputsVisible ? 'block' : 'none' }}>
                                    <Input placeholder="Stok Liste EUR" />
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item style={{ textAlign: 'right' }}>
                                    <Button type="primary" onClick={handleModalClose} style={{ background: '#ea3f20', marginTop: '28px' }}>
                                        Ekle
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Collapse.Panel>
            </Collapse>

            {/* Tablo */}
            <div style={{ marginTop: '20px' }}>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        </div>
    );
};

export default FiyatTarihce;
