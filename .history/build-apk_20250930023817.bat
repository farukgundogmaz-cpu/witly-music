@echo off
echo ========================================
echo    Witly Music APK Builder
echo ========================================
echo.

D
echo Bagimliliklari kontrol ediliyor...
call npm install

echo.
echo Onbellek temizleniyor...
cd android
call gradlew.bat clean

echo.
echo Release APK olusturuluyor...
call gradlew.bat assembleRelease

echo.
echo ========================================
echo APK basariyla olusturuldu!
echo ========================================
echo.
echo Konum: mobile\android\app\build\outputs\apk\release\app-release.apk
echo.
echo Telefonunuza yuklemek icin:
echo 1. APK dosyasini telefonunuza aktarin
echo 2. Telefonunuzda 'Bilinmeyen kaynaklardan yukleme' ozelligini etkinlestirin
echo 3. APK dosyasina tiklayarak yukleyin
echo.
pause
