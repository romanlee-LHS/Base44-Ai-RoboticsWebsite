import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { User, Award } from 'lucide-react';

export default function MemberCard({ member, index }) {
  const roleColors = {
    "Head Mentor": "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500",
    "Mentor": "bg-amber-100 text-amber-900 border-amber-400",
    "Team Captain": "bg-[#6e0202] text-white border-[#6e0202]",
    "Co-Captain": "bg-[#6e0202]/90 text-white border-[#6e0202]",
    "Lead Programmer": "bg-blue-100 text-blue-800 border-blue-300",
    "Lead Builder": "bg-orange-100 text-orange-800 border-orange-300",
    "Programmer": "bg-blue-50 text-blue-700 border-blue-200",
    "Builder": "bg-orange-50 text-orange-700 border-orange-200",
    "CAD Designer": "bg-purple-100 text-purple-800 border-purple-300",
    "Driver": "bg-green-100 text-green-800 border-green-300",
    "Scout": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "Outreach Lead": "bg-pink-100 text-pink-800 border-pink-300",
    "Member": "bg-slate-100 text-slate-800 border-slate-300"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="group bg-white border-2 border-slate-200 hover:border-[#6e0202]/50 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center">
            {/* Profile Photo */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6e0202] to-slate-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#6e0202] to-slate-400 flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-16 h-16 text-white" />
                </div>
              )}
              {member.years_on_team === 1 ? (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-16 h-10 flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-xs font-bold">ROOKIE</span>
                </div>
              ) : member.years_on_team > 1 ? (
                <div className="absolute -bottom-2 -right-2 bg-[#6e0202] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-xs font-bold">{member.years_on_team}Y</span>
                </div>
              ) : null}
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
              {member.name}
            </h3>

            {/* Role Badge */}
            <Badge className={`mb-4 border ${roleColors[member.role] || roleColors["Member"]} px-3 py-1`}>
              {member.role}
            </Badge>

            {/* Grade */}
            {member.grade && (
              <p className="text-sm text-slate-600 mb-4">
                Grade {member.grade}
              </p>
            )}

            {/* Mentor Badge */}
            {(member.role === 'Head Mentor' || member.role === 'Mentor') && !member.grade && (
              <div className="mb-4" />
            )}

            {/* Bio */}
            {member.bio && (
              <p className="text-sm text-slate-600 text-center leading-relaxed mb-4">
                {member.bio}
              </p>
            )}

            {/* Specialties */}
            {member.specialties && member.specialties.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-[#6e0202]" />
                  <p className="text-xs font-semibold text-slate-700">SPECIALTIES</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}