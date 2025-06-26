import Image from 'next/image';

const HowToJoin = () => {
  const steps = [
    {
      icon: "/icons/graduation.svg",
      text: "Any ESTIN student with their team mates",
      alt: "Graduation Cap"
    },
    {
      icon: "/icons/Idea.svg",
      text: "Try to find a solution to an existing problem",
      alt: "Lightbulb"
    },
    {
      icon: "/icons/srocket.svg",
      text: "Launch your project on InnoTrack platform",
      alt: "Rocket"
    }
  ];

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mt-16 mb-8 text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          <h4>
            <span className="text-blue-300">How</span> and{' '}
            <span className="text-blue-300">Who</span> can join{' '}
            <span className="text-orange-500">innotrack</span>?
          </h4>
        </div>
        
        <section className="flex flex-col md:flex-row items-center justify-between bg-gray-900 p-5 md:p-8 rounded-2xl text-white gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <Image
                src={step.icon}
                alt={step.alt}
                width={50}
                height={50}
                className="w-12 h-12 md:w-16 md:h-16"
              />
              <p className="text-lg md:text-xl lg:text-2xl font-medium text-white max-w-xs">
                {step.text}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default HowToJoin;