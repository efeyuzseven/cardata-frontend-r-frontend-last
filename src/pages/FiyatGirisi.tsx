import React, { useState, useEffect } from 'react';
import {
    Select,
    DatePicker,
    Input,
    Row,
    Col,
    Button,
    Drawer,
    Checkbox,
    Table,
    Form,
    Collapse,
    Modal,
} from 'antd';
import {
    HistoryOutlined,
    SearchOutlined,
    ToolOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import '../styles.css';
import DonanımEkleme from '../components/Donanım';
import FiyatTarihce from '../components/FiyatTarihce';

const { Option } = Select;
const { Panel } = Collapse;

interface CheckedRows {
    [key: string]: boolean;
}

interface DataType {
    key: React.Key;
    No: string;
    SuperCode: string;
    BaşlangıçTarihi: string;
    Emisyon: string;
    Koltuk: number;
    Kasa: string;
    Model: string;
    AltModel: string;
    Tip: string;
    DonanımTipi: string;
    Vites: string;
}

const FiyatGirisi = () => {
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
        undefined,
    );
    const [selectedRowKey, setSelectedRowKey] = useState<React.Key | null>(
        null,
    );
    const [editDonanımVisible, setEditDonanımVisible] = useState(false);
    const [editRowData, setEditRowData] = useState<any>(null);
    const [isFixedRateEnabled, setIsFixedRateEnabled] = useState(false);
    const [isFixedStockRateEnabled, setIsFixedStockRateEnabled] =
        useState(false);
    const [selectedPrice, setSelectedPrice] = useState<string | undefined>(
        undefined,
    );
    const [selectedModel, setSelectedModel] = useState<string | undefined>(
        undefined,
    );
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isEURSelected, setIsEURSelected] = useState(false);
    const [selectedTescil, setSelectedTescil] = useState<boolean>(false);
    const [selectedGeçenAy, setSelectedGeçenAy] = useState<boolean>(true);
    const [selectedGirişYapılacakAy, setSelectedGirişYapılacakAy] =
        useState<boolean>(true);
    const [checkedItems, setCheckedItems] = useState<{
        [key: string]: boolean;
    }>({});
    const [showKampanyaFiyat, setShowKampanyaFiyat] = useState(true);
    const [allChecked, setAllChecked] = useState(false); // true yerine false
    const [selectedStock, setSelectedStock] = useState<boolean>(false); // State for Stok Arabaları
    const placeholderText = isFixedRateEnabled ? '33' : 'Kur girin';
    const stockPlaceholderText = isFixedStockRateEnabled ? '61' : 'Kur girin';
    const [modalVisible, setModalVisible] = useState(false);
    const [pastStok, setPastStok] = useState(true);
    const [pastStokKampanya, setPastStokKampanya] = useState(true);
    const [newStok, setNewStok] = useState(true);
    const [newStokKampanya, setNewStokKampanya] = useState(true);
    const [, setCurrentRowIndex] = useState<number | null>(null);
    const [pastTescil, setPastTescil] = useState(true);
    const [newTescil, setNewTescil] = useState(true);
    const [pastListe, setPastListe] = useState(true);
    const [pastKampanya, setPastKampanya] = useState(true);
    const [pastListeEuro, setPastListeEuro] = useState(true);
    const [newListe, setNewListe] = useState(true);
    const [newKampanya, setNewKampanya] = useState(true);
    const [newListeEuro, setNewListeEuro] = useState(true);
    const [pastEuroKur, setPastEuroKur] = useState(true);
    const [newEuroKur, setNewEuroKur] = useState(true);
    const [searchText, setSearchText] = useState<any>({});
    const [, setFilterColumns] = useState<string[]>([]);
    const [searchedColumn, setSearchedColumn] = useState<string | undefined>(
        undefined,
    );

    const [checkedRows, setCheckedRows] = useState<CheckedRows>({});

    const handleDeletePastStok = () => console.log('Past Stok deleted');
    const handleDeletePastStokKampanya = () =>
        console.log('Past Stok Kampanya deleted');
    const handleDeleteNewStok = () => console.log('New Stok deleted');
    const handleDeleteNewStokKampanya = () =>
        console.log('New Stok Kampanya deleted');
    const handleDeletePastTescil = () => console.log('Past Tescil deleted');
    const handleDeleteNewTescil = () => console.log('New Tescil deleted');
    const handleDeletePastListe = () => console.log('Past Liste deleted');
    const handleDeletePastKampanya = () => console.log('Past Kampanya deleted');
    const handleDeletePastListeEuro = () =>
        console.log('Past Liste Euro deleted');
    const handleDeleteNewListe = () => console.log('New Liste deleted');
    const handleDeleteNewKampanya = () => console.log('New Kampanya deleted');
    const handleDeleteNewListeEuro = () =>
        console.log('New Liste Euro deleted');
    const handleDeletePastEuroKur = () => console.log('Past Euro Kur deleted');
    const handleDeleteNewEuroKur = () => console.log('New Euro Kur deleted');

    const renderColumn = (
        title: string,
        checkboxState: boolean,
        setCheckboxState: React.Dispatch<React.SetStateAction<boolean>>,
        dataIndex: string,
        handleInputChangeKey: string,
        className: string,
        className2: string,
        handleDelete: () => void, // Silme işlevi için bir fonksiyon ekleyin
    ) => {
        return checkboxState
            ? [
                  {
                      title: (
                          <div
                              style={{ display: 'flex', alignItems: 'center' }}
                          >
                              {title}
                              <Button
                                  type='text'
                                  icon={<DeleteOutlined />}
                                  onClick={handleDelete}
                                  style={{
                                      width: '40%',
                                      marginLeft: '4px',
                                      border: '0px',
                                      padding: 0,
                                      color: '#ea3f20',
                                  }}
                              />
                              <Checkbox
                                  style={{ marginLeft: '8px' }}
                                  checked={checkboxState}
                                  onChange={() => setCheckboxState(false)}
                              />
                          </div>
                      ),
                      dataIndex,
                      key: dataIndex,
                      className,
                      render: (text: string, record: { key: string }) => (
                          <Input
                              defaultValue={text}
                              onChange={e =>
                                  handleInputChange(
                                      e,
                                      record.key,
                                      handleInputChangeKey,
                                  )
                              }
                              style={{
                                  fontSize: '12px',
                                  height: '24px',
                                  width: '100px',
                                  padding: '4px 8px',
                                  marginLeft: '8px',
                              }}
                          />
                      ),
                  },
              ]
            : [
                  {
                      title: (
                          <div
                              style={{ display: 'flex', alignItems: 'center' }}
                          >
                              <Checkbox
                                  style={{ margin: '0px' }}
                                  checked={false}
                                  onChange={() => setCheckboxState(true)}
                              />
                          </div>
                      ),
                      dataIndex,
                      key: dataIndex,
                      className: className2,
                  },
              ];
    };

    const renderPastStok = () =>
        renderColumn(
            'Liste Fiyat TRL',
            pastStok,
            setPastStok,
            'StokGeçenAyListe',
            'GeçenAy',
            'stock-things-past',
            'past-checkbox',
            handleDeletePastStok,
        );
    const renderPastStokKampanya = () =>
        renderColumn(
            'Kmp.Fiyat TRL',
            pastStokKampanya,
            setPastStokKampanya,
            'StokGeçenAyKampanya',
            'GeçenAy',
            'stock-things-past',
            'past-checkbox',
            handleDeletePastStokKampanya,
        );
    const renderNewStok = () =>
        renderColumn(
            'Liste Fiyat TRL',
            newStok,
            setNewStok,
            'StokGirişYapılacakAyListe',
            'GirişYapılacakAy',
            'stock-things-new',
            'new-checkbox',
            handleDeleteNewStok,
        );
    const renderNewStokKampanya = () =>
        renderColumn(
            'Kmp.Fiyat TRL',
            newStokKampanya,
            setNewStokKampanya,
            'StokGirişYapılacakAyKampanya',
            'GirişYapılacakAy',
            'stock-things-new',
            'new-checkbox',
            handleDeleteNewStokKampanya,
        );
    const renderPastTescil = () =>
        renderColumn(
            'Tescil TRL',
            pastTescil,
            setPastTescil,
            'GeçenAyTescilTRL',
            'GeçenAyTescilTRL',
            'stock-things-past',
            'past-checkbox',
            handleDeletePastTescil,
        );
    const renderNewTescil = () =>
        renderColumn(
            'Tescil TRL',
            newTescil,
            setNewTescil,
            'GirişYapılacakAyTescilTRL',
            'GirişYapılacakAyTescilTRL',
            'stock-things-new',
            'new-checkbox',
            handleDeleteNewTescil,
        );
    const renderPastListe = () =>
        renderColumn(
            'Liste Fiyat TRL',
            pastListe,
            setPastListe,
            'GeçenAyTRL',
            'GeçenAy',
            'stock-things-past  ',
            'past-checkbox',
            handleDeletePastListe,
        );
    const renderPastKampanya = () =>
        renderColumn(
            'Kmp.Fiyat TRL',
            pastKampanya,
            setPastKampanya,
            'GeçenAyKampTRL',
            'GeçenAyKamp',
            'stock-things-past  ',
            'past-checkbox',
            handleDeletePastKampanya,
        );
    const renderPastListeEuro = () =>
        renderColumn(
            'Liste Fiyat EUR',
            pastListeEuro,
            setPastListeEuro,
            'GeçmişAyEUR',
            'GeçmişAyEUR',
            'stock-things-past  ',
            'past-checkbox',
            handleDeletePastListeEuro,
        );
    const renderNewListe = () =>
        renderColumn(
            'Liste Fiyat TRL',
            newListe,
            setNewListe,
            'GirisYapilacakAyTRL',
            'GirisYapilacakAy',
            'stock-things-new  ',
            'new-checkbox',
            handleDeleteNewListe,
        );
    const renderNewKampanya = () =>
        renderColumn(
            'Kmp.Fiyat TRL',
            newKampanya,
            setNewKampanya,
            'GirisYapilacakAyKampTRL',
            'GirisYapilacakAyKamp',
            'stock-things-new  ',
            'new-checkbox',
            handleDeleteNewKampanya,
        );
    const renderNewListeEuro = () =>
        renderColumn(
            'Liste Fiyat EUR',
            newListeEuro,
            setNewListeEuro,
            'GirisYapilacakAyEUR',
            'GirisYapilacakAyEUR',
            'stock-things-new  ',
            'new-checkbox',
            handleDeleteNewListeEuro,
        );
    const renderPastEuroKur = () =>
        renderColumn(
            'EUR Kuru',
            pastEuroKur,
            setPastEuroKur,
            'GeçenAySabitEURKuru',
            'GeçenAySabitEURKuru',
            'stock-things-past  ',
            'past-checkbox',
            handleDeletePastEuroKur,
        );
    const renderNewEuroKur = () =>
        renderColumn(
            'EUR Kuru',
            newEuroKur,
            setNewEuroKur,
            'GirisYapilacakAySabitEURKuru',
            'GirisYapilacakAySabitEURKuru',
            'stock-things-new  ',
            'new-checkbox',
            handleDeleteNewEuroKur,
        );

    const [tableData, setTableData] = useState([
        {
            key: '1',
            SuperCode: '112121',
            'Başlangıç Tarihi': '4',
            Emisyon: 'Eurp 6',
            Koltuk: '5',
            Vites: '',
            Kasa: '',
            Model: '',
            'Alt Model': '',
            Tip: '',
            'Donanım Tipi': '',
            BG: '',
            CCM: '',
            'Şanzıman Tipi': '',
            Kapı: '',
            Tescil: '',
            GeçenAy: '',
        },
    ]);

    const brands = [
        'LEXUS',
        'LINCOLN',
        'LOTUS',
        'LYNK&CO',
        'MAHINDRA',
        'MASERATI',
        'MAXUS',
        'MAZDA',
        'MERCEDES-BENZ',
        'MERCURY',
    ];

    const prices = ['TL', 'EUR'];

    const models = [
        'Hepsi',
        'Continental',
        'Mark',
        'MKS',
        'MKT',
        'Navigator',
        'Town Car',
    ];

    const checkboxes = [
        'SuperCode',
        'Başlangıç Tarihi',
        'Emisyon',
        'Koltuk',
        'Vites',
        'Kasa',
        'Model',
        'Alt Model',
        'Tip',
        'Donanım Tipi',
        'BG',
        'CCM',
        'Şanzıman Tipi',
        'Kapı',
        'Kampanya Fiyat',
    ];

    const handleDonanımEdit = (record: any) => {
        setEditRowData(record);
        setEditDonanımVisible(true);
    };

    const handleEditDonanımClose = () => {
        setEditDonanımVisible(false);
    };

    useEffect(() => {
        const initialCheckedItems = checkboxes.reduce((acc, checkbox) => {
            // Tescil ve Stok Adedi hariç hepsini true yap
            acc[checkbox] = checkbox !== 'Kampanya Fiyat';
            return acc;
        }, {} as { [key: string]: boolean });

        setCheckedItems(initialCheckedItems);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                setCurrentRowIndex(prev => {
                    const newIndex =
                        prev !== null && prev < data.length - 1 ? prev + 1 : 0;
                    setSelectedRowKey(data[newIndex].key);
                    return newIndex;
                });
            } else if (e.key === 'ArrowUp') {
                setCurrentRowIndex(prev => {
                    const newIndex =
                        prev !== null && prev > 0 ? prev - 1 : data.length - 1;
                    setSelectedRowKey(data[newIndex].key);
                    return newIndex;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleRowClick = (record: DataType, index: number) => {
        setSelectedRowKey(record.key);
        setCurrentRowIndex(index);
    };

    const rowClassName = (record: DataType) => {
        return record.key === selectedRowKey ? 'selected-row' : '';
    };

    const handleBrandChange = (value: string) => {
        setSelectedBrand(value);
        setSelectedModel(undefined);
    };

    const handleFixedRateChange = (e: CheckboxChangeEvent) => {
        setIsFixedRateEnabled(e.target.checked);
    };

    const handleFixedStockRateChange = (e: CheckboxChangeEvent) => {
        setIsFixedStockRateEnabled(e.target.checked);
    };

    const handlePriceChange = (value: string) => {
        setSelectedPrice(value);
        setIsEURSelected(value === 'EUR');
    };

    const handleModelChange = (value: string) => {
        setSelectedModel(value);
    };

    const handleDrawerOpen = () => {
        setDrawerVisible(true);
    };

    const handleDrawerClose = () => {
        setDrawerVisible(false);
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        const { name, checked } = e.target;
        const checkboxName = name as string;

        if (checkboxName === 'Kampanya Fiyat') {
            setShowKampanyaFiyat(checked);
        } else {
            setCheckedItems(prev => ({ ...prev, [checkboxName]: checked }));
        }

        if (name === 'Stok Arabaları') {
            setSelectedStock(checked);
        } else if (name === 'Tescil') {
            setSelectedTescil(checked);
        } else if (name === 'Geçen Ay') {
            setSelectedGeçenAy(checked);
        } else if (name === 'Giriş Yapılacak Ay') {
            setSelectedGirişYapılacakAy(checked);
        }
    };

    const handleGeçenAyChange = () => {
        setSelectedGeçenAy(prevState => !prevState);
    };

    const handleGirişYapılacakAyChange = () => {
        setSelectedGirişYapılacakAy(prevState => !prevState);
    };

    const handleDoubleClick = (key: string) => {
        setCheckedRows(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string,
        column: string,
    ) => {
        const newData = [...tableData];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, [column]: e.target.value });
            setTableData(newData);
        }
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
        setFilterColumns(
            Object.keys(checkedItems).filter(key => checkedItems[key]),
        );
        setDrawerVisible(false);
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

    const handleModalOpen = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
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

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={'Search ${dataIndex}'}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys[0], confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Button
                    type='primary'
                    onClick={() =>
                        handleSearch(selectedKeys[0], confirm, dataIndex)
                    }
                    icon={<SearchOutlined />}
                    size='small'
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => handleReset(clearFilters, dataIndex)}
                    size='small'
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value: string, record: any) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : '',
        render: (text: string) =>
            searchedColumn === dataIndex ? <span>{text}</span> : text,
    });

    const getColumns = () => {
        const basicColumns = [
            {
                title: '',
                key: 'basic',
                className: 'small-font-table',
                children: [
                    {
                        title: 'No',
                        dataIndex: 'No',
                        key: 'No',
                        className: 'small-font-table',
                        sorter: (a: any, b: any) => {
                            // 'No' değerlerini sayıya dönüştürerek karşılaştırma yapın
                            return Number(a.No) - Number(b.No);
                        },
                        ...getColumnSearchProps('No'),

                        render: (text: string, record: any) => (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <span>{text}</span>

                                <Checkbox
                                    style={{ marginLeft: 10 }}
                                    checked={checkedRows[record.key] || false}
                                    onChange={() =>
                                        handleDoubleClick(record.key)
                                    }
                                />
                                <Button
                                    style={{
                                        background: '#ea3f20',
                                        marginRight: 5,
                                        width: '75%',
                                        height: 20,
                                        marginLeft: '5px',
                                    }}
                                    type='primary'
                                    icon={
                                        <ToolOutlined
                                            style={{ width: '75%' }}
                                        />
                                    }
                                    onClick={() => handleDonanımEdit(record)}
                                ></Button>
                                <Modal
                                    title='Donanım Ekleme'
                                    visible={editDonanımVisible}
                                    onCancel={handleEditDonanımClose}
                                    footer={null}
                                    width='80%'
                                    style={{ top: 0 }}
                                    bodyStyle={{
                                        height: '90vh',
                                        overflow: 'auto',
                                    }}
                                >
                                    <DonanımEkleme copyChecked={true} />
                                </Modal>
                            </div>
                        ),
                    },
                ],
            },
        ];

        const addCommonColumnProps = (columns: any[]) => {
            return columns.map(col => ({
                ...col,
                onFilter:
                    col.onFilter ||
                    getColumnSearchProps(col.dataIndex).onFilter,
                render: col.render || undefined,
            }));
        };

        const dynamicColumns = Object.keys(checkedItems)
            .filter(
                key =>
                    checkedItems[key] &&
                    key !== 'Stok Arabaları' &&
                    key !== 'Tescil',
            )
            .map(key => ({
                title: '',
                className: 'small-font-table',
                children: [
                    {
                        title: key,
                        dataIndex: key,
                        key: key,
                        className: 'small-font-table',
                        sorter: (a: any, b: any) => {
                            // Sayı veriler için
                            if (
                                typeof a[key] === 'number' &&
                                typeof b[key] === 'number'
                            ) {
                                return a[key] - b[key];
                            }
                            // Metin veriler için
                            return (a[key] || '').localeCompare(b[key] || '');
                        },
                        ...getColumnSearchProps(key),
                        render:
                            key.includes('Stok') || key.includes('Tescil')
                                ? (text: string, record: any) => (
                                      <Input
                                          defaultValue={text}
                                          className='small-font-table'
                                          onChange={e =>
                                              handleInputChange(
                                                  e,
                                                  record.key,
                                                  'GeçenAy',
                                              )
                                          }
                                          style={{
                                              fontSize: '12px',
                                              height: '24px',
                                              width: '100px',
                                              padding: '4px 8px',
                                              marginLeft: '8px',
                                          }}
                                      />
                                  )
                                : undefined,
                        filterDropdown:
                            getColumnSearchProps(key).filterDropdown,
                        filterIcon: getColumnSearchProps(key).filterIcon,
                        onFilter: getColumnSearchProps(key).onFilter,
                    },
                ],
            }));

        if (selectedStock) {
            if (showKampanyaFiyat) {
                if (selectedGeçenAy) {
                    if (pastStok || pastStokKampanya) {
                        dynamicColumns.push({
                            title: 'Stok Geçen Ay',
                            className: 'stock-things-past',
                            children: addCommonColumnProps([
                                ...renderPastStok(),
                                ...renderPastStokKampanya(),
                            ]),
                        });
                    }
                    if (!pastStok && !pastStokKampanya) {
                        dynamicColumns.push({
                            title: '',
                            className: 'past-title',
                            children: addCommonColumnProps([
                                ...renderPastStok(),
                                ...renderPastStokKampanya(),
                            ]),
                        });
                    }
                }
                if (selectedGirişYapılacakAy) {
                    if (newStok || newStokKampanya) {
                        dynamicColumns.push({
                            title: 'Stok Giriş Yapılacak Ay',
                            className: 'stock-things-new',
                            children: addCommonColumnProps([
                                ...renderNewStok(),
                                ...renderNewStokKampanya(),
                            ]),
                        });
                    }
                    if (!newStok && !newStokKampanya) {
                        dynamicColumns.push({
                            title: '',
                            className: 'new-title',
                            children: addCommonColumnProps([
                                ...renderNewStok(),
                                ...renderNewStokKampanya(),
                            ]),
                        });
                    }
                }
            }

            if (!showKampanyaFiyat) {
                if (selectedGeçenAy) {
                    if (pastStok) {
                        dynamicColumns.push({
                            title: 'Stok Geçen Ay',
                            className: 'stock-things-past',
                            children: addCommonColumnProps(renderPastStok()),
                        });
                    }
                    if (!pastStok) {
                        dynamicColumns.push({
                            title: '',
                            className: 'past-title',
                            children: addCommonColumnProps(renderPastStok()),
                        });
                    }
                }
                if (selectedGirişYapılacakAy) {
                    if (newStok) {
                        dynamicColumns.push({
                            title: 'Stok Giriş Yapılacak Ay',
                            className: 'stock-things-new',
                            children: addCommonColumnProps(renderNewStok()),
                        });
                    }
                    if (!newStok) {
                        dynamicColumns.push({
                            title: '',
                            className: 'new-title',
                            children: addCommonColumnProps(renderNewStok()),
                        });
                    }
                }
            }
        }

        if (selectedTescil) {
            if (selectedGeçenAy) {
                if (pastTescil) {
                    dynamicColumns.push({
                        title: 'Geçen Ay',
                        className: 'stock-things-past',
                        children: addCommonColumnProps(renderPastTescil()),
                    });
                }
                if (!pastTescil) {
                    dynamicColumns.push({
                        title: '',
                        className: 'past-title',
                        children: addCommonColumnProps(renderPastTescil()),
                    });
                }
            }
            if (selectedGirişYapılacakAy) {
                if (newTescil) {
                    dynamicColumns.push({
                        title: 'Giriş Yapılacak Ay',
                        className: 'stock-things-new',
                        children: addCommonColumnProps(renderNewTescil()),
                    });
                }
                if (!newTescil) {
                    dynamicColumns.push({
                        title: '',
                        className: 'new-title',
                        children: addCommonColumnProps(renderNewTescil()),
                    });
                }
            }
        }

        const endingColumns = [];
        {
            //Ending Columns
            // Conditional columns based on state
            if (showKampanyaFiyat && isEURSelected) {
                if (selectedGeçenAy) {
                    if (pastListe || pastKampanya || pastListeEuro) {
                        endingColumns.push({
                            title: 'Geçen Ay',
                            className: 'stock-things-past',
                            children: [
                                ...renderPastListe(),
                                ...renderPastKampanya(),
                                ...renderPastListeEuro(),
                            ],
                        });
                    }

                    if (!pastListe && !pastKampanya && !pastListeEuro) {
                        endingColumns.push({
                            title: '',
                            className: 'past-title',
                            children: [
                                ...renderPastListe(),
                                ...renderPastKampanya(),
                                ...renderPastListeEuro(),
                            ],
                        });
                    }
                }

                if (selectedGirişYapılacakAy) {
                    if (newListe || newKampanya || newListeEuro) {
                        endingColumns.push({
                            title: 'Giriş Yapılacak Ay',
                            className: 'stock-things-new  ',
                            children: [
                                ...renderNewListe(),
                                ...renderNewKampanya(),
                                ...renderNewListeEuro(),
                            ],
                        });
                    }

                    if (!newListe && !newKampanya && !newListeEuro) {
                        endingColumns.push({
                            title: '',
                            className: 'new-title',
                            children: [
                                ...renderNewListe(),
                                ...renderNewKampanya(),
                                ...renderNewListeEuro(),
                            ],
                        });
                    }
                }
            }

            if (showKampanyaFiyat && !isEURSelected) {
                if (selectedGeçenAy) {
                    if (pastListe || pastKampanya) {
                        endingColumns.push({
                            title: 'Geçen Ay',
                            className: 'stock-things-past',
                            children: [
                                ...renderPastListe(),
                                ...renderPastKampanya(),
                            ],
                        });
                    }

                    if (!pastListe && !pastKampanya) {
                        endingColumns.push({
                            title: '',
                            className: 'past-title',
                            children: [
                                ...renderPastListe(),
                                ...renderPastKampanya(),
                            ],
                        });
                    }
                }

                if (selectedGirişYapılacakAy) {
                    if (newListe || newKampanya) {
                        endingColumns.push({
                            title: 'Giriş Yapılacak Ay',
                            className: 'stock-things-new  ',
                            children: [
                                ...renderNewListe(),
                                ...renderNewKampanya(),
                            ],
                        });
                    }

                    if (!newListe && !newKampanya) {
                        endingColumns.push({
                            title: '',
                            className: 'new-title',
                            children: [
                                ...renderNewListe(),
                                ...renderNewKampanya(),
                            ],
                        });
                    }
                }
            }

            if (!showKampanyaFiyat && isEURSelected) {
                if (selectedGeçenAy) {
                    if (pastListe || pastListeEuro) {
                        endingColumns.push({
                            title: 'Geçen Ay',
                            className: 'stock-things-past',
                            children: [
                                ...renderPastListe(),
                                ...renderPastListeEuro(),
                            ],
                        });
                    }

                    if (!pastListe && !pastListeEuro) {
                        endingColumns.push({
                            title: '',
                            className: 'past-title',
                            children: [
                                ...renderPastListe(),
                                ...renderPastListeEuro(),
                            ],
                        });
                    }
                }

                if (selectedGirişYapılacakAy) {
                    if (newListe || newListeEuro) {
                        endingColumns.push({
                            title: 'Giriş Yapılacak Ay',
                            className: 'stock-things-new  ',
                            children: [
                                ...renderNewListe(),
                                ...renderNewListeEuro(),
                            ],
                        });
                    }

                    if (!newListe && !newListeEuro) {
                        endingColumns.push({
                            title: '',
                            className: 'new-title',
                            children: [
                                ...renderNewListe(),
                                ...renderNewListeEuro(),
                            ],
                        });
                    }
                }
            }

            if (!showKampanyaFiyat && !isEURSelected) {
                if (selectedGeçenAy) {
                    if (pastListe) {
                        endingColumns.push({
                            title: 'Geçen Ay',
                            className: 'stock-things-past',
                            children: [...renderPastListe()],
                        });
                    }

                    if (!pastListe) {
                        endingColumns.push({
                            title: '',
                            className: 'past-title',
                            children: [...renderPastListe()],
                        });
                    }
                }

                if (selectedGirişYapılacakAy) {
                    if (newListe) {
                        endingColumns.push({
                            title: 'Giriş Yapılacak Ay',
                            className: 'stock-things-new  ',
                            children: [...renderNewListe()],
                        });
                    }

                    if (!newListe) {
                        endingColumns.push({
                            title: '',
                            className: 'new-title',
                            children: [...renderNewListe()],
                        });
                    }
                }
            }

            if (isEURSelected) {
                if (selectedGeçenAy) {
                    if (pastEuroKur) {
                        endingColumns.push({
                            title: 'Geçen Ay',
                            className: 'stock-things-past  ',
                            children: [...renderPastEuroKur()],
                        });
                    }
                    if (!pastEuroKur) {
                        endingColumns.push({
                            title: '',
                            className: 'past-title',
                            children: [...renderPastEuroKur()],
                        });
                    }
                }

                if (selectedGirişYapılacakAy) {
                    if (newEuroKur) {
                        endingColumns.push({
                            title: 'Giriş Yapılacak Ay',
                            className: 'stock-things-new  ',
                            children: [...renderNewEuroKur()],
                        });
                    }
                    if (!newEuroKur) {
                        endingColumns.push({
                            title: '',
                            className: 'new-title',
                            children: [...renderNewEuroKur()],
                        });
                    }
                }
            }
        }

        const actionColumn = [
            {
                title: '',
                key: 'action',
                className: 'small-font-table',
                render: (_: any) => (
                    <>
                        <Button
                            style={{
                                backgroundColor: '#ea3f20',
                                margin: '2px',
                            }}
                            size='small'
                            type='primary'
                            onClick={handleModalOpen}
                            className='small-font-table'
                            icon={<HistoryOutlined />}
                        ></Button>

                        <Modal
                            title='Fiyat Tarihçesi'
                            visible={modalVisible}
                            width={'80%'}
                            bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
                            onOk={handleModalClose}
                            okButtonProps={{
                                style: { backgroundColor: '#ea3f20' },
                            }}
                            onCancel={handleModalClose}
                        >
                            <FiyatTarihce
                                rowData={editRowData}
                                setCopyChecked={true}
                            />
                        </Modal>
                    </>
                ),
            },
        ];

        return [
            ...basicColumns,
            ...dynamicColumns,
            ...endingColumns,
            ...actionColumn,
        ];
    };

    const data = [
        {
            key: '1',
            No: '1',
            SuperCode: '1234',
            BaşlangıçTarihi: '04.08.2024',
            Emisyon: 'Euro 6',
            Koltuk: 5,
            Kasa: 'Hatchback',
            Model: '1Serisi	',
            AltModel: '2020',
            Tip: 'TipA',
            DonanımTipi: 'Premium',
            Vites: 'Otomatik',
            BG: 150,
            CCM: 2000,
            ŞanzımanTipi: 'Otomatik',
            Kapı: 4,
            KampanyaFiyat: 500000,
            StokAdedi: 2123,
            GeçenAy: '500000',
            GeçenAyKamp: '500000',
            GirisYapilacakAy: '',
            GirisYapilacakAyKapm: '',
            GeçenAyEUR: '',
            GeçenAySabitEURKuru: '',
            GirisYapilacakAyEUR: '',
            GirisYapilacakAySabitEURKuru: '',
        },
        {
            key: '2',
            No: '2',
            SuperCode: '1234',
            BaşlangıçTarihi: '04.08.2024',
            Emisyon: 'Euro 6',
            Koltuk: 5,
            Kasa: 'Sedan',
            Model: '1Serisi	',
            AltModel: '2020',
            Tip: 'TipA',
            DonanımTipi: 'Premium',
            Vites: 'Otomatik',
            BG: 150,
            CCM: 2000,
            ŞanzımanTipi: 'Otomatik',
            Kapı: 4,
            KampanyaFiyat: 500000,
            StokAdedi: 2123,
            GeçenAy: '500000',
            GeçenAyKamp: '480000',
            GirisYapilacakAy: '',
            GirisYapilacakAyKapm: '',
        },
        {
            key: '3',
            No: '3',
            SuperCode: '1234',
            BaşlangıçTarihi: '04.08.2024',
            Emisyon: 'Euro 6',
            Koltuk: 5,
            Kasa: 'Hatchback',
            Model: '1Serisi	',
            AltModel: '2020',
            Tip: 'TipA',
            DonanımTipi: 'Premium',
            Vites: 'Otomatik',
            BG: 150,
            CCM: 2000,
            ŞanzımanTipi: 'Otomatik',
            Kapı: 4,
            KampanyaFiyat: 500000,
            StokAdedi: 2123,
            GeçenAy: '590000',
            GeçenAyKamp: '500000',
            GirisYapilacakAy: '',
            GirisYapilacakAyKapm: '',
        },
        {
            key: '4',
            No: '4',
            SuperCode: '1234',
            BaşlangıçTarihi: '04.08.2024',
            Emisyon: 'Euro 6',
            Koltuk: 5,
            Kasa: 'Sedan',
            Model: '1Serisi	',
            AltModel: '2020',
            Tip: 'TipA',
            DonanımTipi: 'Premium',
            Vites: 'Otomatik',
            BG: 150,
            CCM: 2000,
            ŞanzımanTipi: 'Otomatik',
            Kapı: 4,
            KampanyaFiyat: 500000,
            StokAdedi: 2123,
            Tescil: '',
            GeçenAy: '570000',
            GeçenAyKamp: '',
            GirisYapilacakAy: '',
            GirisYapilacakAyKapm: '',
        },
    ];

    return (
        <div style={{ padding: '0px', width: '100%' }}>
            <Collapse>
                <Panel
                    header='Fiyat Girişi'
                    key='1'
                    style={{
                        textAlign: 'left',
                        border: '1px solid #e9e9e9',
                        borderRadius: '4px',
                        marginTop: 1,
                    }}
                >
                    <h2>Araç Fiyatlandırma</h2>
                    <Row gutter={16} style={{ marginBottom: '20px' }}>
                        <Col span={6}>
                            Araç Tipi
                            <Select
                                defaultValue='Hepsi'
                                style={{ width: '100%', textAlign: 'left' }}
                            >
                                <Option value='Hepsi'>Hepsi</Option>
                                <Option value='Binek'>Binek</Option>
                                <Option value='HafifTicari'>
                                    Hafif Ticari
                                </Option>
                                <Option value='Suv'>SUV / 4x4</Option>
                            </Select>
                        </Col>

                        <Col span={6}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Marka
                            </label>
                            <Select
                                mode='multiple'
                                showSearch
                                style={{ width: '100%' }}
                                placeholder='Marka seçin'
                                optionFilterProp='children'
                                onChange={handleBrandChange}
                                value={selectedBrand}
                            >
                                {brands.map(brand => (
                                    <Option key={brand} value={brand}>
                                        {brand}
                                    </Option>
                                ))}
                            </Select>
                        </Col>

                        <Col span={6}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Model
                            </label>
                            <Select
                                showSearch
                                style={{ width: '100%', textAlign: 'left' }}
                                placeholder='Model seçin'
                                optionFilterProp='children'
                                onChange={handleModelChange}
                                value={selectedModel}
                            >
                                {models.map(model => (
                                    <Option key={model} value={model}>
                                        {model}
                                    </Option>
                                ))}
                            </Select>
                        </Col>

                        <Col span={5}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Supercode
                            </label>
                            <Input style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={4}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Giriş Tarihi
                            </label>
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder='Giriş Tarihi Seçin'
                            />
                        </Col>

                        <Col span={4}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Fiyat Ayı
                            </label>
                            <DatePicker
                                picker='month'
                                style={{ width: '100%' }}
                                placeholder='Fiyat Ayı Seçin'
                            />
                        </Col>

                        <Col span={4}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Marka Yayın Tarihi
                            </label>
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder='Marka Yayın Tarihi Seçin'
                            />
                        </Col>

                        <Col span={6} style={{ textAlign: 'left' }}>
                            Sabit Kur
                            <Checkbox
                                onChange={handleFixedRateChange}
                                style={{ marginLeft: 10 }}
                            />
                            <Form.Item>
                                <Input
                                    style={{ float: 'left' }}
                                    placeholder={placeholderText}
                                    disabled={isFixedRateEnabled}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={5} style={{ textAlign: 'left' }}>
                            Sabit Stok Kur
                            <Checkbox
                                onChange={handleFixedStockRateChange}
                                style={{ marginLeft: 10 }}
                            />
                            <Form.Item>
                                <Input
                                    style={{ float: 'left' }}
                                    placeholder={stockPlaceholderText}
                                    disabled={isFixedStockRateEnabled}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row
                        gutter={16}
                        style={{ marginBottom: '20px', textAlign: 'left' }}
                    >
                        <Col span={4}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Birim
                            </label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder='Birim seçin'
                                optionFilterProp='children'
                                onChange={handlePriceChange}
                                value={selectedPrice}
                            >
                                {prices.map(price => (
                                    <Option key={price} value={price}>
                                        {price}
                                    </Option>
                                ))}
                            </Select>
                        </Col>

                        <Col span={4}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Güncel Fiyat
                            </label>
                            <Input style={{ width: '100%' }} />
                        </Col>

                        <Col span={4}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Geçen Ay Fiyat
                            </label>
                            <Input style={{ width: '100%' }} />
                        </Col>

                        <Col span={2}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Stok Arabaları
                            </label>
                            <Checkbox
                                name='Stok Arabaları'
                                onChange={handleCheckboxChange}
                                checked={
                                    checkedItems['Stok Arabaları'] || false
                                }
                                style={{ float: 'left' }}
                            />
                        </Col>

                        <Col span={2}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Tescil
                            </label>
                            <Checkbox
                                name='Tescil'
                                onChange={handleCheckboxChange}
                                checked={selectedTescil}
                                style={{ float: 'left' }}
                            />
                        </Col>
                        <Col span={3}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Geçen Ay Fiyatlarını Kopyala
                            </label>
                            <Checkbox
                                // onChange={}
                                style={{ float: 'left' }}
                            />
                        </Col>

                        <Col span={4}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Bu Ay Girilen Fiyatları Kopyala
                            </label>
                            <Checkbox
                                // onChange={}
                                style={{ float: 'left' }}
                            />
                        </Col>
                    </Row>

                    <Row
                        gutter={16}
                        style={{ marginBottom: '20px', textAlign: 'left' }}
                    >
                        <Col span={2}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Geçen Ay
                            </label>
                            <Checkbox
                                name='Geçen Ay'
                                onChange={handleGeçenAyChange}
                                checked={selectedGeçenAy}
                                style={{ float: 'left' }}
                            />
                        </Col>
                        <Col span={2}>
                            <label
                                style={{ display: 'block', textAlign: 'left' }}
                            >
                                Giriş Yapılacak Ay
                            </label>
                            <Checkbox
                                name='Giriş Yapılacak Ay'
                                onChange={handleGirişYapılacakAyChange}
                                checked={selectedGirişYapılacakAy}
                                style={{ float: 'left' }}
                            />
                        </Col>
                        <Col span={16} style={{ marginLeft: '65px' }}>
                            <div
                                style={{
                                    marginTop: '20px',
                                    float: 'right',
                                    marginLeft: '10px',
                                }}
                            >
                                <Button
                                    type='primary'
                                    onClick={handleDrawerOpen}
                                    style={{
                                        marginLeft: '110px',
                                        backgroundColor: '#ea3f20',
                                        borderColor: '#555555',
                                    }}
                                >
                                    Tablo Başlıkları
                                </Button>
                            </div>
                        </Col>
                        <Col span={3} style={{}}>
                            <div style={{ marginTop: '20px' }}>
                                <Button
                                    type='primary'
                                    style={{
                                        width: '60%',
                                        backgroundColor: '#ea3f20',
                                        borderColor: '#555555',
                                    }}
                                >
                                    Listele
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>

            <Drawer
                title='Tablo Başlıkları'
                placement='right'
                onClose={handleDrawerClose}
                visible={drawerVisible}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Button
                            onClick={handleConfirm}
                            type='primary'
                            style={{
                                backgroundColor: '#ea3f20',
                                borderColor: '#555555',
                            }}
                        >
                            Onayla
                        </Button>
                    </div>
                }
            >
                <Checkbox onChange={handleCheckAllChange} checked={allChecked}>
                    Hepsini Seç/Kapat
                </Checkbox>
                <br />
                {checkboxes.map(checkbox => (
                    <React.Fragment key={checkbox}>
                        {checkbox === 'Kampanya Fiyat' ? (
                            <Checkbox
                                name={checkbox}
                                onChange={handleCheckboxChange}
                                checked={showKampanyaFiyat}
                            >
                                {checkbox}
                            </Checkbox>
                        ) : (
                            <Checkbox
                                name={checkbox}
                                onChange={handleCheckboxChange}
                                checked={checkedItems[checkbox] || false}
                            >
                                {checkbox}
                            </Checkbox>
                        )}
                        <br />
                    </React.Fragment>
                ))}
            </Drawer>

            <h2 style={{ textAlign: 'left', marginTop: '20px' }}>
                Fiyat Tablosu
            </h2>
            <Table
                className=''
                style={{ marginTop: '20px' }}
                size='small'
                columns={getColumns()}
                dataSource={data}
                scroll={{ x: 'max-content' }}
                rowClassName={rowClassName}
                onRow={(record, index) => ({
                    onClick: () => handleRowClick(record, index!),
                    onDoubleClick: () => handleDoubleClick(record.key),
                })}
            />
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <Button
                    type='primary'
                    onClick={handlePrint}
                    style={{
                        backgroundColor: '#ea3f20',
                        borderColor: '#555555',
                        marginRight: '10px',
                    }}
                >
                    Yazdır
                </Button>
                <Button
                    type='primary'
                    onClick={handleExportToExcel}
                    style={{
                        backgroundColor: '#ea3f20',
                        borderColor: '#555555',
                        marginRight: '10px',
                    }}
                >
                    Excel'e Aktar
                </Button>
                <Button
                    type='primary'
                    //onClick={}
                    style={{
                        backgroundColor: '#ea3f20',
                        borderColor: '#555555',
                    }}
                >
                    Kaydet
                </Button>
            </div>
        </div>
    );
};

export default FiyatGirisi;


