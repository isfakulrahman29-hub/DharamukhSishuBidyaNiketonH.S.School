import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Page Not Found</h2>
        <p className="mt-2 text-sm text-slate-600">The page you are looking for does not exist.</p>
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
