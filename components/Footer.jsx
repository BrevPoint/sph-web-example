import '../css/App.css'
import '../css/index.css'

export default function Footer() {
  const contactInfo = {
    address: "123 หมู่ 1 ต.สบปราบ อ.สบปราบ จ.ลำปาง 52170",
    phone: "054-XXX-XXX",
    emergency: "1669"
  };

  const mainLinks = [
    { name: "เกี่ยวกับเรา", href: "#" },
    { name: "ตารางเวรแพทย์", href: "#" },
    { name: "สิทธิการรักษา", href: "#" },
    { name: "ตรวจสอบสิทธิออนไลน์", href: "#" }
  ];

  return (
    <footer className="mt-20 bg-white  border-gray-100 dark:border-gray-800 transition-colors relative overflow-hidden font-sarabun">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 py-16 max-w-screen-2xl relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Hospital Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-[800] text-blue-600 tracking-tighter mb-1">SOBPRAB</h2>
              <h2 className="text-xl pl-10 font-bold text-black leading-none uppercase tracking-widest opacity-80">Hospital</h2>
            </div>
            <p className="text-black/70 leading-relaxed text-[15px] font-medium">
              โรงพยาบาลสบปราบ มุ่งมั่นให้บริการด้วยหัวใจ <br />
              เพื่อสุขภาพที่ดีของชุมชนชาวลำปาง
            </p>
            
            <div className="flex gap-4 pt-2">
              {[
                { label: 'f', color: 'bg-blue-600' }, 
                { label: 'L', color: 'bg-green-500' }
              ].map((item) => (
                <div key={item.label} className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-white cursor-pointer hover:scale-110 hover:-rotate-6 transition-all shadow-lg font-black`}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-black font-[800] text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-blue-500"></span>
              เมนูหลัก
            </h3>
            <ul className="space-y-4">
              {mainLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[15px] text-black/80 hover:text-blue-600 transition-all flex items-center gap-2 group font-semibold">
                    <span className="w-0 group-hover:w-3 h-[2px] bg-blue-500 transition-all"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="text-black font-[800] text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-blue-500"></span>
              ติดต่อเรา
            </h3>
            <ul className="space-y-5 text-[15px]">
              <li className="flex gap-4 text-black/80">
                <span className="text-xl">📍</span>
                <span className="leading-relaxed font-medium">{contactInfo.address}</span>
              </li>
              <li className="flex gap-4 items-center text-black/80">
                <span className="text-xl">📞</span>
                <span className="font-extrabold text-md">{contactInfo.phone}</span>
              </li>
              <li className="flex gap-4 items-center bg-red-50 p-4 rounded-2xl border border-red-100 dark:bg-red-500/5 dark:border-red-500/20">
                <span className="text-xl animate-bounce">🚑</span>
                <div>
                  <div className="text-[10px] font-black text-red-400 uppercase tracking-widest">Emergency Line</div>
                  <span className="text-red-600 font-[800] italic text-lg leading-none">สายด่วน: {contactInfo.emergency}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours */}
          <div>
            <h3 className="text-black font-[800] text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-blue-500"></span>
              เวลาทำการ
            </h3>
            <div className="bg-white dark:bg-gray-800 backdrop-blur-sm p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-black/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="relative z-10">
                <div className="flex justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-white font-bold">แผนก OPD:</span>
                  <span className="font-extrabold text-main-text">08.00 - 16.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-extrabold">ER ฉุกเฉิน:</span>
                  <span className="px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black animate-pulse tracking-tighter">OPEN 24H</span>
                </div>
              </div>
              <div className="absolute -right-2 -bottom-2 text-4xl opacity-[0.05] group-hover:scale-125 transition-transform duration-700">🕒</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[13px] font-bold text-main-text/40 tracking-wide">© 2026 SOBPRAB HOSPITAL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-[13px] font-bold">
            <a href="#" className="text-main-text/40 hover:text-blue-600 transition-colors">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="text-main-text/40 hover:text-blue-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}