/** @type {import('tailwindcss').Config} */
export default {
    // เปิดโหมดใช้ Class เพื่อให้ปุ่มกดและระบบเวลาทำงานได้
    darkMode: 'class', 
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // ตรงนี้ถ้าบอสเคยมีตั้งค่าสีพิเศษไว้ (เช่น --color-card-bg) 
        // สามารถเอามาใส่เพิ่มได้ครับ แต่ถ้ายังไม่มีก็ปล่อยว่างไว้ก่อนได้
      },
    },
    plugins: [],
  }