
import { AuthForm } from '@/components/ui/AuthForm';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';

export default function SignUp() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'participant';
  
  const handleSignUp = (data: Record<string, string>) => {
    console.log('Sign up submitted:', data);
    
    // In a real app, you would make an API call to register
    // For this demo, we'll just show a success toast
    toast({
      title: 'Account created successfully',
      description: `Welcome to EventHive, ${data.name}!`,
    });
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
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
      errorMessage: 'Please enter a valid email address'
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Create a password',
      required: true,
      pattern: '.{8,}',
      errorMessage: 'Password must be at least 8 characters'
    },
    {
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      required: true,
      errorMessage: 'Passwords do not match'
    },
    {
      type: 'select',
      name: 'userType',
      label: 'I am a',
      placeholder: 'Select user type',
      required: true
    }
  ];

  return (
    <AuthForm
      title="Create an Account"
      fields={signUpFields}
      buttonText="Sign Up"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkUrl="/signin"
      isSignUp={true}
      onSubmit={handleSignUp}
    />
  );
}
