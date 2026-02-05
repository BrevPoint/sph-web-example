import React, { useState, useEffect, useCallback, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function AdminSystem() {
    const [currentView, setCurrentView] = useState("dashboard");
    const [selectedDept, setSelectedDept] = useState(null);
    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const chatEndRef = useRef(null);
    const emojiRef = useRef(null);

    const departments = [
        { id: 1, name: "ฉุกเฉิน", icon: "🚑", color: "bg-red-500" },
        { id: 2, name: "อายุรกรรม", icon: "🩺", color: "bg-blue-500" },
        { id: 3, name: "ทันตกรรม", icon: "🦷", color: "bg-purple-500" },
        { id: 4, name: "กุมารเวช", icon: "👶", color: "bg-pink-500" },
        { id: 5, name: "นวดแผนไทย", icon: "🌿", color: "bg-green-500" },
        { id: 6, name: "กายภาพ", icon: "🚶", color: "bg-orange-500" },
        { id: 7, name: "ชันสูตร", icon: "🧪", color: "bg-cyan-500" },
        { id: 8, name: "จักษุ", icon: "👁️", color: "bg-indigo-500" },
        { id: 9, name: "จิตเวช", icon: "🧠", color: "bg-teal-500" },
        { id: 10, name: "ร้องเรียน", icon: "📢", color: "bg-yellow-500" },
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setShowEmoji(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchAllChats = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:5000/api/chats');
            if (!res.ok) throw new Error("Server Error");
            const data = await res.json();
            setChats(Array.isArray(data) ? data : []);
        } catch {
            console.error("บอสครับ ดึงข้อมูลไม่ได้ เช็ก Server ด่วน!");
        }
    }, []);

    useEffect(() => {
        fetchAllChats();
        const interval = setInterval(fetchAllChats, 3000);
        return () => clearInterval(interval);
    }, [fetchAllChats]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats, activeChatId]);

    const onEmojiClick = (emojiData) => {
        setReplyText(prev => prev + emojiData.emoji);
    };

    const handleSelectChat = async (id, uid) => {
        setActiveChatId(id);
        setShowEmoji(false);
        if (!uid) return;
        try {
            await fetch(`http://localhost:5000/api/chats/read/${uid}`, { method: 'PUT' });
            fetchAllChats();
        } catch {
            console.log("Read status update error");
        }
    };

    const handleReply = async () => {
        if (!activeChatId || !replyText.trim() || !selectedChatInfo) return;

        try {
            const response = await fetch(`http://localhost:5000/api/chats/admin-reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: selectedChatInfo.user_id,
                    department: selectedDept,
                    admin_reply: replyText
                })
            });

            if (response.ok) {
                setReplyText("");
                setShowEmoji(false);
                fetchAllChats();
            }
        } catch (error) {
            console.error("❌ บอสครับ ส่งไม่ได้ เช็กเน็ตด่วน!:", error);
        }
    };

    const selectedChatInfo = chats.find(c => c.id == activeChatId);

    const chatHistory = chats
        .filter(c =>
            selectedChatInfo &&
            c.user_id === selectedChatInfo.user_id &&
            c.department === selectedDept
        )
        .sort((a, b) => a.id - b.id);

    // --- ส่วนที่แก้เรื่องแจ้งเตือนครับบอส ---

    // ฟังก์ชันช่วยนับจำนวนคนไข้ที่ค้างตอบในแต่ละแผนก
    const getUnreadCount = (deptName) => {
        const deptChats = chats.filter(c => c.department === deptName);
        const uniqueUserIds = [...new Set(deptChats.map(c => c.user_id))];

        return uniqueUserIds.filter(uid => {
            const userDeptChats = deptChats.filter(c => c.user_id === uid);
            // ดูข้อความล่าสุดของคนนี้ในแผนกนี้
            const lastMsg = userDeptChats[userDeptChats.length - 1];
            // ถ้านัดล่าสุดยังไม่มีคำตอบแอดมิน แสดงว่า "ค้างตอบ"
            return lastMsg && !lastMsg.admin_reply;
        }).length;
    };

    // เช็กว่ามีแผนกไหนค้างตอบไหม (สำหรับปุ่ม Sidebar)
    const hasAnyPending = departments.some(dept => getUnreadCount(dept.name) > 0);

    return (
        <div className="flex h-screen bg-slate-100 font-sarabun text-slate-800 text-xs">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
                <div className="p-8 text-2xl font-black border-b border-slate-800 italic uppercase tracking-tighter text-blue-400">Admin Panel</div>
                <nav className="flex-1 p-4 space-y-2">
                    <button onClick={() => setCurrentView("dashboard")} className={`w-full text-left p-4 rounded-xl font-bold transition-all ${currentView === 'dashboard' ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-800'}`}>🏠 หน้าแรก</button>
                    <button onClick={() => { setCurrentView("chat-departments"); setSelectedDept(null); }} className={`w-full text-left p-4 rounded-xl font-bold flex justify-between items-center transition-all ${currentView.includes('chat') ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-800'}`}>
                        <span>💬 ตอบกลับแชท</span>
                        {hasAnyPending && (
                            <span className="bg-red-500 text-[10px] px-2 py-1 rounded-full animate-pulse font-black">ใหม่</span>
                        )}
                    </button>
                </nav>
            </aside>

            <main className="flex-1 overflow-hidden flex flex-col">
                {currentView === "chat-departments" && (
                    <div className="p-10 overflow-y-auto animate-in fade-in duration-500">
                        <h2 className="text-3xl font-black mb-8 italic">จัดการแผนกบริการ</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {departments.map(dept => {
                                const unreadCount = getUnreadCount(dept.name); // เรียกใช้ฟังก์ชันนับใหม่ที่แก้แล้ว
                                return (
                                    <div key={dept.id} onClick={() => { setSelectedDept(dept.name); setCurrentView("chat-room"); }} className="bg-white p-6 rounded-4xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative border border-slate-100 group">
                                        <div className={`${dept.color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>{dept.icon}</div>
                                        <h3 className="text-lg font-black italic">ฝ่าย{dept.name}</h3>
                                        {unreadCount > 0 && (
                                            <div className="absolute top-6 right-6 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black animate-bounce shadow-md">{unreadCount}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {currentView === "chat-room" && (
                    <div className="flex h-full bg-slate-50/50 backdrop-blur-sm">
                        {/* Patient List */}
                        <div className="w-80 bg-white border-r border-slate-200/60 flex flex-col z-10">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Department</h3>
                                    <span className="text-xl font-black text-slate-800 italic">ฝ่าย{selectedDept}</span>
                                </div>
                                <button onClick={() => { setCurrentView("chat-departments"); setActiveChatId(null); }} className="text-[10px] font-bold bg-slate-100 px-3 py-2 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all">◀ BACK</button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-3 space-y-1">
                                {Array.from(new Set(chats.filter(c => c.department === selectedDept).reverse().map(c => c.user_id))).map(uid => {
                                    const userMessages = chats.filter(c => c.user_id === uid && c.department === selectedDept);
                                    const lastChat = userMessages[userMessages.length - 1];
                                    const isWaiting = lastChat && !lastChat.admin_reply;
                                    const isActive = selectedChatInfo?.user_id === uid;
                                    return (
                                        <div key={uid} onClick={() => handleSelectChat(lastChat?.id, uid)} className={`p-4 rounded-3xl cursor-pointer transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' : 'hover:bg-white text-slate-600'}`}>
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-[9px] font-black uppercase ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>ID: {String(uid).substring(0, 8)}</span>
                                                {isWaiting && <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white' : 'bg-red-500'} animate-ping`} />}
                                            </div>
                                            <p className="truncate font-bold">{lastChat?.message || lastChat?.admin_reply}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 flex flex-col relative bg-[#F8FAFC]">
                            {activeChatId ? (
                                <>
                                    {/* Header: ชื่อคนไข้ ขยายให้เด่นขึ้น */}
                                    <div className="h-20 bg-white/60 border-b flex items-center px-10">
                                        <h4 className="text-xl font-black italic text-slate-800 uppercase tracking-tight">
                                            PATIENT: {String(selectedChatInfo?.user_id).substring(0, 15)}
                                        </h4>
                                    </div>

                                    {/* ส่วนแสดงข้อความแชท - ขยายฟอนต์เป็น 16px และปรับ Line Height ให้โปร่งขึ้น */}
                                    <div className="flex-1 overflow-y-auto p-10 space-y-8">
                                        {chatHistory.map(chat => (
                                            <div key={chat.id}>
                                                {/* ข้อความจากคนไข้ - เน้นตัวหนาขึ้นและฟอนต์ใหญ่ */}
                                                {chat.message && (
                                                    <div className="flex flex-col items-start gap-2">
                                                        <div className="bg-white px-6 py-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm max-w-[80%] text-[16px] font-semibold text-slate-700 leading-relaxed">
                                                            {chat.message}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-300 ml-3 uppercase tracking-tighter">{chat.time_sent}</span>
                                                    </div>
                                                )}

                                                {/* ข้อความจากแอดมิน (บอส) - สีเข้ม อ่านง่าย ฟอนต์ 16px */}
                                                {chat.admin_reply && (
                                                    <div className="flex flex-col items-end gap-2 mt-4">
                                                        <div className="bg-slate-800 px-6 py-4 rounded-3xl rounded-tr-none text-white shadow-md max-w-[80%] text-[16px] font-semibold leading-relaxed">
                                                            {chat.admin_reply}
                                                        </div>
                                                        <span className="text-[10px] font-black text-blue-500 mr-3 italic tracking-widest">STAFF REPLIED</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div ref={chatEndRef} />
                                    </div>

                                    {/* Input Area - ปรับให้ช่องใหญ่และตัวหนังสือตอนพิมพ์ใหญ่ขึ้นเป็น 18px */}
                                    <div className="p-8 relative">
                                        {showEmoji && (
                                            <div ref={emojiRef} className="absolute bottom-full left-10 z-[1001] mb-4 shadow-2xl">
                                                <EmojiPicker onEmojiClick={onEmojiClick} width={350} height={400} />
                                            </div>
                                        )}
                                        <div className="max-w-4xl mx-auto flex gap-4 bg-white p-3 rounded-[2.5rem] shadow-2xl border border-slate-100">
                                            <button onClick={() => setShowEmoji(!showEmoji)} className="w-14 h-14 flex items-center justify-center hover:bg-slate-50 rounded-full text-3xl transition-all">😊</button>
                                            <input
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                                                placeholder="Type your response here..."
                                                className="flex-1 px-4 outline-none text-[18px] font-bold text-slate-700 placeholder:text-slate-300"
                                            />
                                            <button onClick={handleReply} className="bg-blue-600 hover:bg-blue-700 text-white px-10 rounded-full text-lg font-black transition-all active:scale-95 shadow-lg shadow-blue-200 uppercase">
                                                SEND 🚀
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-slate-300 font-black text-3xl italic uppercase tracking-widest animate-pulse">
                                    Select a patient to start
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Dashboard View */}
                {currentView === "dashboard" && (
                    <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in">
                        <div className="w-32 h-32 bg-blue-600 rounded-[3rem] flex items-center justify-center text-6xl text-white mb-6 shadow-2xl">🏥</div>
                        <h1 className="text-6xl font-black italic text-slate-900 tracking-tighter uppercase">Welcome, Boss!</h1>
                        <div className="mt-10 flex gap-6 font-black uppercase text-[10px] tracking-widest">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                                <span className="text-3xl text-blue-600">{chats.length}</span>
                                <span className="text-slate-400 mt-1">Total Logs</span>
                            </div>
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                                {/* ส่วน Pending หน้า Dashboard ก็นับใหม่ให้ถูกต้องเหมือนกันครับ */}
                                <span className="text-3xl text-red-500">
                                    {departments.reduce((acc, dept) => acc + getUnreadCount(dept.name), 0)}
                                </span>
                                <span className="text-slate-400 mt-1">Pending Patients</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}