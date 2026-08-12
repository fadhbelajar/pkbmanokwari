# DPC PKB Manokwari - Panduan Database

## Setup MySQL / phpMyAdmin

### 1. Buat Database
Buka phpMyAdmin dan buat database baru:
```sql
CREATE DATABASE pkbmanokwari CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

### 2. Import Schema
Pilih database `pkbmanokwari`, lalu import file `database/schema.sql`.

### 3. Konfigurasi API
Edit file `api/config.php` dan sesuaikan kredensial:
```php
$DB_HOST = 'localhost';
$DB_NAME = 'pkbmanokwari';
$DB_USER = 'root';
$DB_PASS = '';
```

### 4. Konfigurasi Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost/api
```
Jika frontend di-deploy di domain berbeda dengan API, sesuaikan CORS di `api/config.php`.

### 5. Deploy API
Upload folder `api/` ke hosting PHP Anda. Pastikan PHP mendukung PDO MySQL ekstensi.

## API Endpoints

| Endpoint | Method | Deskripsi |
|---|---|---|
| `settings.php` | GET | Ambil pengaturan situs |
| `settings.php` | POST/PUT | Simpan pengaturan |
| `leaders.php` | GET | Daftar semua pengurus |
| `leaders.php?id=X` | PUT | Update pengurus |
| `leaders.php?id=X` | DELETE | Hapus pengurus |
| `news.php` | GET | Daftar berita (tanpa content) |
| `news.php` | POST | Tambah berita |
| `news.php?id=X` | GET | Detail berita |
| `news.php?id=X` | PUT | Update berita |
| `news.php?id=X` | DELETE | Hapus berita |
| `gallery.php` | GET/POST | CRUD galeri foto |
| `videos.php` | GET/POST | CRUD video |
| `accounts.php` | GET/POST | CRUD akun admin |
| `backup.php` | GET | Ambil backup terbaru |
| `backup.php` | POST | Backup ke database |

## Akun Default
- Username: `admin`
- Password: `admin123`
