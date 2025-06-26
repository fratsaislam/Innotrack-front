import Image from 'next/image';

const Hero = () => {
  return (
    <section className="flex flex-col items-center px-4 md:px-10 mt-12 relative">
      <Image
        src="/icons/bodyright.svg"
        alt=""
        width={250}
        height={250}
        className="absolute top-0 right-0 opacity-40 z-10"
        priority
      />
      <Image
        src="/icons/bodyleft.svg"
        alt=""
        width={250}
        height={250}
        className="absolute top-0 left-0 opacity-40 z-10"
        priority
      />
      
      <div className="flex flex-col lg:flex-row items-center text-center lg:text-left w-full">
        <div className="flex flex-col ml-0 lg:ml-[10%] w-full mt-8 items-center lg:items-start animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-red-500 uppercase tracking-[0.6rem] leading-tight drop-shadow-lg">
            InnoTrack
          </h1>
          <p className="text-lg md:text-xl text-white font-medium leading-relaxed tracking-wide w-full max-w-2xl">
            Bring Your Vision to life with InnoTrack- Empowering Startups with Smart Investment
          </p>
        </div>
        <div className="mr-0 lg:mr-[15%] w-full h-full relative mt-8 lg:mt-0">
          <div className="relative">
            <Image
              src="/icons/Rectangle9.svg"
              alt="background"
              width={400}
              height={400}
              className="absolute z-10 right-0 lg:right-[5%] top-0 w-[70%] lg:w-[35%] hidden lg:block"
            />
            <Image
              src="/icons/Character_.svg"
              alt="character"
              width={800}
              height={800}
              className="absolute z-20 right-0 lg:right-[7%] top-8 w-[70%] lg:w-[35%] hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;