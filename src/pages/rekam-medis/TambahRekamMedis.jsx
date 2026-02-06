import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Select, 
  DatePicker,
  Radio,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  message
} from 'antd';
import { 
  SaveOutlined, 
  ArrowLeftOutlined,
  UserOutlined,
  IdcardOutlined,
  HomeOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import api from '../../services/api';

const { Title, Text } = Typography;
const { Option } = Select;

const TambahRekamMedis = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.post('/api/rekam-medis', {
        ...values,
        tanggal_lahir: values.tanggal_lahir ? values.tanggal_lahir.format('YYYY-MM-DD') : null,
      });
      message.success('Data pasien berhasil disimpan');
      navigate('/rekam-medis');
    } catch (error) {
      message.error(error.response?.data?.message || 'Gagal menyimpan data pasien');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <div className="mb-6">
          <Link to="/rekam-medis">
            <Button icon={<ArrowLeftOutlined />}>
              Kembali
            </Button>
          </Link>
        </div>

        <Title level={4} className="mb-6">Formulir Data Pasien Baru</Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Nama Lengkap"
                name="nama"
                rules={[{ required: true, message: 'Nama wajib diisi' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Masukkan nama lengkap"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="NIK"
                name="nik"
                rules={[
                  { required: true, message: 'NIK wajib diisi' },
                  { len: 16, message: 'NIK harus 16 digit' }
                ]}
              >
                <Input
                  prefix={<IdcardOutlined />}
                  placeholder="Masukkan NIK (16 digit)"
                  maxLength={16}
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="No. Kartu Keluarga"
                name="no_kk"
              >
                <Input
                  placeholder="Masukkan No. KK"
                  maxLength={16}
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Tanggal Lahir"
                name="tanggal_lahir"
                rules={[{ required: true, message: 'Tanggal lahir wajib diisi' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Pilih tanggal lahir"
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Jenis Kelamin"
                name="jenis_kelamin"
                rules={[{ required: true, message: 'Jenis kelamin wajib dipilih' }]}
              >
                <Radio.Group>
                  <Radio.Button value="L">Laki-laki</Radio.Button>
                  <Radio.Button value="P">Perempuan</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Golongan Darah"
                name="golongan_darah"
              >
                <Select
                  placeholder="Pilih golongan darah"
                  allowClear
                >
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="AB">AB</Option>
                  <Option value="O">O</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Alamat Lengkap"
                name="alamat"
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Masukkan alamat lengkap"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="No. Telepon"
                name="no_telp"
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Masukkan nomor telepon"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Agama"
                name="agama"
              >
                <Select
                  placeholder="Pilih agama"
                  allowClear
                >
                  <Option value="Islam">Islam</Option>
                  <Option value="Kristen">Kristen</Option>
                  <Option value="Katolik">Katolik</Option>
                  <Option value="Hindu">Hindu</Option>
                  <Option value="Budha">Budha</Option>
                  <Option value="Konghucu">Konghucu</Option>
                  <Option value="Lainnya">Lainnya</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Status Perkawinan"
                name="status_perkawinan"
              >
                <Select
                  placeholder="Pilih status perkawinan"
                  allowClear
                >
                  <Option value="Belum Kawin">Belum Kawin</Option>
                  <Option value="Kawin">Kawin</Option>
                  <Option value="Cerai Hidup">Cerai Hidup</Option>
                  <Option value="Cerai Mati">Cerai Mati</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Pekerjaan"
                name="pekerjaan"
              >
                <Input
                  placeholder="Masukkan pekerjaan"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="large"
                className="bg-blue-600"
              >
                Simpan Data Pasien
              </Button>
              <Link to="/rekam-medis">
                <Button size="large">
                  Batal
                </Button>
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TambahRekamMedis;
