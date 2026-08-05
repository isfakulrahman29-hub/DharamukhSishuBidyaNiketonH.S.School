'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/client';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { Search, Filter, Eye, Phone, Mail } from 'lucide-react';

interface Inquiry {
  id: string;
  inquiryId: string;
  studentName: string;
  parentName: string;
  classApplyingFor: string;
  mobile: string;
  inquiryType: string;
  status: string;
  createdAt: any;
  message?: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    setLoading(true);
    try {
      const q = query(collection(db, 'admission_inquiries'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: Inquiry[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'admission_inquiries', id), {
        status: newStatus,
        updatedAt: new Date()
      });
      // Update local state
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800';
      case 'CONTACTED': return 'bg-yellow-100 text-yellow-800';
      case 'VISITED': return 'bg-purple-100 text-purple-800';
      case 'ADMITTED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    inq.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.inquiryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.mobile.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Admission Inquiries</h1>
        <button onClick={fetchInquiries} className="text-sm text-blue-600 hover:underline">Refresh</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, Name or Mobile..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition">
            <Filter size={18} className="mr-2 text-slate-500" /> Filter
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading inquiries...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">ID & Date</th>
                  <th className="px-6 py-3 font-semibold">Student Name</th>
                  <th className="px-6 py-3 font-semibold">Class</th>
                  <th className="px-6 py-3 font-semibold">Contact</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-blue-900">{inq.inquiryId}</div>
                        <div className="text-xs text-slate-500">
                          {inq.createdAt?.toDate ? format(inq.createdAt.toDate(), 'dd MMM yyyy') : 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{inq.studentName}</div>
                        <div className="text-xs text-slate-500">Parent: {inq.parentName}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{inq.classApplyingFor}</td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900">{inq.mobile}</div>
                        <div className="text-xs text-slate-500">{inq.inquiryType}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(inq.status)}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedInquiry(inq)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for viewing inquiry details */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Inquiry Details</h2>
                <p className="text-sm text-slate-500">{selectedInquiry.inquiryId}</p>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-600 p-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Student Name</h3>
                  <p className="text-slate-900 font-medium">{selectedInquiry.studentName}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Class Applied For</h3>
                  <p className="text-slate-900 font-medium">{selectedInquiry.classApplyingFor}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Parent Name</h3>
                  <p className="text-slate-900">{selectedInquiry.parentName}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Mobile</h3>
                  <p className="text-slate-900 flex items-center gap-2">
                    {selectedInquiry.mobile} 
                    <a href={`tel:${selectedInquiry.mobile}`} className="text-blue-600"><Phone size={14}/></a>
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Inquiry Type</h3>
                  <p className="text-slate-900">{selectedInquiry.inquiryType}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase">Submitted On</h3>
                  <p className="text-slate-900">
                    {selectedInquiry.createdAt?.toDate ? format(selectedInquiry.createdAt.toDate(), 'PPpp') : 'Unknown'}
                  </p>
                </div>
              </div>

              {selectedInquiry.message && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-1">Message</h3>
                  <div className="bg-slate-50 p-4 rounded-md text-slate-700 text-sm whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['NEW', 'CONTACTED', 'FOLLOW_UP', 'VISITED', 'ADMITTED', 'REJECTED'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedInquiry.id, status)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
                        selectedInquiry.status === status 
                          ? 'border-blue-600 bg-blue-50 text-blue-700' 
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-right rounded-b-xl">
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
