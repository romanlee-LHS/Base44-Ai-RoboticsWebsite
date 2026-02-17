import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export default function CompetitionHistory() {
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedId, setExpandedId] = useState(null);

  const { data: competitions = [], isLoading } = useQuery({
    queryKey: ['competitions', sortOrder],
    queryFn: () => base44.entities.Competition.list(sortOrder === 'desc' ? '-year' : 'year'),
    initialData: []
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
              <Trophy className="w-10 h-10" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Competition History</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Our journey through FIRST Tech Challenge competitions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sort Controls */}
      <section className="px-6 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-600 font-medium">
                {competitions.length} {competitions.length === 1 ? 'Competition' : 'Competitions'}
              </p>
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="flex items-center gap-2 border-slate-300 hover:border-[#6e0202] hover:text-[#6e0202]"
              >
                <Calendar className="w-4 h-4" />
                Year: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                {sortOrder === 'desc' ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitions List */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                  <Skeleton className="h-8 w-64 mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : competitions.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-2xl text-slate-500">No competitions yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {competitions.map((competition, index) => (
                  <motion.div
                    key={competition.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card 
                      className="bg-white border-2 border-slate-200 hover:border-[#6e0202]/50 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl cursor-pointer"
                      onClick={() => toggleExpand(competition.id)}
                    >
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className="bg-[#6e0202] text-white border-[#6e0202] text-lg px-4 py-1">
                                {competition.year}
                              </Badge>
                              {competition.award_won && (
                                <Badge className="bg-amber-100 text-amber-800 border-amber-400 flex items-center gap-1 px-3 py-1">
                                  <Award className="w-3 h-3" />
                                  {competition.award_won}
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                              {competition.name}
                            </h3>
                            
                            <AnimatePresence>
                              {expandedId === competition.id && competition.description && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <p className="text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-200">
                                    {competition.description}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-transform ${
                              expandedId === competition.id ? 'rotate-180' : ''
                            }`}>
                              <ChevronDown className="w-5 h-5 text-slate-600" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}