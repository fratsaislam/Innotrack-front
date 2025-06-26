import React from 'react';
import Navbar from "../landing/Navbar"
import { 
    FaUsers, 
    FaLightbulb, 
    FaRocket,
    FaSignInAlt,
    FaLock,
    FaUserPlus,
} from 'react-icons/fa';
export default function GoToAuth() {
    return(
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 '>
            <div className='relative z-400'>
                <Navbar/>
            </div>
            <div className=" flex items-center justify-center p-4 pt-10 text-white font-sans">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
        
            {/* Main Content */}
            <div className="relative z-10 max-w-2xl w-full">
                {/* Lock Icon with Animation */}
                <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/20 rounded-full mb-6 animate-bounce">
                    <FaLock className="text-4xl text-red-400" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    Access Restricted
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-2">
                    Ready to share your innovation?
                </p>
                <p className="text-lg text-gray-400">
                    Please sign in to submit your project and join our community
                </p>
                </div>
        
                {/* Features Preview */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                    <FaRocket className="text-3xl text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Launch Projects</h3>
                    <p className="text-gray-400 text-sm">Submit and showcase your innovative ideas to the world</p>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                    <FaUsers className="text-3xl text-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Build Teams</h3>
                    <p className="text-gray-400 text-sm">Collaborate with up to 5 team members on your projects</p>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                    <FaLightbulb className="text-3xl text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Get Discovered</h3>
                    <p className="text-gray-400 text-sm">Connect with investors, mentors, and fellow innovators</p>
                </div>
                </div>
        
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 w-full sm:w-auto" onClick={() => router.push("/signin")}>
                    <FaSignInAlt className="group-hover:rotate-12 transition-transform duration-300" />
                    Sign In
                </button>
                
                <button className="group flex items-center justify-center gap-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto" onClick={() => router.push("/signup")}>
                    <FaUserPlus className="group-hover:rotate-12 transition-transform duration-300" />
                    Create Account
                </button>
                </div>
        
                {/* Additional Info */}
                <div className="mt-12 text-center">
                <p className="text-gray-400 text-sm mb-4">
                    Join thousands of innovators already using our platform
                </p>
                <div className="flex justify-center items-center gap-8 text-gray-500">
                    <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    <span className="text-sm">Free to Use</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                    <span className="text-sm">Global Community</span>
                    </div>
                </div>
                </div>
            </div>
        
            <style jsx>{`
                @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                }
                .animate-float {
                animation: float 6s ease-in-out infinite;
                }
            `}</style>
            </div>
        </div>
        
    );
  }

