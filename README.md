# MS Yapı & Mühendislik Website

Profesyonel inşaat mühendisliği hizmetleri için modern ve şık website.

## Özellikler

- ✅ Tamamen responsive tasarım (mobil, tablet, desktop)
- ✅ Türkçe ve İngilizce dil desteği
- ✅ Modern ve profesyonel tasarım
- ✅ GitHub Pages için hazır
- ✅ Smooth scroll ve animasyonlar
- ✅ SEO dostu yapı

## GitHub Pages'e Deploy Etme

1. Repository'yi GitHub'a push edin:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. GitHub repository ayarlarına gidin:
   - Settings > Pages
   - Source: "Deploy from a branch" seçin
   - Branch: `main` ve `/ (root)` seçin
   - Save'e tıklayın

3. Birkaç dakika içinde website `https://[username].github.io/website-demo/` adresinde yayında olacak.

## Yerel Geliştirme

Website statik HTML/CSS/JS kullanıyor, herhangi bir build tool gerektirmiyor. Basitçe `index.html` dosyasını bir web browser'da açabilirsiniz.

Veya basit bir HTTP server kullanabilirsiniz:

```bash
# Python ile
python3 -m http.server 8000

# Node.js ile (http-server kuruluysa)
npx http-server
```

Sonra browser'da `http://localhost:8000` adresine gidin.

## Logo Dosyaları

Website PNG logo dosyalarını kullanıyor. Aşağıdaki dosyaları eklemeniz gerekiyor:

- **logo.png** - Navbar için siyah logo (beyaz arka plan üzerinde)
- **logo-white.png** - Hero ve Footer için beyaz logo (siyah arka plan üzerinde)

Logo dosyalarını `website-demo/` klasörüne ekledikten sonra website otomatik olarak bunları kullanacaktır.

## Dosya Yapısı

```
website-demo/
├── index.html          # Türkçe ana sayfa
├── index-en.html       # İngilizce ana sayfa
├── styles.css          # Tüm stil tanımlamaları
├── script.js           # JavaScript fonksiyonları
├── logo.png            # Navbar için siyah logo
├── logo-white.png      # Hero ve Footer için beyaz logo
├── .nojekyll          # GitHub Pages Jekyll'i devre dışı bırakır
└── README.md          # Bu dosya
```

## Özelleştirme

- **Renkler**: `styles.css` dosyasındaki `:root` değişkenlerini düzenleyin
- **İçerik**: `index.html` ve `index-en.html` dosyalarını düzenleyin
- **Logo**: PNG logo dosyalarını (`logo.png` ve `logo-white.png`) değiştirerek özelleştirebilirsiniz

## Lisans

Bu proje kişisel kullanım içindir.
