import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, User, Calendar, Clock, DollarSign, FileText, BarChart2, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/' },
    { icon: User, label: 'Employés', path: '/employees' },
    { icon: Calendar, label: 'Congés', path: '/leaves' },
    { icon: Clock, label: 'Présences', path: '/attendance' },
    { icon: DollarSign, label: 'Paies', path: '/payroll' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: BarChart2, label: 'Rapports', path: '/reports' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="flex items-center justify-between mb-5 text-white">
            <h2 className="text-2xl font-semibold cursor-pointer" onClick={() => navigate('/')}>HR System</h2>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full px-4 py-3 text-white rounded-lg transition-colors ${
                  location.pathname === item.path ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className={`p-4 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-300`}>
        <header className="bg-white shadow-sm mb-6 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">John Doe</span>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
        <main className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </main>
      </div>
    </div>
  );
}