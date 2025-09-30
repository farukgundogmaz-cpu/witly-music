# 🔥 Windows Firewall - Port 3000 İzni

## Telefon Backend'e Erişemiyor mu?

Eğer telefon backend'e bağlanamazsa, Windows Firewall port 3000'i engelliyor olabilir.

---

## 🔓 Firewall İzni Verme (Kolay Yöntem)

### Adım 1: Windows Defender Firewall Açın

1. Windows Arama: `firewall`
2. "Windows Defender Firewall" açın
3. Sol tarafta: **"Allow an app or feature through Windows Defender Firewall"**

### Adım 2: İzin Ekleyin

1. **"Change settings"** butonuna tıklayın (Admin gerektir)
2. **"Allow another app..."** butonuna tıklayın
3. **"Browse"** ile Node.js'i bulun:
   ```
   C:\Program Files\nodejs\node.exe
   ```
4. **"Add"** tıklayın
5. **Private** ve **Public** kutucukları işaretli olsun ✅
6. **OK**

---

## 🔓 Alternatif: Manuel Kural Oluştur

### PowerShell ile (Yönetici olarak):

```powershell
New-NetFirewallRule -DisplayName "Node.js Backend (Port 3000)" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

---

## ✅ Test Edin

Telefonunuzun tarayıcısında:
```
http://192.168.1.110:3000/health
```

Şunu görmelisiniz:
```json
{
  "status": "OK",
  "message": "Witly Music API is running"
}
```

---

## 🔒 Güvenlik Notu

- Bu izin sadece **local network** için gerekli
- İnternet üzerinden erişim olmaz
- Sadece aynı WiFi'deki cihazlar erişebilir
