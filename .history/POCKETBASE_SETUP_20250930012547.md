# PocketBase Kurulum ve Yapılandırma Rehberi

## 📦 PocketBase Kurulumu

### 1. PocketBase İndir ve Kur

PocketBase'i https://pocketbase.io/docs/ adresinden indirin ve `https://api1.witlydesign.com` adresinde çalıştırın.

```bash
# PocketBase'i indirin
wget https://github.com/pocketbase/pocketbase/releases/download/v0.20.1/pocketbase_0.20.1_windows_amd64.zip

# Çıkartın ve çalıştırın
./pocketbase serve --http="api1.witlydesign.com:80"
```

### 2. Admin Hesabı Oluşturma

1. Tarayıcıda `https://api1.witlydesign.com/_/` adresine gidin
2. İlk admin hesabını oluşturun:
   - **Email**: admin@witlydesign.com
   - **Password**: Güvenli bir şifre belirleyin (en az 10 karakter)

## 🗄️ Collection (Koleksiyon) Yapıları

Aşağıdaki collection'ları PocketBase admin panelinden manuel olarak oluşturmanız gerekmektedir.

### Collection 1: users (Kullanıcılar)

**Not:** Bu collection PocketBase tarafından otomatik olarak oluşturulur. Sadece kontrol edin.

**Type:** Auth

**Fields:**
- `username` - Text (required, unique)
- `email` - Email (required, unique)
- `name` - Text
- `avatar` - File (single, max 5MB, images only)

**API Rules:**
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: Herkes (kayıt için)
- **Update**: `@request.auth.id = id`
- **Delete**: `@request.auth.id = id`

---

### Collection 2: tracks (Şarkılar)

**Type:** Base

**Fields:**
- `externalId` - Text (required) - Deezer/Spotify ID
- `title` - Text (required) - Şarkı adı
- `artist` - Text (required) - Sanatçı adı
- `album` - Text - Albüm adı
- `duration` - Number - Süre (saniye)
- `coverImage` - URL - Kapak görseli URL'i
- `source` - Select (deezer, spotify) - Kaynak platform
- `previewUrl` - URL - Önizleme/dinleme URL'i

**API Rules:**
- **List/Search**: `@request.auth.id != ""`
- **View**: `@request.auth.id != ""`
- **Create**: `@request.auth.id != ""`
- **Update**: `@request.auth.id != ""`
- **Delete**: Sadece admin

**Indexes:**
- `externalId` (unique)

---

### Collection 3: playlists (Çalma Listeleri)

**Type:** Base

**Fields:**
- `name` - Text (required) - Çalma listesi adı
- `description` - Text (Editor) - Açıklama
- `user` - Relation (users, single, required) - Oluşturan kullanıcı
- `tracks` - Relation (tracks, multiple) - Şarkılar
- `isPublic` - Bool (default: false) - Herkese açık mı?
- `coverImage` - URL - Kapak görseli

**API Rules:**
- **List/Search**: `@request.auth.id != "" && (user = @request.auth.id || isPublic = true)`
- **View**: `@request.auth.id != "" && (user = @request.auth.id || isPublic = true)`
- **Create**: `@request.auth.id != "" && @request.data.user = @request.auth.id`
- **Update**: `@request.auth.id = user`
- **Delete**: `@request.auth.id = user`

---

### Collection 4: favorites (Favoriler)

**Type:** Base

**Fields:**
- `user` - Relation (users, single, required) - Kullanıcı
- `track` - Relation (tracks, single, required) - Şarkı

**API Rules:**
- **List/Search**: `@request.auth.id != "" && user = @request.auth.id`
- **View**: `@request.auth.id != "" && user = @request.auth.id`
- **Create**: `@request.auth.id != "" && @request.data.user = @request.auth.id`
- **Update**: Yasak
- **Delete**: `@request.auth.id = user`

**Indexes:**
- Composite: `user + track` (unique) - Bir kullanıcı aynı şarkıyı birden fazla favoriye ekleyemez

---

### Collection 5: listening_history (Dinleme Geçmişi)

**Type:** Base

**Fields:**
- `user` - Relation (users, single, required) - Kullanıcı
- `track` - Relation (tracks, single, required) - Şarkı
- `playedAt` - Date (default: NOW) - Dinlenme zamanı

**API Rules:**
- **List/Search**: `@request.auth.id != "" && user = @request.auth.id`
- **View**: `@request.auth.id != "" && user = @request.auth.id`
- **Create**: `@request.auth.id != "" && @request.data.user = @request.auth.id`
- **Update**: Yasak
- **Delete**: `@request.auth.id = user`

---

## 🔐 Güvenlik Ayarları

### CORS Ayarları

PocketBase admin panelinde **Settings > Application** bölümünden:

1. **Allowed origins** alanına şunları ekleyin:
   ```
   http://localhost:3000
   http://localhost:8081
   *
   ```

### Email Ayarları (Opsiyonel)

Şifre sıfırlama ve email doğrulama için **Settings > Mail Settings** bölümünden SMTP ayarlarını yapılandırın.

---

## 🧪 Test

Collection'ları oluşturduktan sonra test etmek için:

1. **Backend'i çalıştırın:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Health check:**
   ```bash
   curl http://localhost:3000/health
   ```

3. **Kullanıcı kaydı testi:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "test123456",
       "username": "testuser"
     }'
   ```

---

## 📝 Notlar

- PocketBase admin paneline `https://api1.witlydesign.com/_/` adresinden erişebilirsiniz
- Tüm collection'lar için `created` ve `updated` alanları otomatik olarak eklenir
- API istekleri için `Authorization: Bearer <token>` header'ı kullanılmalıdır
- Token'lar varsayılan olarak 2 hafta geçerlidir

---

## 🚨 Önemli

1. **Backend `.env` dosyasını oluşturun:**
   ```bash
   cd backend
   cp env.example.txt .env
   ```

2. `.env` dosyasındaki değerleri güncelleyin:
   - `POCKETBASE_URL=https://api1.witlydesign.com`
   - `POCKETBASE_ADMIN_EMAIL=admin@witlydesign.com`
   - `POCKETBASE_ADMIN_PASSWORD=<sizin-admin-şifreniz>`

3. Spotify API için gerekli:
   - https://developer.spotify.com/dashboard adresinden uygulama oluşturun
   - Client ID ve Client Secret alın
   - `.env` dosyasına ekleyin

4. Deezer API anahtara ihtiyaç duymaz, doğrudan kullanabilirsiniz.

---

## 🎉 Hazır!

Artık PocketBase backend'iniz hazır! Backend ve mobil uygulamayı çalıştırabilirsiniz.
