@echo off
echo ====================================
echo  Witly Music - APK Olusturucu
echo ====================================
echo.

cd mobile\android

echo [1/3] Gradle temizleniyor...
call gradlew clean

echo.
echo [2/3] Debug APK olusturuluyor...
call gradlew assembleDebug

echo.
echo [3/3] Tamamlandi!
echo.
echo APK konumu:
echo %CD%\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Bu APK dosyasini telefonunuza gonderin ve yukleyin.
echo.

pause
