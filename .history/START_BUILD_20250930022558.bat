@echo off
echo ================================================
echo   Witly Music - APK Build Baslat
echo ================================================
echo.

cd mobile\android

echo JAVA_HOME ayarlaniyor...
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.16.8-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

echo.
echo Java versiyonu:
java -version
echo.

echo ================================================
echo   APK BUILD BASLIYOR
echo   Bu islem 10-15 dakika surebilir
echo   Pencereyi KAPATMAYIN!
echo ================================================
echo.

echo [1/2] Temizleniyor...
call gradlew.bat clean

echo.
echo [2/2] Debug APK olusturuluyor...
call gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================
    echo   APK BASARIYLA OLUSTURULDU!
    echo ================================================
    echo.
    echo APK Konumu:
    echo %CD%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    copy app\build\outputs\apk\debug\app-debug.apk ..\..\WitlyMusic.apk
    echo.
    echo APK ana klasore kopyalandi: WitlyMusic.apk
    echo.
    echo TELEFONA YUKLEME:
    echo 1. WitlyMusic.apk dosyasini WhatsApp ile gonderin
    echo 2. Telefonda yukleyin
    echo 3. "Bilinmeyen kaynaklar" iznini verin
    echo.
) else (
    echo.
    echo ================================================
    echo   HATA: APK OLUSTURULAMADI!
    echo ================================================
    echo.
    echo Yukaridaki hata mesajlarini kontrol edin.
    echo.
)

pause
