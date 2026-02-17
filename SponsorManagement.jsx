import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, X, Mail, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { format, differenceInDays, parseISO } from 'date-fns';

export default function SponsorManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    sponsorship_level: 'Bronze',
    amount: '',
    commitment_start_date: '',
    commitment_end_date: '',
    logo_url: '',
    website: '',
    notes: '',
    status: 'Active'
  });

  const queryClient = useQueryClient();

  const { data: sponsors = [], isLoading } = useQuery({
    queryKey: ['sponsors'],
    queryFn: () => base44.entities.Sponsor.list('-commitment_end_date'),
    initialData: []
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Sponsor.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsors'] });
      resetForm();
      toast.success('Sponsor added successfully!');
    },
    onError: () => {
      toast.error('Failed to add sponsor');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Sponsor.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sponsors'] });
      resetForm();
      toast.success('Sponsor updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update sponsor');
    }
  });

  const sendReminderMutation = useMutation({
    mutationFn: async (sponsor) => {
      const daysUntilExpiry = differenceInDays(parseISO(sponsor.commitment_end_date), new Date());
      
      await base44.integrations.Core.SendEmail({
        to: sponsor.contact_email,
        subject: `Sponsorship Renewal - Team 6407 Mechanical Mustangs Secretariat`,
        body: `Dear ${sponsor.contact_name || sponsor.company_name},

Thank you for your continued support of Team 6407 - Mechanical Mustangs Secretariat!

Your ${sponsor.sponsorship_level} sponsorship of $${sponsor.amount} will expire in ${daysUntilExpiry} days on ${format(parseISO(sponsor.commitment_end_date), 'MMMM d, yyyy')}.

We would love to continue our partnership. Your support helps us:
- Build and improve our robot
- Compete in FIRST Tech Challenge events
- Inspire the next generation of STEM leaders

Please contact us to discuss renewal options for the upcoming season.

Best regards,
Team 6407 - Mechanical Mustangs Secretariat
team@team6407.com`
      });
    },
    onSuccess: () => {
      toast.success('Reminder email sent successfully!');
    },
    onError: () => {
      toast.error('Failed to send reminder email');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editingSponsor) {
      updateMutation.mutate({ id: editingSponsor.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor);
    setFormData(sponsor);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      sponsorship_level: 'Bronze',
      amount: '',
      commitment_start_date: '',
      commitment_end_date: '',
      logo_url: '',
      website: '',
      notes: '',
      status: 'Active'
    });
    setEditingSponsor(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getDaysUntilExpiry = (endDate) => {
    return differenceInDays(parseISO(endDate), new Date());
  };

  const getExpiryStatus = (sponsor) => {
    const days = getDaysUntilExpiry(sponsor.commitment_end_date);
    if (days < 0) return { text: 'Expired', color: 'bg-red-500', icon: AlertCircle };
    if (days <= 30) return { text: `${days} days left`, color: 'bg-yellow-500', icon: AlertCircle };
    return { text: 'Active', color: 'bg-green-500', icon: CheckCircle };
  };

  const levelColors = {
    Platinum: "from-[#6e0202] to-[#000000]",
    Gold: "from-yellow-500 to-yellow-600",
    Silver: "from-slate-400 to-slate-500",
    Bronze: "from-amber-700 to-amber-800"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Sponsor Management</h1>
            <p className="text-slate-600">Manage sponsors and renewal reminders</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#6e0202] hover:bg-[#000000] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Sponsor
          </Button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="border-2 border-slate-200 rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={resetForm}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company Name *
                      </label>
                      <Input
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contact Name
                      </label>
                      <Input
                        name="contact_name"
                        value={formData.contact_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contact Email *
                      </label>
                      <Input
                        type="email"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contact Phone
                      </label>
                      <Input
                        name="contact_phone"
                        value={formData.contact_phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Sponsorship Level *
                      </label>
                      <Select
                        value={formData.sponsorship_level}
                        onValueChange={(value) => setFormData({ ...formData, sponsorship_level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bronze">Bronze</SelectItem>
                          <SelectItem value="Silver">Silver</SelectItem>
                          <SelectItem value="Gold">Gold</SelectItem>
                          <SelectItem value="Platinum">Platinum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Amount ($) *
                      </label>
                      <Input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Start Date *
                      </label>
                      <Input
                        type="date"
                        name="commitment_start_date"
                        value={formData.commitment_start_date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        End Date *
                      </label>
                      <Input
                        type="date"
                        name="commitment_end_date"
                        value={formData.commitment_end_date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Logo URL
                      </label>
                      <Input
                        name="logo_url"
                        value={formData.logo_url}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Website
                      </label>
                      <Input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Status *
                      </label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Notes
                      </label>
                      <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="md:col-span-2 flex gap-3">
                      <Button type="submit" className="bg-[#6e0202] hover:bg-[#000000]">
                        {editingSponsor ? 'Update' : 'Add'} Sponsor
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-6">
          {sponsors.map((sponsor) => {
            const expiryStatus = getExpiryStatus(sponsor);
            const StatusIcon = expiryStatus.icon;

            return (
              <Card key={sponsor.id} className="border-2 border-slate-200 rounded-2xl">
                <div className={`h-2 bg-gradient-to-r ${levelColors[sponsor.sponsorship_level]}`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-8 h-8 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {sponsor.company_name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={`bg-gradient-to-r ${levelColors[sponsor.sponsorship_level]} text-white border-0`}>
                            {sponsor.sponsorship_level}
                          </Badge>
                          <Badge variant="outline">
                            ${sponsor.amount.toLocaleString()}
                          </Badge>
                          <Badge className={`${expiryStatus.color} text-white border-0 flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {expiryStatus.text}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-slate-600">
                          <p><strong>Contact:</strong> {sponsor.contact_name || 'N/A'} ({sponsor.contact_email})</p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {format(parseISO(sponsor.commitment_start_date), 'MMM d, yyyy')} - {format(parseISO(sponsor.commitment_end_date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendReminderMutation.mutate(sponsor)}
                        disabled={sendReminderMutation.isPending}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Reminder
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(sponsor)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}