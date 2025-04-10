
import { AuthForm } from '@/components/ui/AuthForm';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSignIn = (data: Record<string, any>) => {
    console.log('Sign in submitted:', data);
    
    // In a real app, you would make an API call to authenticate
    // Simulate a successful login for demonstration
    toast({
      title: 'Signed in successfully',
      description: `Welcome back, ${data.email}!`,
    });
    
    // Redirect based on role (in a real app, this would come from the server response)
    // For demo purposes, redirect to events page after a short delay
    setTimeout(() => {
      navigate('/events');
    }, 1000);
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
