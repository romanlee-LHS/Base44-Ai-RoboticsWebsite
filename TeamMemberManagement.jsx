import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export default function TeamMemberManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Member',
    grade: '',
    bio: '',
    years_on_team: 1
  });

  const queryClient = useQueryClient();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: () => base44.entities.TeamMember.list('-years_on_team')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.TeamMember.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast.success('Team member added');
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.TeamMember.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast.success('Team member updated');
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.TeamMember.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast.success('Team member deleted');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      grade: formData.grade ? Number(formData.grade) : undefined,
      years_on_team: Number(formData.years_on_team)
    };

    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      role: member.role || 'Member',
      grade: member.grade || '',
      bio: member.bio || '',
      years_on_team: member.years_on_team || 1
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: 'Member',
      grade: '',
      bio: '',
      years_on_team: 1
    });
    setEditingMember(null);
    setShowForm(false);
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Team Member Management</h1>
            <p className="text-slate-600">Add, edit, and manage team members</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#6e0202] hover:bg-[#000000]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8 bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
                <Button variant="ghost" size="icon" onClick={resetForm}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Role *</label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Head Mentor">Head Mentor</SelectItem>
                        <SelectItem value="Mentor">Mentor</SelectItem>
                        <SelectItem value="Team Captain">Team Captain</SelectItem>
                        <SelectItem value="Co-Captain">Co-Captain</SelectItem>
                        <SelectItem value="Lead Programmer">Lead Programmer</SelectItem>
                        <SelectItem value="Lead Builder">Lead Builder</SelectItem>
                        <SelectItem value="Programmer">Programmer</SelectItem>
                        <SelectItem value="Builder">Builder</SelectItem>
                        <SelectItem value="CAD Designer">CAD Designer</SelectItem>
                        <SelectItem value="Driver">Driver</SelectItem>
                        <SelectItem value="Scout">Scout</SelectItem>
                        <SelectItem value="Outreach Lead">Outreach Lead</SelectItem>
                        <SelectItem value="Member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Grade</label>
                    <Input
                      type="number"
                      min="6"
                      max="12"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Years on Team</label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.years_on_team}
                      onChange={(e) => setFormData({ ...formData, years_on_team: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">Bio</label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#6e0202] hover:bg-[#000000]">
                    {editingMember ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-sm text-slate-600">{member.role}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {member.grade && <p className="text-sm text-slate-600">Grade {member.grade}</p>}
                {member.bio && <p className="text-sm text-slate-700">{member.bio}</p>}
                <p className="text-xs text-slate-500">
                  {member.years_on_team} {member.years_on_team === 1 ? 'year' : 'years'} on team
                </p>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member)}
                    className="flex-1"
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Delete this team member?')) {
                        deleteMutation.mutate(member.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {members.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No team members yet</p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#6e0202] hover:bg-[#000000]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Member
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}