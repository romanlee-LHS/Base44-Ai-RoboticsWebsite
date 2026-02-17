import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Heart, DollarSign, Users, Rocket, Mail, ArrowRight, Award, ExternalLink, Smile, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Skeleton } from "@/components/ui/skeleton";

export default function Sponsors() {
  const { data: sponsors = [], isLoading } = useQuery({
    queryKey: ['sponsors'],
    queryFn: () => base44.entities.Sponsor.list('-amount'),
    initialData: []
  });

  const activeSponsors = sponsors.filter(s => s.status === 'Active');
  const sponsorsByLevel = {
    Platinum: activeSponsors.filter(s => s.sponsorship_level === 'Platinum'),
    Gold: activeSponsors.filter(s => s.sponsorship_level === 'Gold'),
    Silver: activeSponsors.filter(s => s.sponsorship_level === 'Silver'),
    Bronze: activeSponsors.filter(s => s.sponsorship_level === 'Bronze')
  };

  const levelColors = {
    Platinum: "from-[#6e0202] to-[#000000]",
    Gold: "from-yellow-500 to-yellow-600",
    Silver: "from-slate-400 to-slate-500",
    Bronze: "from-amber-700 to-amber-800"
  };

  const benefits = [
    {
      icon: Heart,
      title: "Support STEM Education",
      description: "Help students develop critical skills in science, technology, engineering, and mathematics."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Make a direct impact on local students and inspire the next generation of innovators."
    },
    {
      icon: Rocket,
      title: "Brand Visibility",
      description: "Get recognition at competitions, events, and on our team materials and robot."
    },
    {
      icon: Smile,
      title: "Kinetic Kids Partnership",
      description: "Your support enables us to host a robotics team for children with disabilities through the Kinetic Kids program, providing inclusive STEM opportunities and making robotics accessible to all students.",
      highlighted: true,
      link: "https://kinetickidstx.org/kinetickids_programs/robotics/"
    }
  ];

  const sponsorshipLevels = [
    {
      name: "Bronze Sponsor",
      amount: "$500 - $999",
      benefits: [
        "Logo on team website",
        "Recognition on social media",
        "Thank you in team newsletter"
      ],
      color: "from-amber-700 to-amber-800"
    },
    {
      name: "Silver Sponsor",
      amount: "$1,000 - $2,499",
      benefits: [
        "All Bronze benefits",
        "Logo on team t-shirts",
        "Logo on robot display",
        "Recognition at competitions"
      ],
      color: "from-slate-400 to-slate-500"
    },
    {
      name: "Gold Sponsor",
      amount: "$2,500 - $4,999",
      benefits: [
        "All Silver benefits",
        "Prominent logo placement on robot",
        "Social media spotlight features"
      ],
      color: "from-yellow-500 to-yellow-600"
    },
    {
      name: "Platinum Sponsor",
      amount: "$5,000+",
      benefits: [
        "All Gold benefits",
        "Title sponsorship opportunities",
        "Exclusive sponsor recognition",
        "Custom partnership package"
      ],
      color: "from-[#6e0202] to-[#000000]"
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
              <Heart className="w-10 h-10" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Become a Sponsor</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Partner with Team 6407 to empower students and advance STEM education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Sponsor Team 6407?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your support helps us compete, innovate, and inspire the next generation of leaders
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const cardContent = (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={benefit.highlighted ? 'md:col-span-2' : ''}
                >
                  <Card className={`h-full border-2 rounded-2xl transition-all duration-300 ${
                    benefit.highlighted 
                      ? 'border-[#6e0202] shadow-[0_0_30px_rgba(110,2,2,0.3)] hover:shadow-[0_0_40px_rgba(110,2,2,0.4)] bg-gradient-to-br from-[#6e0202]/5 to-white' 
                      : 'border-slate-200 hover:border-[#6e0202]/50 hover:shadow-xl'
                  } ${benefit.link ? 'cursor-pointer' : ''}`}>
                    <CardContent className="p-8 text-center relative">
                      {benefit.highlighted && (
                        <div className="absolute top-4 right-4">
                          <Sparkles className="w-6 h-6 text-[#6e0202] animate-pulse" />
                        </div>
                      )}
                      <div className={`inline-flex items-center justify-center rounded-2xl mb-6 ${
                        benefit.highlighted 
                          ? 'w-20 h-20 bg-gradient-to-br from-[#6e0202] to-[#000000]' 
                          : 'w-16 h-16 bg-[#6e0202]/10'
                      }`}>
                        <Icon className={`${benefit.highlighted ? 'w-10 h-10 text-white' : 'w-8 h-8 text-[#6e0202]'}`} />
                      </div>
                      <h3 className={`font-bold text-slate-900 mb-3 ${
                        benefit.highlighted ? 'text-2xl' : 'text-xl'
                      }`}>{benefit.title}</h3>
                      <p className={`text-slate-600 leading-relaxed ${
                        benefit.highlighted ? 'text-lg max-w-3xl mx-auto' : ''
                      }`}>{benefit.description}</p>
                      {benefit.link && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-[#6e0202] font-medium">
                          Learn More <ExternalLink className="w-4 h-4" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );

              return benefit.link ? (
                <a
                  key={benefit.title}
                  href={benefit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={benefit.highlighted ? 'md:col-span-2' : ''}
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

      {/* Sponsorship Levels */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Sponsorship Levels</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the sponsorship level that works best for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipLevels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-slate-200 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${level.color}`} />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{level.name}</h3>
                    <p className="text-2xl font-bold text-[#6e0202] mb-6">{level.amount}</p>
                    <ul className="space-y-3">
                      {level.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#6e0202] mt-1.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors */}
      {activeSponsors.length > 0 && (
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Sponsors</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Thank you to these amazing organizations supporting Team 6407
              </p>
            </motion.div>

            {isLoading ? (
              <div className="space-y-12">
                {['Platinum', 'Gold', 'Silver', 'Bronze'].map((level) => (
                  <div key={level}>
                    <Skeleton className="h-8 w-32 mb-6" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(2)].map((_, i) => (
                        <Skeleton key={i} className="h-48 rounded-2xl" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(sponsorsByLevel).map(([level, levelSponsors]) => 
                  levelSponsors.length > 0 && (
                    <div key={level}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`h-1.5 w-12 bg-gradient-to-r ${levelColors[level]} rounded-full`} />
                        <h3 className="text-2xl font-bold text-slate-900">{level} Sponsors</h3>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {levelSponsors.map((sponsor, index) => (
                          <motion.div
                            key={sponsor.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Card className="h-full border-2 border-slate-200 rounded-2xl hover:border-[#6e0202]/50 hover:shadow-xl transition-all duration-300">
                              <div className={`h-2 bg-gradient-to-r ${levelColors[level]}`} />
                              <CardContent className="p-6">
                                {sponsor.logo_url ? (
                                  <div className="mb-4 flex items-center justify-center h-24">
                                    <img 
                                      src={sponsor.logo_url} 
                                      alt={sponsor.company_name}
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  </div>
                                ) : (
                                  <div className="mb-4 flex items-center justify-center h-24">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                      <Award className="w-8 h-8 text-slate-400" />
                                    </div>
                                  </div>
                                )}
                                <h4 className="text-lg font-bold text-slate-900 text-center mb-2">
                                  {sponsor.company_name}
                                </h4>
                                <div className="flex items-center justify-center gap-2 mb-3">
                                  <Badge className={`bg-gradient-to-r ${levelColors[level]} text-white border-0`}>
                                    {sponsor.sponsorship_level}
                                  </Badge>
                                </div>
                                {sponsor.website && (
                                  <a 
                                    href={sponsor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 text-sm text-[#6e0202] hover:text-[#000000] transition-colors mt-3"
                                  >
                                    Visit Website
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* How Funds Are Used */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-slate-200 rounded-2xl shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#6e0202]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-[#6e0202]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">How Your Support Helps</h2>
                    <p className="text-lg text-slate-600 mb-6">
                      Every dollar goes directly to supporting our students and team operations:
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6e0202]" />
                      <span className="text-slate-700">Robot parts and materials</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6e0202]" />
                      <span className="text-slate-700">Competition registration fees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6e0202]" />
                      <span className="text-slate-700">Tools and equipment</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6e0202]" />
                      <span className="text-slate-700">Travel expenses</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6e0202]" />
                      <span className="text-slate-700">Team uniforms and materials</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#6e0202]" />
                      <span className="text-slate-700">Outreach and STEM programs</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-[#6e0202] rounded-2xl bg-gradient-to-br from-[#6e0202] to-[#000000] text-white overflow-hidden">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Contact us today to discuss sponsorship opportunities and how we can partner together
                </p>
                <Link to={createPageUrl('Contact')}>
                  <Button className="bg-white text-[#6e0202] hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-lg">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}