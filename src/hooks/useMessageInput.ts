
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useMessageInput = (onSendMessage: (content: string) => Promise<void>) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await onSendMessage(message);
      setMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    message,
    setMessage,
    handleSend,
    handleKeyDown
  };
};
