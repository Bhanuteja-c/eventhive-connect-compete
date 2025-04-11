
import { AuthForm } from '@/components/ui/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingState } from '@/components/ui/loading-state';

export default function SignIn() {
  const { login, isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // If already authenticated, redirect based on role
  if (isAuthenticated && user) {
    if (user.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else if (user.role === 'host') {
      return <Navigate to="/manage-events" replace />;
    } else {
      return <Navigate to="/events" replace />;
    }
  }
  
  const handleSignIn = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
    } finally {
      setLoading(false);
    }
  };

  const signInFields = [
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md p-8 space-y-4 bg-card rounded-lg shadow-md">
          <LoadingState 
            variant="spinner" 
            text="Signing in..." 
            size="lg" 
            className="py-12" 
          />
        </div>
      </div>
    );
  }

  return (
    <AuthForm
      title="Sign In to EventHive"
      description="Enter your email and password to access your account"
      fields={signInFields}
      buttonText="Sign In"
      footerText="Need an account?"
      footerLinkText="Sign up"
      footerLinkUrl="/signup"
      onSubmit={handleSignIn}
    />
  );
}
