import React, { useState } from 'react';
import {
    Collapse,
    Menu,
    Switch,
    Select,
    Table,
    Button,
    Modal,
    Form,
    Input,
    Checkbox,
    message,
} from 'antd';
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { FilterDropdownProps, ColumnType } from 'antd/es/table/interface'; // Import type

const { Option } = Select;
const { Panel } = Collapse;

const AdminPage: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<string | undefined>(
        undefined,
    );
    const [permissions, setPermissions] = useState({
        tipKunye: false,
        teknikBilgiler: false,
        fiyatGirisi: false,
        resimler: false,
        ekBilgiler: false,
        fiyatGuncelle: false,
        dailySales: false,
        kullaniciTakibi: false,
    });
    const [searchAraçDüzenle, setSearchAraçDüzenle] = useState('');
    const [searchGenelTakip, setSearchGenelTakip] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchedColumn, setSearchedColumn] = useState<string | undefined>(
        undefined,
    );
    const [searchText, setSearchText] = useState<any>({});
    const handleUserSelectChange = (value: string) => {
        setSelectedUser(value);
        // Reset permissions when a new user is selected
        setPermissions({
            tipKunye: false,
            teknikBilgiler: false,
            fiyatGirisi: false,
            resimler: false,
            ekBilgiler: false,
            fiyatGuncelle: false,
            dailySales: false,
            kullaniciTakibi: false,
        });
    };

    const handlePermissionChange = (permission: string, checked: boolean) => {
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [permission]: checked,
        }));
    };

    const handleEditUser = (record: any) => {
        form.setFieldsValue({
            firstName: record.firstName,
            lastName: record.lastName,
            email: record.email,
            phone: record.phone,
            password: '',
            roles: {
                superAdmin: record.roles.includes('Super Admin'),
                admin: record.roles.includes('Admin'),
                editor: record.roles.includes('Editor'),
            },
        });
        setIsModalVisible(true);
    };
    const handleDeleteUser = (record: any) => {
        Modal.confirm({
            title: 'Satır Silinecek',
            content: 'Bu satırı silmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            okButtonProps: {
                style: {
                    backgroundColor: '#ea3f20' /* Yeşil renk */,
                    borderColor: '#ea3f20' /* Yeşil renk */,
                    color: 'white' /* Beyaz metin rengi */,
                },
            },
            cancelButtonProps: {
                style: {
                    backgroundColor: '#white' /* Kırmızı renk */,
                    borderColor: 'grey' /* Kırmızı renk */,
                    color: 'black' /* Beyaz metin rengi */,
                },
            },
            onOk: () => {
                // Silme işlemi
                setData(prevData =>
                    prevData.filter(item => item.key !== record.key),
                );
                message.success('Kullanıcı silindi');
            },
            onCancel: () => {
                message.info('Silme işlemi iptal edildi');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields()
            .then(values => {
                console.log('Form Values:', values);
                setIsModalVisible(false);
                // Update the user data here...
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (
        selectedKeys: string,
        confirm: any,
        dataIndex: string,
    ) => {
        confirm();
        setSearchText({ ...searchText, [dataIndex]: selectedKeys });
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters: any, dataIndex: string) => {
        clearFilters();
        setSearchText({ ...searchText, [dataIndex]: '' });
    };

    const handleAddUser = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const getColumnSearchProps = (dataIndex: string): ColumnType<any> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: FilterDropdownProps) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0] as string}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys[0] as string,
                            confirm,
                            dataIndex,
                        )
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Button
                    type='primary'
                    onClick={() =>
                        handleSearch(
                            selectedKeys[0] as string,
                            confirm,
                            dataIndex,
                        )
                    }
                    icon={<SearchOutlined />}
                    size='small'
                    style={{ width: 90, marginRight: 8 }}
                >
                    Ara
                </Button>
                <Button
                    onClick={() => {
                        clearFilters && clearFilters();
                        handleReset(clearFilters, dataIndex);
                    }}
                    size='small'
                    style={{ width: 90 }}
                >
                    Sıfırla
                </Button>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value: boolean | React.Key, record: any): boolean => {
            if (typeof value === 'boolean') return false; // Handle boolean case
            const text = (record[dataIndex] || '').toString().toLowerCase();
            return text.includes((value as string).toLowerCase());
        },
        render: (text: string) =>
            searchedColumn === dataIndex ? <span>{text}</span> : text,
    });

    const columns = [
        {
            title: 'Kullanıcı Adı',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username'),
        },
        {
            title: 'Adı',
            dataIndex: 'firstName',
            key: 'firstName',
            ...getColumnSearchProps('firstName'),
        },
        {
            title: 'Soyadı',
            dataIndex: 'lastName',
            key: 'lastName',
            ...getColumnSearchProps('lastName'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'İşlemler',
            key: 'actions',
            render: (_: any, record: any) => (
                <span>
                    <Button
                        type='primary'
                        style={{
                            backgroundColor: '#ea3f20',
                            margin: '2px',
                        }}
                        icon={<EditOutlined />} // Use icon instead of text
                        onClick={() => handleEditUser(record)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />} // Use icon instead of text
                        onClick={() => handleDeleteUser(record)} // Add a handler for delete
                    />
                </span>
            ),
        },
    ];

    const [data, setData] = useState([
        {
            key: '1',
            username: 'user1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            roles: ['Super Admin', 'Admin'],
        },
        // Add more user data as needed
    ]);

    return (
        <>
            <Collapse style={{ marginTop: 24 }}>
                <Panel header='Personeller' key='1'>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={handleAddUser}
                        style={{
                            marginBottom: 10,
                            marginTop: -10,
                            backgroundColor: '#ea3f20',
                        }}
                    >
                        Yeni Kullanıcı Ekle
                    </Button>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                </Panel>
            </Collapse>

            <Modal
                title='Kullanıcı Düzenle'
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={800}
                footer={[
                    <Button key='cancel' onClick={handleModalCancel}>
                        İptal
                    </Button>,
                    <Button
                        key='ok'
                        type='primary'
                        style={{
                            backgroundColor: '#ea3f20',
                            borderColor: '#555555',
                        }}
                        onClick={() => {
                            handleModalOk();
                        }}
                    >
                        Kaydet
                    </Button>,
                ]}
            >
                <Collapse defaultActiveKey={['1', '2']} accordion>
                    <Panel header='Kullanıcı Bilgileri' key='1'>
                        <Form form={form} layout='vertical'>
                            <Form.Item
                                name='firstName'
                                label='Adı'
                                rules={[
                                    { required: true, message: 'Adı gerekli!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='lastName'
                                label='Soyadı'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Soyadı gerekli!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                label='E-posta'
                                rules={[
                                    {
                                        required: true,
                                        message: 'E-posta gerekli!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='phone'
                                label='Telefon'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Telefon gerekli!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                label='Şifre'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Şifre gerekli!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item label='Roller'>
                                <Form.Item
                                    name={['roles', 'superAdmin']}
                                    valuePropName='checked'
                                    noStyle
                                >
                                    <Checkbox>Super Admin</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    name={['roles', 'admin']}
                                    valuePropName='checked'
                                    noStyle
                                >
                                    <Checkbox>Admin</Checkbox>
                                </Form.Item>
                                <Form.Item
                                    name={['roles', 'editor']}
                                    valuePropName='checked'
                                    noStyle
                                >
                                    <Checkbox>Editor</Checkbox>
                                </Form.Item>
                            </Form.Item>
                        </Form>
                    </Panel>
                    <Panel header='Yetkiler' key='2'>
                        <Menu mode='inline' style={{ width: '100%' }}>
                            <Menu.SubMenu key='sub1' title='Araç Düzenle'>
                                <Menu.Item key='search'>
                                    <Input
                                        placeholder='Araç Düzenle arayın...'
                                        value={searchAraçDüzenle}
                                        onChange={e =>
                                            setSearchAraçDüzenle(e.target.value)
                                        }
                                        style={{ marginBottom: 10 }}
                                    />
                                </Menu.Item>
                                {searchAraçDüzenle === '' ||
                                'Tip - Künye'
                                    .toLowerCase()
                                    .includes(
                                        searchAraçDüzenle.toLowerCase(),
                                    ) ? (
                                    <Menu.Item key='1'>
                                        <Switch
                                            checked={permissions.tipKunye}
                                            onChange={checked =>
                                                handlePermissionChange(
                                                    'tipKunye',
                                                    checked,
                                                )
                                            }
                                            checkedChildren='On'
                                            unCheckedChildren='Off'
                                        />
                                        <span
                                            style={{
                                                marginLeft: 8,
                                                marginRight: 25,
                                            }}
                                        >
                                            Tip - Künye
                                        </span>
                                    </Menu.Item>
                                ) : null}
                                {searchAraçDüzenle === '' ||
                                'Teknik Bilgiler'
                                    .toLowerCase()
                                    .includes(
                                        searchAraçDüzenle.toLowerCase(),
                                    ) ? (
                                    <Menu.Item key='2'>
                                        <Switch
                                            checked={permissions.teknikBilgiler}
                                            onChange={checked =>
                                                handlePermissionChange(
                                                    'teknikBilgiler',
                                                    checked,
                                                )
                                            }
                                            checkedChildren='On'
                                            unCheckedChildren='Off'
                                        />
                                        <span
                                            style={{
                                                marginLeft: 8,
                                                marginRight: 10,
                                            }}
                                        >
                                            Teknik Bilgiler
                                        </span>
                                    </Menu.Item>
                                ) : null}
                                {searchAraçDüzenle === '' ||
                                'Fiyat Girişi'
                                    .toLowerCase()
                                    .includes(
                                        searchAraçDüzenle.toLowerCase(),
                                    ) ? (
                                    <Menu.Item key='3'>
                                        <Switch
                                            checked={permissions.fiyatGirisi}
                                            onChange={checked =>
                                                handlePermissionChange(
                                                    'fiyatGirisi',
                                                    checked,
                                                )
                                            }
                                            checkedChildren='On'
                                            unCheckedChildren='Off'
                                        />
                                        <span
                                            style={{
                                                marginLeft: 8,
                                                marginRight: 30,
                                            }}
                                        >
                                            Fiyat Girişi
                                        </span>
                                    </Menu.Item>
                                ) : null}
                                {searchAraçDüzenle === '' ||
                                'Resimler'
                                    .toLowerCase()
                                    .includes(
                                        searchAraçDüzenle.toLowerCase(),
                                    ) ? (
                                    <Menu.Item key='4'>
                                        <Switch
                                            checked={permissions.resimler}
                                            onChange={checked =>
                                                handlePermissionChange(
                                                    'resimler',
                                                    checked,
                                                )
                                            }
                                            checkedChildren='On'
                                            unCheckedChildren='Off'
                                        />
                                        <span
                                            style={{
                                                marginLeft: 8,
                                                marginRight: 40,
                                            }}
                                        >
                                            Resimler
                                        </span>
                                    </Menu.Item>
                                ) : null}
                                {searchAraçDüzenle === '' ||
                                'Ek Bilgiler'
                                    .toLowerCase()
                                    .includes(
                                        searchAraçDüzenle.toLowerCase(),
                                    ) ? (
                                    <Menu.Item key='5'>
                                        <Switch
                                            checked={permissions.ekBilgiler}
                                            onChange={checked =>
                                                handlePermissionChange(
                                                    'ekBilgiler',
                                                    checked,
                                                )
                                            }
                                            checkedChildren='On'
                                            unCheckedChildren='Off'
                                        />
                                        <span
                                            style={{
                                                marginLeft: 8,
                                                marginRight: 35,
                                            }}
                                        >
                                            Ek Bilgiler
                                        </span>
                                    </Menu.Item>
                                ) : null}
                            </Menu.SubMenu>

                            <Menu.SubMenu key='sub2' title='Genel Takip Ekranı'>
                                <Menu.Item key='search'>
                                    <Input
                                        placeholder='Araç Düzenle arayın...'
                                        value={searchGenelTakip}
                                        onChange={e =>
                                            setSearchGenelTakip(e.target.value)
                                        }
                                        style={{ marginBottom: 10 }}
                                    />
                                </Menu.Item>
                                {searchGenelTakip === '' ||
                                'Fiyat Güncelle'
                                    .toLowerCase()
                                    .includes(
                                        searchGenelTakip.toLowerCase(),
                                    ) ? (
                                    <Menu.Item key='6'>
                                        <Switch
                                            checked={permissions.fiyatGuncelle}
                                            onChange={checked =>
                                                handlePermissionChange(
                                                    'fiyatGuncelle',
                                                    checked,
                                                )
                                            }
                                            checkedChildren='On'
                                            unCheckedChildren='Off'
                                        />
                                        <span style={{ marginLeft: 8 }}>
                                            Fiyat Güncelle
                                        </span>
                                    </Menu.Item>
                                ) : null}
                                {searchGenelTakip === '' ||
                                'Daily Sales'
                                    .toLowerCase()
                                    .includes(
                                        searchGenelTakip.toLowerCase(),
                                    ) ? (
                                    <Menu.Item key='7'>
                                        <Switch
                                            checked={permissions.dailySales}
                                            onChange={checked =>
                                                handlePermissionChange(
                                                    'dailySales',
                                                    checked,
                                                )
                                            }
                                            checkedChildren='On'
                                            unCheckedChildren='Off'
                                        />
                                        <span
                                            style={{
                                                marginLeft: 8,
                                                marginRight: 23,
                                            }}
                                        >
                                            Daily Sales
                                        </span>
                                    </Menu.Item>
                                ) : null}
                                {searchGenelTakip === '' ||
                                'Kullanıcı Takibi'
                                    .toLowerCase()
                                    .includes(
                                        searchGenelTakip.toLowerCase(),
                                    ) ? (
                                    <Menu.Item key='8'>
                                        <Switch
                                            checked={
                                                permissions.kullaniciTakibi
                                            }
                                            onChange={checked =>
                                                handlePermissionChange(
                                                    'kullaniciTakibi',
                                                    checked,
                                                )
                                            }
                                            checkedChildren='On'
                                            unCheckedChildren='Off'
                                        />
                                        <span
                                            style={{
                                                marginLeft: 8,
                                                marginRight: 1,
                                            }}
                                        >
                                            Kullanıcı Takibi
                                        </span>
                                    </Menu.Item>
                                ) : null}
                            </Menu.SubMenu>
                        </Menu>
                    </Panel>
                </Collapse>
            </Modal>
        </>
    );
};

export default AdminPage;
