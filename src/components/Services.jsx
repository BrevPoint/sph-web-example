import { useState, useEffect, useCallback, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react'; // อย่าลืม npm install emoji-picker-react นะครับบอส

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false); // เพิ่ม State สำหรับ Emoji
  const chatEndRef = useRef(null);
  const emojiRef = useRef(null); // Ref สำหรับตรวจจับการคลิกด้านนอก

  // รายชื่อแผนก
  const services = [
    { title: "ฉุกเฉิน", icon: "🚑", light: "bg-red-50" },
    { title: "อายุรกรรม", icon: "🩺", light: "bg-blue-50" },
    { title: "ทันตกรรม", icon: "🦷", light: "bg-purple-50" },
    { title: "กุมารเวช", icon: "👶", light: "bg-pink-50" },
    { title: "นวดแผนไทย", icon: "🌿", light: "bg-green-50" },
    { title: "กายภาพ", icon: "🚶", light: "bg-orange-50" },
    { title: "ชันสูตร", icon: "🧪", light: "bg-cyan-50" },
    { title: "จักษุ", icon: "👁️", light: "bg-indigo-50" },
    { title: "จิตเวช", icon: "🧠", light: "bg-teal-50" },
  ];

  // ปิด Emoji Picker เมื่อคลิกที่อื่น
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getAnonymousId = useCallback(() => {
    let anonId = localStorage.getItem('anonymous_chat_id');
    if (!anonId) {
      anonId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
      localStorage.setItem('anonymous_chat_id', anonId);
    }
    return anonId;
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isMinimized) scrollToBottom();
  }, [chatMessages, isMinimized]);

  const fetchChatUpdates = useCallback(async () => {
    if (!activeChat) return;
    try {
      const res = await fetch(`http://localhost:5000/api/chats`);
      if (!res.ok) return;
      const data = await res.json();

      if (Array.isArray(data)) {
        const myId = getAnonymousId();
        const myChats = data.filter(c => String(c.user_id) === String(myId) && c.department === activeChat);

        const formatted = myChats.sort((a, b) => a.id - b.id).flatMap(msg => {
          const items = [];

          // 1. เช็กก่อน: ถ้ามีข้อความจากบอส (User) จริงๆ ถึงจะเพิ่มก้อนสีน้ำเงิน
          if (msg.message && msg.message.trim() !== "") {
            items.push({ text: msg.message, time: msg.time_sent, type: 'user' });
          }

          // 2. ถ้าเจ้าหน้าที่ตอบกลับมา ก็ค่อยเพิ่มก้อนสีขาวเข้าไป
          if (msg.admin_reply && msg.admin_reply.trim() !== "") {
            items.push({ text: msg.admin_reply, time: "เจ้าหน้าที่", type: 'admin' });
          }

          return items;
        });
        setChatMessages(formatted);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, [activeChat, getAnonymousId]);
  const handleSendMessage = async () => {
    if (!inputText.trim() || isSending) return;
    const currentTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    const chatData = {
      user_id: getAnonymousId(),
      department: activeChat,
      message: inputText,
      time_sent: currentTime
    };

    setIsSending(true);
    try {
      const response = await fetch('http://localhost:5000/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chatData)
      });

      if (response.ok) {
        setInputText("");
        setShowEmoji(false); // ส่งแล้วปิดตัวเลือก Emoji
        setTimeout(() => fetchChatUpdates(), 300);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const onEmojiClick = (emojiData) => {
    setInputText(prev => prev + emojiData.emoji);
  };

  return (
    <section className="w-full max-w-md mx-auto p-2 font-sarabun">
      <div className="flex flex-col gap-4 h-full">
        {/* Card 1: Live Chat */}
        <div onClick={() => setIsModalOpen(true)} className="flex bg-white rounded-3xl p-5 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all items-center group">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mr-4 group-hover:scale-110 transition-transform shadow-inner">💬</div>
          <div className="flex-1">
            <span className="bg-blue-600 text-white text-[8px] px-2 py-0.5 rounded-full font-black animate-pulse uppercase tracking-widest">Live Chat</span>
            <h3 className="text-lg font-black text-slate-900 leading-tight">ปรึกษาแผนกต่างๆ</h3>
            <p className="text-blue-600 text-xs font-bold">แชทออนไลน์ 24 ชม.</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[12px] font-bold shadow-lg shadow-blue-100">เริ่มแชท</button>
        </div>

        {/* Card 2: Medical Rights */}
        <a href="https://srmcitizen.nhso.go.th/" target="_blank" rel="noopener noreferrer" className="flex bg-white rounded-3xl p-5 shadow-sm border border-slate-100 items-center transition-all hover:shadow-md hover:border-green-200 group">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mr-4 shadow-inner group-hover:scale-110 transition-transform">💳</div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-slate-800 group-hover:text-green-700 transition-colors">ตรวจสอบสิทธิ์</h3>
            <p className="text-green-600 text-[10px] font-black tracking-widest uppercase">Medical Rights</p>
          </div>
          <div className="bg-slate-100 text-slate-400 px-4 py-2 rounded-xl text-[12px] font-bold group-hover:bg-green-600 group-hover:text-white transition-all">ตรวจสอบ</div>
        </a>

        {/* Card 3: Complaints */}
        <div onClick={() => { setActiveChat("ร้องเรียน"); setIsMinimized(false); setChatMessages([]); }} className="flex bg-white rounded-3xl p-5 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all items-center group">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mr-4 group-hover:rotate-12 transition-transform shadow-inner">📣</div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-slate-800">แจ้งเรื่องร้องเรียน</h3>
            <p className="text-red-500 text-[10px] font-black tracking-widest uppercase">Feedback</p>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[12px] font-bold group-hover:bg-red-600 transition-colors shadow-lg">แจ้งเรื่อง</button>
        </div>
      </div>

      {/* Modal Selection */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <div className="text-center w-full relative">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">เลือกแผนกรับบริการ</h2>
                <button onClick={() => setIsModalOpen(false)} className="absolute -top-2 -right-2 w-10 h-10 rounded-full hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center text-xl text-slate-300 font-bold">✕</button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh] bg-white flex flex-col gap-3">
              {services.map((item, idx) => (
                <button key={idx} onClick={() => { setIsModalOpen(false); setActiveChat(item.title); setIsMinimized(false); setChatMessages([]); }} className="group w-full p-5 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-6 border border-transparent hover:border-blue-100">
                  <div className={`w-16 h-16 ${item.light || 'bg-blue-50'} rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-sm`}>{item.icon}</div>
                  <div className="flex-1"><span className="font-black text-slate-800 text-lg block group-hover:text-blue-600">ฝ่าย{item.title}</span></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat UI */}
      {activeChat && (
        <div className={`fixed bottom-6 right-6 z-[1000] transition-all duration-500 transform ${isMinimized ? 'w-20 h-20' : 'w-96'}`}>
          {isMinimized ? (
            <button onClick={() => setIsMinimized(false)} className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all animate-bounce">💬</button>
          ) : (
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-5 duration-300">
              {/* Header */}
              <div className="p-5 bg-linear-to-r from-blue-600 to-blue-500 text-white flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl border border-white/30 shadow-inner">🏥</div>
                  <div><h3 className="font-black text-sm tracking-tight leading-none uppercase">ฝ่าย{activeChat}</h3></div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setIsMinimized(true)} className="w-8 h-8 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors text-xs">➖</button>
                  <button onClick={() => setActiveChat(null)} className="w-8 h-8 hover:bg-red-500/20 rounded-full flex items-center justify-center transition-colors text-xs">✕</button>
                </div>
              </div>

              {/* Chat Messages - ปรับทรงกล่องและขนาดฟอนต์ให้เหมือน Admin */}
              <div className="h-100 p-6 bg-[#F8FAFC] overflow-y-auto flex flex-col gap-6">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-5 py-3.5 shadow-sm max-w-[85%] leading-relaxed ${msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-[1.8rem] rounded-tr-none'
                      : 'bg-white text-slate-800 rounded-[1.8rem] rounded-tl-none border border-slate-100'
                      }`}>
                      {/* ข้อความขนาด 16px ตามสั่งครับบอส */}
                      <div className="text-[16px] font-semibold">{msg.text}</div>

                      {/* จัดตำแหน่งเวลาและชื่อให้เนียนๆ */}
                      <div className={`text-[10px] mt-1.5 font-bold opacity-60 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.type === 'user' ? `${msg.time} น.` : 'เจ้าหน้าที่'}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area + Emoji */}
              <div className="p-5 bg-white border-t border-slate-50 relative">
                {showEmoji && (
                  <div ref={emojiRef} className="absolute bottom-full right-5 z-[1001] mb-2 shadow-2xl scale-90 origin-bottom-right">
                    <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
                  </div>
                )}

                <div className="flex gap-2 items-center bg-slate-50 p-2 rounded-[1.8rem] border border-slate-100 focus-within:border-blue-300 transition-all">
                  <button onClick={() => setShowEmoji(!showEmoji)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-all text-xl">😊</button>
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="พิมพ์ข้อความ..."
                    className="flex-1 bg-transparent px-2 py-2 text-[16px] outline-none font-bold text-slate-700 placeholder:text-slate-300"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isSending || !inputText.trim()}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg bg-blue-600 text-white disabled:bg-slate-300 active:scale-90"
                  >
                    🚀
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}