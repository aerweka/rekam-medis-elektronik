import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Descriptions, 
  Tabs, 
  Table,
  Tag,
  Empty,
  Spin,
  Typography,
  Divider,
  message
} from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import api from '../../services/api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const RekamMedisDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [encounters, setEncounters] = useState([]);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  useEffect(() => {
    if (activeTab === 'history' && id) {
      fetchEncounters();
    }
  }, [activeTab, id]);

  const fetchPatientData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/rekam-medis/${id}`);
      setPatient(response.data);
    } catch (error) {
      message.error('Gagal memuat data pasien');
    } finally {
      setLoading(false);
    }
  };

  const fetchEncounters = async () => {
    try {
      const response = await api.get(`/api/rekam-medis/${id}/encounters`);
      setEncounters(response.data);
    } catch (error) {
      console.error('Error fetching encounters:', error);
    }
  };

  if (loading || !patient) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  const encounterColumns = [
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Jenis Kunjungan',
      dataIndex: 'jenis',
      key: 'jenis',
      render: (jenis) => (
        <Tag color={
          jenis === 'Rawat Jalan' ? 'blue' :
          jenis === 'Rawat Inap' ? 'purple' :
          jenis === 'IGD' ? 'red' : 'default'
        }>
          {jenis}
        </Tag>
      ),
    },
    {
      title: 'Poliklinik/Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Dokter',
      dataIndex: 'dokter',
      key: 'dokter',
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Selesai' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
  ];

  const items = [
    {
      key: 'info',
      label: 'Informasi Pasien',
      children: (
        <Descriptions bordered column={{ xs: 1, sm: 2, lg: 2 }}>
          <Descriptions.Item label="No. RM">{patient.no_rm}</Descriptions.Item>
          <Descriptions.Item label="NIK">{patient.nik}</Descriptions.Item>
          <Descriptions.Item label="Nama">{patient.nama}</Descriptions.Item>
          <Descriptions.Item label="Jenis Kelamin">
            {patient.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
          </Descriptions.Item>
          <Descriptions.Item label="Tanggal Lahir">
            {patient.tanggal_lahir ? dayjs(patient.tanggal_lahir).format('DD/MM/YYYY') : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Umur">{patient.umur} tahun</Descriptions.Item>
          <Descriptions.Item label="Golongan Darah">
            {patient.golongan_darah || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Agama">{patient.agama || '-'}</Descriptions.Item>
          <Descriptions.Item label="No. Telepon">{patient.no_telp || '-'}</Descriptions.Item>
          <Descriptions.Item label="Status Perkawinan">
            {patient.status_perkawinan || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Pekerjaan" span={2}>
            {patient.pekerjaan || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Alamat" span={2}>
            {patient.alamat || '-'}
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: 'history',
      label: 'Riwayat Kunjungan',
      children: (
        <Spin spinning={loading}>
          {encounters.length > 0 ? (
            <Table
              columns={encounterColumns}
              dataSource={encounters}
              rowKey="id"
              size="small"
            />
          ) : (
            <Empty description="Belum ada riwayat kunjungan" />
          )}
        </Spin>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <Link to="/rekam-medis">
            <Button icon={<ArrowLeftOutlined />}>
              Kembali
            </Button>
          </Link>
          <Link to={`/rekam-medis/${id}/edit`}>
            <Button type="primary" icon={<EditOutlined />}>
              Edit Data
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <Title level={4} className="!mb-1">{patient.nama}</Title>
          <Text type="secondary">No. RM: {patient.no_rm}</Text>
        </div>

        <Divider />

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          type="card"
        />
      </Card>
    </div>
  );
};

export default RekamMedisDetails;
