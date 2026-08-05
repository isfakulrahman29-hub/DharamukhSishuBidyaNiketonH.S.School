'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function AdminNotices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNotice, setCurrentNotice] = useState<any>(null);
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  // Form State
  const [titleEn, setTitleEn] = useState('');
  const [titleAs, setTitleAs] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descAs, setDescAs] = useState('');
  const [published, setPublished] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/admin/login');
    } else if (isAdmin) {
      fetchNotices();
    }
  }, [user, isAdmin, authLoading, router]);

  async function fetchNotices() {
    setLoading(true);
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedNotices: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedNotices.push({ id: doc.id, ...doc.data() });
      });
      setNotices(fetchedNotices);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (notice: any = null) => {
    if (notice) {
      setCurrentNotice(notice);
      setTitleEn(notice.titleEn || '');
      setTitleAs(notice.titleAs || '');
      setDescEn(notice.descEn || '');
      setDescAs(notice.descAs || '');
      setPublished(notice.published !== false);
    } else {
      setCurrentNotice(null);
      setTitleEn('');
      setTitleAs('');
      setDescEn('');
      setDescAs('');
      setPublished(true);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNotice(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const noticeData = {
        titleEn,
        titleAs,
        descEn,
        descAs,
        published,
        updatedAt: serverTimestamp(),
      };

      if (currentNotice) {
        await updateDoc(doc(db, 'notices', currentNotice.id), noticeData);
      } else {
        await addDoc(collection(db, 'notices'), {
          ...noticeData,
          createdAt: serverTimestamp(),
        });
      }
      closeModal();
      fetchNotices();
    } catch (error) {
      console.error('Error saving notice:', error);
      alert('Failed to save notice. Please check permissions.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      try {
        await deleteDoc(doc(db, 'notices', id));
        fetchNotices();
      } catch (error) {
        console.error('Error deleting notice:', error);
        alert('Failed to delete notice.');
      }
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'notices', id), {
        published: !currentStatus,
        updatedAt: serverTimestamp()
      });
      fetchNotices();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (authLoading || loading) {
    return <div className="p-8 text-center text-slate-500">Loading notices...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Notices</h1>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-blue-700 transition"
        >
          <Plus size={20} className="mr-2" /> Add Notice
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Title (English)</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Title (Assamese)</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {notices.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No notices found. Create one to get started.
                </td>
              </tr>
            ) : (
              notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{notice.titleEn || 'Untitled'}</div>
                    <div className="text-sm text-slate-500 truncate max-w-xs">{notice.descEn}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{notice.titleAs || 'Untitled'}</div>
                    <div className="text-sm text-slate-500 truncate max-w-xs">{notice.descAs}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => togglePublished(notice.id, notice.published)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${notice.published !== false ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}
                    >
                      {notice.published !== false ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openModal(notice)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(notice.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">{currentNotice ? 'Edit Notice' : 'Create Notice'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-md">English Content</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title (EN)</label>
                    <input 
                      type="text" 
                      required
                      value={titleEn} 
                      onChange={(e) => setTitleEn(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description (EN)</label>
                    <textarea 
                      required
                      rows={4}
                      value={descEn} 
                      onChange={(e) => setDescEn(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-md">Assamese Content</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title (AS)</label>
                    <input 
                      type="text" 
                      required
                      value={titleAs} 
                      onChange={(e) => setTitleAs(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description (AS)</label>
                    <textarea 
                      required
                      rows={4}
                      value={descAs} 
                      onChange={(e) => setDescAs(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <input 
                  type="checkbox" 
                  id="published" 
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-slate-700">Publish immediately</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
                >
                  <Check size={18} className="mr-2" /> Save Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
