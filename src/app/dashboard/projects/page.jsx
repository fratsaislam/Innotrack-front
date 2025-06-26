"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useUserDetails} from "@/utils/useUserDetails";
import Navbar from "../../../components/landing/Navbar"
import axiosInstance from "../../../utils/axiosInstance"
import { 
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaCheck,
    FaTimes,
    FaTrash
} from 'react-icons/fa';

import GoToAuth from "../../../components/common/GoToAuth"

const AdminDashboard = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {user, loading} = useUserDetails();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/projects/all-projects");
        console.log(response.data);
        setProjects(response.data.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    
    // Only fetch projects if user is loaded and exists
    if (!loading && user) {
      fetchProjects();
    } else if (!loading && !user) {
      setLoading(false);
    }
  }, [user, loading]);

  const handleAcceptProject = async (projectId) => {
    setProcessingIds(prev => new Set(prev).add(projectId));
    
    try {
      const response = await axiosInstance.patch(`/projects/accept-project?_id=${projectId}`);
      console.log("Project accepted:", response.data);
      
      // Update the project in the local state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project._id === projectId 
            ? { ...project, accepted: true }
            : project
        )
      );
      
      // Show success message (you can replace this with a toast notification)
      alert("Project accepted successfully!");
      
    } catch (error) {
      console.error("Error accepting project:", error);
      alert("Failed to accept project. Please try again.");
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  

  const handleDeleteProject = async (projectId) => {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    setProcessingIds(prev => new Set(prev).add(projectId));
    
    try {
      const response = await axiosInstance.delete(`/projects/delete-project?_id=${projectId}`);
      console.log("Project deleted:", response.data);
      
      // Remove the project from the local state
      setProjects(prevProjects => 
        prevProjects.filter(project => project._id !== projectId)
      );
      
      alert("Project deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const getStatusBadge = (accepted) => {
    if (accepted === true) {
      return (
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <FaCheckCircle className="text-xs" />
          Accepted
        </span>
      );
    } else if (accepted === false) {
      return (
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <FaTimesCircle className="text-xs" />
          Pending
        </span>
      );
    } else {
      return (
        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <FaClock className="text-xs" />
          Pending
        </span>
      );
    }
  };

  const LoadingSpinner = () => (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-white/30 border-t-red-500 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-400 text-lg">Loading...</p>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 bg-white/10 rounded-xl">
      <div className="text-6xl text-slate-400 mb-6">
        <i className="fas fa-inbox"></i>
      </div>
      <h3 className="text-xl font-bold mb-2">No projects found</h3>
      <p className="text-slate-400 text-center max-w-md">
        No projects have been submitted yet.
      </p>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className="bg-slate-600/40 rounded-xl overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="p-6 bg-black/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-xl font-bold font-serif">{project.title || 'Untitled Project'}</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {project.category || 'General'}
          </span>
          {getStatusBadge(project.accepted)}
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4 mb-6">
          <div className="flex flex-col md:flex-row">
            <span className="font-semibold text-slate-400 w-full md:w-32 mb-1 md:mb-0">Team Members:</span>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mt-2">
                {project.users && project.users.length > 0 ? (
                  project.users.map((user, index) => (
                    <span key={user._id || index} className="bg-white/10 px-2 py-1 rounded text-sm">
                      {typeof user === 'object' ? user.username : user}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-sm">No team members</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <span className="font-semibold text-slate-400 w-full md:w-32 mb-1 md:mb-0">Created:</span>
            <span className="flex-1">{new Date(project.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
          <div className="flex flex-col md:flex-row">
            <span className="font-semibold text-slate-400 w-full md:w-32 mb-1 md:mb-0">Status:</span>
            <span className="flex-1">
              {project.accepted === true ? 'Project Accepted' : 
               project.accepted === false ? 'Project Not Accepted' : 
               'Pending Review'}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-slate-400 mb-2">Description:</h4>
          <div className="bg-black/20 p-4 rounded-lg max-h-36 overflow-y-auto">
            <p>{project.description || 'No description provided'}</p>
          </div>
        </div>

        {project.details && project.details.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-slate-400 mb-2">Project Details:</h4>
            <div className="bg-black/20 p-4 rounded-lg max-h-36 overflow-y-auto">
              <div className="space-y-2">
                {project.details.map((detail, index) => (
                  <div key={index} className="text-sm">
                    {typeof detail === 'string' ? detail : JSON.stringify(detail)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/10 gap-4">
          {/* Admin Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Accept Button - disabled if already accepted */}
            <button
              onClick={() => handleAcceptProject(project._id)}
              disabled={processingIds.has(project._id) || project.accepted === true}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              {processingIds.has(project._id) ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : project.accepted === true ? (
                <>
                  <FaCheck className="text-sm" />
                  Already Accepted
                </>
              ) : (
                <>
                  <FaCheck className="text-sm" />
                  Accept Project
                </>
              )}
            </button>
            
            {/* Delete Button - always available */}
            <button
              onClick={() => handleDeleteProject(project._id)}
              disabled={processingIds.has(project._id)}
              className="bg-gray-700 hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              {processingIds.has(project._id) ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FaTrash className="text-sm" />
                  Delete
                </>
              )}
            </button>
            
            {/* View Details Button - always available */}
            {project.accepted && (<button
              onClick={() => router.push(`/projects/view/${project._id}`)}
              className="bg-white text-slate-800 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <i className="fas fa-eye"></i>
              View Details
            </button>)}
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading spinner while checking authentication or fetching projects
  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  // Show auth redirect if user is not authenticated
  if (!user) {
    return <GoToAuth />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-serif mb-2">Admin Dashboard - All Projects</h1>
          <p className="text-slate-400 text-lg">Review and manage all submitted projects</p>
        </div>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project._id || index} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;