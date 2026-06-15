# NACAMA

Website penyedia template kartu nama siap pakai yang berfokus pada kemudahan kustomisasi untuk kebutuhan para user. 
Web ini memudahkan pengguna umum untuk menghasilkan kartu nama profesional secara mudah demi menjaga konsistensi identitas brand (*brand identity*) mereka tanpa proses desain yang rumit.

---

## Mengapa Website Ini Dibuat

Website ini dibuat untuk memudahkan dan para user saat ingin membuat sebuah Id card atau name card. Dan dapat menghemat waktu para user apabila mereka ingin membuat Id card.

## Cara Menjalankan
**Prasyarat:** Pastikan [Node.js](https://nodejs.org) sudah terinstal di komputer kamu.
```bash
# 1. Clone repository ini
git clone https://github.com/MuhamadAldi-Nugroho/pemrogaman_web_projek_nacama.git
cd nacama

# 2. Install dependensi
npm i

# 3. Jalankan server
node server.js
```

## Fitur-Fitur Yang Tersedia

--- Dashboard = Dashboard adalah halaman utama dari website NACAMA
--- Login = Untuk masuk dan melihat cara kerja dari website ini kalian harus memasukkan akun yang telah anda miliki
--- Register = Jika belum memiliki akun anda harus mendaftar terlebih dahulu yaitu dengan cara mengisi data diri sesuai yang tercantum di website
--- Profil = Berisi data diri yang telah anda masukkan 
--- Jelajahi Template =  Berisi template namecard yang telah di sediakan, dan siap untuk diedit
--- History = Digunakan untuk melihat template yang telah anda edit sebelumnya, History juga bisa digunakan apabila anda ingin mengedit, menghapus, atau mengunduh kembali template anda

(Note : Tamu hanya bisa melihat template yang disediakan. User dapat mengedit, mengunduh, dan menghapus template yang telah di edit. Jadi disarankan untuk login terlebih dahulu)


## Struktur Proyek

```
nacama/
├── server.js           # Entry point — Express server & API routes
├── package.json
├── data/
│   ├── users.json      # Database pengguna
│   └── history.json    # Database riwayat proyek
└── public/
    ├── index.html          # Dashboard / halaman utama
    ├── Login.html          # Halaman login 
    ├── profile.html        # Halaman profil pengguna
    ├── History.html        # Halaman riwayat proyek
    ├── css/                # Stylesheet
    ├── js/                 # Client-side scripts
    └── template/
        ├── template.html           # Galeri template
        └── editing_template/       # Halaman editor template
```

## Tech Stack

- **Backend:** Node.js, Express.js v5
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Storage:** JSON file (data/users.json, data/history.json)
- **Middleware:** CORS, Express Static

## API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/register` | Daftar akun baru |
| `POST` | `/login` | Login pengguna |
| `POST` | `/update-profile` | Update data profil |
| `GET` | `/user/:id` | Ambil data pengguna berdasarkan ID |
| `GET` | `/history/:userId` | Ambil riwayat proyek pengguna |
| `POST` | `/save-project` | Simpan proyek ke history |
| `DELETE` | `/history/:id` | Hapus item dari history |

## Task Lists
(1.) Muhamad Aldi Nugroho (202451097) = -Fisrt Commit, perbaikan-href, perbaikan-login(2), editing_template, linked-account-to-editing, style-dropdown-and-regis

(2.) Ria Sabila Putra (202451099) = -Penambahan style(styling), kembali dari login ke dashboard, membenahi header login, Fix template theme matching for editing page, buat halaman editing_template, Fitur dropdown di index, Merge branch 'main' of https://github.com/MuhamadAldi-Nugroho/pemrogaman_web_projek_nacama, Fix Login logic, Fix login logic, backend history dan tambah endpoint di simpan proyek, fitur delete history

(3.) Arsya Fitrotul Firdaus (202451057) = -register, regis, register, fix bug, regis fix, hapus file register, expres.js, Login dan Register, Membuat profile, delete alamat, ui pop up login/regis/profile, fix navbar template, add pop up

(4.) Muhammad Assagaf Ibrahim (202451087) = -Halaman Login, History, History-2 
