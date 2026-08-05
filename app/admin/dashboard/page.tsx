import { Metadata } from 'next';
import { Users, FileText, ImageIcon, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | Admin DSBN',
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-700 mr-4">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">New Inquiries</p>
            <p className="text-2xl font-bold text-slate-900">12</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center">
          <div className="bg-green-100 p-3 rounded-lg text-green-700 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Teachers</p>
            <p className="text-2xl font-bold text-slate-900">24</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center">
          <div className="bg-yellow-100 p-3 rounded-lg text-yellow-700 mr-4">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Active Notices</p>
            <p className="text-2xl font-bold text-slate-900">3</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-700 mr-4">
            <ImageIcon size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Gallery Images</p>
            <p className="text-2xl font-bold text-slate-900">45</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Recent Inquiries</h2>
            <button className="text-sm text-blue-600 font-medium">View All</button>
          </div>
          <div className="p-6">
            <div className="text-center text-slate-500 py-8">
              <p>Inquiries integration pending.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <button className="p-4 border border-slate-200 rounded-lg text-left hover:bg-slate-50 transition">
              <FileText className="text-blue-600 mb-2" size={24} />
              <span className="font-medium text-slate-900 block">Add Notice</span>
            </button>
            <button className="p-4 border border-slate-200 rounded-lg text-left hover:bg-slate-50 transition">
              <ImageIcon className="text-green-600 mb-2" size={24} />
              <span className="font-medium text-slate-900 block">Upload Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
