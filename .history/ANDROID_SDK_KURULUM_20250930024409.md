# 🤖 Android SDK Kurulum Rehberi

APK oluşturmak için Android SDK gereklidir. Bu rehber size kurulum adımlarını gösterecek.

## 📥 Android Studio Kurulumu

### 1. Android Studio'yu İndirin

https://developer.android.com/studio adresinden Android Studio'yu indirin.

### 2. Android Studio'yu Kurun

1. İndirdiğiniz `.exe` dosyasını çalıştırın
2. Kurulum sihirbazını takip edin
3. **Standard** kurulum tipi seçin
4. Kurulum tamamlanana kadar bekleyin

### 3. Android SDK'yı Kontrol Edin

Android Studio açıldığında:

1. **More Actions** > **SDK Manager**'a tıklayın
2. **Android SDK Location**'u not alın (örnek: `C:\Users\YourName\AppData\Local\Android\Sdk`)
3. **SDK Platforms** sekmesinde en az bir Android sürümü kurulu olduğundan emin olun (Android 13 - API 33 önerilir)
4. **SDK Tools** sekmesinde şunların kurulu olduğundan emin olun:
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android SDK Tools
   - Android Emulator (opsiyonel)

### 4. Environment Variables Ayarlayın

#### Windows PowerShell (Geçici - Sadece bu terminal oturumu için):

```powershell
$env:ANDROID_HOME = "C:\Users\emref\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools"
```

#### Windows (Kalıcı):

1. **Başlat** > **"Ortam değişkenlerini düzenle"** yazın ve aç
2. **Kullanıcı değişkenleri** bölümünde **Yeni** tıklayın
3. Değişken adı: `ANDROID_HOME`
4. Değişken değeri: `C:\Users\emref\AppData\Local\Android\Sdk` (kendi SDK konumunuz)
5. **Tamam** tıklayın
6. **Path** değişkenini seçin ve **Düzenle** tıklayın
7. **Yeni** tıklayıp şunları ekleyin:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
8. **Tamam** tıklayın ve tüm pencereleri kapatın
9. PowerShell/Terminal'i kapatıp yeniden açın

### 5. Kurulumu Test Edin

Terminal'de şu komutu çalıştırın:

```powershell
adb version
```

Versiyon bilgisi görünüyorsa kurulum başarılı! ✅

### 6. local.properties Dosyasını Güncelleyin

SDK kurulumundan sonra:

```powershell
cd mobile\android
echo "sdk.dir=C:\\Users\\emref\\AppData\\Local\\Android\\Sdk" > local.properties
```

**Not:** Kendi kullanıcı adınızı ve SDK konumunuzu yazın!

## 🏗️ Şimdi APK Oluşturun

Android SDK kurulduktan sonra:

```powershell
cd C:\Users\emref\Desktop\Witly-Music
.\build-apk.bat
```

## 🔍 Sorun Giderme

### "SDK location not found" Hatası

**Çözüm 1:** Environment variable'ı doğru ayarladığınızdan emin olun
```powershell
echo $env:ANDROID_HOME
# Çıktı: C:\Users\emref\AppData\Local\Android\Sdk
```

**Çözüm 2:** Terminal'i kapatıp yeniden açın

**Çözüm 3:** local.properties dosyasını kontrol edin:
```powershell
cat mobile\android\local.properties
# sdk.dir=C:\\Users\\emref\\AppData\\Local\\Android\\Sdk
```

### "JAVA_HOME not found" Hatası

Android Studio ile birlikte JDK kurulur. JDK konumunu ayarlayın:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
```

### Gradle Download Çok Yavaş

İlk build sırasında Gradle ve bağımlılıklar indirilir. Bu normal ve sadece bir kez olur. Sabredin! ☕

## 📱 Alternatif: Expo Kullanın

Eğer Android Studio kurmak istemiyorsanız, projeyi Expo'ya geçirebilirsiniz. Expo ile APK oluşturma bulutta yapılır ve yerel SDK gerektirmez.

---

**Kurulum tamamlandıktan sonra `build-apk.bat` dosyasını çalıştırarak APK oluşturabilirsiniz!** 🎉
