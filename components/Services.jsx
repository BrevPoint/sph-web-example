import { useState } from 'react';

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const services = [
    { title: "ฉุกเฉิน", icon: "🚑", color: "from-red-500 to-red-600", light: "bg-red-50", link: "https://line.me/ti/p/link-ER" },
    { title: "อายุรกรรม", icon: "🩺", color: "from-blue-500 to-blue-600", light: "bg-blue-50", link: "https://line.me/ti/p/link-Med" },
    { title: "ทันตกรรม", icon: "🦷", color: "from-purple-500 to-purple-600", light: "bg-purple-50", link: "https://line.me/ti/p/link-Dental" },
    { title: "กุมารเวช", icon: "👶", color: "from-pink-500 to-pink-600", light: "bg-pink-50", link: "https://line.me/ti/p/link-Kids" },
    { title: "นวดแผนไทย", icon: "🌿", color: "from-green-500 to-green-600", light: "bg-green-50", link: "https://line.me/ti/p/link-Thai" },
    { title: "กายภาพ", icon: "🚶", color: "from-orange-500 to-orange-600", light: "bg-orange-50", link: "https://line.me/ti/p/link-Physio" },
    { title: "ชันสูตร", icon: "🧪", color: "from-cyan-500 to-cyan-600", light: "bg-cyan-50", link: "https://line.me/ti/p/link-Lab" },
    { title: "จักษุ", icon: "👁️", color: "from-indigo-500 to-indigo-600", light: "bg-indigo-50", link: "https://line.me/ti/p/link-Eye" },
    { title: "จิตเวช", icon: "🧠", color: "from-teal-500 to-teal-600", light: "bg-teal-50", isInHouse: true },
    { title: "ร้องเรียน", icon: "📢", color: "from-yellow-500 to-yellow-600", light: "bg-yellow-50", isInHouse: true },
  ];

  const handleSelectService = (item) => {
    setIsModalOpen(false);
    if (item.isInHouse) {
      setActiveChat(item.title);
      setIsMinimized(false);
    } else {
      window.open(item.link, '_blank');
    }
  };

  return (
    <section className="w-full py-6 px-2 font-sarabun">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Main Online Consult - ปรับ Compact */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="md:col-span-1 group relative overflow-hidden bg-white rounded-[1.5rem] p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 border border-white cursor-pointer flex flex-col justify-between"
        >
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[9px] font-black tracking-[0.15em] mb-3">
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              STAFF ONLINE
            </span>
            <h3 className="text-xl font-black text-slate-900 leading-tight">
              ปรึกษาเจ้าหน้าที่ <br/>
              <span className="text-blue-600">ออนไลน์ 24 ชม.</span>
            </h3>
          </div>
          <div className="flex justify-between items-end mt-6">
            <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md shadow-slate-200 group-hover:scale-105 transition-transform">เริ่มแชท</button>
            <div className="text-5xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 drop-shadow-lg">🩺</div>
          </div>
        </div>

        {/* Rights Card - ปรับ Compact */}
        <div className="group bg-white rounded-[1.5rem] p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-500 border border-white flex flex-col justify-between cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💳</div>
          <div className="mt-4">
            <h4 className="text-lg font-black text-slate-800 leading-none">สิทธิการรักษา</h4>
            <p className="text-green-600 font-bold text-[9px] mt-1.5 tracking-wider uppercase">Check Rights</p>
          </div>
        </div>

        {/* Complaint Card - ปรับ Compact */}
        <div 
          onClick={() => handleSelectService({ title: "ร้องเรียน", isInHouse: true })}
          className="group bg-white rounded-[1.5rem] p-6 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-500 border border-white flex flex-col justify-between cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📣</div>
          <div className="mt-4">
            <h4 className="text-lg font-black text-slate-800 leading-none">แจ้งเรื่องร้องเรียน</h4>
            <p className="text-red-500 font-bold text-[9px] mt-1.5 tracking-wider uppercase">Help & Feedback</p>
          </div>
        </div>
      </div>

      {/* --- Modal (Compact Premium) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-white">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-800">เลือกแผนกรับบริการ</h2>
                <p className="text-xs text-slate-400 mt-1">กรุณาเลือกแผนกที่ท่านต้องการปรึกษา</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center text-lg">✕</button>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-50/30 overflow-y-auto max-h-[60vh]">
              {services.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectService(item)}
                  className="group p-4 rounded-xl bg-white hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center gap-2 border border-transparent hover:border-blue-100"
                >
                  <div className={`w-12 h-12 ${item.light} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-slate-700 text-xs group-hover:text-blue-600 transition-colors">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- Chat Window (Compact Size) --- */}
      {activeChat && (
        <div className={`fixed bottom-6 right-6 z-[1000] transition-all duration-500 ${isMinimized ? 'w-64' : 'w-[350px]'}`}>
          <div className="bg-white rounded-[1.5rem] shadow-2xl overflow-hidden border border-white flex flex-col">
            <div className="p-4 bg-white border-b border-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm shadow-md shadow-blue-200">💬</div>
                <div className="text-sm font-black text-slate-800">{activeChat}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setIsMinimized(!isMinimized)} className="w-7 h-7 hover:bg-slate-50 rounded-lg text-slate-400 font-bold">_</button>
                <button onClick={() => setActiveChat(null)} className="w-7 h-7 hover:bg-red-50 hover:text-red-500 rounded-lg text-slate-400">✕</button>
              </div>
            </div>
            {!isMinimized && (
              <>
                <div className="h-[300px] p-5 bg-slate-50/50 overflow-y-auto flex flex-col gap-3">
                   <div className="bg-white p-3.5 rounded-xl rounded-tl-none text-xs self-start shadow-sm border border-white text-slate-600 max-w-[90%] leading-relaxed">
                      สวัสดีครับบอส ยินดีต้อนรับสู่แผนก <strong>{activeChat}</strong> ครับ ต้องการสอบถามข้อมูลพิมพ์ไว้ได้เลยครับ
                   </div>
                </div>
                <div className="p-3.5 bg-white border-t border-slate-50 flex gap-2">
                  <input placeholder="พิมพ์ข้อความ..." className="flex-1 bg-slate-50 px-4 py-2.5 rounded-lg text-xs outline-none focus:ring-2 ring-blue-500/20 transition-all" />
                  <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-xs font-black shadow-md shadow-blue-200 hover:bg-blue-700 transition-all">ส่ง</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}