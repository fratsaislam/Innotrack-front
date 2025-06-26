'use client';

import { useState } from 'react';
import { 
  FaUsers, 
  FaLightbulb, 
  FaArrowRight, 
  FaArrowLeft,
  FaPaperPlane,
  FaHeartbeat,
  FaBrain,
  FaNetworkWired,
  FaMoneyBillWave,
  FaGraduationCap,
  FaEllipsisH,
  FaCheckCircle,
  FaRocket,
  FaSignInAlt,
  FaLock,
  FaUserPlus,
  FaSpinner
} from 'react-icons/fa';
import axiosInstance from "../../../utils/axiosInstance"
import Navbar from '@/components/landing/Navbar';
import { useUserDetails } from '@/utils/useUserDetails';
import { useRouter } from 'next/navigation';
import Footer from '@/components/landing/Footer';
import GoToAuth from '@/components/common/GoToAuth';

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-slate-600 border-t-red-500 rounded-full animate-spin mx-auto"></div>
          <FaRocket className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Loading Your Form</h2>
        <p className="text-gray-400 animate-pulse">Please wait while we prepare everything for you...</p>
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

const ProjectSubmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    users: ['', '', '', '', ''],
    title: '',
    description: '',
    category: '',
    categoryOther: '' // ✅ Initialize categoryOther
  });
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { id: 'Health Tech', icon: FaHeartbeat, label: 'Health Tech' },
    { id: 'AI & ML', icon: FaBrain, label: 'AI & ML' },
    { id: 'IoT', icon: FaNetworkWired, label: 'IoT' },
    { id: 'FinTech', icon: FaMoneyBillWave, label: 'FinTech' },
    { id: 'EdTech', icon: FaGraduationCap, label: 'EdTech' },
    { id: 'Other', icon: FaEllipsisH, label: 'Other' }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.users[0].trim()) {
        newErrors.user1 = 'Team lead email is required';
      }
    }
    
    if (step === 2) {
      if (!formData.title.trim()) {
        newErrors.title = 'Project title is required';
      }
      if (!formData.category) {
        newErrors.category = 'Please select a category';
      }
      if (formData.category === 'Other' && !formData.categoryOther.trim()) {
        newErrors.categoryOther = 'Please specify the category';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Project description is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleUserChange = (index, value) => {
    const newUsers = [...formData.users];
    newUsers[index] = value;
    setFormData(prev => ({
      ...prev,
      users: newUsers
    }));
    
    // Clear error
    if (errors[`user${index + 1}`]) {
      setErrors(prev => ({
        ...prev,
        [`user${index + 1}`]: ''
      }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(2)) {
      setShowConfirmModal(true);
    }
  };

  const confirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    
    try {
      // Filter out empty usernames
      const validUsers = formData.users.filter(user => user.trim());
      
      const submitData = {
        title: formData.title,
        users: validUsers,
        description: formData.description,
        // ✅ Fixed: Use categoryOther when category is "Other"
        category: formData.category === 'Other' ? formData.categoryOther : formData.category
      };

      await axiosInstance.post("/projects/create-project", submitData);
      
      setShowSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          users: ['', '', '', '', ''],
          title: '',
          category: '',
          categoryOther: '',
          description: ''
        });
        setCurrentStep(1);
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error - you might want to show an error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const { user, loading } = useUserDetails();
  const router = useRouter();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show auth component if user is not authenticated
  if (!user) {
    return <GoToAuth />;
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navigation */}
      <div>
        <Navbar/>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto mt-8 bg-slate-700/40 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Submit Your Project</h1>
          <p className="text-gray-300 text-lg">Share your innovation with the world</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-2xl mb-6 flex items-center justify-center gap-3 font-bold animate-fade-in">
            <FaCheckCircle />
            Project submitted successfully!
          </div>
        )}

        {/* Progress Tracker */}
        <div className="flex items-center justify-center mb-8 max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
              currentStep >= 1 ? 'bg-red-500 scale-110' : 'bg-slate-600'
            }`}>
              <FaUsers />
            </div>
            <div className={`mt-2 text-sm transition-all duration-300 ${
              currentStep >= 1 ? 'text-white font-bold' : 'text-gray-400'
            }`}>
              Team
            </div>
          </div>
          <div className="flex-1 h-1 bg-slate-600 mx-4 max-w-20"></div>
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
              currentStep >= 2 ? 'bg-red-500 scale-110' : 'bg-slate-600'
            }`}>
              <FaLightbulb />
            </div>
            <div className={`mt-2 text-sm transition-all duration-300 ${
              currentStep >= 2 ? 'text-white font-bold' : 'text-gray-400'
            }`}>
              Project
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Team Section */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FaUsers />
                Team Information
              </h2>
              
              {/* Team Name */}
            

              {/* Team Members */}
              <div className="mb-8">
                <label className="block text-gray-200 text-lg font-medium mb-3">
                  Team Members <span className="text-sm text-gray-400 font-normal">(Max: 5)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.users.map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={user}
                        onChange={(e) => handleUserChange(index, e.target.value)}
                        placeholder={index === 0 ? "Team Lead Email" : "Team Member Email"}
                        className={`flex-1 p-4 rounded-xl bg-slate-600/50 border-2 transition-all duration-300 focus:outline-none focus:border-red-500 focus:bg-slate-600/70 ${
                          errors[`user${index + 1}`] ? 'border-red-500 animate-pulse' : 'border-transparent'
                        }`}
                      />
                    </div>
                  ))}
                </div>
                {errors.user1 && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-400"></span>
                    {errors.user1}
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-red-500 hover:bg-gray-200 hover:text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105"
                >
                  Next <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Project Details Section */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <FaLightbulb />
                Project Details
              </h2>

              {/* Project Title */}
              <div className="mb-6">
                <label className="block text-gray-200 text-lg font-medium mb-3">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Example: Smart Health Monitor"
                  className={`w-full p-4 rounded-xl bg-slate-600/50 border-2 transition-all duration-300 focus:outline-none focus:border-red-500 focus:bg-slate-600/70 ${
                    errors.title ? 'border-red-500 animate-pulse' : 'border-transparent'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-400"></span>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-gray-200 text-lg font-medium mb-3">Category</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {categoryOptions.map((option) => (
                    <label key={option.id} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={option.id}
                        checked={formData.category === option.id}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                        formData.category === option.id
                          ? 'bg-red-500 scale-105'
                          : 'bg-slate-600/50 hover:bg-slate-600/70'
                      }`}>
                        <option.icon className="text-lg" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {formData.category === 'Other' && (
                  <input
                    type="text"
                    value={formData.categoryOther}
                    onChange={(e) => handleInputChange('categoryOther', e.target.value)}
                    placeholder="Specify category"
                    className={`w-full p-4 rounded-xl bg-slate-600/50 border-2 transition-all duration-300 focus:outline-none focus:border-red-500 focus:bg-slate-600/70 ${
                      errors.categoryOther ? 'border-red-500 animate-pulse' : 'border-transparent'
                    }`}
                  />
                )}
                {(errors.category || errors.categoryOther) && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-400"></span>
                    {errors.category || errors.categoryOther}
                  </p>
                )}
              </div>

              {/* Project Description */}
              <div className="mb-8">
                <label className="block text-gray-200 text-lg font-medium mb-3">Project Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your project, its features, target audience, and what makes it unique..."
                  rows={6}
                  className={`w-full p-4 rounded-xl bg-slate-600/50 border-2 transition-all duration-300 focus:outline-none focus:border-red-500 focus:bg-slate-600/70 resize-none ${
                    errors.description ? 'border-red-500 animate-pulse' : 'border-transparent'
                  }`}
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <span className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-400"></span>
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                >
                  <FaArrowLeft /> Previous
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-red-500 hover:bg-gray-200 hover:text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <FaPaperPlane />
                  Submit Project
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-slate-800 p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Confirm Submission</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Are you sure you want to submit your project? You won't be able to make changes after submission.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900  text-white text-sm rounded-t-3xl">
        <Footer/>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProjectSubmissionForm;