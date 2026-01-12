// import { useState, useEffect } from 'react' // เพิ่ม useState และ useEffect ที่นี่ครับ
import Nav from '../components/Nav.jsx'
import Home from '../components/Home.jsx'
import Services from '../components/Services.jsx'
import News from '../components/News.jsx'
import Jobs from '../components/Jobs.jsx'
import Webportal from '../components/Webportal.jsx'
import Footer from '../components/Footer.jsx'
import Dashboard from '../components/Dashboard.jsx'
// import Dashboard from './components/Dashboard.jsx' // บอสสามารถ import Dashboard มาใส่เพิ่มได้

function App() {
  // const [apiData, setApiData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // // ส่วนที่ 1: ดึงข้อมูล API (Logic)
  // useEffect(() => {
  //   const loadPatients = async () => {
  //     try {
  //       setLoading(true);
  //       // เมื่อบอสมี API จริง ให้เปลี่ยน URL ตรงนี้ครับ
  //       const response = await fetch('https://api.example.com/patients');
  //       const data = await response.json();
  //       setApiData(data);
  //     } catch (error) {
  //       console.error("API Error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadPatients();
  // }, []); // [] หมายถึงโหลดครั้งแรกครั้งเดียว

  // ส่วนที่ 2: แสดงผลหน้าตาเว็บ (UI)
  return (
    <div className="min-h-screen bg-(--color-main-bg) transition-colors duration-500 font-sarabun">
      {/* ส่วนเมนูบนสุด */}
      <Nav />

      <main className="container mx-auto px-6 max-w-screen-2xl py-6">
        {/* ส่วน Hero / Welcome */}
        <Home />

        <Dashboard />

        {/* ส่วนบริการสำหรับประชาชน */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
              <h2 className="text-2xl font-bold text-main-text">
                บริการสำหรับประชาชน
              </h2>
            </div>
          </div>
          <Services />
        </div>

        {/* ส่วนข่าวและงาน (แบ่ง Grid 2:1 ตามที่บอสต้องการ) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <News />
          </div>
          <div className="lg:col-span-1">
            <Jobs />
          </div>
        </div>

        {/* Webportal */}
        <Webportal />
      </main>

      {/* ส่วนท้ายเว็บ */}
      <Footer />
    </div>
  );
}

export default App;