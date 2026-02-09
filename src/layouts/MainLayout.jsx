import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Dna, Home, BarChart3 } from 'lucide-react';

function MainLayout() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                <Dna className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">ProteinLab</span>
                <p className="text-xs text-gray-400">Rare Disease Research</p>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Dna className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">ProteinLab</p>
                <p className="text-xs text-gray-400">
                  Advanced Protein Structure Analysis Platform
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2026 ProteinLab. Research tools for rare disease analysis.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;