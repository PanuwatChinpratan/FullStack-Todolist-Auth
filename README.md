## 🚀 การเริ่มต้นใช้งาน (Dev Mode ด้วย Docker)

### 1. ติดตั้ง Docker Desktop

ดาวน์โหลดและติดตั้ง Docker Desktop ที่ [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

> หลังติดตั้งให้เปิด Docker Desktop ขึ้นมาก่อนจนขึ้นว่า "Docker is running"

---

### 2. ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables)

สร้างไฟล์ `.env.local` ไว้ที่ root ของโปรเจกต์ (ระดับเดียวกับ `package.json`)

#### `.env.local`

```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority"

AUTH_SECRET=your-secret-here

AUTH_GITHUB_ID=xxxxxxxxxxxxxxxxxxxx
AUTH_GITHUB_SECRET=xxxxxxxxxxxxxxxxxxxx

AUTH_GOOGLE_ID=xxxxxxxxxxxxxxxxxxxx
AUTH_GOOGLE_SECRET=xxxxxxxxxxxxxxxxxxxx
```

> ℹ️ อย่าลืมใส่ค่าของตัวแปร `.env.local` ให้ครบก่อนเริ่มใช้งาน

---

### 3. รันโปรเจกต์ด้วย Docker (Dev Mode)

```bash
docker compose up --build
```

จากนั้นเปิดเบราว์เซอร์ที่  
🔗 [http://localhost:3000](http://localhost:3000)

> Docker จะใช้ Next.js Dev Mode (`npm run dev`) และ hot reload ให้โดยอัตโนมัติ

---

### 4. คำสั่ง Prisma (เฉพาะกรณี schema เปลี่ยน)

ถ้าคุณแก้ไข `prisma/schema.prisma` หรือเปลี่ยนโครงสร้าง DB  
ให้รันคำสั่งนี้ใน container เพื่อ sync schema:

```bash
docker exec -it next-dev npx prisma db push
```

---

### 5. คำสั่ง build สำหรับ Production

ใน `package.json` มี script นี้อยู่แล้ว:

```json
"scripts": {
  "build": "prisma generate && next build"
}
```

คำสั่งนี้จะ build โปรเจกต์โดยรัน `prisma generate` ก่อน เพื่อให้ Prisma Client เตรียมใช้งาน

หากต้องการ build แบบ production (สำหรับ deploy):

```bash
npm run build
```

---

### 6. คำสั่งทั่วไปที่ใช้บ่อย

| คำสั่ง | อธิบาย |
|--------|--------|
| `docker compose up --build` | รันโปรเจกต์แบบ dev ด้วย Docker |
| `docker compose down` | ปิด container ทั้งหมด |
| `docker exec -it next-dev npx prisma db push` | Sync schema Prisma |
| `docker exec -it next-dev npx prisma studio` | เปิด UI ดูข้อมูลใน DB |
| `npm run build` | สร้าง production build |

---

## 🚁 Deploy บน Vercel

คุณสามารถ deploy โปรเจกต์นี้บน Vercel ได้ทันที

สิ่งที่ต้องเตรียม:

1. เพิ่ม Environment Variables ใน Vercel ให้ตรงกับ `.env` และ `.env.local`
2. ตั้งค่า `DATABASE_URL`, `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GOOGLE_ID` และอื่นๆ ที่ใช้งานจริง
3. กด Deploy ได้เลยผ่าน GitHub หรือ Vercel CLI

📙 ศึกษารายละเอียดเพิ่มเติมที่:  
[https://nextjs.org/docs/app/building-your-application/deploying](https://nextjs.org/docs/app/building-your-application/deploying)

---

## ✅ หมายเหตุ

- หากคุณไม่ใช้ Docker ก็ยังสามารถรันด้วยคำสั่งปกติ:
```bash
npm install
npx prisma generate
npm run dev
```

- แต่ขอแนะนำให้ใช้ Docker เพื่อให้ environment สะอาด และเหมือนกันทุกเครื่อง

