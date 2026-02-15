import { ShieldAlert, Mail } from 'lucide-react';
import Link from 'next/link';

export default function SuspendedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <ShieldAlert className="h-8 w-8 text-red-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Account Suspended</h1>
          <p className="text-slate-600">
            Your organization&apos;s account has been suspended. If you believe this is an error, please contact our support team.
          </p>
        </div>
        <a
          href="mailto:support@siggly.io"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Contact Support
        </a>
        <div>
          <Link href="/login" className="text-sm text-slate-500 hover:text-slate-700 underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
