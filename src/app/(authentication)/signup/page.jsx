"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import axiosPlain from "../../../utils/axiosPlain";
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: '', // Changed from 'name' to 'username' for consistency
    phone: '',
    birth: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.birth) newErrors.birth = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.password) newErrors.password = true;
    if (!formData.confirmPassword) newErrors.confirmPassword = true;
    
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      setErrorMessage('Passwords do not match');
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
      setErrorMessage('Please enter a valid email address');
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // Prepare data to send to backend (excluding confirmPassword)
        const dataToSend = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          birth: formData.birth,
          phone: formData.phone
        };
        
        const response = await axiosPlain.post("/auth/signup", dataToSend); // Fixed typo: singup -> signup
        
        if(response) {
          console.log('Account created successfully:', response.data);
          // Handle successful signup (e.g., redirect to login or dashboard)
          setErrorMessage('Account created successfully!');
          localStorage.setItem("email", response.data.data.email);

          setTimeout(()=>{
            router.push("/email-verification")
          },1000)
        }
      } catch (error) {
        console.error('Signup error:', error);
        setErrorMessage(error.response?.data?.message || 'An error occurred during signup');
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Please fill in all required fields correctly');
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col text-black">
      {/* Header */}
      <header className="flex items-center gap-4 h-20 px-6">
        <button className="text-indigo-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-indigo-500">Welcome</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create an account</h2>
            
            {errorMessage && (
              <p className={`text-sm mb-4 text-center ${
                errorMessage.includes('successfully') ? 'text-green-500' : 'text-red-400'
              }`}>
                {errorMessage}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className={`w-full px-3 py-3 bg-gray-100 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:scale-105 ${
                  errors.username ? 'border-red-400' : 'border-transparent focus:border-indigo-400'
                }`}
              />
            </div>

            {/* Phone Input */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className={`w-full px-3 py-3 bg-gray-100 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:scale-105 ${
                  errors.phone ? 'border-red-400' : 'border-transparent focus:border-indigo-400'
                }`}
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <input
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleInputChange}
                min="1950-01-01"
                max="2006-12-31"
                className={`w-full px-3 py-3 bg-gray-100 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:scale-105 ${
                  errors.birth ? 'border-red-400' : 'border-transparent focus:border-indigo-400'
                }`}
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={`w-full px-3 py-3 bg-gray-100 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:scale-105 ${
                  errors.email ? 'border-red-400' : 'border-transparent focus:border-indigo-400'
                }`}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className={`w-full px-3 py-3 pr-12 bg-gray-100 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:scale-105 ${
                  errors.password ? 'border-red-400' : 'border-transparent focus:border-indigo-400'
                }`}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className={`w-full px-3 py-3 pr-12 bg-gray-100 border-2 rounded-lg transition-all duration-300 focus:outline-none focus:scale-105 ${
                  errors.confirmPassword ? 'border-red-400' : 'border-transparent focus:border-indigo-400'
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center pt-2">
              <p className="text-gray-700">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => alert('Redirect to sign in page')}
                  className="text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}