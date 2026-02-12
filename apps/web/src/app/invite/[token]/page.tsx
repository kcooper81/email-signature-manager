'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function InviteAcceptPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    validateInvite();
  }, [params.token]);

  const validateInvite = async () => {
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('user_invites')
        .select('*, users(email, first_name, last_name, organization_id)')
        .eq('token', params.token)
        .is('accepted_at', null)
        .single();

      if (error || !data) {
        setError('Invalid or expired invite link');
        setLoading(false);
        return;
      }

      // Check if expired
      if (new Date(data.expires_at) < new Date()) {
        setError('This invite has expired');
        setLoading(false);
        return;
      }

      setInviteData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to validate invite');
      setLoading(false);
    }
  };

  const createAccount = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setCreating(true);
    setError(null);

    try {
      // Use API route to create the user account and link it to the invite
      const response = await fetch('/api/invite/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: inviteData.user_id,
          email: inviteData.email,
          password: password,
          token: params.token,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to accept invite');
      }

      const { authId } = await response.json();

      // Now sign in with the created account
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: inviteData.email,
        password: password,
      });

      if (signInError) {
        throw new Error('Account created but failed to sign in. Please try logging in.');
      }

      // Wait a moment for the session to establish
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use window.location for a hard redirect to ensure fresh session
      window.location.href = '/my-profile?welcome=true';
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <CardTitle>Invalid Invite</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => router.push('/')} variant="outline" className="w-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            You've been invited to manage your profile at {inviteData.users?.organization_id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={inviteData.email}
              disabled
              className="bg-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              value={`${inviteData.users?.first_name || ''} ${inviteData.users?.last_name || ''}`.trim() || 'Not set'}
              disabled
              className="bg-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (min 8 characters)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          <Button 
            onClick={createAccount} 
            disabled={creating || !password || !confirmPassword}
            className="w-full"
          >
            {creating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Create Account
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            After creating your account, you'll be able to manage your personal links and signature preferences.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
