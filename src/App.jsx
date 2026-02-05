import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import Services from './components/Services.jsx'
import News from './components/News.jsx'
import Jobs from './components/Jobs.jsx'
import Webportal from './components/Webportal.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './components/Dashboard.jsx'

// นำเข้า AdminLayout จากโฟลเดอร์ที่บอสสร้างไว้
import Adminlayout from './layouts/AdminLayout.jsx'

function App() {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // 🚀 สถานะการสลับหน้า (Default เป็น false คือหน้าบ้าน)
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <div className={`min-h-screen bg-main-bg transition-all duration-500 font-sarabun ${isServiceModalOpen ? 'overflow-hidden' : ''}`}>

      {/* 🔘 ปุ่มทางลัดลอยตัว (Admin Toggle Button) */}
      <button
        onClick={() => setIsAdminView(!isAdminView)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-pink-600 text-white rounded-full shadow-[0_8px_30px_rgb(219,39,119,0.4)] z-[9999] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isAdminView ? (
          <span className="text-2xl">🏠</span> // ถ้าอยู่หลังบ้าน จะโชว์ไอคอนบ้านเพื่อกลับหน้าแรก
        ) : (
          <span className="text-2xl">⚙️</span> // ถ้าอยู่หน้าบ้าน จะโชว์ฟันเฟืองเพื่อเข้าหลังบ้าน
        )}

        {/* Label เล็กๆ เวลาเอาเมาส์ไปชี้ */}
        <span className="absolute right-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
          {isAdminView ? "กลับหน้าหลัก" : "เข้าหลังบ้าน"}
        </span>
      </button>

      {isAdminView ? (
        // --- ส่วนของหลังบ้าน (ADMIN VIEW) ---
        <Adminlayout>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-slate-800">แผงควบคุมหลัก</h2>
            <p className="text-slate-500 mt-2">ยินดีต้อนรับครับบอส ตอนนี้บอสอยู่ในระบบหลังบ้านแล้ว</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-8 bg-white rounded-4xl border border-slate-100 shadow-sm">
                <p className="text-sm font-bold text-slate-400 uppercase">แชทใหม่</p>
                <h3 className="text-4xl font-black text-pink-600 mt-2">3</h3>
              </div>
              <div className="p-8 bg-white rounded-4xl border border-slate-100 shadow-sm">
                <p className="text-sm font-bold text-slate-400 uppercase">เรื่องร้องเรียน</p>
                <h3 className="text-4xl font-black text-slate-800 mt-2">12</h3>
              </div>
            </div>
          </div>
        </Adminlayout>
      ) : (
        // --- ส่วนของหน้าบ้าน (USER VIEW - โค้ดเดิมของบอส) ---
        <>
          <Nav />
          <main className={`container mx-auto px-6 max-w-screen-2xl py-6 transition-all duration-500 ${isServiceModalOpen ? 'blur-md scale-[0.98] pointer-events-none' : ''}`}>
            <Home />

            <div className="w-full mx-auto px-4 py-8 bg-white rounded-4xl shadow-sm border border-slate-50">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <div className="top-10">
                    <Services
                      isGlobalModalOpen={isServiceModalOpen}
                      setIsGlobalModalOpen={setIsServiceModalOpen}
                    />
                  </div>
                </div>
                <div className="lg:col-span-3 space-y-6">
                  <Dashboard />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-8 bg-white rounded-4xl shadow-sm border border-slate-50">
              <div className="lg:col-span-3 p-5">
                <News />
              </div>
              <div className="lg:col-span-1 p-5">
                <Jobs />
              </div>
            </div>

            <div className="mt-5 bg-white rounded-4xl shadow-sm border border-slate-50">
              <Webportal />
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;