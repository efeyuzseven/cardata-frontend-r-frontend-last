

import React, { useState } from 'react';
import { Select, DatePicker, Input, Row, Col, Button, Drawer, Checkbox, Table, Modal } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import * as XLSX from 'xlsx';
import {
  DeleteOutlined,
  EditOutlined,
  ToolOutlined,
  CopyOutlined,
  PlusOutlined
} from '@ant-design/icons';
import AracGirisi from './AracGirisi'; // AracGirisi sayfasını içe aktarın
import DonanımEkleme from '../components/Donanım'
import DonanımCopy from './EkleKopyala'

const { Option } = Select;
const { RangePicker } = DatePicker;

const Sorgulama: React.FC = () => {
  const [selectedcarType, setSelectedcarType] = useState<string | undefined>(undefined);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
  const [selectedSubModel, setSelectedSubModel] = useState<string | undefined>(undefined);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'Liste TRL': true,
  });
  const [allChecked, setAllChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editDonanımVisible, setEditDonanımVisible] = useState(false);

  const [editDonanımCopyVisible, setEditDonanımCopyVisible] = useState(false);

  const [tableData, setTableData] = useState([
    {
      key: '1',
      'Resim': 'Resim 1',
      'Marka No': '001',
      'Marka': 'Mercedes-Benz',
      'Model No': '002',
      'Model': 'GLC',
      'Alt Model No': '003',
      'Alt Model': '2018-2021 // SUV',
      'S-Alt Model': 'SUV',
      'G-Alt Model': '2018-2021',
      'AltModel Baş Yılı': 2018,
      'AltModel Bit Yılı': 2021,
      'Supercode': 'ABC123',
      'FaceLift': 'Var',
      'Kullanım Tipi': 'Otomobil',
      'G.Tip': 'Benzin',
      'C.Tip': 'Manuel',
      'Tip': 'Standart',
    },
  ]);

  const brands = ['LEXUS', 'LINCOLN', 'LOTUS', 'LYNK&CO', 'MAHINDRA', 'MASERATI', 'MAXUS', 'MAZDA', 'MERCEDES-BENZ', 'MERCURY'];
  const models = ['Hepsi', 'Continental', 'Mark', 'MKS', 'MKT', 'Navigator', 'Town Car'];
  const subModels = ['Hepsi', '2012-2016 // Sedan'];
  const carType = ['Binek', 'Hafif Ticari', 'SUV'];
  const checkboxes = [
    'Donanım Tipi', 'Şanzıman Tipi', 'Satış Başlangıç Yılı', 'Satış Bitiş Yılı', 'Satış Başlangıç Tarihi',
    'Satış Bitiş Tarihi', 'CCM', 'HP', 'KW', 'Beygir Gücü', 'Kasa', 'Kapı Sayısı', 'Koltuk Sayısı',
    'Euro Norm Sınıfı', 'WLTP CO2', 'Segment', 'Segment ODD', 'Segment ODD No', 'Vites Tipi', 'Vites Kademe',
    'Boş Ağırlık', 'Yük Ağırlık', 'Toplam Ağırlık', 'Dingil Mesafesi', 'Motor Tipi', 'Silindir Yerleşimi',
    'Silindir Sayısı', 'Lastik Ebatı', 'Uzunluk', 'Genişlik', 'Yükseklik', 'Azami Hız', '0-100 Hızlanma',
    'Tork', 'Şehir içi Yakıt Tüketim', 'Şehir Dışı Yakıt Tüketim', 'Karma Yakıt Tüketim', 'WLTP Düşük',
    'WLTP Orta', 'WLTP Yüksek', 'WLTP Çok Yüksek', 'Bagaj Hacmi', 'Yakıt Depo Hacmi', 'Aktarma Tipi', 'RPM1',
    'RPM2', 'Sahibinden Değer', 'KDL Marka', 'KDL Model 1', 'KDL Model 2', 'KDL Model 3', 'KDL Liste 1',
    'KDL Liste 2', 'KDL Liste 3', 'KDL Liste 4', 'Elektrik HP', 'Elektrik KW', 'Elektrik Menzil', 'Hızlı Şarj Süresi',
    'Akü Tipi', 'Akü Kapasitesi', 'Net Akü Kapasitesi', 'Elektrik Motor Sayısı', 'DC Şarj Hızı', 'AC Şarj Hızı',
    'Şarj Tipi', 'Kwh/100 km', 'Yaklaşma Açısı', 'Uzaklaşma Açısı', 'Rampa Açısı', 'Su Geçiş Derinliği',
    'Tırmanma Açısı', 'Yanal Eğim Açısı', 'Yerden Yükseklik', 'Ülke', 'Resim 1', 'Resim 2', 'Resim 3', 'Resim 4',
    'Liste TRL', 'Liste EUR', 'Kampanya TRL', 'Stok Liste TRL', 'Stok Liste EUR', 'Stok Kampanya TRL', 'Tur', 'Tescil'
  ];

  const defaultColumns = [
    'Resim', 'Marka No', 'Marka', 'Model No', 'Model', 'Alt Model No', 'Alt Model', 'S-Alt Model', 'G-Alt Model',
    'AltModel Baş Yılı', 'AltModel Bit Yılı', 'Supercode', 'FaceLift', 'Kullanım Tipi', 'G.Tip', 'C.Tip', 'Tip'
  ];


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCheckboxes = checkboxes.filter((checkbox) =>
    checkbox.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlecarTypeChange = (value: string) => {
    setSelectedcarType(value);
    setSelectedBrand(undefined);
    setSelectedModel(undefined);
    setSelectedSubModel(undefined);
  };

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

  const getColumns = () => {
    let columns = [
      {
        title: 'İşlemler',
        dataIndex: 'actions',
        key: 'actions',
        render: (_: any, record: any) => (
          <>
            <Button
              style={{ background: '#123575', marginRight: 5, width: 20, height: 20 }}
              type='primary'
              icon={<EditOutlined style={{ width: '85%' }} />}
              onClick={() => handleEdit()}
            />
            <Button
              style={{ background: '#123575', marginRight: 5, width: 20, height: 20 }}
              type='primary'
              icon={<ToolOutlined style={{ width: '85%' }} />}
              onClick={() => handleDonanımEdit()}
            />
            <Button
              style={{ background: '#123575', width: 20, marginRight: 5, height: 20 }}
              type='primary'
              icon={<CopyOutlined style={{ width: '85%' }} />}
              onClick={() => handleDonanımCopy()}
            />
            <Button
              style={{ background: '#123575', width: 20, marginRight: 5, height: 20 }}
              type='primary'
              icon={<PlusOutlined style={{ width: '85%' }} />}
            //onClick={() => handleDelete(record)}
            />
            <Button
              style={{ background: '#123575', width: 20, height: 20 }}
              type='primary'
              danger
              icon={<DeleteOutlined style={{ width: '85%' }} />}
              onClick={() => handleDelete(record)}
            />

          </>
        ),
      },
      ...defaultColumns.map(col => ({
        title: col,
        dataIndex: col,
        key: col,
      })),
    ];

    columns = columns.concat(
      Object.keys(checkedItems)
        .filter(key => checkedItems[key])
        .map(key => ({
          title: key,
          dataIndex: key,
          key: key,
        }))
    );

    return columns;
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleDonanımEdit = () => {
    setEditDonanımVisible(true);
  };

  const handleDonanımCopy = () => {
    setEditDonanımCopyVisible(true);
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: 'Satır Silinecek',
      content: 'Bu satırı silmek istediğinizden emin misiniz?',
      okButtonProps: { danger: true },
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: () => {
        setTableData(prevData => prevData.filter(item => item.key !== record.key));
      },

    });
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
  };

  const handleEditDonanımClose = () => {
    setEditDonanımVisible(false);
  };
  const handleEditDonanımCopyClose = () => {
    setEditDonanımCopyVisible(false);
  };
  const handlePrint = () => {
    const table = document.querySelector('.ant-table');
    if (table) {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <title>Teknik Data Tablosu</title>
              <style>
                body * {
                  visibility: hidden;
                }
                .ant-table, .ant-table * {
                  visibility: visible;
                }
                .ant-table {
                  position: absolute;
                  left: 0;
                  top: 0;
                }
              </style>
            </head>
            <body>
              ${table.outerHTML}
            </body>
          </html>
        `);
        doc.close();

        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } else {
        console.warn('iframe içinde belge oluşturulamadı.');
      }

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    } else {
      console.warn('Tablo öğesi bulunamadı.');
    }
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Teknik Data');
    XLSX.writeFile(workbook, 'teknik_data.xlsx');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Araç Sorgulama</h1>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <label style={{ display: 'block', textAlign: 'left' }}>Araç Tipi</label>
          <Select
            mode='multiple'
            showSearch
            style={{ width: '100%', height: '50px' }}
            placeholder='Araç Tipi'
            optionFilterProp='children'
            onChange={handlecarTypeChange}
            value={selectedcarType}
          >
            {carType.map(carType => (
              <Option key={carType} value={carType}>
                {carType}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <label style={{ display: 'block', textAlign: 'left' }}>Fiyat Ayları</label>

          <RangePicker style={{ width: '100%' }} />
        </Col>
        <Col span={8}>
          <label style={{ display: 'block', textAlign: 'left' }}>Supercode</label>
          <Input style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <label style={{ display: 'block', textAlign: 'left' }}>Marka</label>
          <Select
            mode="multiple"
            showSearch
            style={{ width: '100%', height: '50px' }}
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
        <Col span={8}>
          <label style={{ display: 'block', textAlign: 'left' }}>Model</label>
          <Select
            showSearch
            style={{ width: '100%', height: '50px' }}
            placeholder="Model seçin"
            optionFilterProp="children"
            onChange={handleModelChange}
            value={selectedModel}
          >
            {models.map((model) => (
              <Option key={model} value={model}>
                {model}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <label style={{ display: 'block', textAlign: 'left' }}>Alt Model</label>
          <Select
            showSearch
            style={{ width: '100%', height: '50px' }}
            placeholder="Alt Model seçin"
            optionFilterProp="children"
            onChange={handleSubModelChange}
            value={selectedSubModel}
          >
            {subModels.map((subModel) => (
              <Option key={subModel} value={subModel}>
                {subModel}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Button
          type="primary"
          onClick={handleDrawerOpen}
          style={{ backgroundColor: '#ea3f20', borderColor: '#555555' }}
        >
          Teknik Data
        </Button>
      </div>
      <Drawer
        title="TEKNİK DATA"
        placement="right"
        onClose={handleDrawerClose}
        visible={drawerVisible}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleConfirm} type="primary" style={{ backgroundColor: '#ea3f20', borderColor: '#555555' }}>
              Onayla
            </Button>
          </div>
        }
      >
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px' }}
        />
        <Checkbox onChange={handleCheckAllChange} checked={allChecked}>
          Hepsini Seç/Kapat
        </Checkbox>
        <br />
        {filteredCheckboxes.map((checkbox) => (
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
      <h2 style={{ textAlign: 'left', marginTop: '20px' }}>Teknik Data Tablosu</h2>
      <Table
        style={{ marginTop: '20px' }}
        columns={getColumns()}
        dataSource={tableData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Button
          type="primary"
          onClick={handlePrint}
          style={{ backgroundColor: '#ea3f20', borderColor: '#555555', marginRight: '10px' }}
        >
          Yazdır
        </Button>
        <Button
          type="primary"
          onClick={handleExportToExcel}
          style={{ backgroundColor: '#ea3f20', borderColor: '#555555' }}
        >
          Excel'e Aktar
        </Button>
      </div>
      <Modal
        title="Araç Girişi"
        visible={editModalVisible}
        onCancel={handleEditModalClose}
        footer={null}
        width="80%"
        style={{ top: 0 }}
        bodyStyle={{ height: '90vh', overflow: 'auto' }}
      >
        <AracGirisi/>

      </Modal>

      <Modal
        title="Donanım Ekleme"
        visible={editDonanımVisible}
        onCancel={handleEditDonanımClose}
        footer={null}
        width="80%"
        style={{ top: 0 }}
        bodyStyle={{ height: '90vh', overflow: 'auto' }}
      >
        <DonanımEkleme copyChecked={false} />
      </Modal>

      <Modal
        title="Donanım Kopyala"
        visible={editDonanımCopyVisible}
        onCancel={handleEditDonanımCopyClose}
        footer={null}
        width="80%"
        style={{ top: 0 }}
        bodyStyle={{ height: '90vh', overflow: 'auto' }}
      >
        <DonanımCopy />

      </Modal>
    </div>
  );
};

export default Sorgulama;
