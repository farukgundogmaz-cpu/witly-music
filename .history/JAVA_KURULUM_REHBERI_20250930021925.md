# ☕ Java JDK Kurulum Rehberi (Android için Gerekli)

## ❌ Sorun: Java Bulunamadı

Android uygulaması build etmek için **Java JDK 11 veya üzeri** gereklidir.

---

## 📥 Java JDK Kurulumu (5 Dakika)

### Adım 1: Java JDK İndirin

**En iyi seçenek: Eclipse Temurin (Ücretsiz, Açık Kaynak)**

🔗 **İndirme Linki:** https://adoptium.net/temurin/releases/?version=17

**Seçimler:**
- ✅ Version: **17 (LTS)**
- ✅ Operating System: **Windows**
- ✅ Architecture: **x64**
- ✅ Package Type: **JDK**
- ✅ Dosya tipi: **.msi** (Installer)

**Direkt indirme:** Sayfada büyük "Download" butonu

---

### Adım 2: Kurulum

1. İndirdiğiniz `.msi` dosyasını **çift tıklayın**
2. "Next" ile ilerleyin
3. **ÖNEMLİ:** Kurulum sırasında:
   - ✅ "Set JAVA_HOME variable" **işaretli olmalı**
   - ✅ "JavaSoft (Oracle) registry keys" **işaretli olmalı**
   - ✅ "Add to PATH" **işaretli olmalı**

4. "Install" tıklayın
5. Kurulum bitene kadar bekleyin (2-3 dakika)
6. "Finish"

---

### Adım 3: Terminali Yeniden Başlatın

**ÖNEMLİ:** Tüm PowerShell ve CMD pencerelerini **kapatın ve yeniden açın**.

PATH değişkenleri yeni terminalde aktif olacak.

---

### Adım 4: Java'yı Kontrol Edin

Yeni terminal açıp komutu çalıştırın:

```cmd
java -version
```

**Başarılı çıktı:**
```
openjdk version "17.0.x" 2024-xx-xx
OpenJDK Runtime Environment Temurin-17.0.x+x (build 17.0.x+x)
OpenJDK 64-Bit Server VM Temurin-17.0.x+x (build 17.0.x+x, mixed mode)
```

---

## 🚀 Java Kurulduktan Sonra

### 1. APK Build Et

**Yöntem A: Otomatik Script**

Çift tıklayın:
```
BUILD_AND_INSTALL.bat
```

**Yöntem B: Manuel**

```cmd
cd "C:\Users\emref\Desktop\Witly Music\mobile\android"
gradlew.bat assembleDebug
```

### 2. APK'yı Bul

```
mobile\android\app\build\outputs\apk\debug\app-debug.apk
```

### 3. Fiziksel Cihaza Yükle

**Yöntem A: ADB ile (USB)**
```cmd
adb install app-debug.apk
```

**Yöntem B: Manuel**
- APK'yı WhatsApp/Email ile kendinize gönderin
- Telefonda açıp yükleyin
- "Bilinmeyen kaynaklardan yükleme" izni verin

---

## 🔍 Sorun Giderme

### "JAVA_HOME is not set" hatası

Manuel olarak ayarlayın:

1. Windows Arama: "Environment Variables"
2. "Edit the system environment variables"
3. "Environment Variables" butonu
4. "System Variables" altında "New":
   - **Variable name:** `JAVA_HOME`
   - **Variable value:** `C:\Program Files\Eclipse Adoptium\jdk-17.x.x.x-hotspot`
5. "Path" değişkenine ekleyin:
   - `%JAVA_HOME%\bin`
6. Terminali yeniden başlatın

### Gradle çok yavaş

İlk build 5-10 dakika sürebilir (bağımlılıkları indiriyor).
Sonraki buildler 1-2 dakika sürer.

---

## 🎯 Özet

1. ✅ Java JDK 17 indirin ve kurun
2. ✅ Terminali yeniden başlatın
3. ✅ `java -version` ile test edin
4. ✅ `BUILD_AND_INSTALL.bat` çalıştırın
5. ✅ APK'yı telefona yükleyin

---

**Hazır olunca bana "Java kurdum" yazın, devam edelim!** ☕🚀
