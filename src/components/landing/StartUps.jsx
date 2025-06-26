import Image from 'next/image';

const Startups = () => {
  const startups = [
    {
      title: "Digital assistants",
      description: "One of the biggest technology trends in recent years has been smart home technology, which can now be found in everyday consumer devices like door locks, light bulbs, and kitchen appliances.",
      image: "/icons/img1.svg"
    },
    {
      title: "E-Reader",
      description: "One of the biggest technology trends in recent years has been smart home technology, which can now be found in everyday consumer devices like door locks, light bulbs, and kitchen appliances.",
      image: "/icons/img2.svg"
    },
    {
      title: "Modern artificial pancreas",
      description: "One of the biggest technology trends in recent years has been smart home technology, which can now be found in everyday consumer devices like door locks, light bulbs, and kitchen appliances.",
      image: "/icons/img3.svg"
    }
  ];

  return (
    <section className="flex flex-col mt-16 justify-between relative bg-[url('/icons/righttop.svg'),url('/icons/Exclude.svg')] bg-no-repeat bg-[top_right,bottom_left] bg-[length:15vw,15vw]" id='startups'>
      <div className="flex flex-col gap-5">
        <h4 className="text-2xl md:text-4xl font-bold mb-5 text-white text-center">
          Take a glance at previous launched startups
        </h4>
        <a href="#" className="text-xl md:text-2xl font-medium text-orange-500 text-center underline hover:text-orange-400 transition-colors">
          See all
        </a>
      </div>

      <div className="flex flex-wrap justify-evenly gap-5 mt-8">
        {startups.map((startup, index) => (
          <div 
            key={index}
            className="flex flex-col w-full md:w-80 lg:w-96 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl p-2.5 mx-4 mb-5"
          >
            <div className="w-full h-60 rounded-2xl overflow-hidden flex items-center justify-center mb-2">
              <Image
                src={startup.image}
                alt={startup.title}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl md:text-2xl font-semibold text-black cursor-pointer overflow-hidden mb-2 hover:text-orange-500 transition-colors">
                {startup.title}
              </h3>
              <p className="text-base md:text-lg leading-6 text-gray-800 cursor-default">
                {startup.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Startups;