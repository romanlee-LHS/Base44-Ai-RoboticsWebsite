import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Trophy, Rocket, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [expandedValue, setExpandedValue] = useState(null);

  const values = [
    { name: "Involved", description: "Actively participating in team activities, competitions, and community outreach to make a meaningful difference." },
    { name: "Perseverance", description: "Pushing through challenges and setbacks with determination, never giving up even when the robot doesn't work on the first try." },
    { name: "Respect", description: "Showing honor and consideration to teammates, competitors, mentors, and everyone we encounter, embodying gracious professionalism." },
    { name: "Integrity", description: "Being honest and ethical in all our actions, following the rules, and doing what's right even when no one is watching." },
    { name: "Servant Heart", description: "Putting others first, helping teammates succeed, and giving back to our community through mentoring and outreach." },
    { name: "Love", description: "Caring deeply for our team, supporting each other, and approaching every interaction with kindness and compassion." },
    { name: "Faith", description: "Grounding our work in our beliefs, trusting in God's plan, and letting our faith guide our actions on and off the field." },
    { name: "Excellence", description: "Striving for the highest quality in everything we do, from robot design to teamwork, always seeking to improve and grow." },
    { name: "Impact", description: "Making a positive difference in our school, community, and the world through STEM education and inspiration." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6e0202]/5 via-transparent to-slate-200/30" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6 px-4 py-2 bg-[#6e0202]/10 rounded-full">
                <p className="text-[#6e0202] font-medium text-sm tracking-wide">FTC TEAM 6407</p>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Mechanical Mustangs
                <span className="block text-[#6e0202] mt-2">Secretariat</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                Competing in FIRST Tech Challenge, building robots and character through innovation, teamwork, and excellence.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl('TeamRoster')}>
                  <Button className="bg-[#6e0202] hover:bg-[#000000] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                    Meet Our Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to={createPageUrl('Mission')}>
                  <Button variant="outline" className="px-8 py-6 text-lg rounded-xl border-2 border-slate-300 hover:border-[#6e0202] hover:text-[#6e0202] transition-all">
                    Our Mission
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6e0202] to-slate-400 rounded-full blur-3xl opacity-20" />
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_698cdb72a432413bad93b600/8023c7dca_IMG_0099.png"
                  alt="Lutheran High School Logo"
                  className="relative w-full max-w-md h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do, on and off the field
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => setExpandedValue(expandedValue === value.name ? null : value.name)}
                  className="w-full h-full p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl hover:border-[#6e0202]/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <p className="text-center font-semibold text-slate-800 group-hover:text-[#6e0202] transition-colors flex items-center justify-center gap-2">
                    {value.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedValue === value.name ? 'rotate-180' : ''}`} />
                  </p>
                  <AnimatePresence>
                    {expandedValue === value.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-slate-600 text-left leading-relaxed">
                          {value.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#6e0202] to-[#000000] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-5xl font-bold mb-2">8</h3>
              <p className="text-white/80 text-lg">Team Members</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-5xl font-bold mb-2">FTC</h3>
              <p className="text-white/80 text-lg">Competitions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-5xl font-bold mb-2">6407</h3>
              <p className="text-white/80 text-lg">Team Number</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Ready to Meet the Team?
            </h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Discover the talented students behind our success. Each member brings unique skills and passion to the team.
            </p>
            <Link to={createPageUrl('TeamRoster')}>
              <Button className="bg-[#6e0202] hover:bg-[#000000] text-white px-10 py-7 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                View Team Roster
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}