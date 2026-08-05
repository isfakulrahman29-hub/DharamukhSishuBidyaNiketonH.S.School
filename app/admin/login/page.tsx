'use client';

import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user is an admin
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      
      if (adminDoc.exists() && adminDoc.data().active === true) {
        router.push('/admin/dashboard');
      } else {
        // Not authorized, sign them out
        await auth.signOut();
        setError('Your account is not authorized to access the admin dashboard.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Dharamukh Sishu Bidya Niketon H.S. School
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign in with Google'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              &larr; Back to Public Website
            </Link>
          </div>
          
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h4 className="text-sm font-medium text-slate-900 mb-2">First Time Setup?</h4>
            <p className="text-xs text-slate-500">
              Only authorized Google accounts can access this portal. To add an administrator, you must manually create a document in the Firestore `admins` collection with the user&apos;s UID and set `active: true`.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
