# 🚀 Backend'i Sunucuya Deploy Etme - Hızlı Rehber

## 🎯 Hedef

Backend kodunu `api1.witlydesign.com` sunucusuna deploy edin.

---

## 📦 Deploy Edilecek Dosyalar

**Backend klasörü içindekiler:**
```
backend/
├── config/
│   └── pocketbase.js
├── routes/
│   ├── auth.js
│   ├── music.js
│   ├── playlist.js
│   └── user.js
├── services/
│   ├── deezer.service.js
│   └── spotify.service.js
├── server.js
├── package.json
└── .env
```

---

## 🔧 Adım Adım Deploy

### 1. Sunucuya Bağlanın

**FTP/SFTP veya SSH ile:**
```bash
ssh user@api1.witlydesign.com
```

### 2. Backend Klasörü Oluşturun

```bash
cd /var/www/api1.witlydesign.com
mkdir backend
cd backend
```

### 3. Dosyaları Yükleyin

**FTP ile:**
- FileZilla veya WinSCP kullanın
- Backend klasöründeki tüm dosyaları yükleyin

**Git ile (tercih edilen):**
```bash
git clone <your-repo-url> .
# veya dosyaları upload edin
```

### 4. Bağımlılıkları Yükleyin

```bash
npm install
```

### 5. .env Dosyasını Düzenleyin

```bash
nano .env
```

**İçerik:**
```env
PORT=3000
NODE_ENV=production

# PocketBase zaten sunucunuzda
POCKETBASE_URL=https://api1.witlydesign.com
POCKETBASE_ADMIN_EMAIL=imafurkna@gmail.com
POCKETBASE_ADMIN_PASSWORD=Furkan7070

# API Keys
SPOTIFY_CLIENT_ID=30625a81deac4c859a4a52f6c243258b
SPOTIFY_CLIENT_SECRET=5724bb30cc0c4a7e98eb69abf19e7222

JWT_SECRET=witly_music_secret_2025_secure_token
CACHE_TTL=3600
```

### 6. PM2 ile Çalıştırın (Production)

```bash
# PM2 yükleyin (global)
npm install -g pm2

# Backend'i başlatın
pm2 start server.js --name witly-music-backend

# Otomatik başlatma
pm2 startup
pm2 save

# Durum kontrolü
pm2 status
pm2 logs witly-music-backend
```

---

## 🌐 Nginx Reverse Proxy

Backend'i `/api` path'inde erişilebilir yapın:

### Nginx Config:

```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name api1.witlydesign.com;
    
    # SSL sertifikaları (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/api1.witlydesign.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api1.witlydesign.com/privkey.pem;
    
    # API Proxy
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check
    location /health {
        proxy_pass http://localhost:3000/health;
    }
}
```

**Nginx'i yeniden yükleyin:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## ✅ Test Edin

### 1. Backend Çalışıyor mu?

```bash
curl http://localhost:3000/health
```

Beklenen:
```json
{"status":"OK","message":"Witly Music API is running"}
```

### 2. Nginx Üzerinden Erişim

```bash
curl https://api1.witlydesign.com/health
```

### 3. Müzik API Test

```bash
curl https://api1.witlydesign.com/api/music/search?q=billie+eilish
```

---

## 🔒 SSL Sertifikası (Let's Encrypt)

Eğer SSL yoksa:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api1.witlydesign.com
```

---

## 📊 PM2 Komutları

```bash
# Durum
pm2 status

# Log'ları görüntüle
pm2 logs witly-music-backend

# Yeniden başlat
pm2 restart witly-music-backend

# Durdur
pm2 stop witly-music-backend

# Monitor
pm2 monit
```

---

## 🆘 Sorun Giderme

### Backend başlamıyor

```bash
pm2 logs witly-music-backend --lines 50
```

### Port 3000 kullanımda

```bash
lsof -i :3000
kill -9 <PID>
```

### Nginx hatası

```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

---

## 📝 Özet

1. ✅ Backend dosyalarını sunucuya yükleyin
2. ✅ `npm install` çalıştırın
3. ✅ `.env` dosyasını düzenleyin
4. ✅ `pm2 start server.js` ile başlatın
5. ✅ Nginx reverse proxy kurun
6. ✅ SSL sertifikası ekleyin
7. ✅ Test edin

**Hazır olunca mobile app kendi internet ile çalışacak!** 🎉
