export default function Jobs() {
  const jobs = [
    { title: "พยาบาลวิชาชีพ", quota: "2 อัตรา | ด่วน", status: "Urgent" },
    { title: "ธุรการประสานงาน", quota: "1 อัตรา", status: "Open" },
    { title: "เจ้าหน้าที่เทคนิค", quota: "1 อัตรา", status: "Open" },
  ];

  return (
    <section className="font-sarabun h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-black text-main-text tracking-tight">ร่วมงานกับเรา</h2>
      </div>

      <div className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-3">
        {jobs.map((job, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-transparent hover:border-blue-100 group cursor-pointer">
            <div className="space-y-1">
              <h5 className="text-[15px] font-black text-slate-700 group-hover:text-blue-600 transition-colors">{job.title}</h5>
              <p className="text-xs text-slate-400 font-bold tracking-wide uppercase">{job.quota}</p>
            </div>
            <button className="text-xs font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
              สมัคร
            </button>
          </div>
        ))}
        <button className="w-full py-3 text-sm font-bold text-slate-400 hover:text-blue-600 transition-all">
          ดูตำแหน่งว่างทั้งหมด →
        </button>
      </div>
    </section>
  );
}