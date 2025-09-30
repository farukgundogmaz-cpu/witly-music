#!/bin/bash

echo "🎵 Witly Music APK Builder"
echo "=========================="
echo ""

# Mobile dizinine git
cd mobile

echo "📦 Bağımlılıklar kontrol ediliyor..."
npm install

echo "🧹 Önbellek temizleniyor..."
cd android
./gradlew clean

echo "🔨 Release APK oluşturuluyor..."
./gradlew assembleRelease

echo ""
echo "✅ APK başarıyla oluşturuldu!"
echo "📍 Konum: mobile/android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "📱 Telefonunuza yüklemek için:"
echo "1. APK dosyasını telefonunuza aktarın"
echo "2. Telefonunuzda 'Bilinmeyen kaynaklardan yükleme' özelliğini etkinleştirin"
echo "3. APK dosyasına tıklayarak yükleyin"
