import { useState, useEffect } from 'react'
import '../css/App.css'
import '../css/index.css'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [userToggled, setUserToggled] = useState(false);

  const navItems = [
    { name: "หน้าหลัก", href: "#" },
    { name: "ประวัติโรงพยาบาล", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "วิสัยทัศน์", href: "#" },
    { name: "ติดต่อเรา", href: "#" },
    { name: "ช่องทางร้องเรียน", href: "#" },
    { name: "ที่ตั้งสำนักงาน", href: "#" },
    { name: "PDPA", href: "#" },
  ]

  useEffect(() => {
    const checkTimeForTheme = () => {
      if (userToggled) return;
      const hour = new Date().getHours();
      setIsDark(hour < 6 || hour >= 18);
    };
    checkTimeForTheme();
    const interval = setInterval(checkTimeForTheme, 60000);
    return () => clearInterval(interval);
  }, [userToggled]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggle = () => {
    setUserToggled(true);
    setIsDark(!isDark);
  };

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    // เพิ่ม font-sarabun เข้าไปที่นี่จุดเดียวครับบอส
    <nav className="transition-colors duration-300 select-none shadow-sm font-sarabun">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 bg-white transition-colors duration-300">
        <div className="flex items-center justify-between py-3">

          <div className="flex items-center gap-4">
            <img
              className="h-18 md:h-16 lg:h-20 w-auto"
              src="/Sobprabrm.png"
              alt="Sobprab Hospital logo"
            />
            <div className="hidden xl:flex items-baseline animate-white-shine font-bold text-black border-l-2 border-gray-200 dark:border-gray-700 pl-4">
              <span className="text-4xl lg:text-5xl tracking-tight">S</span>
              <span className="text-xl lg:text-2xl mx-0.5 tracking-widest">OBPRAB</span>
              <span className="text-xl lg:text-2xl mx-0.5 tracking-widest">HOSPITAL</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1 ">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-md nav-link relative font-bold transition-colors rounded-md text-black">
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right border-r-2 border-gray-200 dark:border-gray-700 pr-6">
              <div className="text-2xl lg:text-3xl font-mono font-bold text-pink-600 dark:text-pink-600 leading-none">
                {time.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[10px] text-pink-700 font-bold uppercase tracking-[0.2em] mt-1">Local Time</div>
            </div>

            <button
              onClick={handleToggle}
              aria-label="Toggle dark mode"
              className="text-xl" // เพิ่มขนาดไอคอนนิดนึงครับ
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-black text-xl"
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 dark:border-gray-800 py-4 px-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="block px-1 py-1 text-md nav-link relative font-bold transition-colors rounded-md">
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}