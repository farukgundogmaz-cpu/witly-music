@echo off
echo ================================================
echo   Witly Music - Build Durum Kontrolu
echo ================================================
echo.

cd mobile\android\app\build\outputs\apk\debug

if exist app-debug.apk (
    echo APK HAZIR!
    echo.
    dir app-debug.apk
    echo.
    echo APK Konumu:
    echo %CD%\app-debug.apk
    echo.
    echo TELEFONA YUKLEME:
    echo 1. WhatsApp ile kendinize gonderin
    echo 2. Veya: adb install app-debug.apk
) else (
    echo Build henuz tamamlanmadi.
    echo.
    cd ..\..\..\..\..\..
    echo Build klasoru kontrol ediliyor...
    if exist "mobile\android\app\build" (
        echo Build devam ediyor...
    ) else (
        echo Build henuz baslamadi!
    )
)

echo.
pause
