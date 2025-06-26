'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUserDetails } from '../../utils/useUserDetails'; 
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useUserDetails();
  const router = useRouter();
  // console.log(user)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    router.push('/signin'); 
  };

  const handleLogout = async () => {
    await axiosInstance.post("/auth/signout")
    window.location.reload();
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-5">
      <nav className={`flex justify-between items-center p-4 md:p-6 rounded-2xl transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-gray-500/40'
      }`}>
        {/* Logo */}
        <div className="flex items-center">
          <Link className="text-2xl md:text-3xl font-bold text-white" href="/">
            <span className="font-black">inno</span>track<span className="font-black">®</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <button
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => router.push('/projects/create')}
          >
            Launch Your Startup
          </button>
          <a href="/mission" className="text-white hover:text-orange-400 transition-all duration-300 font-medium hover:scale-105">Our Mission</a>
          <a href="/projects/view" className="text-white hover:text-orange-400 transition-all duration-300 font-medium hover:scale-105">Projects</a>
          
          {loading ? (
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Image
                  src={user.profilePic || '/icons/default-avatar.svg'}
                  alt={user.username || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-white group-hover:border-orange-400 transition-all duration-300 cursor-pointer hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/icons/default-avatar.svg';
                  }}
                  onClick={()=>router.push("/profile")}
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-white text-sm font-medium">{user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 text-sm hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Login
            </button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col gap-1 p-2 cursor-pointer group"
          onClick={toggleMenu}
        >
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'group-hover:w-7'}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'group-hover:w-5'}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'group-hover:w-7'}`}></span>
        </button>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-md transform transition-transform duration-300 z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col p-6 gap-6 mt-16">
            {/* Admin Dashboard Button for Mobile Only */}
            {user && user.role === "admin" && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </button>
            )}
            
            <button
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              onClick={() => router.push('/projects/create')}
            >
              Launch Your Startup
            </button>
            <a href="/mission" className="text-white hover:text-orange-400 transition-colors font-medium py-2">Our Mission</a>
            <a href="/projects/view" className="text-white hover:text-orange-400 transition-colors font-medium py-2">Projects</a>
            
            {loading ? (
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-3">
                  <Image
                    src={user.profilePic || '/icons/default-avatar.svg'}
                    alt={user.username || 'User'}
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-white cursor-pointer"
                    onError={(e) => {
                      e.currentTarget.src = '/icons/default-avatar.svg';
                    }}
                    onClick={()=>router.push("/profile")}
                  />
                  <span className="text-white font-medium">{user.username}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleMenu}
          ></div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;