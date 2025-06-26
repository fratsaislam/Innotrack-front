"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
    FaLightbulb,
    FaUsers,
    FaRocket,
    FaGraduationCap,
    FaHandshake,
    FaTrophy,
    FaChartLine,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import Navbar from '@/components/landing/Navbar';

const OurMission = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const MissionCard = ({ icon: Icon, title, description, color = "blue" }) => (
    <div className="bg-slate-600/40 rounded-xl overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className={`p-6 bg-${color}-500/20 flex items-center gap-4`}>
        <div className={`bg-${color}-500 p-3 rounded-lg`}>
          <Icon className="text-white text-xl" />
        </div>
        <h3 className="text-xl font-bold font-serif">{title}</h3>
      </div>
      
      <div className="p-6">
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );

  const StatsCard = ({ number, label, icon: Icon }) => (
    <div className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
      <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="text-white text-lg" />
      </div>
      <div className="text-3xl font-bold mb-2">{number}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );

  const TeamMemberCard = ({ name, role, description }) => (
    <div className="bg-slate-600/40 rounded-xl p-6 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="bg-slate-700 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
        <FaUsers className="text-slate-400 text-2xl" />
      </div>
      <h4 className="text-lg font-bold text-center mb-2">{name}</h4>
      <p className="text-red-400 text-center text-sm mb-3">{role}</p>
      <p className="text-slate-300 text-sm text-center">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-serif mb-6">Our Mission</h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of entrepreneurs at ESTIN to transform innovative ideas 
            into successful startups that make a meaningful impact on our community and beyond.
          </p>
        </div>

        {/* Mission Statement with Image */}
        <div className="bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6">What We Stand For</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                At ESTIN Incubator, we believe that every student has the potential to be an entrepreneur. 
                Our mission is to provide the resources, mentorship, and community needed to turn brilliant 
                ideas into thriving businesses. We're not just building startups – we're building the future 
                leaders of tomorrow.
              </p>
            </div>
            <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
              <Image
                src="/estin.jpg"
                alt="ESTIN Campus - Where Innovation Begins"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-sm font-medium">ESTIN Campus - Where Innovation Begins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MissionCard
              icon={FaLightbulb}
              title="Innovation First"
              description="We foster creativity and encourage bold thinking. Every great startup begins with a revolutionary idea, and we provide the environment where these ideas can flourish."
              color="yellow"
            />
            <MissionCard
              icon={FaUsers}
              title="Community Driven"
              description="Success is built together. We create a collaborative ecosystem where students, mentors, and industry experts work hand-in-hand to achieve common goals."
              color="blue"
            />
            <MissionCard
              icon={FaRocket}
              title="Execution Excellence"
              description="Ideas without execution are just dreams. We provide the tools, resources, and guidance needed to transform concepts into market-ready products and services."
              color="green"
            />
            <MissionCard
              icon={FaGraduationCap}
              title="Learning by Doing"
              description="The best education comes from real-world experience. Our hands-on approach ensures students learn entrepreneurship by actually building businesses."
              color="purple"
            />
            <MissionCard
              icon={FaHandshake}
              title="Ethical Leadership"
              description="We believe in building businesses that make a positive impact. Our startups are guided by principles of integrity, sustainability, and social responsibility."
              color="indigo"
            />
            <MissionCard
              icon={FaTrophy}
              title="Excellence in Everything"
              description="We set high standards and strive for excellence in every project. Our goal is not just to create startups, but to create industry leaders and game-changers."
              color="red"
            />
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-black/20 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard
              number="50+"
              label="Students Mentored"
              icon={FaGraduationCap}
            />
            <StatsCard
              number="15+"
              label="Startups Launched"
              icon={FaRocket}
            />
            <StatsCard
              number="100K+"
              label="Funding Raised"
              icon={FaChartLine}
            />
            <StatsCard
              number="25+"
              label="Industry Partners"
              icon={FaHandshake}
            />
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-serif mb-8">Our Vision for ESTIN</h2>
          <div className="bg-slate-600/40 rounded-xl p-8">
            <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto mb-6">
              We envision ESTIN as the premier destination for student entrepreneurship in our region. 
              Our goal is to create an ecosystem where innovation thrives, where students are empowered 
              to take risks, and where the next generation of business leaders is cultivated.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto">
              By 2030, we aim to have supported over 100 student-led startups, created hundreds of jobs, 
              and established ESTIN as a recognized hub of innovation and entrepreneurship.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold font-serif mb-4">Join Our Mission</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Ready to turn your idea into the next big thing? Join the ESTIN Incubator community 
            and let's build the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-800 hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105" onClick={()=>router.push('/projects/create')}>
              Apply Now
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border border-white/30" onClick={()=>router.push('/#startups')}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-red-500 w-8 h-8 rounded-lg flex items-center justify-center">
                <FaRocket className="text-white text-sm" />
              </div>
              <span className="text-lg font-bold font-serif">ESTIN Incubator</span>
            </div>
            <p className="text-slate-400 text-sm">
              Empowering student entrepreneurs • Building tomorrow's leaders
            </p>
            <p className="text-slate-500 text-xs mt-2">
              © 2025 ESTIN Incubator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OurMission;