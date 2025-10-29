
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white h-80 flex items-center justify-center"
      style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
    >
      <div className="absolute inset-0 bg-slate-900 bg-opacity-60"></div>
      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          دقت در تنظیم اسناد، تضمین آرامش شما
        </h2>
        <p className="text-lg md:text-xl text-slate-200">
          ارائه کلیه خدمات ثبتی با بالاترین سرعت و دقت
        </p>
      </div>
    </section>
  );
};

export default Hero;
