import '../css/App.css'
import '../css/index.css'

export default function Home() {
  return (
    <header className="relative bg-white rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 mb-6 transition-all font-sarabun overflow-hidden">
      
      {/* แถบสีตกแต่งด้านบนสุดเพื่อความภูมิฐาน */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-500" />

      <div className="flex flex-col md:flex-row items-center">
        
        {/* ฝั่งซ้าย: เนื้อหาข้อความ */}
        <div className="flex-1 p-8 md:p-16 text-left">
          <div className="inline-flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-1 rounded-md mb-6 border border-blue-100">
            <span className="text-xs font-bold tracking-wide">SOBPRAP HOSPITAL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">
            ยินดีต้อนรับสู่ <br />
            <span className="text-blue-600">โรงพยาบาลสบปราบ</span>
          </h1>

          <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6" />

          <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
            มุ่งมั่นให้บริการทางการแพทย์ที่มีคุณภาพ เข้าถึงง่ายด้วยมาตรฐานสากล 
            เราพร้อมดูแลสุขภาพของท่านด้วยคณะแพทย์ผู้เชี่ยวชาญและเทคโนโลยีที่ทันสมัย
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2">
              <span>นัดหมายแพทย์</span>
              <span className="text-sm">→</span>
            </button>
            <button className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 transition-all">
              ข้อมูลบริการ
            </button>
          </div>
        </div>

        {/* ฝั่งขวา: รูปภาพหรือสัญลักษณ์ (เน้นความคลีนแบบ รพ.) */}
        <div className="flex-1 relative w-full h-[300px] md:h-[500px] bg-slate-50 overflow-hidden">
            {/* ตรงนี้บอสสามารถใส่รูปตึก รพ. หรือรูปคุณหมอได้ครับ */}
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              alt="Hospital background"
            />
            {/* Overlay ไล่เฉดสีเพื่อให้ภาพดูนุ่มนวล */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
        </div>

      </div>

     
    </header>
  )
}