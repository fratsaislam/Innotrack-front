import Image from 'next/image';

const Sponsors = () => {
  const sponsors = [
    { name: 'Sony', src: '/icons/SONY.svg' },
    { name: 'Apple', src: '/icons/APPLE.svg' },
    { name: 'Dell', src: '/icons/DELL.svg' },
    { name: 'Samsung', src: '/icons/SAMSUNG.svg' }
  ];

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <section className="mt-64 flex flex-col items-center justify-center mb-24 max-w-7xl mx-auto">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-blue-300 uppercase leading-tight text-center">
            Our Sponsors
          </h2>
          <div className="flex flex-col items-center w-full gap-10 py-12">
            <div className="flex flex-col md:flex-row justify-evenly items-center w-full gap-10">
              {sponsors.map((sponsor, index) => (
                <Image
                  key={index}
                  src={sponsor.src}
                  alt={sponsor.name}
                  width={60}
                  height={60}
                  className="filter brightness-80 hover:brightness-100 hover:scale-110 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;