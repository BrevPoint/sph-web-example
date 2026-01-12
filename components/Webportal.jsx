export default function Webportal() {
    const portals = [
        { title: "ระบบสารบรรณ", icon: "📁", bg: "bg-blue-50", color: "text-blue-600" },
        { title: "E-Learning", icon: "🎓", bg: "bg-emerald-50", color: "text-emerald-600" },
        { title: "จองรถส่วนกลาง", icon: "🚗", bg: "bg-purple-50", color: "text-purple-600" },
        { title: "ระบบลางาน", icon: "📝", bg: "bg-orange-50", color: "text-orange-600" },
        { title: "คลังความรู้", icon: "📚", bg: "bg-cyan-50", color: "text-cyan-600" },
        { title: "แจ้งซ่อมไอที", icon: "💻", bg: "bg-red-50", color: "text-red-600" },
        { title: "ดาวน์โหลดฟอร์ม", icon: "📥", bg: "bg-indigo-50", color: "text-indigo-600" },
        { title: "สวัสดิการ", icon: "🏥", bg: "bg-pink-50", color: "text-pink-600" },
        { title: "ระเบียบข้อบังคับ", icon: "⚖️", bg: "bg-slate-100", color: "text-slate-600" },
        { title: "ติดต่อภายใน", icon: "📞", bg: "bg-teal-50", color: "text-teal-600" },
    ];

    return (
        <section className="py-10 font-sarabun">
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-black text-main-text tracking-tight">MOPH <span className="text-blue-600">Web Portal</span></h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                {portals.map((item, idx) => (
                    <a key={idx} href="#" className="group p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center gap-4 text-center">
                        <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                            {item.icon}
                        </div>
                        <h3 className="text-sm font-black text-slate-700 group-hover:text-blue-600 transition-colors leading-snug">
                            {item.title}
                        </h3>
                    </a>
                ))}
            </div>
        </section>
    )
}