import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 1. เชื่อมต่อฐานข้อมูล
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // บอสเช็กให้ชัวร์นะว่ารหัสผ่านคือ root หรือค่าว่าง
    database: 'hospital_db'
}).promise();

// 2. ดึงข้อมูลแชท (GET) - แก้ชื่อตารางเป็น chat_logs ตามรูปบอส
app.get('/api/chats', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM chat_logs ORDER BY id ASC");
        res.json(rows);
    } catch (err) {
        console.error("❌ DB Error:", err.message);
        res.status(500).json({ error: "ดึงข้อมูลไม่ได้ครับบอส" });
    }
});

// 3. รับข้อความแชท (POST) - แก้ชื่อตารางและค่า Enum ให้ตรง
app.post('/api/chats', async (req, res) => {
    try {
        const { user_id, department, message, time_sent } = req.body;

        if (!user_id || !message) {
            return res.status(400).json({ error: "ข้อมูลไม่ครบครับ" });
        }

        // แก้ชื่อตารางเป็น chat_logs และส่ง status เป็น 'unread'
        const sql = `INSERT INTO chat_logs 
            (user_id, department, message, sender_name, status, time_sent, is_read) 
            VALUES (?, ?, ?, ?, 'unread', ?, 0)`;

        const values = [
            user_id,
            department || 'ทั่วไป',
            message,
            'คนไข้ทั่วไป', // ใช้ตามรูป DB ของบอส
            time_sent || new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
        ];

        await db.query(sql, values);
        res.status(200).json({ status: "success" });
    } catch (err) {
        console.error("❌ Insert Error:", err.message);
        res.status(500).send(err.message);
    }
});

// ... (โค้ดส่วนที่ 1-3 ของบอสเหมือนเดิม)

// ✅ 4. API สำหรับแอดมินตอบกลับ (แบบเดิม - เก็บไว้เผื่อบอสอยากแก้ไขข้อความเก่า)
app.put('/api/chats/reply/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { admin_reply } = req.body;
        const sql = `UPDATE chat_logs SET admin_reply = ?, status = 'replied', replied_at = NOW(), is_read = 1 WHERE id = ?`;
        const [result] = await db.query(sql, [admin_reply, id]);
        res.status(200).json({ status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 5. API สำหรับอัปเดตสถานะอ่านแล้ว (ของเดิม)
app.put('/api/chats/read/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const sql = `UPDATE chat_logs SET is_read = 1 WHERE user_id = ?`;
        await db.query(sql, [uid]);
        res.status(200).json({ status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔥 6. [เพิ่มใหม่!] API สำหรับ "ส่งข้อความใหม่" จากแอดมิน (ป้องกันการทับกัน)
// ตัวนี้จะทำให้แชทของบอสขึ้นเป็น Bubbles ต่อจากคนไข้ทันทีครับ
app.post('/api/chats/admin-reply', async (req, res) => {
    try {
        const { user_id, department, admin_reply } = req.body;

        if (!user_id || !admin_reply) {
            return res.status(400).json({ error: "ข้อมูลไม่ครบครับบอส" });
        }

        // เราจะ Insert เป็น Row ใหม่ โดยที่ช่อง message (ของคนไข้) เป็นค่าว่าง
        // แต่ใส่ข้อมูลในช่อง admin_reply แทนครับ
        const sql = `INSERT INTO chat_logs 
            (user_id, department, message, admin_reply, sender_name, status, time_sent, is_read, replied_at) 
            VALUES (?, ?, '', ?, 'ADMIN', 'replied', ?, 1, NOW())`;

        const timeNow = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

        await db.query(sql, [user_id, department, admin_reply, timeNow]);

        console.log(`🚀 บอสส่งข้อความใหม่ให้คนไข้ ${user_id} เรียบร้อย!`);
        res.status(200).json({ status: "success" });
    } catch (err) {
        console.error("❌ บอสครับ ส่งข้อความใหม่ไม่ได้:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log('🚀 API พร้อมทำงานที่พอร์ต 5000 แล้วครับบอส!');
});