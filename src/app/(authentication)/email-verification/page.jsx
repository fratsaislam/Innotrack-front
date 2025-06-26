"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from "../../../utils/axiosInstance";
import axiosPlain from "../../../utils/axiosPlain";
import { useRouter } from 'next/navigation';

const EmailVerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const inputRefs = useRef([]);
  const router = useRouter();

  useEffect(() => {
    // Get email from localStorage and send verification code when component mounts
    const initializeVerification = async () => {
      try {
        const storedEmail = localStorage.getItem('email');
        if (!storedEmail) {
          setErrorMessage('Email not found. Please go back and sign up again.');
          setIsInitialLoading(false);
          return;
        }
        
        setEmail(storedEmail);
        
        // Send verification code
        await axiosPlain.patch("/auth/send-verification-code", { email: storedEmail });
        
        // Focus on first input after API call succeeds
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } catch (error) {
        console.error('Error sending verification code:', error);
        setErrorMessage(error.response?.data?.message || 'Failed to send verification code. Please try again.');
      } finally {
        setIsInitialLoading(false);
      }
    };

    initializeVerification();
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setErrorMessage('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = async (e, index) => {
    e.preventDefault();
    
    try {
      let pastedText = '';
      
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.readText) {
        try {
          pastedText = await navigator.clipboard.readText();
        } catch (clipboardError) {
          // Fallback to event.clipboardData if modern API fails
          pastedText = e.clipboardData?.getData('text') || '';
        }
      } else {
        // Fallback for older browsers
        pastedText = e.clipboardData?.getData('text') || '';
      }
      
      // Extract only digits from pasted text
      const digits = pastedText.replace(/\D/g, '').slice(0, 6);
      
      if (digits.length > 0) {
        const newCode = [...code];
        
        // Fill from current index or start from beginning if paste has 6 digits
        const startIndex = digits.length === 6 ? 0 : index;
        
        for (let i = 0; i < 6; i++) {
          if (i >= startIndex && i < startIndex + digits.length) {
            newCode[i] = digits[i - startIndex];
          } else if (digits.length === 6) {
            newCode[i] = digits[i] || '';
          }
        }
        
        setCode(newCode);
        
        // Focus on the next empty input or last input
        const nextIndex = Math.min(startIndex + digits.length, 5);
        inputRefs.current[nextIndex]?.focus();
      }
    } catch (error) {
      console.error('Paste error:', error);
      // Silently fail - user can still type manually
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const providedCode = code.join('');
    
    if (providedCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Call verification API
      const response = await axiosInstance.patch("/auth/verify-verification-code", {
        email,
        providedCode
      });
      
      console.log('Verification successful:', response.data);
      
      // Show success animation
      setShowSuccess(true);
      
      // Clear email from localStorage since verification is complete
      localStorage.removeItem('email');
      
      // Redirect after success animation
      setTimeout(() => {
        // Add your redirect logic here
        console.log('Redirecting to dashboard...');
        router.push("/");
      }, 2000);
      
    } catch (error) {
      console.error('Verification error:', error);
      setErrorMessage(error.response?.data?.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setErrorMessage('Email not found. Please refresh the page.');
      return;
    }

    try {
      setErrorMessage('');
      await axiosPlain.patch("auth/send-verification-code", { email });
      
      // Clear the current code
      setCode(['', '', '', '', '', '']);
      
      // Focus on first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
      
      // Show success message (optional)
      console.log('Verification code resent successfully');
      // You could set a success message state here if needed
      
    } catch (error) {
      console.error('Resend error:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to resend code. Please try again.');
    }
  };

  // Show loading state while initializing
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center font-['Epilogue',sans-serif]">
        <div className="max-w-md w-full mx-auto p-5 flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#6c7cdd] border-t-transparent mb-4"></div>
          <p className="text-[#555] text-center">Sending verification code...</p>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center font-['Epilogue',sans-serif]">
        <div className="max-w-md w-full mx-auto p-5 flex flex-col items-center">
          <div className="w-20 h-20 mx-auto mb-5 relative">
            <div className="w-20 h-20 relative rounded-full border-4 border-[#6c7cdd] bg-[#f8f9fa] flex items-center justify-center">
              <div className="absolute w-6 h-1 bg-[#6c7cdd] rounded-sm transform rotate-45 translate-x-[-4px] translate-y-[2px] animate-[icon-line-tip_0.75s_ease-in-out]"></div>
              <div className="absolute w-12 h-1 bg-[#6c7cdd] rounded-sm transform -rotate-45 translate-x-[4px] translate-y-[-2px] animate-[icon-line-long_0.75s_ease-in-out]"></div>
            </div>
          </div>
          <h1 className="text-2xl font-medium mb-8 text-[#333] text-center">
            Email Verified Successfully!
          </h1>
          <p className="text-center text-[#555] leading-6">
            Your account has been verified. You will be redirected shortly.
          </p>
        </div>
        
        <style jsx>{`
          @keyframes icon-line-tip {
            0% {
              width: 0;
              transform: rotate(45deg) translate(-20px, 10px);
            }
            54% {
              width: 0;
              transform: rotate(45deg) translate(-20px, 10px);
            }
            70% {
              width: 50px;
              transform: rotate(45deg) translate(-30px, 18px);
            }
            84% {
              width: 17px;
              transform: rotate(45deg) translate(-10px, 24px);
            }
            100% {
              width: 24px;
              transform: rotate(45deg) translate(-4px, 2px);
            }
          }
          
          @keyframes icon-line-long {
            0% {
              width: 0;
              transform: rotate(-45deg) translate(23px, 27px);
            }
            65% {
              width: 0;
              transform: rotate(-45deg) translate(23px, 27px);
            }
            84% {
              width: 55px;
              transform: rotate(-45deg) translate(0px, 17px);
            }
            100% {
              width: 47px;
              transform: rotate(-45deg) translate(4px, -2px);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center font-['Epilogue',sans-serif] text-black">
      <div className="max-w-[450px] w-full mx-auto mt-12 p-5 flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-medium mb-8 text-[#333] text-center">
          Verify your email
        </h1>
        
        <p className="text-center mb-8 text-[#555] leading-6 px-4">
          We've sent a verification code to{' '}
          <span className="font-medium text-[#333]">{email || 'your email address'}</span>. 
          Please enter the code below to confirm your account.
        </p>

        <div className="flex gap-2 md:gap-3 mb-6 w-full justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(e, index)}
              className="w-11 h-14 md:w-12 md:h-15 border border-[#ddd] rounded-lg text-center text-xl md:text-2xl bg-[#f5f5f5] focus:outline-none focus:border-[#6c7cdd] focus:shadow-[0_0_0_2px_rgba(108,124,221,0.2)] transition-all duration-200"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full py-3 bg-[#6c7cdd] text-white border-none rounded-md text-base cursor-pointer transition-colors duration-200 hover:bg-[#5a68c0] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
          )}
          Verify Account
        </button>

        {errorMessage && (
          <div className="text-[#f06272] mt-4 text-center text-sm">
            {errorMessage}
          </div>
        )}

        <button
          onClick={handleResend}
          className="mt-5 text-[#6c7cdd] text-sm bg-none border-none cursor-pointer hover:underline transition-all duration-200"
        >
          Didn't receive a code? Resend
        </button>
        
        <p className="text-xs text-[#888] mt-4 text-center">
          Tip: You can paste your 6-digit code directly into any input field
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;