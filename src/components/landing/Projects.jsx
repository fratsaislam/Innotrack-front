import Image from 'next/image';

const Projects = () => {
  const projectCards = [
    {
      title: "Investing in AI related Projects",
      description: "AI, machine learning....",
      bgImage: "/icons/P1.svg"
    },
    {
      title: "Investing in Web Development Projects",
      description: "Frontend, backend and marketing...",
      bgImage: "/icons/P2.svg"
    },
    {
      title: "Investing in Design Projects",
      description: "3D design, UI/UX...",
      bgImage: "/icons/P3.svg"
    }
  ];

  return (
    <section className="flex items-center justify-center flex-wrap gap-5 p-5 bg-white rounded-2xl bg-[url('/icons/shap.svg'),url('/icons/rightshape.svg')] bg-no-repeat bg-[top_left,top_right]">
      {/* Left section (text content) */}
      <div className="max-w-xs p-2.5 rounded-2xl bg-transparent text-left flex flex-col">
        <h4 className="text-2xl md:text-3xl font-bold mb-5 text-black">
          Find your project
        </h4>
        <p className="text-base md:text-lg font-medium leading-6 text-gray-600 mb-5 text-xs md:text-base">
          Selecting a startup project requires a thoughtful approach, balancing
          your interests, market demand, and feasibility. Here's a{' '}
          <span className="text-orange-500 font-bold">step-by-step</span> guide to help you pick the
          perfect project.
        </p>
        <a 
          href="#" 
          className="text-white bg-blue-300 py-2.5 px-5 rounded-2xl self-center transition-all duration-300 hover:bg-gray-800 hover:scale-105 no-underline"
        >
          See all
        </a>
      </div>

      {/* Project Cards */}
      {projectCards.map((card, index) => (
        <div 
          key={index}
          className="relative min-w-[300px] min-h-[300px] rounded-2xl flex items-center justify-center shadow-md overflow-hidden transition-all duration-700"
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.1)), url(${card.bgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full p-5 transition-all duration-700">
            <p className="text-2xl text-white font-medium">
              {card.title}
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-6 mt-2.5">
              {card.description}
            </p>
          </div>
        </div>
      ))}

      {/* Details section */}
      <div className="flex flex-col justify-between w-full items-center py-5 px-10 bg-blue-200/30 rounded-2xl m-2.5">
        <h4 className="text-2xl md:text-4xl font-bold text-black">
          Want to discover more about <span className="text-orange-500">InnoTrack</span>?
        </h4>
        <p className="text-lg md:text-xl text-gray-800 font-medium leading-7 self-center text-center tracking-wide w-full mt-4">
          If you're looking for more details related to how the incubator functions
        </p>
        <a 
          href="#" 
          className="text-white bg-blue-300 py-2.5 px-5 rounded-2xl self-center transition-all duration-300 hover:bg-gray-800 hover:scale-105 no-underline mt-4"
        >
          More details
        </a>
      </div>
    </section>
  );
};

export default Projects;