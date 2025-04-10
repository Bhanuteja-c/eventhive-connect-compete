
import { AuthForm } from '@/components/ui/AuthForm';
import { useToast } from '@/hooks/use-toast';

export default function SignIn() {
  const { toast } = useToast();
  
  const handleSignIn = (data: Record<string, string>) => {
    console.log('Sign in submitted:', data);
    
    // In a real app, you would make an API call to authenticate
    // For this demo, we'll just show a success toast
    toast({
      title: 'Signed in successfully',
      description: `Welcome back, ${data.email}!`,
    });
  };

  const signInFields = [
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
      placeholder: 'Enter your password',
      required: true
    }
  ];

  return (
    <AuthForm
      title="Sign In to EventHive"
      fields={signInFields}
      buttonText="Sign In"
      footerText="Need an account?"
      footerLinkText="Sign up"
      footerLinkUrl="/signup"
      onSubmit={handleSignIn}
    />
  );
}
