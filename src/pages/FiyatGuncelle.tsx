import React, { useState } from 'react';
import { Select, Row, Col, Button, Drawer, Checkbox, Table } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Option } = Select;

const FiyatGüncelle = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
  const [selectedSubModel, setSelectedSubModel] = useState<string | undefined>(undefined);
  const [selectedHardware, setSelectedHardware] = useState<string | undefined>(undefined);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'No': true, // 'No' initially false to exclude from allChecked toggle
    'SuperCode': true,
    'Baş. Tarihi': true,
    'Emisyon': true,
    'Koltuk': true,
    'Vites': true,
    'Kasa': true,
    'Model': true,
    'AltModel': true,
    'Tip': true,
    'Donanim Tipi': true,
    'BG': true,
    'CCM': true,
    'Şanzıman Tipi': true,
    'Kapı': true,
    'Son Fiyat': true,
    'Güncel Fiyat': true,
  });
  const [allChecked, setAllChecked] = useState(true);

  const brands = ['LEXUS', 'LINCOLN', 'LOTUS', 'LYNK&CO', 'MAHINDRA', 'MASERATI', 'MAXUS', 'MAZDA', 'MERCEDES-BENZ', 'MERCURY'];
  const models = ['Hepsi', 'Continental', 'Mark', 'MKS', 'MKT', 'Navigator', 'Town Car'];
  const subModels = ['Hepsi', '2012-2016 // Sedan'];
  const hardwares = ['Hepsi', 'GT', 'S', 'Standart'];

  const checkboxes = [
    'No', 'SuperCode', 'Baş. Tarihi', 'Emisyon', 'Koltuk', 'Vites', 'Kasa', 'Model', 'AltModel', 'Tip', 
    'Donanim Tipi', 'BG', 'CCM', 'Şanzıman Tipi', 'Kapı', 'Son Fiyat', 'Güncel Fiyat', 
  ];

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedModel(undefined);
    setSelectedSubModel(undefined);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setSelectedSubModel(undefined);
  };

  const handleSubModelChange = (value: string) => {
    setSelectedSubModel(value);
  };

  const handleHardwareChange = (value: string) => {
    setSelectedHardware(value);
  };

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, checked } = target;
    setCheckedItems({
      ...checkedItems,
      [name]: checked,
    });
  };

  const handleCheckAllChange = () => {
    const newCheckedItems = checkboxes.reduce((acc, checkbox) => {
      acc[checkbox] = !allChecked;
      return acc;
    }, {} as { [key: string]: boolean });
    setCheckedItems(newCheckedItems);
    setAllChecked(!allChecked);
  };

  const handleConfirm = () => {
    console.log('Seçilen onay kutuları:', checkedItems);
    setDrawerVisible(false);
  };

  // Tablo kolonlarını oluşturmak için fonksiyon
  const getColumns = () => {
    return Object.keys(checkedItems).filter(key => checkedItems[key]).map(key => ({
      title: key,
      dataIndex: key,
      key: key,
    }));
  };

  // Örnek tablo verisi
  const data = [
    {
      'No': '1',
      'SuperCode': '2012313214',
      'Baş. Tarihi': '25.06.2024',
      'Emisyon': 2020,
      'Koltuk': 2024,
      'Vites': 6,
      // Diğer veri alanları...
    },
    // Diğer veri satırları...
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Opsiyonel Donanım Fiyat Güncelleme</h1>
      <Row gutter={16} style={{ marginBottom: '15px '}}>
        <Col span={4}>
          <label style={{ display: 'block', textAlign: 'left' }}>Marka</label>
        </Col>
        <Col span={20}>
          <Select
            showSearch
            style={{ width: '100%', textAlign: 'left' }}
            placeholder="Marka seçin"
            optionFilterProp="children"
            onChange={handleBrandChange}
            value={selectedBrand}

          >
            {brands.map((brand) => (
              <Option key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '15px '}}>
        <Col span={4}>
          <label style={{ display: 'block', textAlign: 'left' }}>Model</label>
        </Col>
        <Col span={20}>
          <Select
            showSearch
            style={{ width: '100%', textAlign: 'left' }}
            placeholder="Model seçin"
            optionFilterProp="children"
            onChange={handleModelChange}
            value={selectedModel}
            disabled={!selectedBrand}
          >
            {models.map((model) => (
              <Option key={model} value={model}>
                {model}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '15px '}}>
        <Col span={4}>
          <label style={{ display: 'block', textAlign: 'left' }}>Alt Model</label>
        </Col>
        <Col span={20}>
        <Select
            showSearch
            style={{ width: '100%', textAlign: 'left'}}
            placeholder="Alt Model seçin"
            optionFilterProp="children"
            onChange={handleSubModelChange}
            value={selectedSubModel}
            disabled={!selectedModel}
          >
            {subModels.map((subModel) => (
              <Option key={subModel} value={subModel}>
                {subModel}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '15px '}}>
        <Col span={4}>
          <label style={{ display: 'block', textAlign: 'left' }}>Donanım</label>
        </Col>
        <Col span={20}>
        <Select
            showSearch
            style={{ width: '100%', textAlign: 'left'}}
            placeholder="Donanım seçin"
            optionFilterProp="children"
            onChange={handleHardwareChange}
            value={selectedHardware}
          >
            {hardwares.map((hardware) => (
              <Option key={hardware} value={hardware}>
                {hardware}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '15px '}}>
        <Col span={4}>

        </Col>

        <Col span={20}>
          <div style={{ textAlign: 'left', float:'right'}}>
          <Button
              type="primary"
              onClick={handleDrawerOpen}
              style={{ backgroundColor: '#ea3f20', borderColor: '#555555' }}
            >
              Tablo Başlıkları
            </Button>
            <Button
              type="primary"
              //onClick={handleDrawerOpen}
              style={{ backgroundColor: '#ea3f20', borderColor: '#555555', marginLeft:'20px' }}
            >
              Listele
            </Button>
          </div>
        </Col>
      </Row>
      <Drawer
        title="Opsiyonel Donanım Fiyat Tablosu"
        placement="right"
        onClose={handleDrawerClose}
        visible={drawerVisible}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleConfirm} type="primary" style={{ backgroundColor: '#ea3f20', borderColor: '#555555' }}>
              Onayla
            </Button>
          </div>
        }>
        <Checkbox onChange={handleCheckAllChange} checked={allChecked}>
          Hepsini Seç/Kapat
        </Checkbox>
        <br />
        {checkboxes.map((checkbox) => (
          <React.Fragment key={checkbox}>
            <Checkbox
              name={checkbox}
              onChange={handleCheckboxChange}
              checked={checkedItems[checkbox] || false}
            >
              {checkbox}
            </Checkbox>
            <br />
          </React.Fragment>
        ))}
      </Drawer>
      <h2 style={{textAlign:'left', marginTop:'20px'}}>Opsiyonel Donanım Fiyat Tablosu</h2>
      <Table style={{marginTop: '20px'}} columns={getColumns()} dataSource={data} scroll={{x: 'max-content' }} />
    </div>
  );
};

export default FiyatGüncelle;