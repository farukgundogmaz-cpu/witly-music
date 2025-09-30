# 🔧 Android SDK Kurulum - Adım Adım

## 1️⃣ Android Studio'yu Açın

Başlat menüsünden **Android Studio** uygulamasını açın.

## 2️⃣ SDK Manager'ı Açın

İlk ekranda:
- **More Actions** (veya 3 nokta) tıklayın
- **SDK Manager** seçin

VEYA

Eğer bir proje açıksa:
- Üst menüden **Tools** > **SDK Manager**

## 3️⃣ SDK Konumunu Bulun

SDK Manager penceresinin en üstünde:
- **Android SDK Location** yazısını göreceksiniz
- Örnek: `C:\Users\emref\AppData\Local\Android\Sdk`

**Bu konumu kopyalayın!** 📋

## 4️⃣ SDK Bileşenlerini Yükleyin

**SDK Platforms** sekmesinde:
- ✅ **Android 13.0 (Tiramisu) - API Level 33** işaretleyin
- VEYA en güncel Android versiyonunu seçin

**SDK Tools** sekmesinde şunları işaretleyin:
- ✅ Android SDK Build-Tools
- ✅ Android SDK Platform-Tools
- ✅ Android SDK Command-line Tools
- ✅ Android Emulator (opsiyonel)

**Apply** butonuna tıklayın ve indirme başlasın (1-2 GB).

## 5️⃣ SDK Konumunu Terminal'e Verin

SDK konumunu öğrendikten sonra (örnek: `C:\Users\emref\AppData\Local\Android\Sdk`):

```powershell
$env:ANDROID_HOME = "C:\Users\emref\AppData\Local\Android\Sdk"
```

**NOT:** Kendi kullanıcı adınızı yazın!

## 6️⃣ local.properties Dosyasını Güncelleyin

```powershell
cd mobile\android
echo "sdk.dir=C:\\Users\\emref\\AppData\\Local\\Android\\Sdk" > local.properties
```

## 7️⃣ APK Oluşturun

```powershell
cd ..\..
.\build-apk.bat
```

---

## 🆘 Hızlı Yardım

Eğer SDK konumunu buldunuz, bana şu formatta söyleyin:

```
C:\Users\emref\AppData\Local\Android\Sdk
```

Ben otomatik olarak ayarlayıp APK'yı oluştururum! 🚀
