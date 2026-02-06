# E-Health Dio - Electronic Health Record System

A standalone React 18 frontend application for Electronic Health Record (EHR) System with Ant Design UI, designed for RS Unipdu Medika.

## Project Structure

```
e-health-dio/
├── backend-archive/          # Laravel backend (archived for reference)
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   └── layouts/
│   │       ├── AuthenticatedLayout.jsx
│   │       └── GuestLayout.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── rekam-medis/
│   │   │   ├── RekamMedis.jsx
│   │   │   ├── RekamMedisDetails.jsx
│   │   │   └── TambahRekamMedis.jsx
│   │   ├── rawat-jalan/
│   │   │   └── RawatJalan.jsx
│   │   ├── rawat-inap/
│   │   │   └── RawatInap.jsx
│   │   ├── gawat-darurat/
│   │   │   └── GawatDarurat.jsx
│   │   ├── user-management/
│   │   │   ├── UserManagement.jsx
│   │   │   ├── TambahUser.jsx
│   │   │   └── EditUser.jsx
│   │   ├── profile/
│   │   │   ├── Profile.jsx
│   │   │   ├── UpdateProfileInformation.jsx
│   │   │   └── UpdatePasswordForm.jsx
│   │   ├── Dashboard.jsx
│   │   └── Welcome.jsx
│   ├── router/
│   │   └── index.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Technology Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0
- **UI Library**: Ant Design 5.12.0
- **Charts**: @ant-design/charts 2.0
- **Routing**: React Router DOM 6.20
- **HTTP Client**: Axios 1.6
- **Date**: Day.js 1.11
- **Styling**: Tailwind CSS 3.3 + Ant Design

## Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

## Installation

1. Clone or navigate to the project directory:
```bash
cd e-health-dio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```
VITE_API_URL=http://localhost:8000
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Features

### Authentication
- Login with email/password
- JWT token storage
- Protected routes
- Forgot password

### Dashboard
- Statistics cards (active patients, new patients, total patients)
- Monthly patient charts (Column chart)
- Age distribution (Pie/Donut chart)

### Medical Records (Rekam Medis)
- Patient list with pagination and search
- Add new patient
- View patient details
- Patient visit history

### Outpatient (Rawat Jalan)
- Visit list with status tracking
- Search and pagination

### Inpatient (Rawat Inap)
- Patient list
- Room statistics
- Status tracking

### Emergency (Gawat Darurat/IGD)
- Triage system (Gawat Darurat, Urgent, Semi-Urgent, Non-Urgent)
- Real-time status updates
- Emergency patient list

### User Management
- User list with roles
- Add/Edit/Delete users
- Role-based access control

### Profile
- Update profile information
- Change password

## API Integration

The frontend expects a REST API with the following endpoints:

### Authentication
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `POST /api/forgot-password` - Forgot password
- `GET /api/user` - Get current user

### Dashboard
- `GET /api/analytics/pasien-dirawat` - Active patients today
- `GET /api/analytics/pasien-baru-bulan-ini` - New patients this month
- `GET /api/analytics/jumlah-pasien` - Total patients
- `GET /api/analytics/pasien-per-bulan` - Monthly patient data
- `GET /api/analytics/sebaran-usia-pasien` - Age distribution
- `GET /api/analytics/rawat-inap-stats` - Inpatient stats
- `GET /api/analytics/gawat-darurat-stats` - Emergency stats

### Medical Records
- `GET /api/rekam-medis` - List patients
- `POST /api/rekam-medis` - Create patient
- `GET /api/rekam-medis/:id` - Get patient details
- `PUT /api/rekam-medis/:id` - Update patient
- `GET /api/rekam-medis/:id/encounters` - Get patient visits

### Outpatient
- `GET /api/rawat-jalan` - List visits

### Inpatient
- `GET /api/rawat-inap` - List patients

### Emergency
- `GET /api/gawat-darurat` - List patients

### User Management
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/roles` - List roles

### Profile
- `PUT /api/profile` - Update profile
- `PUT /api/password` - Update password

## Customization

### Theme
Ant Design theme can be customized in `src/main.jsx`:

```javascript
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
      fontFamily: 'Inter, sans-serif',
    },
  }}
>
```

### Tailwind CSS
Tailwind configuration is in `tailwind.config.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Credits

Developed for RS Unipdu Medika
