-- Database: pkbmanokwari
-- Import via phpMyAdmin: pilih database pkbmanokwari, lalu import file ini

CREATE TABLE IF NOT EXISTS site_settings (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
  data TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leaders (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  photo TEXT,
  bio TEXT,
  order_num INT DEFAULT 0,
  party_number VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  image TEXT,
  date DATE NOT NULL,
  category VARCHAR(100),
  slug VARCHAR(255) UNIQUE,
  auto_share_platforms TEXT,
  shared_to TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT LIMITED gallery_items (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS video_links (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  thumbnail TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accounts (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_backup (
  id VARCHAR(50) PRIMARY KEY,
  data LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default site settings
INSERT IGNORE INTO site_settings (id, data) VALUES (
  'main',
  '{"siteName":"DPC PKB Manokwari","tagline":"Bersama Membangun Manokwari Sejahtera","logo":"/images/Logo_PKB_2024.png","primaryColor":"#008c44","phone":"(0986) 212-XXX","email":"dpc.pkb.manokwari@gmail.com","address":"Jl. Brawijaya No. 10, Manokwari, Papua Barat 98312","whatsappNumber":"6281234567890","vision":"Mewujudkan masyarakat Kabupaten Manokwari yang adil, makmur, sejahtera, dan bermartabat berdasarkan nilai-nilai Pancasila dan ajaran Islam Ahlussunnah Wal Jamaah.","mission":["Memperkuat struktur dan konsolidasi organisasi partai di seluruh wilayah Kabupaten Manokwari","Meningkatkan kualitas kader partai yang berintegritas, kompeten, dan berdedikasi tinggi","Memperjuangkan aspirasi rakyat Manokwari melalui jalur politik yang demokratis dan konstitusional","Mendorong pembangunan ekonomi kerakyatan yang berkeadilan dan berkelanjutan","Menjaga persatuan dan kerukunan antar umat beragama serta melestarikan nilai-nilai kearifan lokal"],"aboutText":"DPC PKB Manokwari adalah Dewan Pimpinan Cabang Partai Kebangkitan Bangsa di Kabupaten Manokwari, Papua Barat. Kami berkomitmen untuk memperjuangkan kepentingan rakyat dan membangun Manokwari yang lebih baik melalui politik yang bersih, jujur, dan berintegritas.","chairmanName":"H. Abdul Rahman, S.H., M.H.","chairmanPosition":"Ketua DPC PKB Manokwari","chairmanPhoto":"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400","chairmanMessage":"Selamat datang di website resmi DPC PKB Manokwari. Sebagai sebuah partai yang berpihat pada Pancasila dan berkomitmen untuk rakyat Manokwari, kami terus bergerak memperjuangkan kepentingan seluruh warga. Melalui website ini, kami ingin menghadirkan transparansi dan keterbukaan dalam setiap langkah yang kami ambil demi Manokwari yang lebih adil, makmur, dan sejahtera.","socialMedia":{"facebook":"https://facebook.com/dpcpkbmanokwari","instagram":"https://instagram.com/dpcpkbmanokwari","youtube":"https://youtube.com/@dpcpkbmanokwari","tiktok":"https://tiktok.com/@dpcpkbmanokwari","twitter":"https://twitter.com/dpcpkbmanokwari"}}'
);

-- Insert default admin account (password: admin123 hashed)
INSERT IGNORE INTO accounts (id, username, password, email, role) VALUES
  ('1', 'admin', 'admin123', 'admin@pkbmanokwari.id', 'admin');
