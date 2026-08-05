'use client';

import { useState } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const inquirySchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  parentName: z.string().min(2, "Parent/Guardian name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  classApplyingFor: z.string().min(1, "Class is required"),
  previousSchool: z.string().optional(),
  mobile: z.string().regex(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  whatsapp: z.string().optional(),
  email: z.string().email("Invalid email address").or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "Must be a valid 6-digit PIN code"),
  inquiryType: z.string().min(1, "Inquiry Type is required"),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted"
  }),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      inquiryType: 'Admission',
    }
  });

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Generate ID like DSBN-2026-XXXXXX
      const year = new Date().getFullYear();
      // eslint-disable-next-line react-hooks/purity
      const randomStr = Date.now().toString().slice(-6);
      const inquiryId = `DSBN-${year}-${randomStr}`;

      await addDoc(collection(db, 'admission_inquiries'), {
        ...data,
        inquiryId,
        status: 'NEW',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        source: 'Website',
      });

      router.push(`/inquiry/success?id=${inquiryId}`);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('An error occurred while submitting your inquiry. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Details */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Student Details</h3>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Student Full Name *</label>
          <input 
            type="text" 
            {...register('studentName')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
          <input 
            type="date" 
            {...register('dob')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
          <select 
            {...register('gender')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Class Applying For *</label>
          <select 
            {...register('classApplyingFor')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select Class</option>
            {[...Array(12)].map((_, i) => (
              <option key={i+1} value={`Class ${i+1}`}>Class {i+1}</option>
            ))}
          </select>
          {errors.classApplyingFor && <p className="text-red-500 text-xs mt-1">{errors.classApplyingFor.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Previous School (if any)</label>
          <input 
            type="text" 
            {...register('previousSchool')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Parent / Contact Details */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Parent/Guardian Details</h3>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Parent/Guardian Name *</label>
          <input 
            type="text" 
            {...register('parentName')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
          <input 
            type="tel" 
            placeholder="10 digit number"
            {...register('mobile')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
          <input 
            type="tel" 
            {...register('whatsapp')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input 
            type="email" 
            {...register('email')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Address *</label>
          <textarea 
            rows={2}
            {...register('address')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">District *</label>
          <input 
            type="text" 
            {...register('district')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
          <input 
            type="text" 
            defaultValue="Assam"
            {...register('state')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">PIN Code *</label>
          <input 
            type="text" 
            {...register('pinCode')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
        </div>

        {/* Inquiry Details */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Inquiry Details</h3>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Inquiry Type *</label>
          <select 
            {...register('inquiryType')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Admission">Admission</option>
            <option value="Academic">Academic</option>
            <option value="Fee Related">Fee Related</option>
            <option value="Transport">Transport</option>
            <option value="General">General</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Message / Additional Information</label>
          <textarea 
            rows={4}
            {...register('message')} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex items-start mt-2">
          <div className="flex items-center h-5">
            <input 
              type="checkbox" 
              {...register('consent')}
              className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-slate-700">Consent *</label>
            <p className="text-slate-500">I agree to be contacted by the school authorities regarding this inquiry via phone or email.</p>
            {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}
          </div>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </div>
    </form>
  );
}
