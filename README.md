## 🚀 การเริ่มต้นใช้งาน (Dev Mode ด้วย Docker)

### 🔧 1. ติดตั้ง Docker Desktop
- ดาวน์โหลดจาก [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- หลังติดตั้งให้เปิด Docker Desktop แล้วรอจนขึ้นว่า `Docker is running`

### 📝 2. สร้างไฟล์ `.env.local`
- วางไว้ที่ root directory (ระดับเดียวกับ `package.json`)
- ตัวอย่างค่าที่ต้องใส่:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority"
AUTH_SECRET=your-secret-here
AUTH_GITHUB_ID=xxxxxxxxxxxxxxxxxxxx
AUTH_GITHUB_SECRET=xxxxxxxxxxxxxxxxxxxx
AUTH_GOOGLE_ID=xxxxxxxxxxxxxxxxxxxx
AUTH_GOOGLE_SECRET=xxxxxxxxxxxxxxxxxxxx
```

### ▶️ 3. รันโปรเจกต์ Dev ด้วย Docker

```bash
docker compose up --build
```

- เปิดเว็บที่: [http://localhost:3000](http://localhost:3000)

### 🔁 4. Sync Prisma Schema (ถ้ามีการแก้ schema)

```bash
docker exec -it my-app-dev npx prisma db push
```

### 🏗️ 5. Build แบบ Production

```bash
npm run build
```

---

## 🐳 การใช้งาน Production ด้วย Docker

### 📝 1. สร้างไฟล์ `.env.production`
```env
DATABASE_URL="mongodb+srv://..."
AUTH_SECRET=...
AUTH_GITHUB_ID=...
AUTH_GOOGLE_ID=...
```

### 🚀 2. รัน production ด้วย:
```bash
docker compose -f docker-compose.prod.yml up --build -d
```

### 🛑 3. ปิด production container:
```bash
docker compose -f docker-compose.prod.yml down
```

---

## ☁️ Deploy บน Vercel

1. Push code ขึ้น GitHub  
2. เข้า [https://vercel.com](https://vercel.com) แล้ว connect กับ repo  
3. เพิ่ม Environment Variables ตาม `.env.local` ในหน้า Settings ของ Vercel  
4. กด Deploy ได้เลย 🎉

---

## 🧪 หากไม่ใช้ Docker
```bash
npm install
npx prisma generate
npm run dev
```

---

## ✅ สรุปคำสั่งที่ใช้บ่อย

| คำสั่ง | อธิบาย |
|--------|--------|
| `docker compose up --build` | เริ่ม Dev Mode |
| `docker compose down` | ปิด Dev Mode |
| `docker exec -it my-app-dev npx prisma db push` | Sync Prisma Schema |
| `docker exec -it my-app-dev npx prisma studio` | UI สำหรับดู DB |
| `docker compose -f docker-compose.prod.yml up --build -d` | รัน Production Mode |
| `docker compose -f docker-compose.prod.yml down` | ปิด Production Mode |

