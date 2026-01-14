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
    <section className="w-full h-full p-1">
      {/* - md:grid-cols-3 คือแนวนอนตอนจอปกติ 
         - lg:grid-cols-1 คือแนวตั้งตอนอยู่ในช่อง Sidebar 3:1 
         - h-full สั่งให้ Container สูงเต็มพื้นที่
      */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 h-full">

        {/* Card 1: Consult */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex-1 flex flex-col bg-white rounded-4xl p-6 shadow-md border border-slate-100 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="flex py-3 flex-col items-center flex-1 justify-center">
            <span className="px-3 rounded-full bg-blue-50 text-blue-600 text-[9px] font-black tracking-[0.2em] mb-4 uppercase shadow-sm">Staff Online</span>
            <h3 className="text-lg font-black text-slate-900 leading-tight text-center">
              ปรึกษาเจ้าหน้าที่<br />
              <span className="text-blue-600 text-xl">ออนไลน์ 24 ชม.</span>
            </h3>
          </div>
          <button className="mt-6 bg-slate-900 text-white w-full py-3 rounded-2xl text-sm font-bold shadow-lg shadow-slate-200 group-hover:bg-blue-600 transition-colors">
            เริ่มแชทเลย
          </button>
        </div>

        {/* Card 2: Rights */}
        <div className="flex-1 py-8 flex flex-col bg-white rounded-4xl p-6 shadow-md border border-slate-100 cursor-pointer hover:shadow-md transition-all group text-center">
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner">💳</div>
            <h4 className="text-lg font-black text-slate-800">สิทธิการรักษา</h4>
          </div>
          <p className="mt-2 text-green-600 font-black text-[10px] tracking-widest uppercase py-2 bg-green-50/50 rounded-xl">Check Rights</p>
        </div>

        {/* Card 3: Complaint */}
        <div
          onClick={() => handleSelectService({ title: "ร้องเรียน", isInHouse: true })}
          className="flex-1 flex flex-col py-8 bg-white rounded-4xl p-6 shadow-md border border-slate-100 cursor-pointer hover:shadow-md transition-all group text-center"
        >
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner">📣</div>
            <h4 className="text-lg font-black text-slate-800">แจ้งเรื่องร้องเรียน</h4>
          </div>
          <p className="mt-2 text-red-500 font-black text-[10px] tracking-widest uppercase py-2 bg-red-50/50 rounded-xl">Help & Feedback</p>
        </div>
      </div>

      {/* --- Modal & Chat Window (คงเดิม) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">เลือกแผนกรับบริการ</h2>
                <p className="text-sm text-slate-400 mt-1">ยินดีให้บริการตลอด 24 ชั่วโมงครับ</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center text-xl">✕</button>
            </div>
            <div className="p-8 grid grid-cols-2 sm:grid-cols-5 gap-4 bg-white overflow-y-auto max-h-[60vh]">
              {services.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectService(item)}
                  className="group p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-3 border border-transparent hover:border-blue-100"
                >
                  <div className={`w-14 h-14 ${item.light} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm`}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeChat && (
        <div className={`fixed bottom-6 right-6 z-1000 transition-all duration-500 shadow-2xl ${isMinimized ? 'w-72' : 'w-95'}`}>
          <div className="bg-white rounded-4xl overflow-hidden border border-slate-100 flex flex-col shadow-2xl">
            <div className="p-5 bg-white border-b border-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-blue-200">💬</div>
                <div>
                  <div className="text-xs font-black text-blue-600 uppercase tracking-widest">Chatting with</div>
                  <div className="text-sm font-black text-slate-800">{activeChat}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="w-8 h-8 hover:bg-slate-100 rounded-xl text-slate-400 font-bold transition-colors">_</button>
                <button onClick={() => setActiveChat(null)} className="w-8 h-8 hover:bg-red-50 hover:text-red-500 rounded-xl text-slate-400 transition-colors">✕</button>
              </div>
            </div>
            {!isMinimized && (
              <>
                <div className="h-87.5 p-6 bg-slate-50/50 overflow-y-auto flex flex-col gap-4">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none text-sm self-start shadow-sm border border-white text-slate-600 max-w-[85%] leading-relaxed">
                    สวัสดีครับบอส ยินดีต้อนรับสู่แผนก <strong>{activeChat}</strong> ครับ ต้องการสอบถามข้อมูลด้านไหน พิมพ์ทิ้งไว้ได้เลยครับ ทีมงานกำลังเร่งเข้ามาตอบครับ
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-slate-50 flex gap-3 items-center">
                  <input placeholder="พิมพ์ข้อความที่นี่..." className="flex-1 bg-slate-50 px-5 py-3 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500/20 transition-all border border-transparent focus:border-blue-100" />
                  <button className="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                    <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}