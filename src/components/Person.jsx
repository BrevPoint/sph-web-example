import '../../css/App.css'
import '../../css/index.css'

export default function Policy() {
  return (
    <section className="w-full max-w-7xl mx-auto rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-100  bg-main-bg overflow-hidden my-5">
      <div className="flex flex-col lg:flex-row min-h-fit lg:min-h-[600px]">
        
        {/* 1. ฝั่งรูปภาพ - บนมือถือให้ขึ้นก่อนและลดความสูงลงไม่ให้บังหน้าจอหมด */}
        <div className="w-full lg:w-2/5 relative group h-[300px] md:h-[500px] lg:h-auto overflow-hidden bg-pink-100 order-1 lg:order-2">
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10"></div>
          
          <img 
            src="/***/" 
            alt="ผู้อำนวยการโรงพยาบาล" 
            className="w-full h-full object-cover object-top lg:object-center group-hover:scale-110 transition-transform duration-[2000ms]"
          />

          {/* ป้ายชื่อ - ปรับขนาดตัวอักษรให้เล็กลงบนมือถือ */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-10 z-20">
            <div className="bg-white/10 backdrop-blur-md border-l-4 border-pink-500 p-4 lg:p-6 rounded-r-xl">
              <h4 className="text-white text-xl md:text-3xl font-black tracking-tight font-sarabun">นพ. สมชาย รักดี</h4>
              <p className="text-pink-200 uppercase tracking-widest text-[10px] md:text-xs mt-1 font-bold">ผู้อำนวยการโรงพยาบาลสบปราบ</p>
            </div>
          </div>
        </div>

        {/* 2. ฝั่งเนื้อหา - ลด Padding บนมือถือ และปรับขนาด Font */}
        <div className="w-full lg:w-3/5 flex items-center bg-main-bg p-6 md:p-12 lg:p-20 relative order-2 lg:order-1">
          {/* Watermark - ซ่อนบนมือถือเพื่อไม่ให้รก */}
          <div className="hidden lg:block absolute top-6 left-10 text-[8rem] font-black text-gray-300/30  select-none">
            Vision
          </div>

          <div className="relative z-10 space-y-6 md:space-y-8 w-full">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-pink-500"></div>
                <span className="text-pink-600 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Executive Policy</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-black  leading-tight font-sarabun">
                ขับเคลื่อนด้วย <br />
                <span className="text-pink-600">นวัตกรรมและหัวใจ</span>
              </h2>
            </div>

            <p className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light italic font-sarabun border-l-2 border-gray-200 pl-4">
              "เรามุ่งมั่นที่จะยกระดับมาตรฐานการรักษาให้เข้าถึงง่าย ทันสมัย และดูแลทุกชีวิตด้วยความเข้าใจ เพื่อเป็นที่พึ่งที่มั่นคงที่สุดของชุมชน"
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}