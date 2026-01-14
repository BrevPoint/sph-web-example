import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function News() {
  const news = [
    {
      tag: "บริการประชาชน",
      title: "โครงการหน่วยแพทย์เคลื่อนที่ และทันตกรรมสัญจร ณ ตำบลเวียงมอก",
      date: "12 มกราคม 2026",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000"
    },
    {
      tag: "กิจกรรมสาธารณสุข",
      title: "อบรมอาสาสมัครสาธารณสุขหมู่บ้าน (อสม.) ยุคดิจิทัล 4.0",
      date: "10 มกราคม 2026",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000"
    },
    {
      tag: "กิจกรรมภายใน",
      title: "Big Cleaning Day: รวมพลังบุคลากรสร้างสิ่งแวดล้อมที่ปลอดภัยเพื่อผู้ป่วย",
      date: "05 มกราคม 2026",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000"
    },
  ];

  return (
    <section className="lg:col-span-2 space-y-4 font-sarabun">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-black text-black tracking-tight">ข่าวประชาสัมพันธ์</h2>
      </div>

      <div className="relative group rounded-4xl overflow-hidden shadow-lg border border-white">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          navigation={{ prevEl: '.n-prev', nextEl: '.n-next' }}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000 }}
          className="aspect-16/8 w-full"
        >
          {news.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full flex items-end">
                <img src={item.image} className="absolute inset-0 w-full h-full object-cover" />

                {/* ปรับ Gradient ให้เข้มขึ้นนิดหน่อยตรงฐาน เพื่อให้ตัวหนังสืออ่านง่ายขึ้นมาก */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />

                {/* ปรับ Padding: มือถือ p-5, จอใหญ่ p-12 */}
                <div className="relative z-20 p-5 md:p-12 text-white w-full">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 mb-2 inline-block shadow-lg">
                    LATEST NEWS
                  </span>

                  {/* --- จุดตายตัวหนังสือ: ปรับขนาดตามหน้าจอแบบละเอียด --- */}
                  <h3 className="text-base md:text-xl lg:text-3xl font-bold leading-tight drop-shadow-lg line-clamp-2 md:line-clamp-none max-w-[95%]">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 md:mt-4 text-[10px] md:text-sm text-slate-300 font-medium">
                    <span className="flex items-center gap-1">📅 {item.date}</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full hidden md:block"></span>
                    <span className="hidden md:block">โรงพยาบาลสบปราบ</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation */}
        {/* Custom Navigation - แบบเรียบง่าย แสดงตลอดกาล */}
        <button className="n-prev absolute left-4 top-1/2 -translate-y-1/2 z-1 w-10 h-10 rounded-full bg-white/80 text-slate-900 shadow-md hover:bg-white flex items-center justify-center font-bold">
          ←
        </button>

        <button className="n-next absolute right-4 top-1/2 -translate-y-1/2 z-1 w-10 h-10 rounded-full bg-white/80 text-slate-900 shadow-md hover:bg-white flex items-center justify-center font-bold">
          →
        </button>
      </div>
    </section>
  );
}