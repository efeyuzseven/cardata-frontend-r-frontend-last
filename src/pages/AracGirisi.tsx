
import React, { useState } from 'react';
import {
    Button,
    Card,
    Col,
    Collapse,
    Form,
    Input,
    Row,
    Select,
    DatePicker,
    Checkbox,
    Upload,
    Radio,
    Modal,
    AutoComplete,
    message,
    
} from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import DonanımEkleme from '../components/Donanım'

const { Option } = Select;
const { Panel } = Collapse;

type DynamicInputs = {
    [key: string]: boolean;
};

const AraçGirisi: React.FC = () => {
    const [role, setRole] = useState<'admin' | 'müşteri'>('admin');
    const [isVehicleTypeInput, setIsVehicleTypeInput] = useState(false);
    const [isFixedRateEnabled, setIsFixedRateEnabled] = useState(false);
        const [dynamicInputs, setDynamicInputs] = useState<DynamicInputs>({
        donanım: false,
        çekiş: false,
        şanzıman: false,
        kasa: false,
        motor: false,
        yakıt: false,
        silindirYerleşimi: false,
        emisyonTipi: false,
    });
    const placeholderText = isFixedRateEnabled ? '33' : 'Kur girin';

    const [editingBrand, setEditingBrand] = useState<string | null>(null);
    const [editingModel, setEditingModel] = useState<string | null>(null);
    const [editingSubModel, setEditingSubModel] = useState<string | null>(null);
    const [isBrandModalVisible, setIsBrandModalVisible] = useState(false);
    const [isModelModalVisible, setIsModelModalVisible] = useState(false);
    const [isSubModelModalVisible, setIsSubModelModalVisible] = useState(false);
    const [currentBrand, setCurrentBrand] = useState<string | null>(null);
    const [currentModel, setCurrentModel] = useState<string | null>(null);
    const [currentSubModel, setCurrentSubModel] = useState<string | null>(null);
    const [showAdditionalPanel, setShowAdditionalPanel] = useState(false);
    const handleFixedRateChange = (e: CheckboxChangeEvent) => {
        setIsFixedRateEnabled(e.target.checked);
    };

    const handleMotorSelectChange = (value:any) => {
        if (value === 'elektrik' || value === 'hev' || value === 'mhev' || value === 'phev') {
            setShowAdditionalPanel(true);
        } else {
            setShowAdditionalPanel(false);
        }
    };

    const handleFileChange = (info: any) => {
        // Handle file change
        const { file } = info;

        // Dosya boyutunu kontrol etmek için
        const fileSize = file.size / 1024; // KB cinsinden dosya boyutu
        const minWidth = 800; // En az kabul edilen genişlik

        if (fileSize < minWidth) {
            message.warning('Dosya eni en az 800px olmalıdır.');
            return false; // Dosya yüklenmesini iptal et
        }

        // Diğer işlemler burada devam eder (örneğin dosyayı yükleme)
        // handleUpload(file);

        return false;
    };
    const [editDonanımVisible, setEditDonanımVisible] = useState(false);

    const handleEditDonanımClose = () => {
        setEditDonanımVisible(false);
      };
    const handleDonanımEdit = () => {
        setEditDonanımVisible(true);
    }; 



    const toggleVehicleTypeInput = () => {
        setIsVehicleTypeInput(!isVehicleTypeInput);
    };

    const [brands, setBrands] = useState(['','Marka 1', 'Marka 2', 'Marka 3', 'Marka 4', 'Marka 5', 'Marka 6', 'Marka 7', 'Marka 8', 'Marka 9', 'Marka 10' ]);
    const [models, setModels] = useState(['','Model 1', 'Model 2', 'Model 3', 'Model 4', 'Model 5', 'Model 6', 'Model 7', 'Model 8', 'Model 9', 'Model 10']);
    const [subModels, setSubModels] = useState(['','Alt Model 1', 'Alt Model 2', 'Alt Model 3', 'Alt Model 4', 'Alt Model 5', 'Alt Model 6', 'Alt Model 7', 'Alt Model 8', 'Alt Model 9', 'Alt Model 10']);
    const supercodes = ['','Supercode 1', 'Supercode 2', 'Supercode 3'];

    
    const [il, setIl] = useState('');
      
    const handleIlChange = (value:any) => {
        setIl(value);
    };
    
    const showEditBrand = (brand: string) => {
        setCurrentBrand(brand);
        setIsBrandModalVisible(true);
    };

    const handleBrandEditOk = () => {
        const updatedBrands = brands.map(brand => brand === currentBrand ? inputBrandValue : brand);
        setBrands(updatedBrands);
        setIsBrandModalVisible(false);
    };

    const handleBrandEditCancel = () => {
        setIsBrandModalVisible(false);
        setCurrentBrand(null);
    };

    const handleDeleteBrand = (brandToDelete: string) => {
        const updatedBrands = brands.filter(brand => brand !== brandToDelete);
        setBrands(updatedBrands);
        setCurrentBrand(null);
        setInputBrandValue('');
    };

    const showEditModel = (model: string) => {
        setCurrentModel(model);
        setIsModelModalVisible(true);
    };

    const handleModelEditOk = () => {
        setIsModelModalVisible(false);
        setCurrentModel(null);
    };

    const handleModelEditCancel = () => {
        setIsModelModalVisible(false);
        setCurrentModel(null);
    };

    const handleDeleteModel = (modelToDelete: string) => {
        const updatedModel = brands.filter(model => model !== modelToDelete);
        setModels(updatedModel);
        setCurrentModel(null);
        setInputModelValue('');
    };

    const showEditSubModel = (model: string) => {
        setCurrentSubModel(model);
        setIsSubModelModalVisible(true);
    };

    const handleSubModelEditOk = () => {
        setIsSubModelModalVisible(false);
        setCurrentSubModel(null);
    };

    const handleSubModelEditCancel = () => {
        setIsSubModelModalVisible(false);
        setCurrentSubModel(null);
    };

    const handleDeleteSubModel = (subModelToDelete: string) => {
        const updatedSubModel = brands.filter(model => model !== subModelToDelete);
        setSubModels(updatedSubModel);
        setCurrentSubModel(null);
        setInputSubModelValue('');
    };

    const [inputBrandValue, setInputBrandValue] = useState<string>('');
    const [inputModelValue, setInputModelValue] = useState<string>('');
    const [inputSubModelValue, setInputSubModelValue] = useState<string>('');
    const [inputSupercodeValue, setInputSupercodeValue] = useState<string>('');

    const handleInputChangeBrand = (value: string) => {
        setInputBrandValue(value);
    };

    const handleSelectChangeBrand = (value: string) => {
        setInputBrandValue(value);
    };

    const handleInputChangeModel = (value: string) => {
        setInputModelValue(value);
    };

    const handleSelectChangeModel = (value: string) => {
        setInputModelValue(value);
    };
    const handleInputChangeSubModel = (value: string) => {
        setInputSubModelValue(value);
    };

    const handleSelectChangeSubModel = (value: string) => {
        setInputSubModelValue(value);
    };

    const handleSelectChangeSupercode = (value: string) => {
        setInputSupercodeValue(value);
    };

    const [editingDonanim, setEditingDonanim] = useState<string | null>(null);
    const [donanimTipleri, setDonanimTipleri] = useState(['Donanım 1', 'Donanım 2', 'Donanım 3', 'Donanım 4', 'Donanım 5']);
    const [inputDonanimValue, setInputDonanimValue] = useState<string>('');
    const [isDonanimModalVisible, setIsDonanimModalVisible] = useState<boolean>(false);
    const [currentDonanim, setCurrentDonanim] = useState<string | null>(null);
  
    const showEditDonanim = (donanim: string) => {
      setCurrentDonanim(donanim);
      setIsDonanimModalVisible(true);
    };
  
    const handleDonanimEditOk = () => {
      const updatedDonanim = donanimTipleri.map(donanim => donanim === currentDonanim ? inputDonanimValue : donanim);
      setDonanimTipleri(updatedDonanim);
      setIsDonanimModalVisible(false);
    };
  
    const handleDonanimEditCancel = () => {
      setIsDonanimModalVisible(false);
      setCurrentDonanim(null);
    };
  
    const handleDeleteDonanim = (donanimToDelete: string) => {
      const updatedDonanim = donanimTipleri.filter(donanim => donanim !== donanimToDelete);
      setDonanimTipleri(updatedDonanim);
      setCurrentDonanim(null);
      setInputDonanimValue('');
    };
  
    const handleInputChangeDonanim = (value: string) => {
      setInputDonanimValue(value);
    };
  
    const handleSelectChangeDonanim = (value: string) => {
      setInputDonanimValue(value);
    };

    const [editingSanziman, setEditingSanziman] = useState<string | null>(null);
    const [sanzimanTipleri, setSanzimanTipleri] = useState(['Şanzıman 1', 'Şanzıman 2', 'Şanzıman 3', 'Şanzıman 4', 'Şanzıman 5']);
    const [inputSanzimanValue, setInputSanzimanValue] = useState<string>('');
    const [isSanzimanModalVisible, setIsSanzimanModalVisible] = useState<boolean>(false);
    const [currentSanziman, setCurrentSanziman] = useState<string | null>(null);
  
    const showEditSanziman = (sanziman: string) => {
      setCurrentSanziman(sanziman);
      setIsSanzimanModalVisible(true);
    };
  
    const handleSanzimanEditOk = () => {
      const updatedSanziman = sanzimanTipleri.map(sanziman => sanziman === currentSanziman ? inputSanzimanValue : sanziman);
      setSanzimanTipleri(updatedSanziman);
      setIsSanzimanModalVisible(false);
    };
  
    const handleSanzimanEditCancel = () => {
      setIsSanzimanModalVisible(false);
      setCurrentSanziman(null);
    };
  
    const handleDeleteSanziman = (sanzimanToDelete: string) => {
      const updatedSanziman = sanzimanTipleri.filter(sanziman => sanziman !== sanzimanToDelete);
      setSanzimanTipleri(updatedSanziman);
      setCurrentSanziman(null);
      setInputSanzimanValue('');
    };
  
    const handleInputChangeSanziman = (value: string) => {
      setInputSanzimanValue(value);
    };
  
    const handleSelectChangeSanziman = (value: string) => {
      setInputSanzimanValue(value);
    };
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const [options, setOptions] = useState<{ value: string, label: JSX.Element }[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [currentDonanimKategori, setCurrentDonanimKategori] = useState<string | null>(null);

  
    
      const handleInputChange = (value: string) => {
        setInputValue(value);
      };

      const showEditItem = (item: string) => {
        setEditingItem(item);
        setIsModalVisible(true);
      };
      
      const handleDeleteDonanimKategori = (itemToDelete: string) => {
        const updatedOptions = options.filter(option => option.value !== itemToDelete);
        setOptions(updatedOptions);
        if (editingItem === itemToDelete) {
          setEditingItem(null);
          setIsModalVisible(false);
        }
      };

      const handleEditOk = () => {
        setIsModalVisible(false);
        setEditingItem(null);
      };
    
      const handleEditCancel = () => {
        setIsModalVisible(false);
        setEditingItem(null);
      };
    

    return (
        <div style={{ padding: 20 }}>
            <Row justify='space-between' align='middle'>
                <Col>
                    <h1>Araç Girişi</h1>
                </Col>
                <Col>
                    <Button
                        onClick={() => setRole('admin') }
                        type={role === 'admin' ? 'primary' : 'default'}
                        style={{ backgroundColor: role === 'admin' ? '#ea3f20' : '#fff', color: role === 'admin' ? '#fff' : '#000', borderColor: '#555555' }}
                    
                    >
                        Admin
                    </Button>
                    <Button
                        style={{ backgroundColor: role === 'müşteri' ? '#ea3f20' : '#fff', color: role === 'müşteri' ? '#fff' : '#000', marginLeft:10, borderColor: '#555555' }}
                        onClick={() => setRole('müşteri')}
                        type={role === 'müşteri' ? 'primary' : 'default'}                     
                    >
                        Editör
                    </Button>
                </Col>
            </Row>

            <Collapse>
            <Card title='Araç Sorgula'>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <h2>Araç Sorgula</h2>
                    </Col>
                </Row>
                <Form layout='vertical'>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Marka">
                                <AutoComplete
                                    value={inputBrandValue}
                                    onChange={handleInputChangeBrand}
                                    onSelect={handleSelectChangeBrand}
                                    style={{ width: '100%' }}
                                    options={brands.map(brand => ({
                                        value: brand,
                                        label: (
                                            <div>
                                                {brand}
                                                <EditOutlined
                                                    style={{ float: 'right', marginLeft: 10 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Dropdown kapanmasını önler
                                                        showEditBrand(brand);
                                                    }}
                                                />
                                            </div>
                                        ),
                                    }))}
                                    filterOption={(input, option) =>
                                        option!.value.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    <Input
                                        placeholder="Bir marka seçin veya yeni oluşturun"
                                    />
                                </AutoComplete>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='Model'>
                            <AutoComplete
                                    value={inputModelValue}
                                    onChange={handleInputChangeModel}
                                    onSelect={handleSelectChangeModel}
                                    style={{ width: '100%' }}
                                    options={models.map(model => ({
                                        value: model,
                                        label: (
                                            <div>
                                                {model}
                                                <EditOutlined
                                                    style={{ float: 'right', marginLeft: 10 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Dropdown kapanmasını önler
                                                        showEditModel(model);
                                                    }}
                                                />
                                            </div>
                                        ),
                                    }))}
                                    filterOption={(input, option) =>
                                        option!.value.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    <Input
                                        placeholder="Bir model seçin veya yeni oluşturun"
                                    />
                                </AutoComplete>
                                
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='Alt Model'>
                            <AutoComplete
                                    value={inputSubModelValue}
                                    onChange={handleInputChangeSubModel}
                                    onSelect={handleSelectChangeSubModel}
                                    style={{ width: '100%' }}
                                    options={subModels.map(submodel => ({
                                        value: submodel,
                                        label: (
                                            <div>
                                                {submodel}
                                                <EditOutlined
                                                    style={{ float: 'right', marginLeft: 10 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Dropdown kapanmasını önler
                                                        showEditSubModel(submodel);
                                                    }}
                                                />
                                            </div>
                                        ),
                                    }))}
                                    filterOption={(input, option) =>
                                        option!.value.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    <Input
                                        placeholder="Bir submodel seçin veya yeni oluşturun"
                                    />
                                </AutoComplete>
                            </Form.Item>    
                        </Col>
                        <Col span={6}>
                            <Form.Item label='Araç Tipi'>
                                    <Input.Group compact>
                                        {isVehicleTypeInput ? (
                                            <Input
                                                style={{
                                                    width: 'calc(100% - 120px)',
                                                }}
                                                placeholder='Araç Tipi girin'
                                            />
                                        ) : (
                                            <Select
                                                style={{
                                                    width: 'calc(100% - 120px)',
                                                }}
                                                placeholder='Araç Tipi seçin'
                                            >
                                                <Option value='type1'>
                                                    Type 1
                                                </Option>
                                                <Option value='type2'>
                                                    Type 2
                                                </Option>
                                            </Select>
                                        )}
                                        <Button
                                            onClick={toggleVehicleTypeInput}
                                            style={{ width: 120 }}
                                        >
                                            {isVehicleTypeInput
                                                ? 'Araç Tipi Seç'
                                                : 'Araç Tipi Ekle'}
                                        </Button>
                                    </Input.Group>
                            </Form.Item>
                            
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                            <Form.Item  label='Supercode'>
                                    <Select
                                        //disabled
                                        showSearch
                                        placeholder='Otomatik belirlenecek'
                                        optionFilterProp='children'
                                        onChange={handleSelectChangeSupercode}
                                        value={inputSupercodeValue}
                                    >
                                        {supercodes.map(supercode => (
                                            <Option
                                                key={supercode}
                                                value={supercode}
                                            >
                                                {supercode}
                                            </Option>
                                        ))}
                                    </Select>
                            </Form.Item> 
                        </Col>
                        <Col span={8}>
                        </Col>
                                                
                    </Row>
                </Form>
            </Card>
</Collapse>

<Collapse>
                <Panel header='Araç Düzenle'
                    key='1'
                    style={{ textAlign: 'left',border:'1px solid #e9e9e9', borderRadius:'4px',marginTop:1 }}
                >
                    <Form layout='vertical'>
                        <Row gutter={48}>
                            <Col span={8}>
                                <Form.Item label={<strong>Marka No</strong>} >
                                    <Input disabled value='Model No' />
                                </Form.Item>
                                <Form.Item label='İthalatçı'>
                                    <Input placeholder='İthalatçı girin' disabled={inputModelValue !== ''}  />
                                </Form.Item>
                                <Form.Item label='İl'>
                                    <Select onChange={handleIlChange} placeholder='İl girin'disabled={inputModelValue !== ''}>
                                    <option value="İstanbul"></option>
                                    <option value="Ankara"></option>
                                    </Select>
                                </Form.Item>
                                {il && (
                                    <Form.Item label='İlçe'>
                                    <Select placeholder='İlçe girin' disabled={inputModelValue !== ''}/>
                                </Form.Item>
                                )}
                                <Form.Item label='Posta Kodu'>
                                    <Input placeholder='Posta Kodu girin' disabled={inputModelValue !== ''}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label='Telefon'>
                                    <Input placeholder='Telefon girin' disabled={inputModelValue !== ''}/>
                                </Form.Item>
                                <Form.Item label='Faks'>
                                    <Input placeholder='Faks girin' disabled={inputModelValue !== ''} />
                                </Form.Item>
                                <Form.Item label='İnternet Sayfası'>
                                    <Input placeholder='İnternet Sayfası girin' disabled={inputModelValue !== ''}/>
                                </Form.Item>
                                <Form.Item label='Açık Adres'>
                                    <Input.TextArea
                                        placeholder='Açık Adres girin'
                                        disabled={inputModelValue !== ''}
                                        autoSize={{ minRows: 5, maxRows: 12 }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label={<strong>Model No</strong>}>
                                    <Input disabled value='Otomatik ayarlanacak' />
                                </Form.Item>
                                <Form.Item label={<strong>Alt Model No</strong>}>
                                    <Input disabled value='Otomatik ayarlanacak' />
                                </Form.Item>
                                <Form.Item label='S-Alt Model'>
                                    <Input placeholder='S-Alt Model girin' disabled={inputSupercodeValue !== ''}/>
                                </Form.Item>
                                <Form.Item label='G-Alt Model'>
                                    <Input placeholder='G-Alt Model girin' disabled={inputSupercodeValue !== ''} />
                                </Form.Item>
                                <Form.Item label='Tarih'>
                                    <DatePicker picker="year" style={{ width: '50%' }} placeholder='Başlangıç yılı seçin' disabled={inputSupercodeValue !== ''}/>
                                    <DatePicker picker="year" style={{ width: '50%' }} placeholder='Bitiş yılı seçin' disabled={inputSupercodeValue !== ''}/>
                                </Form.Item> 
                            </Col>
                        </Row>
                    </Form>
                </Panel>
                <Panel header='Tip - Künye'
                    key='2'
                    style={{ textAlign: 'left',border:'1px solid #e9e9e9', borderRadius:'4px',marginTop:1 }}
                >
                    <Form layout='vertical'>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label='Model Tipi'>
                                    <Input placeholder='Model Tipi girin' />
                                </Form.Item>
                                <Form.Item label='Satış Başlangıç'>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item label='Segment'>
                                    <Input placeholder='Segment girin' />
                                </Form.Item>

                                <Form.Item label='KDL Liste Kodu 1'>
                                    <Input.Group compact>
                                        <Input
                                            style={{ width: '33%' }}
                                            placeholder='1'
                                        />
                                        <Input
                                            style={{ width: '33%' }}
                                            placeholder='2'
                                        />
                                        <Input
                                            style={{ width: '33%' }}
                                            placeholder='3'
                                        />
                                    </Input.Group>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='Donanım Tipi'>
                                <AutoComplete
        value={inputDonanimValue}
        onChange={handleInputChangeDonanim}
        onSelect={handleSelectChangeDonanim}
        style={{ width: '100%' }}
        options={donanimTipleri.map(donanim => ({
          value: donanim,
          label: (
            <div>
              {donanim}
              <EditOutlined
                style={{ float: 'right', marginLeft: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  showEditDonanim(donanim);
                }}
              />
            </div>
          ),
        }))}
        filterOption={(input, option) =>
          option!.value.toLowerCase().includes(input.toLowerCase())
        }
      >
        <Input placeholder="Bir donanım tipi seçin veya yazın" />
      </AutoComplete>
      <Modal
        title="Edit Donanım Tipi"
        visible={isDonanimModalVisible}
        onOk={handleDonanimEditOk}
        onCancel={handleDonanimEditCancel}
      >
        {/* Buraya editleme formu veya içeriği ekleyebilirsiniz */}
        {editingDonanim}
      </Modal>
                                </Form.Item>
                                <Form.Item label='Satış Baş. Yılı'>
                                    <Input placeholder='Satış Baş. Yılı girin' />
                                </Form.Item>
                                <Form.Item label='Sahibinden Değer'>
                                    <Input placeholder='Sahibinden Değer girin' />
                                </Form.Item>
                                <Form.Item label='Garanti Model Tipi(40)'>
                                    <Input placeholder='Garanti Model Tipi girin' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='Şanzıman Tipi'>
                                <AutoComplete
        value={inputSanzimanValue}
        onChange={handleInputChangeSanziman}
        onSelect={handleSelectChangeSanziman}
        style={{ width: '100%' }}
        options={sanzimanTipleri.map(sanziman => ({
          value: sanziman,
          label: (
            <div>
              {sanziman}
              <EditOutlined
                style={{ float: 'right', marginLeft: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  showEditSanziman(sanziman);
                }}
              />
            </div>
          ),
        }))}
        filterOption={(input, option) =>
          option!.value.toLowerCase().includes(input.toLowerCase())
        }
      >
        <Input placeholder="Bir şanzıman tipi seçin veya yazın" />
      </AutoComplete>
      <Modal
        title="Edit Şanzıman Tipi"
        visible={isSanzimanModalVisible}
        onOk={handleSanzimanEditOk}
        onCancel={handleSanzimanEditCancel}
      >
        {/* Buraya editleme formu veya içeriği ekleyebilirsiniz */}
        {editingSanziman}
      </Modal>
                                </Form.Item>
                                <Form.Item label='Satış Bitiş'>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item label='KDL Marka'>
                                    <Input placeholder='KDL Marka girin' />
                                </Form.Item>
                                <Form.Item label='Cetelem Model Tipi'>
                                    <Input placeholder='Cetelem Model Tipi girin' />
                                </Form.Item>
                                
                            </Col>
                            <Col span={6}>
                                <Form.Item label='Satış Bitiş Yılı'>
                                    <Input placeholder='Satış Bitiş Yılı girin' />
                                </Form.Item>
                                <Form.Item label='KDL Model 1'>
                                    <Input.Group compact>
                                        <Input
                                            style={{ width: '33%' }}
                                            placeholder='1'
                                        />
                                        <Input
                                            style={{ width: '33%' }}
                                            placeholder='2'
                                        />
                                        <Input
                                            style={{ width: '33%' }}
                                            placeholder='3'
                                        />
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item label='Segment ODD'>
                                    <Input.Group compact>
                                        <Select
                                            style={{ width: '50%' }}
                                            placeholder='Segment ODD A, B, C'
                                        >
                                            <Option value='A'>A</Option>
                                            <Option value='B'>B</Option>
                                            <Option value='C'>C</Option>
                                        </Select>
                                        <Select
                                            style={{ width: '50%' }}
                                            placeholder='Segment ODD 1, 2, 3'
                                        >
                                            <Option value='1'>1</Option>
                                            <Option value='2'>2</Option>
                                            <Option value='3'>3</Option>
                                        </Select>
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item label='Facelift'>
                                    <Checkbox></Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
                
                <Panel 
                header='Teknik Bilgiler'
                key='3'
                style={{ textAlign: 'left', border: '1px solid #e9e9e9', borderRadius: '4px', marginTop: 1 }}
                >
                <Form layout='vertical'>
                    <Row gutter={16}>
                        {[
                            { field: 'Kasa', type: 'select' },
                            { field: 'CCM', type: 'input' },
                            { field: 'Tork', type: 'input' },
                            { field: 'HP', type: 'input' },
                            { field: 'PS', type: 'input' },
                            { field: 'KW', type: 'input' },
                            { field: 'Yakıt', type: 'select' },
                            { field: 'Beygir Gücü', type: 'input' },
                            { field: 'Çekiş Sistemi', type: 'select' },
                            { field: 'HP/RPM1', type: 'input' },
                            { field: 'Tork/RPM2', type: 'input' },
                            { field: 'Uzunluk (mm)', type: 'input' },
                            { field: 'Genişlik (mm)', type: 'input' },
                            { field: 'Yükseklik (mm)', type: 'input' },
                            { field: 'Total Ağırlık(kg)', type: 'input' },
                            { field: 'Yük Ağırlık(kg)', type: 'input' },
                            { field: 'Boş Ağırlık(kg)', type: 'input' },
                            { field: 'Kapı Sayısı', type: 'input' },
                            { field: 'Koltuk Adeti', type: 'input' },
                            { field: 'CO2', type: 'input' },
                            { field: 'Bagaj (L)', type: 'input' },
                            { field: 'WLTP CO2', type: 'input' },
                            { field: 'Vites', type: 'select' },
                            { field: 'Azami Hız (km/h)', type: 'input' },
                            { field: '0-100 Hızlanma (sn)', type: 'input' },
                            { field: 'Vites Kademe Sayısı', type: 'input' },
                            { field: 'Lastik Ebatı (225/55 R16)', type: 'input' },
                            { field: 'Dingil Mesafesi (mm)', type: 'input' },
                            { field: 'Yakıt Deposu (L)', type: 'input' },
                            { field: 'Silindir Yerleşimi', type: 'select' },
                            { field: 'Silindir Adedi', type: 'input' },
                            { field: 'Emisyon Tipi', type: 'select' },
                            { field: 'UDC(l/100km)', type: 'input' },
                            { field: 'NEDC(l/100km)', type: 'input' },
                            { field: 'EUDC(l/100km)', type: 'input' },
                            { field: 'WLTP Düşük', type: 'input' },
                            { field: 'WLTP Orta', type: 'input' },
                            { field: 'WLTP Yüksek', type: 'input' },
                            { field: 'WLTP Çok Yüksek', type: 'input' },
                        ].map(({ field, type }, index) => (
                            
                            <Col span={3} key={index}>
                                <Form.Item label={field}>
                                    {type === 'select' ? (
                                        <Input.Group compact>
                                            <Select
                                                style={{ width: 'calc(70%)' }}
                                                placeholder={`${field} seçin`}
                                            >
                                                {/* Add your specific options here */}
                                                {field === 'Kasa' && (
                                                    <>
                                                        <Option value="sedan">Sedan</Option>
                                                        <Option value="hatchback">Hatchback</Option>
                                                        <Option value="suv">SUV</Option>
                                                        <Option value="coupe">Coupe</Option>
                                                    </>
                                                )}
                                                
                                                {field === 'Yakıt' && (
                                                    <>
                                                        <Option value="benzin">Benzin</Option>
                                                        <Option value="dizel">Dizel</Option>
                                                        <Option value="elektrik">Elektrik</Option>
                                                        <Option value="hibrit">Hibrit</Option>
                                                    </>
                                                )}
                                                {field === 'Çekiş Sistemi' && (
                                                    <>
                                                        <Option value="onTeker">Ön Tekerlekten Çekiş</Option>
                                                        <Option value="arkaTeker">Arka Tekerlekten Çekiş</Option>
                                                        <Option value="4x4">4x4</Option>
                                                    </>
                                                )}
                                                {field === 'Vites' && (
                                                    <>
                                                        <Option value="manuel">Manuel</Option>
                                                        <Option value="otomatik">Otomatik</Option>
                                                        <Option value="yarıOtomatik">Yarı Otomatik</Option>
                                                    </>
                                                )}
                                                {field === 'Silindir Yerleşimi' && (
                                                    <>
                                                        <Option value="dikey">Dikey</Option>
                                                        <Option value="yatay">Yatay</Option>
                                                        <Option value="vTipi">V Tipi</Option>
                                                        <Option value="wTipi">W Tipi</Option>
                                                    </>
                                                )}
                                                {field === 'Emisyon Tipi' && (
                                                    <>
                                                        <Option value="euro4">Euro 4</Option>
                                                        <Option value="euro5">Euro 5</Option>
                                                        <Option value="euro6">Euro 6</Option>
                                                    </>
                                                )}
                                            </Select>
                                            <Button style={{ width: 50 }}>{`Ekle`}</Button>
                                        </Input.Group>
                                    ) : (
                                        <Input placeholder={`${field} girin`} />
                                    )}
                                </Form.Item>
                            </Col>

                        
                        ))}
<Col span={3}>
                            <Form.Item label='Motor'>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder='Motor seçin'
                                    onChange={handleMotorSelectChange}
                                >
                                    <Option value='benzin'>Benzin</Option>
                                    <Option value='boxer'>Boxer</Option>
                                    <Option value='dizel'>Dizel</Option>
                                    <Option value='elektrik'>Elektrik</Option>
                                    <Option value='hev'>HEV</Option>
                                    <Option value='mhev'>MHEV</Option>
                                    <Option value='phev'>PHEV</Option>
                                    <Option value='wank'>WANK</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                </Panel>
            
                {showAdditionalPanel && (
                <Panel
                header='Ek Bilgiler'
                key='10'
                style={{ textAlign: 'left', border: '1px solid #e9e9e9', borderRadius: '4px', marginTop: 16 }}
            >
                <Form layout='vertical'>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label='HP'>
                                <Input placeholder='HP girin' />
                            </Form.Item>
                            <Form.Item label='Menzil (km)'>
                                <Input placeholder='Menzil girin' />
                            </Form.Item>
                            <Form.Item label='Akü Tipi'>
                                <Select placeholder='Akü Tipi seçin'>
                                    <Option value='lityum-iyon'>Lityum İyon</Option>
                                    <Option value='nikel-metal-hidrit'>Nikel Metal Hidrit</Option>
                                    <Option value='diğer'>Diğer</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label='Akü Kapasitesi'>
                                <Input placeholder='Akü Kapasitesi girin' />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='KW'>
                                <Input placeholder='KW girin' />
                            </Form.Item>
                            <Form.Item label='Şarj Süresi (h)'>
                                <Input placeholder='Şarj Süresi girin' />
                            </Form.Item>
                            <Form.Item label='Akü Output (v)'>
                                <Input placeholder='Akü Output girin' />
                            </Form.Item>
                            <Form.Item label='Net Akü Kapasitesi (kWh)'>
                                <Input placeholder='Net Akü Kapasitesi girin' />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='Tork'>
                                <Input placeholder='Tork girin' />
                            </Form.Item>
                            <Form.Item label='Hızlı Şarj Süresi (h)'>
                                <Input placeholder='Hızlı Şarj Süresi girin' />
                            </Form.Item>
                            <Form.Item label='kWh/100 km'>
                                <Input placeholder='kWh/100 km girin' />
                            </Form.Item>
                            <Form.Item label='AC Şarj Hızı (kw)'>
                                <Input placeholder='AC Şarj Hızı girin' />
                            </Form.Item>
                        </Col>
                    
            <Col span={6}>
                <Form.Item label='Soket Tipi'>
                    <Input placeholder='Soket Tipi girin' />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label='Elek.Motor Sayısı'>
                    <Input placeholder='Elek.Motor Sayısı girin' />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label='DC Şarj Hızı (kw)'>
                    <Input placeholder='DC Şarj Hızı girin' />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label='Şarj Giriş Yeri'>
                    <Input placeholder='Şarj Giriş Yeri girin' />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label='Dosya seçilmedi'>
                    <Input placeholder='Dosya seçilmedi' />
                </Form.Item>
            </Col>
        </Row>
                </Form>
            </Panel>
            
            )}
            
                <Panel header='Fiyat Girişi'
                    disabled={role === 'müşteri'}
                    key='4'
                    style={{ textAlign: 'left',border:'1px solid #e9e9e9', borderRadius:'4px',marginTop:1 }}
                >
                    <Form layout='vertical'>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label='Giriş Tarihi'>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='Fiyat Ayı'>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='Marka Yayın Tarihi'>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='Birim'>
                                    <Radio.Group>
                                        <Radio value='trl'>TL</Radio>
                                        <Radio value='eur'>EUR</Radio>
                                        <Radio value='usd'>USD</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={
                                        <>
                                            <Checkbox
                                                onChange={handleFixedRateChange}
                                                style={{ marginRight: 8 }}
                                            />
                                            Sabit Kur
                                        </>
                                    }
                                >
                                    <Input
                                        placeholder={placeholderText}
                                        disabled={isFixedRateEnabled}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
                <Panel header='Resimler'
            key='5'
            style={{ textAlign: 'left', border: '1px solid #e9e9e9', borderRadius: '4px', marginTop: 1 }}
        >
            <Form layout='vertical' disabled={role === 'müşteri'}>
                <Form.Item>
                    <Upload onChange={handleFileChange} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Dosya Seç</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Panel>
        
                <Panel
                    header='Ek Bilgiler'
                    key='6'
                    style={{ textAlign: 'left',border:'1px solid #e9e9e9', borderRadius:'4px',marginTop:1 }}                >
                    <Form layout='vertical'>
                        <Row>
                            <Col span={8}>
                                <Form.Item label='Country'>
                                    <Select
                                        placeholder='Country seçin'  
                                    >
                                        <Option value='tr'>TR</Option>
                                        <Option value='abd'>ABD</Option>
                                        <Option value='uk'>UK</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col
                                span={8}
                                offset={8}
                                style={{ textAlign: 'right' }}
                            >
                            <Button onClick={() => handleDonanımEdit()} type='primary'style={{ marginLeft: 8 ,background:'#ea3f20'}}>Donanım</Button>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
                
            </Collapse>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

<Button type="primary"
style={{ backgroundColor: '#ea3f20', borderColor: '#555555', marginTop:10}}
>Kaydet</Button>
      </div>
      <Modal //Markayı Düzenle
                title='Markayı Düzenle'
                visible={isBrandModalVisible}
                onOk={handleBrandEditOk}
                onCancel={handleBrandEditCancel}
            >
                <Form layout='vertical'>
                    <Form.Item label='Marka Adı'>
                        <Input placeholder='Marka adı girin' value={currentBrand || ''} onChange={(e) => setCurrentBrand(e.target.value)} />
                    </Form.Item>
                </Form>
                <Button onClick={() => currentBrand && handleDeleteBrand(currentBrand)}>Sil</Button>  
            </Modal>
            
            <Modal //Modeli Düzenle
                title='Modeli Düzenle'
                visible={isModelModalVisible}
                onOk={handleModelEditOk}
                onCancel={handleModelEditCancel}
            >
                <Form layout='vertical'>
                    <Form.Item label='Marka Adı'>
                                <Select
                                    placeholder='Marka adı girin' 
                                    value={inputBrandValue}
                                    onChange={handleInputChangeBrand}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.children as unknown as string)
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                >
                                    {brands.map((brand) => (
                                        <Option key={brand} value={brand} >
                                            <span>{brand}</span>    
                                        </Option>
                                    ))}
                                </Select>
                    </Form.Item>
                </Form>
                <Form layout='vertical'>
                    <Form.Item label='Model Adı'>
                        <Input placeholder='Model adı girin' value={currentModel || ''} onChange={(e) => setCurrentModel(e.target.value)} />
                    </Form.Item>
                </Form>
                <Button onClick={() => currentModel && handleDeleteModel(currentModel)}>Sil</Button>  
            </Modal>
            <Modal //Alt Modeli Düzenle
                title='Alt Modeli Düzenle'
                visible={isSubModelModalVisible}
                onOk={handleSubModelEditOk}
                onCancel={handleSubModelEditCancel}
            >
                <Form layout='vertical'>
                    <Form.Item label='Marka Adı'>
                                <Select
                                    placeholder='Marka adı girin' 
                                    value={inputBrandValue}
                                    onChange={handleInputChangeBrand}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.children as unknown as string)
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                >
                                    {brands.map((brand) => (
                                        <Option key={brand} value={brand} >
                                            <span>{brand}</span>    
                                        </Option>
                                    ))}
                                </Select>
                    </Form.Item>
                </Form>
                <Form layout='vertical'>
                <Form.Item label='Model Adı'>
                                <Select
                                    placeholder='Model adı girin' 
                                    value={inputModelValue}
                                    onChange={handleInputChangeModel}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.children as unknown as string)
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                >
                                    {models.map((model) => (
                                        <Option key={model} value={model} >
                                            {model}    
                                        </Option>
                                    ))}
                                </Select>
                    </Form.Item>
                </Form>
                <Form layout='vertical'>
                    <Form.Item label='Alt Model Adı'>
                        <Input placeholder='Alt Model adı girin' value={currentSubModel || ''} onChange={(e) => setCurrentSubModel(e.target.value)} />
                    </Form.Item>
                </Form>
                <Button onClick={() => currentSubModel && handleDeleteSubModel(currentSubModel)}>Sil</Button>  
            </Modal>  
            
            <Modal
            title="Donanım Tipini Düzenle"
            visible={isDonanimModalVisible}
            onOk={handleDonanimEditOk}
            onCancel={handleDonanimEditCancel}
            >
            <Form layout="vertical">
                <Form.Item label="Donanım Tipi Adı">
                <Input
                    placeholder="Donanım tipi adı girin"
                    value={currentDonanim || ''}
                    onChange={(e) => setCurrentDonanim(e.target.value)}
                />
                </Form.Item>
            </Form>
            <Button onClick={() => currentDonanim && handleDeleteDonanim(currentDonanim)}>
                Sil
            </Button>
            </Modal>

            <Modal
            title="Şanzıman Tipini Düzenle"
            visible={isSanzimanModalVisible}
            onOk={handleSanzimanEditOk}
            onCancel={handleSanzimanEditCancel}
            >
            <Form layout="vertical">
                <Form.Item label="Şanzıman Tipi Adı">
                <Input
                    placeholder="Şanzıman tipi adı girin"
                    value={currentSanziman || ''}
                    onChange={(e) => setCurrentSanziman(e.target.value)}
                />
                </Form.Item>
            </Form>
            <Button onClick={() => currentSanziman && handleDeleteSanziman(currentSanziman)}>
                Sil
            </Button>
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

        </div>
        
    );
};

export default AraçGirisi;


