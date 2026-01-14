import { useState } from 'react' // เพิ่ม useState เพื่อคุม Modal จากส่วนกลาง
import Nav from '../components/Nav.jsx'
import Home from '../components/Home.jsx'
import Services from '../components/Services.jsx'
import News from '../components/News.jsx'
import Jobs from '../components/Jobs.jsx'
import Webportal from '../components/Webportal.jsx'
import Footer from '../components/Footer.jsx'
import Dashboard from '../components/Dashboard.jsx'

function App() {
  // สร้าง State กลางสำหรับเปิด/ปิด Modal ที่นี่
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  return (
    // 1. เพิ่ม group-modal เพื่อใช้คุมการเบลอทั้งหน้าถ้าต้องการ
    <div className={`min-h-screen bg-(--color-main-bg) transition-all duration-500 font-sarabun ${isServiceModalOpen ? 'overflow-hidden' : ''}`}>
      
      {/* ส่วนเมนูบนสุด */}
      <Nav />

      {/* 2. ถ้า Modal เปิด ให้ใส่ Overlay หลอกๆ คลุมทั้งหน้าไว้ที่นี่ หรือส่ง Props ไปให้ Services */}
      <main className={`container mx-auto px-6 max-w-screen-2xl py-6 transition-all duration-500 ${isServiceModalOpen ? 'blur-md scale-[0.98] pointer-events-none' : ''}`}>
        <Home />
        
        <div className="w-full mx-auto px-4 py-8 bg-white rounded-4xl shadow-sm border border-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="top-10">
                {/* 3. ส่ง State ไปให้ Services ใช้งาน */}
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
    </div>
  );
}

export default App;