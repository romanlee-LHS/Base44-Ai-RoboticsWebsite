import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import MemberCard from '../components/roster/MemberCard';
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamRoster() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: () => base44.entities.TeamMember.list('-years_on_team'),
    initialData: []
  });

  const mentors = members.filter(m => m.role === 'Head Mentor' || m.role === 'Mentor');
  const students = members.filter(m => m.role !== 'Head Mentor' && m.role !== 'Mentor');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredMentors = filteredMembers.filter(m => m.role === 'Head Mentor' || m.role === 'Mentor');
  const filteredStudents = filteredMembers.filter(m => m.role !== 'Head Mentor' && m.role !== 'Mentor');

  const roles = [...new Set(members.map(m => m.role))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 bg-gradient-to-br from-[#6e0202] to-[#000000] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Team</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Meet the dedicated students driving innovation and excellence in robotics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base border-slate-300 focus:border-[#6e0202] rounded-xl"
                />
              </div>
              
              <div className="md:w-64">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="h-12 border-slate-300 focus:border-[#6e0202] rounded-xl">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                  <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-40 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto mb-4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-slate-500">No team members found</p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredMentors.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <div className="h-1.5 w-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" />
                    Mentors
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMentors.map((member, index) => (
                      <MemberCard key={member.id} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {filteredStudents.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <div className="h-1.5 w-12 bg-gradient-to-r from-[#6e0202] to-[#000000] rounded-full" />
                    Students
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredStudents.map((member, index) => (
                      <MemberCard key={member.id} member={member} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}