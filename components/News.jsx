import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function News() {
  const news = [
    { tag: "กิจกรรม", title: "ตรวจสุขภาพฟรีวันสถาปนา ประจำปี 2567", date: "24 พฤษภาคม 2024", image: "https://images.unsplash.com/photo-1576091160550-2173dad99901?q=80&w=1000" },
    { tag: "ประกาศ", title: "เปิดใช้ระบบนัดหมายออนไลน์รูปโฉมใหม่", date: "20 พฤษภาคม 2024", image: "https://images.unsplash.com/photo-1504813184591-01592fd03cfd?q=80&w=1000" },
  ];

  return (
    <section className="lg:col-span-2 space-y-4 font-sarabun">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-black text-main-text tracking-tight">ข่าวประชาสัมพันธ์</h2>
      </div>

      <div className="relative group rounded-[2rem] overflow-hidden shadow-lg border border-white">
        <Swiper 
          modules={[Navigation, Pagination, Autoplay]} 
          loop={true} 
          navigation={{ prevEl: '.n-prev', nextEl: '.n-next' }} 
          pagination={{ clickable: true, dynamicBullets: true }} 
          autoplay={{ delay: 5000 }} 
          className="aspect-[16/8] w-full"
        >
          {news.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full flex items-end">
                <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />
                <div className="relative z-20 p-8 md:p-12 text-white w-full">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-600 mb-4 inline-block shadow-lg">LATEST NEWS</span>
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-md">{item.title}</h3>
                  <div className="flex items-center gap-3 mt-3 text-sm text-slate-300">
                    <span>📅 {item.date}</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span>โรงพยาบาลสบปราบ</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation */}
        <button className="n-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-slate-900">←</button>
        <button className="n-next absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-slate-900">→</button>
      </div>
    </section>
  );
}