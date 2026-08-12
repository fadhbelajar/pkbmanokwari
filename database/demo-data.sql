-- Demo data untuk database pkbmanokwari
-- Import setelah schema.sql

-- Clear existing data (downtime)
DELETE FROM news;
DELETE FROM leaders;
DELETE FROM gallery_items;
DELETE FROM video_links;

-- Reset site_settings dengan data lengkap
UPDATE site_settings SET data = '{"siteName":"DPC PKB Manokwari","tagline":"Bersama Membangun Manokwari Sejahtera","logo":"/images/Logo_PKB_2024.png","primaryColor":"#008c44","phone":"(0986) 212-1234","email":"dpc.pkb.manokwari@gmail.com","address":"Jl. Brawijaya No. 10, Manokwari, Papua Barat 98312","whatsappNumber":"6281234567890","vision":"Mewujudkan masyarakat Kabupaten Manokwari yang adil, makmur, sejahtera, dan bermartabat berdasarkan nilai-nilai Pancasila dan ajaran Islam Ahlussunnah Wal Jamaah.","mission":["Memperkuat struktur dan konsolidasi organisasi partai di seluruh wilayah Kabupaten Manokwari","Meningkatkan kualitas kader partai yang berintegritas, kompeten, dan berdedikasi tinggi","Memperjuangkan aspirasi rakyat Manokwari melalui jalur politik yang demokratis dan konstitusional","Mendorong pembangunan ekonomi kerakyatan yang berkeadilan dan berkelanjutan","Menjaga persatuan dan kerukunan antar umat beragama serta melestarikan nilai-nilai kearifan lokal"],"aboutText":"DPC PKB Manokwari adalah Dewan Pimpinan Cabang Partai Kebangkitan Bangsa di Kabupaten Manokwari, Papua Barat. Kami berkomitmen untuk memperjuangkan kepentingan rakyat dan membangun Manokwari yang lebih baik.","chairmanName":"H. Abdul Rahman, S.H., M.H.","chairmanPosition":"Ketua DPC PKB Manokwari","chairmanPhoto":"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400","chairmanMessage":"Selamat datang di website resmi DPC PKB Manokwari. Kami terus bergerak memperjuangkan kepentingan seluruh warga.","socialMedia":{"facebook":"https://facebook.com/dpcpkbmanokwari","instagram":"https://instagram.com/dpcpkbmanokwari","youtube":"https://youtube.com/@dpcpkbmanokwari","tiktok":"https://tiktok.com/@dpcpkbmanokwari","twitter":"https://twitter.com/dpcpkbmanokwari"}}' WHERE id = 'main';

-- Leader data (7 pengurus)
INSERT INTO leaders (id, name, position, photo, bio, order_num, party_number) VALUES
('1', 'Prof. Dr. H. Ahmad Said, M.A.', 'Ketua Dewan Syuro', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400', 'Tokoh senior yang mengawasi arah kebijakan dan pengawasan internal partai di tingkat cabang.', 1, '1'),
('2', 'Drs. Agus Salim, M.Si.', 'Sekretaris Dewan Syuro', 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400', 'Ahli hukum dan tata kelola yang bertanggung jawab atas seluruh dokumen resmi dewan syuro.', 2, NULL),
('3', 'H. Abdul Rahman, S.H., M.H.', 'Ketua DPC PKB Manokwari', '/images/Bang_Udin_PKB.jpeg', 'Pengacara senior dan aktivis politik yang telah mengabdi untuk masyarakat Manokwari selama lebih dari 20 tahun.', 1, '1'),
('4', 'Ahmad Fauzi, S.E.', 'Sekretaris DPC', '/images/Aman_PKB.jpeg', 'Profesional muda yang ahli dalam manajemen organisasi dan strategi politik.', 2, NULL),
('5', 'Hj. Fatimah, S.Ag.', 'Bendahara DPC', '/images/Puput_PKB.jpeg', 'Tokoh perempuan yang aktif dalam kegiatan sosial keagamaan dan pemberdayaan ekonomi umat.', 3, NULL),
('6', 'Hj. Siti Aminah, M.Pd.', 'Wakil Ketua I', 'https://images.pexels.com/photos/1681001/pexels-photo-1681001.jpeg?auto=compress&cs=tinysrgb&w=400', 'Pendidik berpengalaman yang fokus pada pengembangan sumber daya manusia dan pemberdayaan perempuan.', 4, NULL),
('7', 'Ir. Bambang Sutrisno', 'Ketua Bidang Organisasi', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', 'Insinyur dan aktivis yang berdedikasi dalam pembangunan infrastruktur dan organisasi partai.', 5, NULL);

-- News data (5 berita)
INSERT INTO news (id, title, excerpt, content, image, date, category, slug, auto_share_platforms, shared_to) VALUES
('1', 'DPC PKB Manokwari Gelar Musyawarah Cabang 2024', 'Musyawarah Cabang DPC PKB Manokwari berlangsung sukses dengan dihadiri ratusan kader dari seluruh distrik.', '<p>Musyawah Cabang (Muscab) DPC PKB Manokwari tahun 2024 berlangsung dengan sukses di Aula Pendopo Kabupaten Manokwari.</p><p>Acara ini dihadiri oleh ratusan kader dari seluruh distrik di Kabupaten Manokwari serta perwakilan dari DPW PKB Papua Barat.</p><p>Dalam kesempatan ini, dilakukan pemilihan dan penetapan kader kepemimpinan baru untuk periode 2024-2026.</p>', 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=800', '2024-03-15', 'Organisasi', 'musyawarah-cabang-2024', '["facebook","twitter"]', '["facebook"]'),
('2', 'PKB Manokwari Salurkan Bantuan untuk Korban Bencana', 'Partai Kebangkitan Bangsa Manokwari menyalurkan bantuan kemanusiaan kepada korban bencana alam.', '<p>Dalam rangka meringankan beban masyarakat terdampak bencana, DPC PKB Manokwari menyalurkan bantuan berupa sembako, pakaian, dan obat-obatan.</p><p>Tim relawan kami turun langsung ke lokasi untuk mendistribusikan bantuan secara langsung kepada masyarakat yang terdampak.</p>', 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-03-10', 'Sosial', 'bantuan-korban-bencana', NULL, NULL),
('3', 'Pelatihan Kader Muda PKB se-Manokwari', 'DPC PKB menggelar pelatihan kepemimpinan untuk kader muda dari seluruh wilayah Manokwari.', '<p>Dalam upaya regenerasi dan penguatan kader, DPC PKB Manokwari menggelar pelatihan kepemimpinan politik.</p><p>Pelatihan ini diikuti oleh lebih dari 100 peserta dari berbagai distrik, termasuk kader muda PKB hingga mahasiswa.</p>', 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-03-05', 'Kaderisasi', 'pelatihan-kader-muda', NULL, NULL),
('4', 'PKB Peduli: Program Gratifikasi Sosial di Distrik Tengah', 'Program Gratifikasi Sosial PKB mengunjungi warga masyarakat di pusat kota Manokwari.', '<p>Program Gratifikasi Sosial PKB Manokwari hadir di Distrik Tengah untuk membantu warga yang membutuhkan.</p><p>Kegiatan ini mencakup distribusi paket sembako, bantuan sekolah, dan bimbingan kesehatan gratis.</p>', 'https://images.pexels.com/photos/8815889/pexels-photo-8815889.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-02-28', 'Sosial', 'gratifikasi-sosial', '["whatsapp","linkedin"]', '["whatsapp"]'),
('5', 'Rapat Koordinasi Pengurus Cabang seluruh Distrik', 'Rapat koordinasi antar pengurus cabang dilaksanakan untuk merencanakan kerja menuju Pilkada 2024.', '<p>Rapat koordinasi ini bertujuan untuk menyelaraskan visi dan strategi kerja seluruh pengurus cabang.</p><p>Dari hasil rapat, disepakati rencana aksi kampanye yang inklusif dan berbasis pada isu lokal.</p>', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', '2024-02-20', 'Politik', 'rapat-koordinasi', NULL, NULL);

-- Gallery items (8 foto)
INSERT INTO gallery_items (id, title, image, date) VALUES
('1', 'Musyawarah Cabang 2024', 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=600', '2024-03-15'),
('2', 'Bakti Sosial Bencana', 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrf&w=600', '2024-03-10'),
('3', 'Pelatihan Kader Muda', 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysgl&w=600', '2024-03-05'),
('4', 'Silaturahmi Ulama', 'https://images.pexels.com/photos/8815889/pexels-photo-8815889.jpeg?auto=compress&cs=tinysrgb&w=600', '2024-02-28'),
('5', 'Rapat Koordinasi', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysgl&w=600', '2024-02-20'),
('6', 'Deklarasi Dukungan', 'https://images.pexels.com/photos/8846637/pexels-photo-8846637.jpeg?auto=compress&cs=tinysrgb&w=600', '2024-02-15'),
('7', 'Kunjungan ke Sekolah', 'https://images.pexels.com/photos/54321/pexels-photo.jpg?auto=compress&cs=tinysgl&w=600', '2024-01-25'),
('8', 'Rapat DPC Bulanan', 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysgl&w=600', '2024-01-15');

-- Video links (3 video YouTube)
INSERT INTO video_links (id, title, url, thumbnail) VALUES
('1', 'Sambutan Ketua DPC PKB Manokwari', 'https://www.youtube.com/watch?v=ScMzIAaP7v4', 'https://img.youtube.com/vi/ScMzIAaP7v4/hqdefault.jpg'),
('2', 'Musyawarah Cabang 2024 - Highlights', 'https://www.youtube.com/watch?v=LBFdE2-a4dE', 'https://img.youtube.com/vi/LBFdE2-a4dE/hqdefault.jpg'),
('3', 'Kunjungan ke Sekolah dan Unit Usaha', 'https://www.youtube.com/watch?v=9bZkp7q19f0', 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg');

-- Update backup data sample
INSERT INTO site_backup (id, data, created_at, updated_at) VALUES
('initial', '{"settings":"default","leaders_count":7,"news_count":5,"gallery_count":8,"videos_count":3,"timestamp":"2024-03-20T10:00:00Z"}', NOW(), NOW());

