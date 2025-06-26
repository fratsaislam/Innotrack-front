"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "../../../../utils/axiosInstance";
import Navbar from "@/components/landing/Navbar";
import { useUserDetails } from "@/utils/useUserDetails";
import { 
  FaArrowLeft, 
  FaUsers, 
  FaCalendarAlt, 
  FaTag, 
  FaChartLine,
  FaPlus,
  FaSpinner
} from 'react-icons/fa';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const { user } = useUserDetails();
  const [project, setProject] = useState(null);
  const [progress, setProgress] = useState(0);
  const [newDetail, setNewDetail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axiosInstance.get(`/projects/single-project?_id=${id}`);
        setProject(res.data.data[0]);
        setProgress(res.data.data[0].progress || 0);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

  // Check authorization
  useEffect(() => {
    if (user && project) {
      const isAdmin = user.role === "admin";
      const isTeamMember = project.users?.some(projectUser => 
        projectUser.username === user.username
      );
      
      if (!isAdmin && !isTeamMember) {
        router.push("/");
      }
    }
  }, [user, project, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axiosInstance.patch(`/projects/update-project?_id=${id}`, {
        progress,
        details: newDetail,
      });
      setNewDetail("");
      // refetch project details after update
      const res = await axiosInstance.get(`/projects/single-project?_id=${id}`);
      setProject(res.data.data[0]);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-white/30 border-t-red-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400">Loading project details...</p>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl text-slate-400 mb-6">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Project Not Found</h3>
          <p className="text-slate-400 text-center max-w-md mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-white text-slate-800 hover:bg-gray-200 px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-6 text-slate-400 hover:text-white flex items-center gap-2 transition-colors duration-200"
          >
            <FaArrowLeft />
            Back to Projects
          </button>
          
          <div className="bg-slate-600/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold font-serif">{project.title}</h1>
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {project.category}
              </span>
            </div>
            
            <p className="text-slate-300 text-lg leading-relaxed">{project.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <div className="bg-slate-600/40 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaChartLine className="text-green-400 text-xl" />
                <h2 className="text-xl font-semibold">Project Progress</h2>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Current Progress</span>
                  <span className="text-2xl font-bold text-green-400">{progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Update Progress
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-slate-600/40 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Project Updates</h2>
              
              {project.details && project.details.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {project.details.map((detail, index) => (
                    <div key={index} className="bg-black/20 p-4 rounded-lg border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-slate-400">Update #{index + 1}</span>
                      </div>
                      <p className="text-slate-200">{detail}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-black/20 p-8 rounded-lg text-center mb-6">
                  <div className="text-4xl text-slate-400 mb-4">
                    <i className="fas fa-clipboard-list"></i>
                  </div>
                  <p className="text-slate-400">No updates yet. Add your first update below!</p>
                </div>
              )}

              {/* Add New Detail Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="newDetail" className="block text-sm font-medium text-slate-400 mb-2">
                    Add New Update
                  </label>
                  <textarea
                    id="newDetail"
                    rows={4}
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe your progress, challenges, or achievements..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Add Update
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-slate-600/40 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-blue-400 text-xl" />
                <h3 className="text-lg font-semibold">Team Members</h3>
              </div>
              
              <div className="space-y-3">
                {project.users && project.users.length > 0 ? (
                  project.users.map((user) => (
                    <div key={user._id} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{user.username}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">No team members assigned</p>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-slate-600/40 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Project Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaTag className="text-yellow-400" />
                  <div>
                    <p className="text-sm text-slate-400">Category</p>
                    <p className="font-medium">{project.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-green-400" />
                  <div>
                    <p className="text-sm text-slate-400">Created</p>
                    <p className="font-medium">
                      {new Date(project.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaChartLine className="text-purple-400" />
                  <div>
                    <p className="text-sm text-slate-400">Status</p>
                    <p className="font-medium">
                      {progress === 100 ? 'Completed' : 
                       progress > 0 ? 'In Progress' : 'Not Started'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}