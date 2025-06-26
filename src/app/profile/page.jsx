'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Lock, Save, Key, Eye, EyeOff, Camera, Upload } from 'lucide-react';
import { useUserDetails } from '../../utils/useUserDetails';
import axiosInstance from '@/utils/axiosInstance';

export default function EditProfile() {
  const router = useRouter();
  const { user, loading } = useUserDetails();
  
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '', 
    profilePic: null
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Handle authentication and populate user data
  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User is not authenticated, redirect to home
        router.push('/');
        return;
      }
      
      // Populate form with user data - ensure all fields are strings
      setProfileData(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '', // Ensure it's always a string
      }));
      
      // Set profile picture preview
      if (user.profilePic) {
        setPreviewImage(user.profilePic);
      } else {
        setPreviewImage('/icons/default-avatar.svg');
      }
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setProfileMessage({ type: 'error', text: 'Please select a valid image file (JPEG, PNG, GIF)' });
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setProfileMessage({ type: 'error', text: 'Image size must be less than 5MB' });
        return;
      }
      
      setProfileData(prev => ({ ...prev, profilePic: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
      
      // Clear any existing messages
      setProfileMessage({ type: '', text: '' });
    }
  };

  const handleProfileSubmit = async () => {
    setProfileLoading(true);
    setProfileMessage({ type: '', text: '' });
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Only append fields that have values and are different from current user data
      if (profileData.username && profileData.username.trim() && profileData.username !== user.username) {
        formData.append('username', profileData.username.trim());
      }
      if (profileData.email && profileData.email.trim() && profileData.email !== user.email) {
        formData.append('email', profileData.email.trim());
      }
      // Handle phone field safely
      if (profileData.phone !== undefined && profileData.phone !== null && profileData.phone !== '') {
        const phoneValue = typeof profileData.phone === 'string' ? profileData.phone.trim() : String(profileData.phone).trim();
        if (phoneValue) {
          formData.append('phone', phoneValue);
        }
      }
      // Fix: Change 'pic' to 'profilePic' to match backend expectation
      if (profileData.profilePic) {
        formData.append('profilePic', profileData.profilePic);
      }
      
      // Check if at least one field is being updated
      let hasUpdates = false;
      for (let [key, value] of formData.entries()) {
        hasUpdates = true;
        break;
      }
      
      if (!hasUpdates) {
        setProfileMessage({ type: 'error', text: 'Please make changes to update your profile' });
        setProfileLoading(false);
        return;
      }
      
      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      // Make the actual API call
      const response = await axiosInstance.patch('/auth/change-information', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      console.log('API Response:', response);
      
      // Handle successful response - check for success field in response
      if (response.data && response.data.success) {
        setProfileMessage({ 
          type: 'success', 
          text: response.data.message || 'Profile updated successfully!' 
        });
        
        // Clear message after 5 seconds
        setTimeout(() => setProfileMessage({ type: '', text: '' }), 5000);
      } else {
        // Handle case where API returns success: false
        throw new Error(response.data?.message || 'Profile update failed');
      }
      
    } catch (error) {
      console.error('Profile update error:', error);
      
      // More detailed error handling
      let errorMessage = 'Failed to update profile. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        console.log('Error response:', error.response);
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        console.log('No response received:', error.request);
        errorMessage = 'Network error. Please check your connection.';
      } else {
        // Something else happened
        console.log('Error:', error.message);
        errorMessage = error.message || errorMessage;
      }
      
      setProfileMessage({ 
        type: 'error', 
        text: errorMessage
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setPasswordMessage({ type: '', text: '' });
    
    // Validation
    if (!passwordData.currentPassword.trim()) {
      setPasswordMessage({ type: 'error', text: 'Current password is required' });
      return;
    }
    
    if (!passwordData.newPassword.trim()) {
      setPasswordMessage({ type: 'error', text: 'New password is required' });
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters long!' });
      return;
    }
    
    setPasswordLoading(true);
    
    try {
      // Prepare payload according to backend expectations
      const payload = {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      };
      
      console.log('Password change payload:', payload);
      
      // Make API call to change password
      const response = await axiosInstance.patch('/auth/change-password', payload);
      
      console.log('Password change response:', response);
      
      // Handle successful response
      if (response.status === 200 || response.status === 201) {
        setPasswordMessage({ 
          type: 'success', 
          text: response.data?.message || 'Password updated successfully!' 
        });
        
        // Clear password fields on success
        setPasswordData({ 
          currentPassword: '', 
          newPassword: '', 
          confirmPassword: '' 
        });
        
        // Clear message after 5 seconds
        setTimeout(() => setPasswordMessage({ type: '', text: '' }), 5000);
      } else {
        throw new Error('Unexpected response status');
      }
      
    } catch (error) {
      console.error('Password update error:', error);
      setPasswordMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update password. Please try again.' 
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-black">
      {/* Header */}
      <header className="flex items-center p-6 bg-white shadow-sm">
        <button 
          onClick={() => router.back()}
          className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Edit Profile</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <div className="flex flex-col gap-8">
          {/* Profile Information Section */}
          <section className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-medium text-blue-600 mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </h2>
            
            {/* Profile Message */}
            {profileMessage.text && (
              <div className={`mb-6 p-3 rounded-md border ${
                profileMessage.type === 'success' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {profileMessage.text}
              </div>
            )}
            
            <div>
              {/* Profile Picture Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePic"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your username"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleProfileSubmit}
                  disabled={profileLoading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 active:transform active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  Update Profile
                  {profileLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                </button>
              </div>
            </div>
          </section>
          
          {/* Password Update Section */}
          <section className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-medium text-blue-600 mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Update Password
            </h2>
            
            {/* Password Message */}
            {passwordMessage.text && (
              <div className={`mb-6 p-3 rounded-md border ${
                passwordMessage.type === 'success' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {passwordMessage.text}
              </div>
            )}
            
            <div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.currentPassword ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('currentPassword')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {showPasswords.currentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.newPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('newPassword')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {showPasswords.newPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {showPasswords.confirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={handlePasswordSubmit}
                  disabled={passwordLoading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 active:transform active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Key className="w-4 h-4" />
                  Update Password
                  {passwordLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}