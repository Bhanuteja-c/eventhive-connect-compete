
import { AuthForm } from '@/components/ui/AuthForm';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SignUp() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'participant';
  
  const handleSignUp = (data: Record<string, any>) => {
    console.log('Sign up submitted:', data);
    
    // In a real app, you would make an API call to register
    toast({
      title: 'Account created successfully',
      description: `Welcome to EventHive, ${data.name}!`,
    });
    
    // Redirect based on user type
    setTimeout(() => {
      if (data.userType === 'host') {
        navigate('/manage-events');
      } else if (data.userType === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/events');
      }
    }, 1000);
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
        { value: 'participant', label: 'Participant' },
        { value: 'admin', label: 'Administrator' }
      ]
    }
  ];

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
