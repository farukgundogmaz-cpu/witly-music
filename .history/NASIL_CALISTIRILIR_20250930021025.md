# 🚀 Witly Music - Nasıl Çalıştırılır?

## ✅ Gerekli Programlar

1. ✅ Node.js (yüklü)
2. ✅ npm (yüklü)
3. ❓ Android Studio veya Android SDK
4. ❓ Java JDK 11+

## 📱 Android Uygulamasını Çalıştırma Adımları

### Yöntem 1: İki Terminalle Çalıştırma (ÖNERİLEN)

#### Terminal 1 - Metro Bundler

**Command Prompt (CMD)** açın:

```cmd
cd "C:\Users\emref\Desktop\Witly Music\mobile"
npx react-native start
```

Bu terminal açık kalmalı!

#### Terminal 2 - Android Uygulaması

**Yeni bir Command Prompt (CMD)** açın:

```cmd
cd "C:\Users\emref\Desktop\Witly Music\mobile"
npx react-native run-android
```

---

### Yöntem 2: Expo ile Çalıştırma (DAHA KOLAY)

Expo kullanarak daha kolay çalıştırabilirsiniz:

```cmd
cd "C:\Users\emref\Desktop\Witly Music\mobile"

:: Expo CLI yükleyin (bir kere)
npm install -g expo-cli eas-cli

:: Uygulamayı başlatın
npx expo start
```

Sonra:
- QR kodu Expo Go uygulaması ile tarayın
- Veya `a` tuşuna basarak Android emulator'de açın

---

### Yöntem 3: APK Oluşturma (FİZİKSEL CİHAZ)

Fiziksel Android cihazda test için:

```cmd
cd "C:\Users\emref\Desktop\Witly Music\mobile\android"

:: Debug APK oluştur
.\gradlew assembleDebug

:: APK şurada: android\app\build\outputs\apk\debug\app-debug.apk
```

APK dosyasını telefonunuza gönderin ve yükleyin.

---

## 🔧 Android Studio Kurulumu (Gerekiyorsa)

Eğer Android Studio yüklü değilse:

### 1. Android Studio İndirin

https://developer.android.com/studio

### 2. Kurulum Sırasında Seçin:

- ✅ Android SDK
- ✅ Android SDK Platform
- ✅ Android Virtual Device (AVD)

### 3. Environment Variables Ayarlayın

**ANDROID_HOME** ekleyin:

```
C:\Users\emref\AppData\Local\Android\Sdk
```

**Path**'e ekleyin:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
```

---

## 🎯 Hızlı Başlangıç (En Basit Yöntem)

### 1. Backend'i Başlatın

```cmd
cd "C:\Users\emref\Desktop\Witly Music\backend"
npm run dev
```

Backend `http://localhost:3000` adresinde çalışmalı.

### 2. Metro Bundler'ı Başlatın

Yeni CMD penceresi:

```cmd
cd "C:\Users\emref\Desktop\Witly Music\mobile"
npx react-native start
```

### 3. Android Emulator Başlatın

- Android Studio'yu açın
- AVD Manager'dan bir emulator başlatın
- (Örn: Pixel 5 API 33)

### 4. Uygulamayı Yükleyin

Yeni CMD penceresi:

```cmd
cd "C:\Users\emref\Desktop\Witly Music\mobile"
npx react-native run-android
```

---

## 🐛 Sık Karşılaşılan Hatalar

### Hata: "SDK location not found"

**Çözüm:**

`mobile/android/local.properties` dosyası oluşturun:

```properties
sdk.dir=C:\\Users\\emref\\AppData\\Local\\Android\\Sdk
```

### Hata: "No connected devices"

**Çözüm:**

1. Android emulator başlatın
2. Veya fiziksel cihazı USB debugging ile bağlayın
3. `adb devices` komutu ile kontrol edin

### Hata: "Metro config not found"

**Çözüm:** ✅ Düzeltildi! metro.config.js oluşturuldu.

### Hata: "Command failed: gradlew.bat"

**Çözüm:**

```cmd
cd mobile\android
.\gradlew clean
cd ..\..
```

---

## 📊 Çalışan Sistemler

Uygulamanın çalışması için 2-3 terminal gerekli:

| Terminal | Komut | Durum |
|----------|-------|-------|
| **Terminal 1** | `cd backend && npm run dev` | ✅ Çalışıyor |
| **Terminal 2** | `cd mobile && npx react-native start` | ⏳ Başlatılacak |
| **Terminal 3** | `cd mobile && npx react-native run-android` | ⏳ Başlatılacak |

---

## 🎵 Alternatif: Web Versiyonu

Eğer Android çalıştırmakta zorlanıyorsanız, React Native Web olarak da çalıştırabilirsiniz:

```cmd
cd mobile
npm install react-dom react-native-web
npx expo start --web
```

---

## 📞 Yardım

Hala çalışmıyorsa:

1. **Java versiyonunu kontrol edin:**
   ```cmd
   java -version
   ```
   (JDK 11 veya üzeri olmalı)

2. **Android SDK'yı kontrol edin:**
   ```cmd
   echo %ANDROID_HOME%
   ```

3. **Bağlı cihazları kontrol edin:**
   ```cmd
   adb devices
   ```

---

**İyi müzikler! 🎵**
