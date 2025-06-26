import Image from 'next/image';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Sponsors from '../components/landing/Sponsors';
import Projects from '../components/landing/Projects';
import Startups from '../components/landing/StartUps';
import HowToJoin from '../components/landing/HowToJoin';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden flex flex-col relative">
        <Navbar />
      <main className="flex-1">
        <Hero />
        <Sponsors />
        <Projects />
        <Startups />
        <HowToJoin />
      </main>
      <Footer />
    </div>
  );
}