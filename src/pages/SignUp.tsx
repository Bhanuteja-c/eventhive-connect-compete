
import { AuthForm } from '@/components/ui/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { BeeLoading } from '@/components/ui/bee-spinner';

export default function SignUp() {
  const { signup, isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'user';
  
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
  
  const handleSignUp = async (data: Record<string, any>) => {
    setLoading(true);
    
    // Validate password match
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        userType: data.userType,
      });
    } finally {
      setLoading(false);
    }
  };

  const signUpFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true
    },
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
      placeholder: 'Create a password',
      required: true,
    },
    {
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      required: true,
    },
    {
      type: 'select',
      name: 'userType',
      label: 'I am a',
      placeholder: 'Select user type',
      required: true,
      options: [
        { value: 'host', label: 'Host' },
        { value: 'user', label: 'Participant' },
        { value: 'admin', label: 'Administrator' }
      ]
    }
  ];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BeeLoading message="Creating your account..." size="lg" />
      </div>
    );
  }

  return (
    <AuthForm
      title="Create an Account"
      description="Sign up to start hosting or participating in events"
      fields={signUpFields}
      buttonText="Sign Up"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkUrl="/signin"
      onSubmit={handleSignUp}
    />
  );
}
