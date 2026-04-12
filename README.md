# Z4PHIM

Nền tảng xem phim xây dựng bằng Next.js App Router, tập trung vào trải nghiệm duyệt phim nhanh, tìm kiếm thông minh, theo dõi lịch sử xem và lưu phim theo tài khoản.

## Why This Project Stands Out

- Product mindset rõ ràng: không chỉ render danh sách phim, mà có luồng người dùng hoàn chỉnh (đăng ký, đăng nhập, lưu phim, lịch sử xem, trang tài khoản).
- Architecture thực tế: tách rõ UI, API route, service layer và data layer.
- Data fetching hiệu năng: SSR + cache với revalidate, fallback đa nguồn cho trang chi tiết phim.
- Search nâng cấp: có smart ranking, fallback query, token scan, dedupe và scoring.

## Core Features

- Trang chủ nhiều section động: phim hot, đề cử, theo thể loại, quốc gia, năm phát hành.
- Chi tiết phim có player + chọn nguồn + chọn server + chọn tập.
- Tìm kiếm gợi ý realtime (debounce) + trang kết quả.
- Đăng ký/đăng nhập bằng email-password (NextAuth Credentials).
- Cá nhân hóa:
	- Lưu phim xem sau.
	- Ghi nhận lịch sử xem gần nhất.
	- Trang account tổng hợp dữ liệu theo người dùng.
- API nội bộ chuẩn REST trong App Router.

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, App Router.
- Authentication: NextAuth (Credentials Provider).
- Database: PostgreSQL + Prisma ORM.
- Security: bcryptjs để hash mật khẩu.
- Styling: CSS modules + global styles.

## System Design (High Level)

1. UI layer gọi các hàm trong lib để lấy dữ liệu phim.
2. Lib layer gọi external movie APIs và chuẩn hóa dữ liệu về cùng một shape.
3. App Router API xử lý nghiệp vụ user (register, saved, history).
4. Prisma truy cập PostgreSQL cho dữ liệu tài khoản và hành vi xem phim.

## Project Structure

```text
src/
	app/
		api/
			auth/[...nextauth]/route.ts
			register/route.ts
			saved/route.ts
			history/route.ts
		account/
		phim/[slug]/
		search/
	components/
	lib/
		api.ts
		phimapi.ts
		prisma.ts
	auth.ts
prisma/
	schema.prisma
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Tạo file .env với các biến cơ bản sau:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"
# Hoặc DIRECT_URL nếu bạn tách riêng direct connection
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"

# Cho trường hợp cert self-signed ở môi trường dev
PGSSL_ALLOW_SELF_SIGNED="false"

NEXTAUTH_SECRET="your-super-secret"
NEXTAUTH_URL="http://localhost:3000"

# External movie API
NEXT_PUBLIC_API_URL="https://your-primary-movie-api"
NEXT_PUBLIC_PHIMAPI_URL="https://your-secondary-movie-api"
NEXT_PUBLIC_PHIMAPI_IMAGE_PROXY=""
```

### 3) Prepare database

```bash
npx prisma generate
npx prisma db push
```

### 4) Run development server

```bash
npm run dev
```

Truy cập: http://localhost:3000

## Available Scripts

- npm run dev: Chạy local development.
- npm run build: Build production.
- npm run start: Chạy bản build production.
- npm run lint: Kiểm tra lint.

## API Surface (Internal)

- POST /api/register: tạo tài khoản mới.
- GET/POST/DELETE /api/saved: lấy, thêm, xóa phim đã lưu.
- GET/POST /api/history: lấy và cập nhật lịch sử xem.
- GET/POST /api/auth/[...nextauth]: authentication handler.

## Data Source Note

Dự án sử dụng dữ liệu phim từ các nguồn API công khai bên thứ ba để phục vụ mục đích học tập, thử nghiệm kỹ thuật và xây dựng portfolio.

- Không lưu trữ lại nội dung media trên server của dự án.
- Được thiết kế theo hướng dễ thay thế data provider, nên có thể chuyển sang nguồn chính thức khi triển khai production.

## What I Focused On As A Developer

- Viết code theo hướng scale được, tách concern rõ ràng.
- Cân bằng DX và UX: dễ maintain nhưng vẫn mượt cho người dùng cuối.
- Ưu tiên khả năng mở rộng: có thể thêm watchlist nâng cao, recommendation, analytics, hoặc role admin.

## Roadmap

- Tối ưu SEO sâu hơn cho tất cả trang động.
- Thêm test cho API routes và service layer.
- Thêm observability (logging + metrics) cho production readiness.
- Bổ sung CI pipeline và auto deploy.

## License

MIT (hoặc cập nhật theo nhu cầu của bạn).
