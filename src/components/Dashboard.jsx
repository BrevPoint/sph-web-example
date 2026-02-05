import React from 'react';

// ✅ ส่วนคำอธิบายรายตัว (Legend Item) - ปรับให้ดูสะอาดตาตามรูป
const StatItem = ({ label, count, value, color }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 group hover:bg-slate-50/50 px-2 transition-all">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="text-[12px] font-bold text-slate-600">{label}</span>
    </div>
    <div className="text-right flex items-center gap-4">
      <span className="text-[12px] font-black text-slate-800">{count.toLocaleString()}</span>
      <span className="text-[10px] font-bold text-slate-400 min-w-8.75">{value}%</span>
    </div>
  </div>
);

// ✅ ส่วนของวงกลมโดนัทแบบขยายขนาด (Large Donut)
const LargeDonut = ({ stats, total, title }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="relative w-48 h-48 mb-6"> {/* ขยายจาก 32 เป็น 48 */}
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {stats.map((stat, index) => {
            const previousValuesSum = stats.slice(0, index).reduce((sum, s) => sum + s.value, 0);
            const dashArray = `${stat.value} ${100 - stat.value}`;
            const dashOffset = -previousValuesSum;
            return (
              <circle 
                key={index} cx="18" cy="18" r="15.5" fill="transparent"
                stroke={stat.color} strokeWidth="4.5" strokeDasharray={dashArray} strokeDashoffset={dashOffset}
                strokeLinecap="round" className="transition-all duration-1000 ease-in-out" 
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-800">{total}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</span>
        </div>
      </div>
      <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider mb-4 border-b-2 border-slate-100 pb-1 w-full text-center">
        {title}
      </h4>
    </div>
  );
};

export default function IntegratedDashboard() {
  const patientTypes = [
    { label: 'OPD (ผู้ป่วยนอก)', value: 75, count: 630, color: '#3b82f6' },
    { label: 'IPD (ผู้ป่วยใน)', value: 25, count: 211, color: '#10b981' },
  ];

  const insuranceStats = [
    { label: 'บัตรทอง', value: 55, count: 463, color: '#2563eb' },
    { label: 'ประกันสังคม', value: 25, count: 210, color: '#059669' },
    { label: 'ข้าราชการ/จ่ายตรง', value: 20, count: 168, color: '#d97706' },
  ];

  const dischargeStats = [
    { label: 'กลับบ้าน (Home)', value: 85, count: 128, color: '#8b5cf6' },
    { label: 'ส่งต่อ (Refer)', value: 15, count: 22, color: '#f43f5e' },
  ];

  return (
    <div className="w-full bg-slate-100 rounded-4xl ">
      <div className="mx-auto bg-white rounded-4xl shadow-md border border-slate-200 overflow-hidden">
        
        {/* ✅ Header สีเข้มตามรูปภาพ */}
        <div className="p-4 bg-[#163970] text-white flex flex-col md:flex-row justify-between items-center border-b-4 border-blue-500">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tight text-white mb-1">สถิติรวมบริการรายวัน</h2>
            <p className="text-white-400 pl-5 text-sm font-bold">โรงพยาบาลสบปราบ | ระบบบริหารจัดการข้อมูล</p>
          </div>
          
          <div className="mt-4 md:mt-0 bg-white/10 p-1 rounded-2xl backdrop-blur-md border border-white/20 min-w-50 text-center">
            <span className="text-[11px] font-black uppercase text-slate-300 block mb-1">Visits Today</span>
            <span className="text-3xl font-black text-white">1,284 <span className="text-sm font-normal text-slate-300">ราย</span></span>
          </div>
        </div>

        {/* ✅ Content พื้นที่แสดงผลหลัก */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* หมวดที่ 1: ประเภทผู้ป่วย */}
          <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <LargeDonut title="Patient Types" stats={patientTypes} total="841" />
            <div className="mt-2 space-y-1 bg-white p-3 rounded-xl shadow-sm">
              {patientTypes.map((item, i) => <StatItem key={i} {...item} />)}
            </div>
          </div>

          {/* หมวดที่ 2: สิทธิการรักษา */}
          <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <LargeDonut title="Insurance Stats" stats={insuranceStats} total="841" />
            <div className="mt-2 space-y-1 bg-white p-3 rounded-xl shadow-sm">
              {insuranceStats.map((item, i) => <StatItem key={i} {...item} />)}
            </div>
          </div>

          {/* หมวดที่ 3: สถานะจำหน่าย */}
          <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <LargeDonut title="Discharge Stats" stats={dischargeStats} total="150" />
            <div className="mt-2 space-y-1 bg-white p-3 rounded-xl shadow-sm">
              {dischargeStats.map((item, i) => <StatItem key={i} {...item} />)}
            </div>
          </div>

        </div>

        {/* ✅ Footer สรุปสถานะแบบเรียบง่าย */}
        <div className="bg-[#163970] p-4 flex justify-center items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
            Real-time Database Connection Active
          </p>
        </div>
      </div>
    </div>
  );
}