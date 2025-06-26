"use client"
import { useState } from 'react';
import { useAuth } from "../../utils/useAuth";
import { 
  FaHome, 
  FaProjectDiagram, 
  FaCog, 
  FaChartBar,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaRocket
} from 'react-icons/fa';

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FaChartBar },
    { name: 'Projects', href: '/dashboard/projects', icon: FaProjectDiagram },
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
  ];

  const handleSignOut = () => {
    if (logout) {
      logout();
    }
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/95 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <FaRocket className="text-white text-lg" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                InnovateLab
              </h2>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-1 rounded"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                <item.icon className="text-lg group-hover:text-red-400 transition-colors relative z-10" />
                <span className="font-medium relative z-10">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/40 border border-slate-600/30">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="text-white text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'John Doe'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email || 'john@innovatelab.com'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-all duration-200 group"
            >
              <FaSignOutAlt className="group-hover:text-red-400 transition-colors" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-800/60 backdrop-blur-xl border-b border-slate-700/50 px-4 lg:px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700/50"
              >
                <FaBars className="text-xl" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back to your workspace</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 bg-slate-700/60 rounded-xl px-4 py-2 border border-slate-600/30 focus-within:border-red-500/50 transition-colors">
                <FaSearch className="text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search projects, tasks..."
                  className="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-48"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-all duration-200 group">
                <FaBell className="text-lg group-hover:text-red-400 transition-colors" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg"></span>
              </button>

              {/* Mobile search */}
              <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-slate-700/60 rounded-lg transition-all duration-200">
                <FaSearch className="text-lg" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}