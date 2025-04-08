## 🚀 การเริ่มต้นใช้งาน (Dev Mode ด้วย Docker)

1. ติดตั้ง Docker Desktop จาก https://www.docker.com/products/docker-desktop  
หลังติดตั้งให้เปิด Docker Desktop แล้วรอจนขึ้นว่า "Docker is running"

2. สร้างไฟล์ .env.local ใน root directory (ระดับเดียวกับ package.json) และใส่ค่าประมาณนี้:

DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority"
AUTH_SECRET=your-secret-here
AUTH_GITHUB_ID=xxxxxxxxxxxxxxxxxxxx
AUTH_GITHUB_SECRET=xxxxxxxxxxxxxxxxxxxx
AUTH_GOOGLE_ID=xxxxxxxxxxxxxxxxxxxx
AUTH_GOOGLE_SECRET=xxxxxxxxxxxxxxxxxxxx

3. รันโปรเจกต์ Dev ด้วย Docker:

docker compose up --build

จากนั้นเปิด http://localhost:3000 เพื่อเข้าใช้งาน

4. หากมีการแก้ไข schema Prisma ให้ sync ด้วยคำสั่งนี้:

docker exec -it my-app-dev npx prisma db push

5. หากต้องการ build production (เช่นสำหรับ deploy):

npm run build

---

## 🐳 การใช้งาน Production ด้วย Docker

1. สร้างไฟล์ .env.production และกำหนดค่าให้เหมือน .env.local แต่เป็นของ Production:

DATABASE_URL="mongodb+srv://..."
AUTH_SECRET=...
AUTH_GITHUB_ID=...
AUTH_GOOGLE_ID=...

2. รัน production ด้วย:

docker compose -f docker-compose.prod.yml up --build -d

3. ปิด production container ด้วย:

docker compose -f docker-compose.prod.yml down

---

## ☁️ Deploy บน Vercel

1. Push code ไปยัง GitHub  
2. เข้าไปที่ https://vercel.com แล้ว connect repo  
3. เพิ่ม Environment Variables จาก .env.local  
4. กด Deploy ได้เลย

---

## 🧪 ไม่ใช้ Docker ก็สามารถใช้ได้

npm install  
npx prisma generate  
npm run dev

---

## ✅ สรุปคำสั่งที่ใช้บ่อย

- เริ่ม Dev: docker compose up --build  
- หยุด Dev: docker compose down  
- Prisma Sync: docker exec -it my-app-dev npx prisma db push  
- Prisma Studio: docker exec -it my-app-dev npx prisma studio  
- Production Up: docker compose -f docker-compose.prod.yml up --build -d  
- Production Down: docker compose -f docker-compose.prod.yml down  
