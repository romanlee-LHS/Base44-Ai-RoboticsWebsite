import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TeamPhotoManager() {
  const [uploadingMemberId, setUploadingMemberId] = useState(null);
  const queryClient = useQueryClient();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: () => base44.entities.TeamMember.list('-years_on_team')
  });

  const updatePhotoMutation = useMutation({
    mutationFn: ({ id, photo_url }) => base44.entities.TeamMember.update(id, { photo_url }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast.success('Photo updated successfully');
      setUploadingMemberId(null);
    },
    onError: () => {
      toast.error('Failed to update photo');
      setUploadingMemberId(null);
    }
  });

  const handlePhotoUpload = async (memberId, file) => {
    if (!file) return;

    setUploadingMemberId(memberId);
    
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      updatePhotoMutation.mutate({ id: memberId, photo_url: file_url });
    } catch (error) {
      toast.error('Failed to upload photo');
      setUploadingMemberId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6e0202]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Team Photo Manager</h1>
          <p className="text-slate-600">Upload and manage team member photos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-sm text-slate-600">{member.role}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-20 h-20 text-slate-400" />
                  )}
                </div>

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id={`photo-${member.id}`}
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(member.id, e.target.files[0])}
                    disabled={uploadingMemberId === member.id}
                  />
                  <label htmlFor={`photo-${member.id}`}>
                    <Button
                      asChild
                      className="w-full bg-[#6e0202] hover:bg-[#000000]"
                      disabled={uploadingMemberId === member.id}
                    >
                      <span className="cursor-pointer">
                        {uploadingMemberId === member.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            {member.photo_url ? 'Change Photo' : 'Upload Photo'}
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No team members found. Add team members first.</p>
          </div>
        )}
      </div>
    </div>
  );
}