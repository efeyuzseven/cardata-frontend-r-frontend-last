
import React, { useState, useEffect } from 'react';
import { Card, Checkbox, DatePicker, Input, Button, AutoComplete, Row, Col, Typography, Select, Table } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { EditOutlined, DeleteOutlined, DollarOutlined, } from '@ant-design/icons';

import '../styles.css';

const { Text } = Typography;
const { Option } = Select;

const Donanım: React.FC<{ copyChecked: boolean }> = ({ copyChecked }) => {
  const [hardwareChecked, setHardwareChecked] = useState(true);
  const [packageChecked, setPackageChecked] = useState(false);
  const [standardChecked, setStandardChecked] = useState(true);
  const [optionalChecked, setOptionalChecked] = useState(false);
  const [showHardwareCategory, setShowHardwareCategory] = useState(false);
  const [showPackageBrand, setShowPackageBrand] = useState(false);
  const [copyCheckedState, setCopyChecked] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('');
  const [selectedHardware, setSelectedHardware] = useState<string[]>([]);
  const [selectedPacket, setSelectedPacket] = useState<string[]>([]);
  

  useEffect(() => {
    setCopyChecked(copyChecked);
  }, [copyChecked]);

  const handleHardwareChange = (e: CheckboxChangeEvent) => {
    setHardwareChecked(e.target.checked);
    setPackageChecked(!e.target.checked);
    setShowPackageBrand(false);
  };

  const handlePackageChange = (e: CheckboxChangeEvent) => {
    setPackageChecked(e.target.checked);
    setHardwareChecked(!e.target.checked);
    setShowHardwareCategory(false);
  };

  const handleStandardChange = (e: CheckboxChangeEvent) => {
    setStandardChecked(e.target.checked);
    setOptionalChecked(!e.target.checked);
  };

  const handleOptionalChange = (e: CheckboxChangeEvent) => {
    setOptionalChecked(e.target.checked);
    setStandardChecked(!e.target.checked);
  };

  const handleHardwareButtonClick = () => {
    setShowHardwareCategory(true);
  };

  const handlePackageButtonClick = () => {
    setShowPackageBrand(true);
  };

  const handleHardwareSelectButtonClick = () => {
    setShowHardwareCategory(false);
  };

  const handlePackageSelectButtonClick = () => {
    setShowPackageBrand(false);
  };

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setVehicleTypeFilter(value);
    setSelectedRows([]);
  };

  const handleCheckboxChange = (selectedRowKey: string) => {
    // Toggle selection
    const newSelectedRows = selectedRows.includes(selectedRowKey)
      ? selectedRows.filter(key => key !== selectedRowKey)
      : [...selectedRows, selectedRowKey];
    setSelectedRows(newSelectedRows);
  };

    const handleHardwareSelect = (value: string[]) => {
      setSelectedHardware(value);
  };
  const handlePacketSelect = (value: string[]) => {
    setSelectedPacket(value);
};
  const Category = ['KATEGORİ', '1 DIŞ DONANIM', '2 GÜVENLİK', '3 İÇ DONANIM', '4 BİLGİ SİSTEMİ', '5 KONFOR'];
  const Hardware = ['Donanım 1', 'Donanım 2', 'Donanım 3'];
  const Brands = ['LEXUS', 'LINCOLN', 'LOTUS', 'LYNK&CO', 'MAHINDRA', 'MASERATI', 'MAXUS', 'MAZDA', 'MERCEDES-BENZ', 'MERCURY'];
  const Packet = ['Paket', 'Luxury', 'Eksta Güvenlik', 'Stil Paket', 'Premium'];
  const Types  = ['Opsiyonel', 'Standart'];

  const data = [
    { key: '1', type:'Opsiyonel', price: '250 EUR', actions: '', features: '360 Derece Kamera Sistemi', startDate: '2024-07-16', endDate: '2024-07-31', category: 'GÜVENLİK' },
    { key: '2', type:'Standart', price: '', actions: '', features: 'ABS (Anti Bloke Fren Sistemi)', startDate: '2024-08-01', endDate: '2024-08-15', category: 'BİLGİ SİSTEMİ' },
    { key: '3', type:'Opsiyonel', price: '100 EUR', actions: '', features: 'Adaptif Hız Sabitleyici', startDate: '2024-07-16', endDate: '2024-07-31', category: 'GÜVENLİK' },
    { key: '4', type:'Standart', price: '', actions: '', features: 'Otomatik Klima', startDate: '2024-08-01', endDate: '2024-08-15', category: 'KONFOR' },
    { key: '5', type:'Standart', price: '', actions: '', features: 'ESP (Elektronik Stabilite Programı)', startDate: '2024-08-01', endDate: '2024-08-15', category: 'KONFOR' },
    { key: '6', type:'Standart', price: '', actions: '', features: 'Otomatik Klima (Automatic Climate Control)', startDate: '2024-08-01', endDate: '2024-08-15', category: 'GÜVENLİK' },
    { key: '7', type:'Opsiyonel', price: '1500 TRL', actions: '', features: 'Harman Kardon Ses Sistemi', startDate: '2024-08-01', endDate: '2024-08-15', category: 'İÇ DONANIM' },
  ];

  
  const filteredData = data.filter(item => 
    item.features.toLowerCase().includes(filterInput.toLowerCase()) &&
    (vehicleTypeFilter === '' || item.type === vehicleTypeFilter)
  );


  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
          checked={selectedRows.length === data.length}
          onChange={() =>
            selectedRows.length === data.length ? setSelectedRows([]) : setSelectedRows(data.map(item => item.key))
          }
        />
      ),
      dataIndex: 'select',
      render: (text: any, record: any) => (
        <Checkbox
          onChange={() => handleCheckboxChange(record.key)}
          checked={selectedRows.includes(record.key)}
        />
      ),
    },
    {
      title: 'Araç Tipi',
      dataIndex: 'type',
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      
    },
    {
      title: 'İşlemler',
      dataIndex: 'actions',
      render: (text: any, record: any) => (
        <>
          <Button
                        style={{ background: '#0c6c24', marginRight: 8,width:25, height:25 }}
                        type='primary'
                        icon={<EditOutlined />}
                        //onClick={() => ()}
                    />
          <Button
                        style={{ background: '#ea3f20', width:25,marginRight: 8, height:25}}
                        type='primary'
                        danger
                        icon={<DeleteOutlined />}
                        //onClick={() => ()}
                    />
          <Button
                        style={{ background: 'blue', marginRight: 8, width: 25, height: 25 }}
                        type="primary"
                        icon={<DollarOutlined />}
                        //onClick={() => ()}
                    />          
          </>
      
      ),
    },
    {
      title: <Input  value={filterInput} onChange={handleFilterInputChange} placeholder="Özellikleri Filtrele"/>,
      dataIndex: 'features',
    },
    {
      title: 'Başlangıç Tarihi',
      dataIndex: 'startDate',
    },
    {
      title: 'Bitiş Tarihi',
      dataIndex: 'endDate',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
    },
  ];

  
  return (
    <div style={{ padding: 16, overflow:'auto'}}>
      <Row gutter={16}>
        <Col span={15} style={{maxHeight:'110px'}}>
        <Card title="Donanım Bilgileri">
          <Checkbox checked={hardwareChecked} onChange={handleHardwareChange}>
            Donanım
          </Checkbox>
          {!showHardwareCategory && (
          <Button onClick={handleHardwareButtonClick} disabled={!hardwareChecked} style={{ marginLeft: 8 }}>
            Donanım Ekle
          </Button>
          )}
          {showHardwareCategory && (
          <Button onClick={handleHardwareSelectButtonClick} disabled={!hardwareChecked} style={{ marginLeft: 8 }}>
            Donanım Seç
          </Button>
          )}
          <Checkbox checked={packageChecked} onChange={handlePackageChange} style={{ marginLeft: 16 }}>
            Paket
          </Checkbox>
          {!showPackageBrand && (
          <Button onClick={handlePackageButtonClick} disabled={!packageChecked} style={{ marginLeft: 8 }}>
            Paket Ekle
          </Button>)}
          {showPackageBrand && (
          <Button onClick={handlePackageSelectButtonClick} disabled={!packageChecked} style={{ marginLeft: 8 }}>
            Paket Seç
          </Button>)}          
          <br />
          <br />
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <label>Başlangıç Tarih:</label>
            </Col>
            <Col span={12}>
              <DatePicker style={{ width: '100%' }} />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <label>Bitiş Tarih:</label>
            </Col>
            <Col span={12}>
              <DatePicker style={{ width: '100%' }} />
            </Col>
          </Row>
          
          {hardwareChecked && (           
            <Row gutter={16} style={{ marginBottom: 16 }}> 
              <Col span={12} style={{ marginBottom: 16 }}>
                <label>Kategori:</label>
              </Col>
              <Col span={12} style={{ marginBottom: 16 }}>
                <Select showSearch style={{ width: '100%' }} placeholder={'Kategori seçin'}>
                {Category.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
                </Select>
              </Col>
              <Col span={12}>
                <label>Donanım:</label>
              </Col>
              
              <Col span={12}>
            {!showHardwareCategory && (
              <Select onChange={handleHardwareSelect} style={{ width: '100%' }} placeholder={'Donanım Seçin'}>
                  {Hardware.map((hardware) => (
                  <Option key={hardware} value={hardware}>
                      {hardware}
                  </Option>
                ))} 
                </Select>)}
            {showHardwareCategory && (
                  <Input style={{ width: '100%' }} placeholder='Yeni donanım girin'/>
            )}
              </Col>
            </Row>
          )}
          
          {packageChecked && (
            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <label>Marka:</label>
              </Col>
              <Col span={12}>
              <Select showSearch style={{ width: '100%' , marginBottom: 16}} placeholder={'Marka seçin'}>
                {Brands.map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
                </Select>
              </Col>
              <Col span={12}>
                <label>Paket:</label>
              </Col>
              <Col span={12}>
              {!showPackageBrand && (
                <Select 
                onChange={handlePacketSelect} 
                optionFilterProp="children" 
                filterOption={(input, option) =>
                  option && option.children ? option.children.toString().toLowerCase().includes(input.toLowerCase()) : false
                }
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: '100%' }} 
                placeholder={'Paket Seçin'}>
                {Packet.map((packet) => (
                  <Option key={packet} value={packet}>
                      {packet}
                  </Option>
                ))}  
                </Select>
              )}
              {showPackageBrand && (
                <Input style={{ width: '100%' }} placeholder='Yeni paket girin' />
              )}
              </Col>
            </Row>
          )}
          <Checkbox checked={standardChecked} onChange={handleStandardChange}>
            Standart
          </Checkbox>
          <Checkbox checked={optionalChecked} onChange={handleOptionalChange}>
            Opsiyonel
          </Checkbox>
          <br />
          {optionalChecked && (
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <label>Fiyat:</label>
              </Col>
              <Col span={12}>
                <Input style={{ width: '100%' }} />
              </Col>
            </Row>
          )}
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={24} style={{ textAlign: 'left' }}>
              <Button type="primary">Kaydet</Button>
            </Col>
            <Col span={24} style={{ textAlign: 'right', marginTop: 16}}>
            {copyChecked && (
              <Button type="default" style={{ marginLeft: 8 }}>Seçili Kayıtları Kopyala</Button>
            )}
              <Button type="default" style={{ marginLeft: 8 }}>Seçili Kayıtları Sil</Button>
              <Button type="default" style={{ marginLeft: 8 }}>Excel'e Aktar</Button>
            </Col>
          </Row>
        </Card>
        </Col>
        <Col span={9}>
          <Card title="Araç Bilgileri">
            <Row gutter={6} style={{ padding: 16 , minHeight:'110px'}}>
              <Col span={6}></Col>
              <Col span={6}>
                <Text strong>Marka:</Text>
              </Col>
              <Col span={6}>
                <Text>ALFA ROMEO</Text>
              </Col>
              <Col span={6}></Col>
            </Row>
            <Row gutter={6} style={{ padding: 16 }}>
              <Col span={6}></Col>
              <Col span={6}>
                <Text strong>Model:</Text>
              </Col>
              <Col span={6}>
                <Text>Giulia</Text>
              </Col>
              <Col span={6}></Col>
            </Row>
            <Row gutter={6} style={{ padding: 16 }}>
              <Col span={6}></Col>
              <Col span={6}>
                <Text strong>Alt Model:</Text>
              </Col>
              <Col span={6}>
                <Text>Sedan</Text>
              </Col>
              <Col span={6}></Col>
            </Row>
            <Row gutter={6} style={{ padding: 16 }}>
              <Col span={6}></Col>
              <Col span={6}>
                <Text strong>Tip:</Text>
              </Col>
              <Col span={6}>
                <Text>2.9 V6 BiTurbo Quadrifoglio Verde Otomatik</Text>
              </Col>
              <Col span={6}></Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '100px' }}>
        <Col span={24}>
           <Card title="Donanım Tablosu" style={{ textAlign: 'left' }} extra={
              <Select placeholder={'Araç Tipi Seçin'} style={{ width: 150, marginBottom: 16, marginTop:'15px'  }} onChange={handleFilterChange}>
              {Types.map((types) => (
                  <Option key={types} value={types}>
                      {types}
                  </Option>
                ))} 
            </Select>
           }
                      >
            
            <Table columns={columns} dataSource={filteredData} pagination={false} style={{ maxHeight: '500px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Donanım;
