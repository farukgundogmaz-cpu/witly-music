# 📱 Witly Music - Telefona Yükleme Rehberi

Bu rehber, Witly Music uygulamasını Android telefonunuza nasıl yükleyeceğinizi açıklar.

## 🔧 Gereksinimler

- Node.js 18 veya üzeri
- Android Studio veya Android SDK
- USB kablosu veya APK transfer yöntemi

## 📦 APK Oluşturma

### Yöntem 1: Otomatik Build (Linux/Mac)

```bash
chmod +x build-apk.sh
./build-apk.sh
```

### Yöntem 2: Manuel Build

```bash
cd mobile
npm install
cd android
./gradlew assembleRelease
```

APK dosyası şurada oluşturulur:
`mobile/android/app/build/outputs/apk/release/app-release.apk`

## 📲 Telefona Yükleme

### Yöntem 1: USB ile (Önerilen)

1. Telefonunuzda **Geliştirici Seçenekleri**'ni etkinleştirin
2. **USB Hata Ayıklama**'yı açın
3. Telefonunuzu bilgisayara USB ile bağlayın
4. Şu komutu çalıştırın:

```bash
cd mobile
npm run android
```

### Yöntem 2: APK Dosyası ile

1. **APK dosyasını bulun:**
   - Konum: `mobile/android/app/build/outputs/apk/release/app-release.apk`

2. **APK'yı telefonunuza aktarın:**
   - USB kablo ile
   - E-posta veya WhatsApp ile
   - Google Drive, Dropbox gibi bulut servisleri ile

3. **Telefonunuzda ayarları yapın:**
   - Ayarlar > Güvenlik > Bilinmeyen Kaynaklar (veya benzer)
   - Bu seçeneği etkinleştirin

4. **APK'yı yükleyin:**
   - Dosya yöneticisi ile APK dosyasını bulun
   - Dosyaya tıklayın
   - "Yükle" butonuna basın
   - Kurulum tamamlanana kadar bekleyin

## ⚙️ Backend Bağlantısı

Uygulamanın çalışması için backend sunucusu gereklidir:

### Seçenek 1: Yerel Sunucu (Geliştirme)

```bash
cd backend
npm install
npm start
```

Ardından telefonunuzun bilgisayarınızla aynı WiFi ağında olduğundan emin olun.

**Mobil uygulama ayarlarını düzenleyin:**
`mobile/src/services/api/client.ts` dosyasında:

```typescript
const API_URL = 'http://BILGISAYAR_IP:3000'; // Örnek: http://192.168.1.100:3000
```

### Seçenek 2: Üretim Sunucusu (Önerilen)

Backend'i bir sunucuya deploy edin ve production API URL'ini kullanın:

```typescript
const API_URL = 'https://api.witlymusic.com';
```

## 🎵 İlk Kullanım

1. Uygulamayı açın
2. "Kayıt Ol" ile hesap oluşturun
3. Giriş yapın
4. Müziğin keyfini çıkarın!

## 🐛 Sorun Giderme

### APK Yüklenmiyor
- "Bilinmeyen Kaynaklar" izninin aktif olduğundan emin olun
- Android 8.0+: Uygulama bazlı izin verin (Chrome, Dosya Yöneticisi vb.)

### Uygulama Açılmıyor
- Telefonunuzun Android 5.0+ olduğundan emin olun
- Uygulamayı kaldırıp tekrar yükleyin

### Bağlantı Hatası
- Backend sunucusunun çalıştığından emin olun
- API URL'inin doğru olduğunu kontrol edin
- Firewall/güvenlik duvarı ayarlarını kontrol edin

## 📝 Notlar

- İlk yüklemede "Bilinmeyen geliştirici" uyarısı normal bir durumdur
- Uygulama henüz Google Play Store'da değildir
- Güncellemeler için yeni APK indirip tekrar yüklemeniz gerekir

## 🔐 Güvenlik

Bu uygulama development/test amaçlıdır. Production kullanımı için:

1. Kendi release keystore'unuzu oluşturun
2. Backend'i güvenli bir sunucuya deploy edin
3. HTTPS kullanın
4. API anahtarlarını güvenli şekilde saklayın

---

**Made with ❤️ by Witly Design**
