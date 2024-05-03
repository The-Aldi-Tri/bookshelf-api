# Bookshelf-API

Proyek ini untuk submission [Dicoding](dicoding.com) pada learning path **Back-End Developer** pada course **Belajar Membuat Aplikasi Back-End untuk Pemula**.

## Instruksi Submission:

### Kriteria utama yang harus dipenuhi:

1. Aplikasi menggunakan port 9000
2. Aplikasi dijalankan dengan perintah npm run start
3. API dapat menyimpan buku
4. API dapat menampilkan seluruh buku
5. API dapat menampilkan detail buku
6. API dapat mengubah data buku
7. API dapat menghapus buku

### Pengujian

Lakukan pengujian dengan berkas Postman Collection dan Environment yang telah disediakan.

### Kriteria opsional

- Tambahkan fitur query parameters pada route GET /books (Mendapatkan seluruh buku).

  - **?name** : Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query ini. Contoh /books?name=”dicoding”, maka akan menampilkan daftar buku yang mengandung nama “dicoding” secara non-case sensitive (tidak peduli besar dan kecil huruf).
  - **?reading** : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sedang tidak dibaca (reading: false). Bila 1, maka tampilkan buku yang sedang dibaca (reading: true). Selain itu, tampilkan buku baik sedang dibaca atau tidak.
  - **?finished** : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sudah belum selesai dibaca (finished: false). Bila 1, maka tampilkan buku yang sudah selesai dibaca (finished: true). Selain itu, tampilkan buku baik yang sudah selesai atau belum dibaca.

- Menggunakan ESLint dan salah satu style guide agar gaya penulisan kode JavaScript lebih konsisten. Serta ketika dijalankan perintah **npx eslint .** tidak terdapat error yang muncul.

### Submission ditolak

- Kriteria wajib Bookshelf API tidak terpenuhi.
- Ketentuan berkas submission tidak terpenuhi.
- Menggunakan port selain 9000.
- Pada package.json tidak tersedia script start.
- Script start menggunakan nodemon.
- Menggunakan database seperti Postgres, MSSQL, MySQL, MariaDB, atau MongoDB untuk menyimpan data. Pastikan submission Anda mudah dijalankan dan diuji tanpa reviewer perlu memasang database engine apa pun.
- Menggunakan JSON sebagai tempat penyimpanan data yang menyebabkan postman test menjadi gagal.
- Proyek yang Anda kirim tidak dapat dijalankan dengan baik (Reviewer menggunakan Node.js versi LTS 18.13.0).
- Menggunakan bahasa pemrograman dan teknologi lain, selain JavaScript dan Node.js.
- Menggunakan Framework Node.js selain Hapi Framework.
- Melakukan kecurangan seperti tindakan plagiat.
