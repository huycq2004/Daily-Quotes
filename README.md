# Daily Quotes - Ứng dụng Danh ngôn Hàng ngày

Ứng dụng di động được xây dựng với **Capacitor** và **React**, cho phép người dùng xem các danh ngôn ngẫu nhiên và lưu những danh ngôn yêu thích.

## 🎯 Tính năng

### Màn hình chính (Home Screen)
- Hiển thị danh ngôn ngẫu nhiên với tác giả
- Nút "Quote mới" để tải danh ngôn khác
- Nút "Thích" để lưu danh ngôn vào danh sách yêu thích
- Hiệu ứng chuyển đổi mượt mà khi thay đổi quote

### Màn hình yêu thích (Favorites Screen)
- Hiển thị danh sách tất cả danh ngôn đã lưu
- Xóa từng danh ngôn khỏi danh sách yêu thích
- Nút "Xóa tất cả" để xóa toàn bộ danh sách
- Hiển thị số lượng danh ngôn yêu thích

## 🛠️ Công nghệ sử dụng

- **React 18** - UI framework
- **Capacitor 5** - Cross-platform mobile framework
- **@capacitor/preferences** - Lưu trữ dữ liệu cục bộ (Storage plugin)
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool
- **Quotable API** - Lấy danh ngôn từ API công khai
- **Express.js** - Backend proxy (disable SSL)
- **CORS** - Cross-Origin Resource Sharing

## 📦 Cấu trúc dự án

```
daily-quotes/
├── /src                          # Mã nguồn React
│   ├── /screens
│   │   ├── HomeScreen.jsx        # Màn hình chính - hiển thị danh ngôn
│   │   └── FavoritesScreen.jsx   # Màn hình yêu thích
│   ├── /services
│   │   ├── quoteService.js       # Lấy danh ngôn từ Quotable API
│   │   └── storageService.js     # Quản lý lưu trữ (Capacitor Preferences)
│   ├── App.jsx                   # Component chính
│   ├── main.jsx                  # Entry point React
│   └── index.css                 # Styles toàn cục
│
├── /android                      # Android project (Capacitor)
│   ├── app/
│   ├── build.gradle
│   └── settings.gradle
│
├── /dist                         # Build output (production)
│   ├── index.html
│   ├── assets/
│   └── ...
│
├── /public                       # Static assets
│   └── ...
│
├── /node_modules                 # Dependencies (npm packages)
│
├── /screenshots                  # Screenshots & images
│
├── server.js                     # Express proxy server (disable SSL)
├── api-proxy.js                  # API proxy utilities
├── package.json                  # Dependencies & scripts
├── package-lock.json             # Lock file
├── capacitor.config.json         # Cấu hình Capacitor
├── vite.config.js               # Cấu hình Vite build
├── tailwind.config.js           # Cấu hình Tailwind CSS
├── postcss.config.js            # Cấu hình PostCSS
├── tsconfig.json                # TypeScript config
├── tsconfig.node.json           # TypeScript config (Node)
├── .eslintrc.cjs                # ESLint config
├── .gitignore                   # Git ignore rules
├── index.html                   # HTML entry point
└── README.md                    # Tài liệu chính
```

### Mô tả thư mục chính

| Thư mục | Mô tả |
|---------|-------|
| `/src` | Mã nguồn React chính |
| `/android` | Android project (Capacitor) |
| `/dist` | Build output cho production |
| `/public` | Static assets (images, fonts, etc.) |
| `/node_modules` | Tất cả npm packages |
| `/screenshots` | Screenshots & hình ảnh |

### File quan trọng

| File | Mô tả |
|------|-------|
| `server.js` | Express proxy server (disable SSL) |
| `package.json` | Dependencies & npm scripts |
| `capacitor.config.json` | Cấu hình Capacitor |
| `vite.config.js` | Cấu hình build tool |
| `index.html` | HTML entry point |

## 🚀 Cài đặt và chạy

### Hướng dẫn nhanh (3 bước)

#### Terminal 1: Chạy Proxy Server
```bash
# Cài đặt dependencies (lần đầu)
npm install

# Chạy proxy server (disable SSL)
node server.js
# Output: Proxy server running at http://localhost:3001
```

#### Terminal 2: Chạy Dev Server
```bash
# Chạy dev server
npm run dev
# Output: ➜  Local:   http://localhost:3000/
```

#### Browser
```
Mở: http://localhost:3000
```

### Cách hoạt động

1. **Frontend** (http://localhost:3000) → Fetch danh ngôn
2. **Proxy Server** (http://localhost:3001) → Disable SSL, fetch từ API
3. **API** (https://api.quotable.io) → Trả về danh ngôn
4. **Frontend** → Hiển thị danh ngôn

### Các lệnh chính

```bash
# Cài đặt dependencies
npm install

# Chạy proxy server (Terminal 1)
node server.js

# Chạy dev server (Terminal 2)
npm run dev

# Build ứng dụng
npm run build

# Thêm platform Android
npm run cap:add:android

# Thêm platform iOS
npm run cap:add:ios

# Đồng bộ hóa
npm run cap:sync

# Mở Android Studio
npm run cap:open:android

# Mở Xcode
npm run cap:open:ios
```

### Hướng dẫn chạy

**Web:**
```bash
node server.js          # Terminal 1: Proxy server
npm run dev             # Terminal 2: Dev server
# Mở http://localhost:3000
```

**Android:**
```bash
npm run build
npm run cap:add:android
npm run cap:sync
npm run cap:open:android
```

**iOS:**
```bash
npm run build
npm run cap:add:ios
npm run cap:sync
npm run cap:open:ios
```

## 💾 Lưu trữ dữ liệu

Ứng dụng sử dụng **@capacitor/preferences** (Capacitor Storage Plugin) để lưu danh sách yêu thích:
- Dữ liệu được lưu cục bộ trên thiết bị
- Không cần kết nối internet
- Dữ liệu được giữ ngay cả khi đóng ứng dụng
- Hoạt động trên Web, Android, và iOS

## 📝 Dữ liệu danh ngôn

Danh ngôn được lấy từ **Quotable API** (`https://api.quotable.io/quotes/random`):
- Lấy danh ngôn ngẫu nhiên từ API công khai
- Có fallback quotes cục bộ khi offline
- Tự động xử lý lỗi mạng

## 🎨 Giao diện

- **Gradient nền**: Purple to Indigo
- **Hiệu ứng animation**: Fade-in khi tải quote mới
- **Responsive design**: Tối ưu cho mobile
- **Dark mode**: Giao diện tối để bảo vệ mắt

## 📱 Tương thích

- **Android**: 5.0+
- **iOS**: 12.0+
- **Web**: Tất cả trình duyệt hiện đại

## 🔧 Troubleshooting

### Storage không hoạt động
- Đảm bảo Capacitor Storage plugin đã được cài đặt
- Kiểm tra quyền truy cập lưu trữ trên thiết bị

### Quote không tải
- Kiểm tra console để xem lỗi
- Đảm bảo `quoteService.js` có dữ liệu

## 📄 License

MIT

## 👨‍💻 Tác giả

huycq.22it@vku.udn.vn
