@echo off
echo ================================================
echo   Witly Music - Fiziksel Cihaz Yukleme
echo ================================================
echo.

echo [1/5] Java kontrolu...
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo *** HATA: Java bulunamadi! ***
    echo.
    echo Java JDK 11+ yuklemeniz gerekiyor:
    echo https://adoptium.net/temurin/releases/?version=17
    echo.
    echo Yukledikten sonra bu dosyayi tekrar calistirin.
    pause
    exit /b 1
)
echo    Java bulundu!

echo.
echo [2/5] Android SDK kontrolu...
if not exist "%LOCALAPPDATA%\Android\Sdk" (
    echo.
    echo *** UYARI: Android SDK bulunamadi! ***
    echo Varsayilan konum: %LOCALAPPDATA%\Android\Sdk
    echo.
    echo Android Studio yukleyin veya SDK konumunu kontrol edin.
    pause
)

echo.
echo [3/5] Gradle temizleniyor...
cd mobile\android
call gradlew.bat clean

echo.
echo [4/5] Debug APK olusturuluyor...
echo (Bu islem 5-10 dakika surebilir, lutfen bekleyin...)
call gradlew.bat assembleDebug

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo *** HATA: APK olusturulamadi! ***
    echo.
    echo Hata detaylari icin yukaridaki mesajlari kontrol edin.
    pause
    exit /b 1
)

echo.
echo [5/5] Tamamlandi!
echo.
echo ================================================
echo   APK BASARIYLA OLUSTURULDU!
echo ================================================
echo.
echo APK Konumu:
echo %CD%\app\build\outputs\apk\debug\app-debug.apk
echo.
echo SONRAKI ADIMLAR:
echo.
echo 1. Telefonunuzun USB Debugging'i acik olmali
echo 2. USB ile bilgisayara baglayin
echo 3. Asagidaki komutu calistirin:
echo.
echo    cd mobile\android
echo    adb install app\build\outputs\apk\debug\app-debug.apk
echo.
echo VEYA
echo.
echo APK dosyasini WhatsApp/Email ile telefonunuza gonderin
echo ve telefonda yükleyin.
echo.

:: APK dosyasini ana dizine kopyala
copy app\build\outputs\apk\debug\app-debug.apk ..\..\WitlyMusic.apk
echo APK kopyalandi: WitlyMusic.apk
echo.

pause
