
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { Eye, EyeOff } from 'lucide-react';

interface FormField {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}

interface AuthFormProps {
  title: string;
  fields: FormField[];
  buttonText: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkUrl?: string;
  isSignUp?: boolean;
  onSubmit: (data: Record<string, string>) => void;
}

export function AuthForm({
  title,
  fields,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkUrl,
  isSignUp = false,
  onSubmit,
}: AuthFormProps) {
  const isLaptop = useMediaQuery('(min-width: 768px)');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach((field) => {
      const value = formData[field.name] || '';
      
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.pattern && value) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(value)) {
          newErrors[field.name] = field.errorMessage || `Invalid ${field.label.toLowerCase()}`;
        }
      }
    });
    
    // Password confirmation validation for sign up
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Navigate based on user type after successful submission
      // In a real app, this would happen after API call confirmation
      const userType = formData.userType || 'participant';
      setTimeout(() => {
        navigate(userType === 'host' ? '/dashboard/host' : '/events');
      }, 1000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isLaptop ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
      <div 
        className={`w-full ${isLaptop ? 'max-w-[500px] shadow-lg p-8' : 'max-w-[400px] p-6'} bg-white dark:bg-card rounded-xl`}
        style={{
          animation: isLaptop 
            ? (isSignUp ? 'slide-in-left 0.5s ease-out forwards' : 'slide-in-right 0.5s ease-out forwards')
            : 'fade-in 0.5s ease-out forwards'
        }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1">
              <label htmlFor={field.name} className="block text-sm font-medium">
                {field.label}
              </label>
              
              <div className="relative">
                {field.type === 'password' ? (
                  <>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className={`input-primary ${errors[field.name] ? 'border-red-500' : ''}`}
                      required={field.required}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </>
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className={`input-primary ${errors[field.name] ? 'border-red-500' : ''}`}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    <option value="host">Host</option>
                    <option value="participant">Participant</option>
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className={`input-primary ${errors[field.name] ? 'border-red-500' : ''}`}
                    required={field.required}
                    pattern={field.pattern}
                  />
                )}
              </div>
              
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
          
          {/* Remember Me for Sign In */}
          {!isSignUp && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="h-4 w-4 rounded border-gray-300 text-eventhive-primary focus:ring-eventhive-primary"
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </label>
              
              {!isLaptop && (
                <Link to="/forgot-password" className="ml-auto text-sm text-eventhive-accent hover:underline">
                  Forgot Password?
                </Link>
              )}
            </div>
          )}
          
          <div className={isLaptop ? 'flex items-center justify-between' : ''}>
            <button
              type="submit"
              className={`btn-primary ${isLaptop ? 'w-auto min-w-[150px]' : 'w-full h-[50px]'}`}
            >
              {buttonText}
            </button>
            
            {isLaptop && !isSignUp && (
              <Link to="/forgot-password" className="text-eventhive-accent hover:underline text-sm">
                Forgot Password?
              </Link>
            )}
          </div>
        </form>
        
        {footerText && footerLinkText && footerLinkUrl && (
          <div className={`mt-6 text-center ${isLaptop ? 'text-sm' : ''}`}>
            <p className="text-gray-600 dark:text-gray-400">
              {footerText}{' '}
              <Link to={footerLinkUrl} className="text-eventhive-accent hover:underline">
                {footerLinkText}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
