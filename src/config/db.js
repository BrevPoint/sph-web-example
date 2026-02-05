// backend/db.js
import mysql from 'mysql2'; // เปลี่ยนจาก require เป็น import

// Config เข้าหา localhost ของบอส
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',      
  password: 'root',      // ใส่รหัสผ่านถ้ามี
  database: 'hospital_db' 
});

connection.connect((err) => {
  if (err) {
    console.error('บอสครับ! เชื่อมต่อ DB ไม่สำเร็จ: ' + err.stack);
    return;
  }
  console.log('เชื่อมต่อฐานข้อมูลสำเร็จแล้วครับบอส!');
});

export default connection; // เปลี่ยนจาก module.exports เป็น export default