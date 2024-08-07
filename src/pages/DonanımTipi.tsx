import React, { useState } from 'react';
import { Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DonanımTipi {
    no: number;
    markaId: number;
    donanımTipi: string;
}

interface Marka {
    id: number;
    name: string;
}

const markaList: Marka[] = [
    { id: 1, name: 'Marka 1' },
    { id: 2, name: 'Marka 2' },
    // Diğer markalar...
];

const donanımTipiData: DonanımTipi[] = [
    { no: 1, markaId: 1, donanımTipi: 'Marka 1 - Donanım Tipi 1' },
    { no: 2, markaId: 1, donanımTipi: 'Marka 1 - Donanım Tipi 2' },
    { no: 3, markaId: 2, donanımTipi: 'Marka 2 - Donanım Tipi 1' },
    { no: 4, markaId: 2, donanımTipi: 'Marka 2 - Donanım Tipi 2' },
    // Diğer donanım tipleri...
];

const DonanımTipi: React.FC = () => {
    const [selectedMarkaId, setSelectedMarkaId] = useState<number | undefined>(undefined);

    const handleMarkaChange = (value: string) => {
        const selectedMarka = markaList.find(marka => marka.name === value);
        setSelectedMarkaId(selectedMarka?.id);
    };

    const filteredData = donanımTipiData.filter(item =>
        selectedMarkaId === undefined || item.markaId === selectedMarkaId
    );

    const columns: ColumnsType<DonanımTipi> = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            sorter: (a, b) => a.no - b.no,
        },
        {
            title: 'Donanım Tipi',
            dataIndex: 'donanımTipi',
            key: 'donanımTipi',
            sorter: (a, b) => a.donanımTipi.localeCompare(b.donanımTipi),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <Select
                placeholder="Marka Seçin"
                style={{ width: 200, marginBottom: 16 }}
                onChange={handleMarkaChange}
            >
                {markaList.map(marka => (
                    <Select.Option key={marka.id} value={marka.name}>
                        {marka.name}
                    </Select.Option>
                ))}
            </Select>
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="no"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default DonanımTipi;
