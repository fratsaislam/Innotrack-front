"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    // Add your login logic here
    try {
      await axiosInstance.post("/auth/signin",{email, password});
      router.push("/")
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Epilogue',sans-serif] text-black">
      {/* Header */}
      <header className="flex items-center gap-4 h-[10vh] pl-6 mb-0">
        <Link href="#" className="flex items-center">
          <ArrowLeft className="w-6 h-6 text-[#6d65e1]" />
        </Link>
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#6d65e1] font-bold">
          Nice to see you again
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-4 h-[90vh]">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-4 rounded-2xl">
            <h2 className="text-xl md:text-2xl text-[#191b2b] pb-8 font-semibold">
              Login
            </h2>
            
            {errorMessage && (
              <p className="text-[#f06272] text-sm mb-4">{errorMessage}</p>
            )}

            <div className="flex flex-col gap-4 w-full">
              {/* Email Input */}
              <div className="email-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f2f2] border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-105 transition-all duration-500 ease-in-out placeholder-gray-500 font-['Raleway',sans-serif]"
                />
              </div>

              {/* Password Input */}
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-12 bg-[#f2f2f2] border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-105 transition-all duration-500 ease-in-out placeholder-gray-500 font-['Raleway',sans-serif]"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-4 text-gray-500 hover:text-black transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link 
                  href="#" 
                  className="text-sm text-[#6d65e1] hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Sign In Button */}
              <div className="flex flex-col gap-8 mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#7c8ede] text-white rounded-xl font-['Raleway',sans-serif] cursor-pointer transition-all duration-500 ease-in-out hover:bg-[#6d65e1] hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  )}
                  Sign In
                </button>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  className="w-full max-w-80 flex items-center justify-center gap-3 px-5 py-3 text-sm text-gray-600 bg-white border border-[#6d65e1] rounded-2xl font-['Raleway',sans-serif] cursor-pointer transition-all duration-600 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#6d65e1]/20 uppercase"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 262"
                    className="h-6 w-6"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    />
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    />
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    />
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="flex items-center justify-center gap-2 p-4 rounded-2xl">
                <p className="text-sm text-gray-600">Don't have an account?</p>
                <Link 
                  href="/signup" 
                  className="text-sm text-[#6d65e1] hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;