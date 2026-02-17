import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Heart, Rocket, Award, Smile } from 'lucide-react';

export default function Mission() {
  const goals = [
    {
      icon: Rocket,
      title: "Build Excellence",
      description: "Design, build, and program competitive robots that showcase innovation and technical expertise in FIRST Tech Challenge competitions."
    },
    {
      icon: Users,
      title: "Develop Leaders",
      description: "Cultivate leadership, teamwork, and communication skills that extend far beyond robotics into all areas of life."
    },
    {
      icon: Lightbulb,
      title: "Inspire Innovation",
      description: "Foster creative problem-solving and critical thinking through hands-on STEM education and real-world engineering challenges."
    },
    {
      icon: Heart,
      title: "Serve Community",
      description: "Give back through outreach programs, mentoring younger students, and promoting STEM education in our community."
    },
    {
      icon: Award,
      title: "Uphold Values",
      description: "Live out our core values of integrity, respect, perseverance, and faith in everything we do on and off the field."
    },
    {
      icon: Smile,
      title: "Kinetic Kids Partnership",
      description: "Host a robotics team for children with disabilities through the Kinetic Kids program, providing inclusive STEM opportunities for all."
    }
  ];

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
              <Target className="w-10 h-10" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              To build not just robots, but character, knowledge, and a passion for excellence through FIRST Tech Challenge
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 -mt-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-slate-200 rounded-2xl shadow-2xl bg-white">
              <CardContent className="p-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">What Drives Us</h2>
                <p className="text-lg text-slate-700 leading-relaxed text-center mb-6">
                  Team 6407 - Mechanical Mustangs Secretariat is more than a robotics team. We are a community of students dedicated to excellence in STEM, grounded in faith and guided by strong values.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed text-center">
                  Through FIRST Tech Challenge, we learn to design, build, and program competitive robots while developing the skills and character that will serve us throughout our lives. We are committed to gracious professionalism, innovative thinking, and making a positive impact in our school and community.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Goals</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Five key objectives that shape our team's purpose and direction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              const isKineticKids = goal.title === "Kinetic Kids Partnership";
              const cardContent = (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`h-full border-2 border-slate-200 rounded-2xl hover:border-[#6e0202]/50 hover:shadow-xl transition-all duration-300 ${isKineticKids ? 'cursor-pointer' : ''}`}>
                    <CardContent className="p-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#6e0202] to-[#000000] rounded-xl flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{goal.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{goal.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );

              return isKineticKids ? (
                <a
                  key={goal.title}
                  href="https://kinetickidstx.org/kinetickids_programs/robotics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {cardContent}
                </a>
              ) : (
                cardContent
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Vision</h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              We envision a team where every member grows in knowledge, character, and faith while pursuing excellence in robotics. Through competition, collaboration, and community service, we aim to inspire the next generation of STEM leaders who will make a positive difference in the world.
            </p>
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#6e0202] to-[#000000] text-white rounded-xl font-semibold text-lg">
              Together, we build robots and build character.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}