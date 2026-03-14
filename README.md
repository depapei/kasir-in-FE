# Android Point of Sales (POS)

Aplikasi POS Android yang dibangun menggunakan React dan dibuild menjadi APK menggunakan Capacitor.

## Deskripsi Proyek

Aplikasi ini bertujuan untuk membantu kasir mengelola transaksi penjualan dengan cepat dan efisien melalui perangkat Android seperti smartphone atau tablet.

## Tech Stack

- **Vite**: Build tool frontend yang cepat dan modern.
- **React**: Library JavaScript untuk membangun antarmuka pengguna (UI).
- **React Router**: Library untuk routing navigasi antar halaman.
- **TanStack React Query**: Library untuk data fetching, caching, sinkronisasi, dan pembaruan state server.
- **Axios**: HTTP client berbasis promise untuk melakukan request ke backend API.
- **Zustand**: Library state management yang kecil, cepat, dan scalable.
- **React Hook Form**: Library untuk form handling yang performant dan fleksibel.
- **Capacitor**: Cross-platform native runtime untuk mem-build aplikasi web menjadi aplikasi Android (APK).

## Fitur Utama Aplikasi

- Melihat kategori produk
- Melihat daftar produk
- Search produk
- Menambahkan produk ke cart (keranjang belanja)
- Mengubah quantity produk di cart
- Melihat subtotal dan total transaksi
- Membuat order ke backend API
- Build aplikasi menjadi file APK Android

## Struktur Folder Project

```text
src/
├── api/        # Berisi konfigurasi axios dan service API
├── components/ # Berisi reusable UI components
├── features/   # Berisi logic fitur utama aplikasi
├── hooks/      # Berisi custom React hooks
├── layouts/    # Berisi layout halaman
├── pages/      # Berisi halaman aplikasi
├── store/      # Berisi global state menggunakan Zustand
├── types/      # Berisi TypeScript types
└── utils/      # Berisi helper functions
```

## Instalasi Project

Langkah-langkah untuk menjalankan project secara lokal:

1. Clone repository
   ```bash
   git clone <repository-url>
   ```

2. Masuk ke folder project
   ```bash
   cd project-name
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Konfigurasi environment
   Buat file `.env` di root project dan tambahkan konfigurasi berikut:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

5. Jalankan project
   ```bash
   npm run dev
   ```

6. Build project web
   ```bash
   npm run build
   ```

## Integrasi dengan Backend

Aplikasi ini menggunakan backend API terpisah. Semua request menggunakan base URL dari environment variable `VITE_API_BASE_URL`.

Format response backend yang diharapkan:

**Success response:**
```json
{
  "success": true,
  "data": {}
}
```

**Error response:**
```json
{
  "success": false,
  "message": "error message"
}
```

## Konfigurasi Backend API

Frontend POS ini tidak memiliki backend internal. Semua request akan dikirim ke backend eksternal melalui environment variable.

Buat file `.env` di root project.

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Pastikan backend menyediakan endpoint berikut:

- `GET /categories`
- `GET /products`
- `POST /orders`
- `GET /orders`

Semua response backend harus menggunakan format:

```json
{
  "success": true,
  "data": {}
}
```

Jika backend sudah tersedia, frontend akan langsung menggunakan API tersebut tanpa perlu perubahan besar pada kode.

## Autentikasi

Aplikasi ini dilengkapi dengan sistem autentikasi (Login & Register) yang sepenuhnya berjalan di sisi frontend dan terhubung dengan backend API.

### Cara Kerja Autentikasi

1. **Login & Register**: User dapat membuat akun baru melalui halaman `/register` atau masuk melalui halaman `/login`.
2. **Penyimpanan Token**: Setelah login berhasil, backend akan mengembalikan JWT token. Token ini disimpan di dalam browser menggunakan `localStorage` dengan key `authToken`.
3. **Authorization Header**: Setiap request HTTP yang dikirim ke backend menggunakan Axios akan secara otomatis menyertakan token ini di dalam header `Authorization` melalui Axios Interceptor.
   Contoh header yang dikirim:
   ```http
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. **Route Protection**: Halaman utama aplikasi (seperti POS, Orders, Settings) dilindungi. Jika user belum login, mereka akan otomatis diarahkan kembali ke halaman Login.
5. **Auto Login**: Saat aplikasi pertama kali dibuka, aplikasi akan mengecek keberadaan `authToken` di `localStorage`. Jika ada, aplikasi akan memanggil endpoint `GET /auth/me` untuk mengambil data user dan langsung mengizinkan akses tanpa perlu login ulang.

### Endpoint Autentikasi Backend

Pastikan backend Anda menyediakan endpoint berikut untuk mendukung fitur autentikasi ini:

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`

## Build Aplikasi Android

Cara mengubah aplikasi React menjadi APK Android menggunakan Capacitor:

1. Install capacitor
   ```bash
   npm install @capacitor/core
   npm install @capacitor/cli
   npm install @capacitor/android
   ```

2. Inisialisasi capacitor
   ```bash
   npx cap init
   ```

3. Build project
   ```bash
   npm run build
   ```

4. Copy build ke capacitor
   ```bash
   npx cap copy
   ```

5. Tambahkan platform android
   ```bash
   npx cap add android
   ```

6. Buka Android Studio
   ```bash
   npx cap open android
   ```

Dari Android Studio, Anda dapat mem-build aplikasi menjadi APK agar bisa diinstall pada perangkat Android.

## Kontribusi

Developer lain dapat melakukan fork repository ini dan membuat pull request untuk pengembangan fitur baru atau perbaikan bug. Kontribusi Anda sangat dihargai!
