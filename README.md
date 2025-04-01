## การเริ่มต้นใช้งาน

### 1. ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables)

สร้างไฟล์ชื่อ `.env.local` ไว้ที่ root ของโปรเจกต์ ระดับเดียวกับ `package.json`

```env
AUTH_SECRET=

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

> ℹ️ อย่าลืมใส่ค่าของตัวแปร `.env` ให้ครบถ้วน

### 2. รันคำสั่ง Prisma (สำคัญ อย่าลืมก่อนเริ่ม dev)

ก่อนจะเริ่มพัฒนา ให้รันคำสั่งเหล่านี้เพื่อเตรียมฐานข้อมูลและ Prisma Client: *(ต้อง Stop Project ก่อน)*

```bash
npx prisma generate
npx prisma db push
```

### 3. รันเซิร์ฟเวอร์สำหรับพัฒนา

```bash
npm run dev
# หรือ
yarn dev
# หรือ
pnpm dev
# หรือ
bun dev
```

เปิด [http://localhost:3000](http://localhost:3000) ด้วยเบราว์เซอร์เพื่อดูผลลัพธ์

### 4. คำสั่ง build (Production)

ใน `package.json` ให้เพิ่มหรือแก้ไข script สำหรับ build ดังนี้: *(ใส่ไว้ให้แล้ว เขียนไว้กันลืม)*

```json
"scripts": {
  "build": "prisma generate && next build"
}
```

คำสั่งนี้จะรัน `prisma generate` ก่อน `next build` เพื่อให้แน่ใจว่า Prisma Client ถูก generate ครบก่อน build

## Deploy บน Vercel

ศึกษารายละเอียดเพิ่มเติมได้ที่ [เอกสารการ Deploy ของ Next.js](https://nextjs.org/docs/app/building-your-application/deploying)
