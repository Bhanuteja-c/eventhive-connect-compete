
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useToast } from '@/hooks/use-toast';

export interface FormField {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface AuthFormProps {
  title: string;
  description?: string;
  fields: FormField[];
  buttonText: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkUrl?: string;
  onSubmit: (data: Record<string, any>) => void;
}

export function AuthForm({
  title,
  description,
  fields,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkUrl,
  onSubmit,
}: AuthFormProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [showPassword, setShowPassword] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm({
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as Record<string, any>),
  });
  
  const handleSubmit = (data: Record<string, any>) => {
    try {
      onSubmit(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className={`w-full ${isDesktop ? 'max-w-md' : 'max-w-xs'} shadow-lg animate-fade-in`}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          {description && <CardDescription className="text-center">{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      {field.type === 'password' ? (
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...formField}
                              type={showPassword ? 'text' : 'password'}
                              placeholder={field.placeholder}
                              required={field.required}
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      ) : field.type === 'select' && field.options ? (
                        <Select 
                          onValueChange={formField.onChange} 
                          defaultValue={formField.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {field.options.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === 'checkbox' ? (
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={field.name}
                              checked={formField.value}
                              onCheckedChange={formField.onChange}
                            />
                            <label
                              htmlFor={field.name}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {field.placeholder}
                            </label>
                          </div>
                        </FormControl>
                      ) : (
                        <FormControl>
                          <Input
                            {...formField}
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              
              {/* Remember Me for Sign In (only include if it's a sign in form) */}
              {fields.some(f => f.name === 'email') && fields.some(f => f.name === 'password') && !fields.some(f => f.name === 'name') && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  {!isDesktop && (
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  )}
                </div>
              )}
              
              <Button type="submit" className="w-full">{buttonText}</Button>
              
              {isDesktop && fields.some(f => f.name === 'email') && fields.some(f => f.name === 'password') && !fields.some(f => f.name === 'name') && (
                <div className="text-center">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        {footerText && footerLinkText && footerLinkUrl && (
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {footerText}{' '}
              <Link to={footerLinkUrl} className="text-primary hover:underline">
                {footerLinkText}
              </Link>
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
