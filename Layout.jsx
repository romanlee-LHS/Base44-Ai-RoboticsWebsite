import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Home, Users, Trophy, Mail, Heart, Rocket, LogIn, LogOut, User, Camera, UserCog, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await base44.auth.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        try {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    checkAuth();
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'Mission', icon: Rocket, page: 'Mission' },
    { name: 'Team Roster', icon: Users, page: 'TeamRoster' },
    { name: 'Competition History', icon: Trophy, page: 'CompetitionHistory' },
    { name: 'Sponsors', icon: Heart, page: 'Sponsors' },
    { name: 'Contact', icon: Mail, page: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6e0202] to-[#000000] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">L+M</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg leading-tight">Team 6407</p>
                <p className="text-xs text-slate-600">Mechanical Mustangs Secretariat</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPageName === item.page;
                return (
                  <Link key={item.page} to={createPageUrl(item.page)}>
                    <Button
                      variant="ghost"
                      className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#6e0202] text-white hover:bg-[#000000]'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-[#6e0202]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              
              {isAuthenticated ? (
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                        <User className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">{user?.full_name || user?.email}</span>
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <Link to={createPageUrl('TeamMemberManagement')}>
                        <DropdownMenuItem>
                          <UserCog className="w-4 h-4 mr-2" />
                          Manage Team Members
                        </DropdownMenuItem>
                      </Link>
                      <Link to={createPageUrl('TeamPhotoManager')}>
                        <DropdownMenuItem>
                          <Camera className="w-4 h-4 mr-2" />
                          Manage Photos
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => base44.auth.logout()}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button
                  onClick={() => base44.auth.redirectToLogin()}
                  className="ml-2 flex items-center gap-2 px-6 py-2 bg-[#6e0202] hover:bg-[#000000] text-white rounded-xl"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 bg-white"
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPageName === item.page;
                  return (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-[#6e0202] text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
                
                <div className="pt-2 border-t border-slate-200">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-xl mb-2">
                        <User className="w-5 h-5 text-slate-600" />
                        <span className="font-medium text-slate-700">{user?.full_name || user?.email}</span>
                      </div>
                      <button
                        onClick={() => base44.auth.logout()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => base44.auth.redirectToLogin()}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#6e0202] text-white hover:bg-[#000000]"
                    >
                      <LogIn className="w-5 h-5" />
                      <span className="font-medium">Login</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Mechanical Mustangs Secretariat</h3>
              <p className="text-slate-400 leading-relaxed">
                Team 6407, hosted by Lutheran High School of San Antonio. A FIRST Tech Challenge robotics team dedicated to excellence in robotics and community impact.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="block text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-4">Contact</h3>
              <p className="text-slate-400 leading-relaxed">
                Lutheran High School of San Antonio
                <br />
                FTC Team 6407
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-700 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Mechanical Mustangs Secretariat - Team 6407. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}